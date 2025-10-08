import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStack } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal"
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { validateCountryCode, validateFirstName, validateLastName, validatePhoneNo } from '../util/Validation';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { useSendNewContact } from '../socket/UseSentNewContact';

type NewContactScreenProp = NativeStackNavigationProp<RootStack, "NewContactScreen">;

export default function NewContactScreen() {

    const navigation = useNavigation<NewContactScreenProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerLeft: () => (
                <View className="items-center flex-row gap-x-2">
                    <TouchableOpacity
                        className="justify-center items-center"
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </TouchableOpacity>
                    <View className="flex-col">
                        <Text className="text-xl font-bold">New Contact</Text>
                    </View>
                </View>
            ),
        });
    }, [navigation]);

    const [countryCode, setCountryCode] = useState<CountryCode>("LK"); // default country code
    const [country, setCountry] = useState<Country | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const [callingCode, setCallingCode] = useState("+94");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const newContact = useSendNewContact();
    const sendNewContact = newContact.sendNewContact;
    const responseText = newContact.responseText;

    const sendData = () => {
        sendNewContact({
            id: 0,
            firstName: firstName,
            lastName: lastName,
            countryCode: callingCode,
            contactNo: phoneNo,
            createdAt: "",
            updatedAt: "",
            status: "",
            first_name: "",
            last_name: "",
            contact_no: "",
            displayName:"",
        });
        setFirstName("");
        setLastName("");
        setCallingCode("+94");
        setPhoneNo("");
        setCountry(null)
        setCountryCode("LK");
    };

    useEffect(() => {
        setCallingCode(country ? `+${country.callingCode}` : callingCode);
    }, [country]);

    return (
        <SafeAreaView className='flex-1 bg-white pt-4'>
            <View className='flex-1 items-center px-5'>
                <View className='flex-row items-center gap-x-2  h-14'>
                    <Feather name="user" size={24} color="black" />
                    <View className="flex-1 h-14 ms-1">
                        <FloatingLabelInput
                            label="First Name"
                            className=""
                            animationDuration={50}
                            containerStyles={{ borderBottomWidth: 2, borderColor: "#ffd000" }}
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                        />
                    </View>
                </View>
                <View className="flex-row items-center gap-x-2 mt-8 h-14 ms-10">
                    {/* <Feather name="user" size={24} color="black"/> */}
                    <View className="flex-1 h-14">
                        <FloatingLabelInput
                            label="Last Name"
                            className=""
                            animationDuration={50}
                            containerStyles={{ borderBottomWidth: 2, borderColor: "#ffd000" }}
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                        />
                    </View>
                </View>
                <View className="bg-slate-200 border-b-2 border-amber-400 rounded-xl justify-center items-center flex-row h-14 mt-8 px-4">
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
                    <AntDesign
                        name="caret-down"
                        size={18}
                        color="black"
                        style={{ marginTop: 5 }}
                    />
                </View>
                <View className="flex-row items-center gap-x-2 mt-8 h-14">
                    <Feather name="phone" size={24} color="black" />
                    <View className="h-14 items-center justify-center px-2 w-28 max-w-28">
                        <FloatingLabelInput
                            label=""
                            editable={false}
                            animationDuration={50}
                            containerStyles={{ borderWidth: 2, borderColor: "#ffd000", borderRadius: 10 }}
                            value={country ? `+${country.callingCode}` : callingCode}
                            onChangeText={(text) => {
                                setCallingCode(text);
                            }}
                        />
                    </View>
                    <View className="flex-1 h-14">
                        <FloatingLabelInput
                            label="Phone"
                            inputMode="tel"
                            className=""
                            animationDuration={50}
                            containerStyles={{ borderWidth: 2, borderColor: "#ffd000", borderRadius: 10 }}
                            value={phoneNo}
                            onChangeText={(text) => setPhoneNo(text)}
                        />
                    </View>
                </View>
                <View className="w-full mt-10 absolute bottom-3">
                    <Pressable
                        className="bg-amber-500 h-14 items-center justify-center rounded-full"
                        onPress={() => {
                            const firstNameValid = validateFirstName(firstName);
                            const lastNameValid = validateLastName(lastName);
                            const countryCodeValid = validateCountryCode(callingCode);
                            const phoneNoValid = validatePhoneNo(phoneNo);

                            if (firstNameValid) {
                                Toast.show({
                                    type: ALERT_TYPE.WARNING,
                                    title: "Warning",
                                    textBody: firstNameValid,
                                });
                            } else if (lastNameValid) {
                                Toast.show({
                                    type: ALERT_TYPE.WARNING,
                                    title: "Warning",
                                    textBody: lastNameValid,
                                });
                            } else if (countryCodeValid) {
                                Toast.show({
                                    type: ALERT_TYPE.WARNING,
                                    title: "Warning",
                                    textBody: countryCodeValid,
                                });
                            } else if (phoneNoValid) {
                                Toast.show({
                                    type: ALERT_TYPE.WARNING,
                                    title: "Warning",
                                    textBody: phoneNoValid,
                                });
                            } else {
                                sendData();
                            }
                        }}
                    >
                        <Text className="font-bold text-lg text-slate-100">
                            Save Contact
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}
