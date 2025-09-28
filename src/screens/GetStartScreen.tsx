import React, { useState } from 'react'
import { Image, Pressable, StatusBar, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    useFonts,
    Exo_400Regular,
    Exo_700Bold,
} from "@expo-google-fonts/exo";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Quicksand_400Regular } from "@expo-google-fonts/quicksand";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStack } from '../../App';
import { useNavigation } from '@react-navigation/native';

type GetStartProps = NativeStackNavigationProp<RootStack, "GetStartScreen">

export default function GetStartScreen() {
    const [fontsLoaded] = useFonts({
        Exo_400Regular,
        Exo_700Bold,
        Fredoka_400Regular,
        Quicksand_400Regular,
    });

    const navigation = useNavigation<GetStartProps>();
    const [ischecked, setIsChecked] = useState(false);

    return (
        <SafeAreaView className='flex-1 items-center dark:bg-slate-800'>
            <StatusBar />
            <Text className='text-center text-slate-700 dark:text-slate-100 font-exo-bold text-4xl my-5'>Welcome to Konnect</Text>
            <Image source={require("../../assets/konnect-v-1.png")} className='w-80 h-60' />
            <View className='items-center p-3'>
                <Text className='text-center text-slate-700 dark:text-slate-100 font-exo text-xl my-5'>
                    Read our <Text className='text-blue-700'>Privacy Policy</Text>
                    . And accept the <Text className='text-blue-700'>Privacy Policy.</Text></Text>
            </View>
            <View className='w-80 absolute bottom-36 z-50'>
                <BouncyCheckbox
                    size={25}
                    fillColor="blue"
                    text="I accept and agree to terms and conditions"
                    textStyle={{ color: 'gray', fontWeight: 'bold', textAlign: 'center', textDecorationLine: "none", }}
                    iconStyle={{ borderColor: "red" }}
                    innerIconStyle={{ borderWidth: 3 }}
                    onPress={(status: boolean) => {
                        setIsChecked(status);
                    }}
                />
            </View>
            <View className='w-full px-8 mt-5 absolute bottom-9'>
                <Pressable className={`h-14 justify-center items-center rounded-full ${ischecked ? "bg-amber-500" : "bg-gray-300 dark:bg-slate-600/80"}`}
                    onPress={() => {
                        if (ischecked) {
                            navigation.navigate("GetContactScreen");
                        }
                    }}>
                    <Text className='text-white font-bold text-xl'>Get Started</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
