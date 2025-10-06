import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStack } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { Image, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Entypo, Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

type MoreScreenProp = NativeStackNavigationProp<RootStack, "MoreScreen">;

export default function MoreScreen() {
  const navigation = useNavigation<MoreScreenProp>();

  const { applied } = useTheme();

  const logo =
    applied === "dark"
      ? require("../../assets/white-L-logo.png")
      : require("../../assets/yellow-L-logo.png");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
      headerStyle: {
        backgroundColor: applied === "dark" ? "#1e293b" : "white",
      },
      header: () => (
        <SafeAreaView className='bg-white dark:bg-slate-800'>
          <View className='flex-row justify-center mx-3 mt-2'>
            <View className='justify-center items-center'>
              <Image source={logo} className='w-48 h-20' />
            </View>
          </View>
        </SafeAreaView>
      ),
    });
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className={`flex-1 bg-white ${isModalVisible ? `bg-black/50` : ``}`} edges={["right", "bottom", "left"]}>
      <TouchableOpacity className='flex-row justify-between bg-slate-100 px-2 py-2 border-y-2 border-gray-200'>
        <View className='items-center flex-row gap-x-4'>
          <View className='h-24 w-24'>
            <Image
              source={{ uri: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80" }}
              className='h-24 w-24 rounded-full shadow-lg border-4 border-purple-100' />
          </View>
          <View className="flex-col gap-y-1">
            <Text className="font-exo-bold text-2xl">
              Dinuka Dilshan
            </Text>
            <Text className="text-lg font-quicksand">
              +94 8726327832232
            </Text>
          </View>
        </View>
        <View className='items-center justify-center'>
          <MaterialIcons name="keyboard-arrow-right" size={44} color="black" />
        </View>
      </TouchableOpacity>
      <View className='flex-1'>
        <TouchableOpacity className='flex-row justify-between ps-5 px-2 py-2'
          onPress={() => {
            setModalVisible(true);
          }}>
          <View className='items-center flex-row gap-x-4'>
            <View className='flex-row gap-4'>
              <MaterialCommunityIcons name="theme-light-dark" size={28} color="black" />
              <Text className="font-fredoka font-bold text-xl">Themes</Text>
            </View>
          </View>
          <View className='items-center justify-center'>
            <MaterialIcons name="keyboard-arrow-right" size={44} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className='flex-row justify-between ps-5 px-2 py-2'>
          <View className='items-center flex-row gap-x-4'>
            <View className='flex-row gap-4'>
              <MaterialIcons name="security" size={28} color="black" />
              <Text className="font-fredoka font-bold text-xl">Security</Text>
            </View>
          </View>
          <View className='items-center justify-center'>
            <MaterialIcons name="keyboard-arrow-right" size={44} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className='flex-row justify-between ps-5 px-2 py-2'>
          <View className='items-center flex-row gap-x-4'>
            <View className='flex-row gap-4'>
              <FontAwesome5 name="user-friends" size={28} color="black" />
              <Text className="font-fredoka font-bold text-xl">Invite Friends</Text>
            </View>
          </View>
          <View className='items-center justify-center'>
            <MaterialIcons name="keyboard-arrow-right" size={44} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className='flex-row justify-between ps-5 px-2 py-2'>
          <View className='items-center flex-row gap-x-4'>
            <View className='flex-row gap-4'>
              <Feather name="help-circle" size={28} color="black" />
              <Text className="font-fredoka font-bold text-xl">Help Center</Text>
            </View>
          </View>
          <View className='items-center justify-center'>
            <MaterialIcons name="keyboard-arrow-right" size={44} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className='justify-center items-center flex-row gap-2 ps-5 px-2 py-2'>
          <View className='items-center flex-row gap-x-4'>
            <View className='flex-row gap-4'>
              <Text className="font-fredoka font-bold text-2xl text-red-600">Log Out</Text>
            </View>
          </View>
          <View className='items-center justify-center'>
            <Entypo name="log-out" size={24} color="red" />
          </View>
        </TouchableOpacity>

      </View>

      <Modal
        animationType='fade'
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        className=''
      >
        <Pressable className='flex-1 items-center justify-center'
          onPress={() => {
            setModalVisible(false)
          }}>
          <Pressable className=''
            onPress={(e) => {
              e.stopPropagation();
            }}
          >
            <View className='justify-end items-end p-1'>
              <View className='bg-white rounded-2xl w-60 h-60 p-3'
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  )
}
