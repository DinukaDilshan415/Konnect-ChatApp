import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useLayoutEffect, useState } from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { RootStack } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import { useUserProfile } from '../socket/UseUserProfile';
import { Feather, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { AuthContext } from '../components/AuthProvider';
import * as ImagePicker from 'expo-image-picker';
import { uploadProfileImage } from '../service/UserService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatChatTime } from '../util/DateFormatter';

type ProfileScreenProp = NativeStackNavigationProp<RootStack, "ProfileScreen">;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenProp>();
  const { applied } = useTheme();
  const userProfile = useUserProfile().userProfile;
  const setUserProfile = useUserProfile().setUserProfile;
  const [img, setImg] = useState("");

  const logo =
    applied === "dark"
      ? require("../../assets/white-L-logo.png")
      : require("../../assets/yellow-L-logo.png");

  useLayoutEffect(() => {
    setImg("https://69a648965ff4.ngrok-free.app/Konnect-Backend/profile-images/1/profile1.png");
    navigation.setOptions({
      title: "",
      headerStyle: {
        backgroundColor: applied === "dark" ? "#1e293b" : "white",
      },
      headerTintColor: applied === "dark" ? "white" : "#1e293b",
      headerLeft: () => (
        <View className='flex-row justify-center items-center gap-x-2'>
          <Ionicons name="arrow-back-sharp" size={24} color={applied === "dark" ? "white" : "#1e293b"}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text className='text-slate-800 dark:text-white text-2xl font-exo-bold'>My Profile</Text>
        </View>
      ),
      headerRight: () => (
        <View>
          <Image source={logo} className='w-48 h-20' />
        </View>
      ),
    });
  }, [navigation, applied]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const data = await uploadProfileImage(String(auth ? auth.userId : 0), result.assets[0].uri);
    }
  };

  const [image, setImage] = useState<string | null>(null);
  const auth = useContext(AuthContext);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <View className='h-60 w-full bg-amber-200 absolute top-0'></View>
      <View className='h-44 w-full bg-amber-400 absolute top-0'></View>
      <View className="flex-1 w-full p-5">
        <View className=''>
          <TouchableOpacity onPress={pickImage}
            className='h-10 w-10 items-center justify-center rounded-full absolute z-50 right-32 top-1 bg-purple-400'>
            <MaterialCommunityIcons name="image-edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="items-center ">
          {image ? (
            <Image
              className="w-40 h-40 rounded-full border-gray-300 border-2"
              source={{ uri: image }}
            />
          ) : (
            <Image
              className="w-40 h-40 rounded-full border-gray-300 border-2"
              source={{ uri: `${userProfile?.profileImage}?v=${Date.now()}` }}
            />
          )}
        </View>
        <View className="justify-start flex-row gap-y-2 gap-x-4 my-3 mt-10">
          <View className="flex-row gap-x-3 items-center">
            <Feather name="user" size={24} color="black" />
            <Text className="font-bold text-xl">Name : </Text>
          </View>
          <Text className="font-bold text-xl">
            {userProfile?.first_name} {userProfile?.last_name}
          </Text>
        </View>
        <View className="justify-start flex-row gap-y-2 gap-x-4 my-3">
          <View className="flex-row gap-x-3 items-center">
            <Feather name="phone" size={24} color="black" />
            <Text className="font-bold text-xl">Phone : </Text>
          </View>
          <Text className="font-bold text-xl">
            {userProfile?.countryCode} {userProfile?.contact_no}
          </Text>
        </View>
        <View className="justify-start flex-row gap-y-2 gap-x-4 my-3">
          <View className="flex-row gap-x-3 items-center">
            <Octicons name="discussion-outdated" size={24} color="black" />
            <Text className="font-bold text-xl">Joined At :  </Text>
          </View>
          <Text className="font-bold text-xl">
            {formatChatTime(userProfile ? userProfile?.createdAt : "")}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}