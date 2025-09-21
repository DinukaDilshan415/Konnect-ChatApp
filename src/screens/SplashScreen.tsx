import React, { useEffect, useRef } from 'react'
import { Image, StatusBar, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStack } from '../../App'

type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;

export default function SplashScreen() {

    const navigation = useNavigation<Props>();

    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 2000 });
        const timer = setTimeout(() => {
            navigation.replace("SignUpScreen");
        }, 2000)

        return () => {
            clearTimeout(timer);
        };
    }, [navigation, opacity]);

    const animatedStyle = useAnimatedStyle(() => {
        return { opacity: opacity.value };
    });

    return (
        <View className='flex-1 items-center justify-center'>
            <StatusBar hidden={true} />
            <View className='w-full h-full bg-white/5 dark:bg-black/25 absolute z-50'></View>
            <Image source={require("../../assets/konnect-bg.png")} className='w-full h-full absolute' />
            <View className='flex-1 items-center justify-end absolute'>
                <Animated.View style={animatedStyle}>
                    <Image source={require("../../assets/konnect-logo.png")} className='w-56 h-56' />
                </Animated.View>
            </View>
            <View className='content-center items-center justify-end flex-1 mb-5 dark:mb-3'>
                <Animated.View style={animatedStyle}>
                    <View >
                        <Text className='text-center text-zinc-500 text-xs'>POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}</Text>
                    </View>
                    <View>
                        <Text className='text-center text-zinc-500 text-xs'>VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}</Text>
                    </View>
                </Animated.View>
            </View>
        </View>
    )
}
