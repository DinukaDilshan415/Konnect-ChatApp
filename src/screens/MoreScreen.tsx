import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStack } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { Image, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { ThemeOption, useTheme } from '../theme/ThemeProvider';
import { AntDesign, Entypo, Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useUserProfile } from '../socket/UseUserProfile';
import { formatChatTime } from '../util/DateFormatter';
import { AuthContext } from '../components/AuthProvider';

type MoreScreenProp = NativeStackNavigationProp<RootStack, "MoreScreen">;
const options: ThemeOption[] = ["light", "dark", "system"];
export default function MoreScreen() {
  const navigation = useNavigation<MoreScreenProp>();
  const userProfile = useUserProfile().userProfile;
  const { preference, applied, setPreference } = useTheme();
  const auth = useContext(AuthContext);

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
  }, [navigation]);

  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className={`flex-1 ${isModalVisible ? `bg-black/70` : ``}`} edges={["right", "bottom", "left"]}>
      <TouchableOpacity
        className={`flex-row justify-between  px-2 py-2  ${isModalVisible ? `bg-black/20` : `bg-slate-100 border-y-2 border-gray-200`}`}
        onPress={() => {
          navigation.navigate("ProfileScreen");
        }}
      >
        <View className='items-center flex-row gap-x-4 '>
          <View className='h-24 w-24'>
            <Image
              source={{ uri: `${userProfile?.profileImage}?v=${Date.now()}` }}
              className='h-24 w-24 rounded-full shadow-lg border-4 border-purple-200' />
          </View>
          <View className="flex-col gap-y-1">
            <Text className="font-exo-bold text-2xl">
              {userProfile?.first_name} {userProfile?.last_name}
            </Text>
            <Text className="text-lg font-quicksand">
              {userProfile?.countryCode} {userProfile?.contact_no}
            </Text>
            <Text className="text-lg font-quicksand">
              Joined At : {formatChatTime(userProfile ? userProfile?.createdAt : "")}
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
              <AntDesign name="mobile" size={28} color="black" />
              <Text className="font-fredoka font-bold text-xl">About App</Text>
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

        <TouchableOpacity
          className='justify-center items-center flex-row gap-2 ps-5 px-2 py-2'
          onPress={() => {
            if (auth) {
              auth.signOut();
            }
          }}>
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
            <View className='justify-end items-end p-1 '>
              <View className='bg-white dark:bg-slate-800 rounded-2xl w-60 h-60 p-3 '
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >

                <View className="flex-col justify-start gap-5">
                  <Text className={`text-2xl text-center font-semibold ${applied === "dark" ? "text-gray-200" : "text-gray-800"}`}>
                    Choose Theme
                  </Text>
                  {options.map((option) => (
                    <TouchableOpacity key={option} onPress={() => setPreference(option)} className="flex-row items-center gap-x-2">
                      <View className={`w-6 h-6 rounded-full border-2 flex items-center justify-center 
                          ${preference === option
                          ? "border-amber-600"
                          : applied === "dark"
                            ? "border-gray-500"
                            : "border-gray-400"
                        }`}
                      >

                        {preference === option && (
                          <View className="w-3.5 h-3.5 rounded-full bg-amber-600" />
                        )}
                      </View>
                      <Text
                        className={`text-xl font-semibold ${applied === "dark" ? "text-gray-200" : "text-gray-800"
                          }`}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  )
}
