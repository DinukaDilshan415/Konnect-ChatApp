import React, { useState } from 'react'
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import CircleShape from '../components/CircleShape'
import { useTheme } from '../theme/ThemeProvider'
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal"
import { AntDesign } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStack } from '../../App'
import { useNavigation } from '@react-navigation/native'
import { useUserRegistration } from '../components/UserContext'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { validateCountryCode, validatePhoneNo } from '../util/Validation'

type SignUpProps = NativeStackNavigationProp<RootStack, "SignUpScreen">

export default function GetContactScreen() {
    const navigation = useNavigation<SignUpProps>();

    const [countryCode, setCountryCode] = useState<CountryCode>("LK");
    const [country, setCountry] = useState<Country | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const [callingCode, setCallingCode] = useState<string>("+94");
    const [phoneNo, setPhoneNo] = useState<string>("");
    const [showBtn, setShowBtn] = useState<boolean>(false);

    const { applied } = useTheme();

    const logo =
        applied === "dark"
            ? require("../../assets/K-white.png")
            : require("../../assets/K-black.png");

    const { userData, setUserData } = useUserRegistration();

    return (
        <SafeAreaView className='flex-1 items-center justify-center bg-white dark:bg-slate-700 p-4'>
            <StatusBar hidden={false} barStyle={'dark-content'} className='bg-white dark:bg-slate-700' />

            <View className='absolute top-1 w-full'>
                <CircleShape width={700} height={400} borderRadius={300} topValue={-160} rightValue={-70} className='bg-amber-100 dark:bg-amber-300' />
                <CircleShape width={600} height={300} borderRadius={300} topValue={-100} rightValue={-20} className='bg-amber-400' />
            </View>
            <View className='w-52 absolute top-6 right-6'>
                <Text className='text-center text-slate-700 dark:text-slate-100 font-exo-bold text-4xl my-5'>Enter Your Phone Number</Text>
            </View>
            <View className='absolute top-2 left-1'>
                <Image source={logo} className='w-40 h-52' />
            </View>

            <View className='flex-1 justify-center bottom-5 mx-4'>
                <View className='items-center justify-center flex flex-row h-14 mb-3 bg-slate-100 border border-slate-400 rounded-full'>
                    <CountryPicker
                        countryCode={countryCode}
                        withFilter
                        withFlag
                        withCountryNameButton
                        withCallingCode
                        visible={show}
                        onClose={() => {
                            setShow(false);
                        }}
                        onSelect={(c) => {
                            setCountryCode(c.cca2);
                            setCountry(c);
                            setShow(false);
                        }}
                    />
                    <AntDesign name="caret-down" size={24} color="black" style={{ marginTop: 5 }} />
                </View>
                <View className='mt-2 flex flex-row justify-between items-center w-full gap-2 bg-slate-200 rounded-full'>
                    <TextInput
                        inputMode='tel'
                        className='h-16 w-1/6 font-bold text-lg text-center bg-slate-400 rounded-l-full'
                        placeholder='+94'
                        editable={false}
                        value={country ? `+${country.callingCode}` : callingCode}
                        onChangeText={(text) => {
                            setCallingCode(text);
                        }}
                    />
                    <TextInput
                        inputMode='tel'
                        className='h-16 w-5/6 font-bold text-lg '
                        placeholder='77#######'
                        value={phoneNo}
                        onChangeText={(text) => {
                            setPhoneNo(text);
                            text.length <= 0 ? setShowBtn(false) : setShowBtn(true) 
                        }}
                    />
                </View>
            </View>
            <View className='w-full px-2 mt-5 absolute bottom-9'>
                <Pressable className={`h-14 justify-center items-center rounded-full ${showBtn ? "bg-amber-500" : "bg-gray-300 dark:bg-slate-600/80"}`}
                    onPress={() => {
                        const validCountryCode = validateCountryCode(callingCode);
                        const validPhoneNo = validatePhoneNo(phoneNo);

                        if (validCountryCode) {
                            Toast.show({
                                type: ALERT_TYPE.WARNING,
                                title: "Warning",
                                textBody: validCountryCode,
                            });
                        } else if (validPhoneNo) {
                            Toast.show({
                                type: ALERT_TYPE.WARNING,
                                title: "Warning",
                                textBody: validPhoneNo,
                            });
                        } else {
                            setUserData((previous) => ({
                                ...previous,
                                countryCode: country
                                    ? `+${country.callingCode}`
                                    : callingCode,
                                contactNo: phoneNo,
                            }));
                            navigation.navigate("SignUpScreen");
                        }
                    }}>
                    <Text className='text-white font-bold text-xl'>Continue</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});