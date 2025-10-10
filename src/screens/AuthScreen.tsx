import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react'
import { RootStack } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native';
import Keypad from 'react-native-simple-keypad';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { AuthContext } from '../components/AuthProvider';

type AuthScreenNavigationProp = NativeStackNavigationProp<RootStack, 'AuthScreen'>;

export default function AuthScreen() {
    const auth = useContext(AuthContext);
    const navigation = useNavigation<AuthScreenNavigationProp>();
    const [passcode, setPasscode] = useState('');
    const [newPasscode, setNewPasscode] = useState('');
    // const [reEnteredPasscode, setReEnteredPasscode] = useState('');
    const [isReEnter, setIsReEnter] = useState(false);
    const [isSetup, setIsSetup] = useState(false);
    const [savedPasscode, setSavedPasscode] = useState<string | null>(null);

    const [authStatus, setAuthStatus] = useState('Not authenticated');

    useEffect(() => {
        setPasscode('');
        checkPasscode();
    }, []);

    const checkPasscode = async () => {
        const storedPasscode = await AsyncStorage.getItem('userPasscode');
        if (storedPasscode) {
            setSavedPasscode(storedPasscode);
        } else {
            setIsSetup(true);
        }
    };

    const handlePasscodeInput = (value: string) => {
        setPasscode(value);
        if (value.length === 4) {
            if (isSetup) {
                setNewPasscode(value);
                handleReEnterPasscode(value);
            } else if (isReEnter) {
                matchPasscode(value);
            } else {
                verifyPasscode(value);
            }
        }
    };

    const handleReEnterPasscode = (value: string) => {
        setIsSetup(false);
        setIsReEnter(true);
        setPasscode('');
    };

    const matchPasscode = (value: string) => {
        setIsSetup(false);
        setIsReEnter(false);
        setPasscode('');

        console.log("New PW : " + newPasscode);
        console.log("ReEntered PW : " + value);
        console.log(newPasscode == value);

        if (newPasscode === value) {
            savePasscode(value);
        } else {
            Alert.alert('Warning', 'PassCode Not Matched. Re-Enter Same Password!');
            setPasscode('');
            setNewPasscode('');
            // setReEnteredPasscode('');
            setIsSetup(true);
        }
    };

    const savePasscode = async (code: string) => {
        await AsyncStorage.setItem('userPasscode', code);
        setSavedPasscode(code);
        setIsSetup(false);
        setIsReEnter(false);
        setPasscode('');
        Alert.alert('Success', 'Passcode set successfully!');
    };

    const verifyPasscode = (code: string) => {
        if (code === savedPasscode) {
            auth?.setIsPin(false);
            setPasscode('');
        } else {
            Alert.alert('Warning', 'Incorrect passcode!');
            setPasscode('');
        }
    };

    const handleBiometricAuth = async () => {
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            if (!hasHardware) {
                setAuthStatus('Biometric hardware not available');
                Alert.alert('Error', 'This device does not support biometric authentication.');
                return;
            }

            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            if (!isEnrolled) {
                setAuthStatus('Biometric credentials not enrolled');
                Alert.alert('Error', 'No biometric credentials are enrolled on this device.');
                return;
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate to continue',
                cancelLabel: 'Cancel',
                disableDeviceFallback: false,
            });

            if (result.success) {
                setAuthStatus('Authentication successful!');
                auth?.setIsPin(false);
            } else {
                setAuthStatus('Authentication failed');
                Alert.alert('Error', 'Authentication failed.');
            }
        } catch (error) {
            setAuthStatus('Authentication failed');
            Alert.alert('Error', `Authentication failed: ${error}`);
            console.error('Biometric error:', error);
        }
    };

    return (
        <View className="flex-1 bg-blue-50 min-h-screen items-center justify-center p-4">
            <Image source={require("../../assets/konnect-logo.png")} className='w-56 h-56' />
            <View className="flex-row">
                {Array(4)
                    .fill(0)
                    .map((_, index) => (
                        <View
                            key={index}
                            className={`w-5 h-5 border-2 rounded-full mx-1 ${passcode.length > index ? 'bg-amber-500' : 'bg-white'
                                }`}
                        />
                    ))}
            </View>
            <View className="mt-4">
                {isSetup ? (
                    <Text className="text-center mb-4 text-lg font-bold text-red-600">Set your passcode</Text>
                ) : isReEnter ? (
                    <Text className="text-center mb-4 text-lg font-bold text-red-600">Re Enter passcode</Text>
                ) : (
                    <Text className="text-center mb-4 text-lg font-bold">Enter your PIN Code</Text>
                )}
                <TextInput
                    className="hidden"
                    value={passcode}
                    onChangeText={handlePasscodeInput}
                    maxLength={4}
                    keyboardType="numeric"
                />
            </View>

            <View className='flex'>
                <Keypad
                    onKeyPress={(value) => value != "delete" ? handlePasscodeInput(passcode + value) : setPasscode(passcode.slice(0, -1))}
                    textStyle={{
                        height: 70,
                        width: 70,
                        fontWeight: '600',
                        fontSize: 30,
                        backgroundColor: 'rgb(255, 237, 154)',
                        textAlign: 'center',
                        padding: 12,
                        marginTop: 3,
                        borderWidth: 2,
                        borderColor: '#f6a800',
                        borderRadius: 50
                    }}
                    backspaceIconFillColor="#000000"
                    backspaceIconStrokeColor="#FFFFFF"
                    bioMetricFillColor="#000000"
                    backspaceIconHeight={24}
                    backspaceIconWidth={33}
                    bioMetricIconHeight={28}
                    bioMetricIconWidth={28}
                    onBioAuthPress={async () => {
                        const fingerprintAs = await AsyncStorage.getItem('fingerprint');

                        if (isSetup || isReEnter) {
                            Alert.alert('Info', 'Setup Passcode');
                        } else if (fingerprintAs !== "1") {
                            Alert.alert('Info', 'Fingerprint Authentication Not Enabled !');
                        } else {
                            handleBiometricAuth();
                        }                    
                    }}
                />
            </View>

            <Pressable onPress={() => {

            }}>
                <Text className="mt-4 text-blue-500">Login using credentials</Text>
            </Pressable>
        </View>
    )
}
