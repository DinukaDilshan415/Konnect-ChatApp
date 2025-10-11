import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Pressable, Image, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStack } from '../../App';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useUserRegistration } from '../components/UserContext';
import { validateFirstName, validateLastName, validateProfileImage } from '../util/Validation';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { createNewAccount } from '../service/UserService';
import { AuthContext } from '../components/AuthProvider';

type SignUpScreenProps = NativeStackNavigationProp<RootStack, "SignUpScreen">

const SignupScreen: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const navigation = useNavigation<SignUpScreenProps>();
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setUserData((previous) => ({
        ...previous, profileImage: result.assets[0].uri,
      }));
    }
  }

  const avatar = [
    require("../../assets/avatar/avatar_1.png"),
    require("../../assets/avatar/avatar_2.png"),
    require("../../assets/avatar/avatar_3.png"),
    require("../../assets/avatar/avatar_4.png"),
    require("../../assets/avatar/avatar_5.png"),
    require("../../assets/avatar/avatar_6.png"),
  ];

  const auth = useContext(AuthContext);

  const [firstname, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { applied } = useTheme();

  const logo =
    applied === "dark"
      ? require("../../assets/white-L-logo.png")
      : require("../../assets/black-L-logo.png");

  const { userData, setUserData } = useUserRegistration();

  return (
    <SafeAreaView
      className='flex-1'>
      <SafeAreaView className="flex-1 justify-center bg-white dark:bg-slate-700">
        <View className='h-72 w-full bg-amber-100 absolute top-0'></View>
        <View className='h-60 w-full bg-amber-300 absolute top-0'></View>
        <StatusBar hidden={false} barStyle={'dark-content'} className='bg-white dark:bg-slate-700' />
        <ScrollView contentContainerStyle={styles.container} >
          <View className='justify-center items-center w-full '>
            <Image source={logo} className='w-64 h-28' />
          </View>

          <View className='items-center'>
            <Text className='font-bold text-center text-lg text-slate-700'>
              Please provide your name and profile picture
            </Text>
            <View className='items-center mt-2 h-72'>
              <View className=''>
                <TouchableOpacity onPress={pickImage}
                  className='h-10 w-10 items-center justify-center rounded-full absolute z-50 left-7 top-1 bg-purple-400'>
                  <MaterialCommunityIcons name="image-edit" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Pressable

                className='h-32 w-32 rounded-full justify-center items-center'>
                {image ? (
                  <Image source={{ uri: image }} className='h-32 w-32 rounded-full shadow-lg border-4 border-purple-100' />
                ) : (
                  <View className='items-center'>
                    <Image source={require("../../assets/empty-profile.png")} className='h-32 w-32 rounded-full shadow-lg' />
                  </View>
                )}
              </Pressable>
              <Text className='text-lg my-2 text-slate-700 dark:text-white font-bold'>
                Or select an avatar
              </Text>
              <FlatList
                data={avatar}
                horizontal
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {
                    setImage(Image.resolveAssetSource(item).uri)
                    setUserData((previous) => ({
                      ...previous, profileImage: Image.resolveAssetSource(item).uri,
                    }));
                  }}>
                    <Image source={item} className='w-24 h-24 border-2 border-gray-400 rounded-full mx-2' />
                  </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          <View className='px-6 gap-4'>

            <FloatingLabelInput
              label={"Enter Your First Name"}
              maxLength={200}
              animationDuration={50}
              inputStyles={{ color: applied === "dark" ? "white" : "black", fontSize:16 }}
              value={userData.firstName}
              onChangeText={(text) => {
                setUserData((previous) => ({
                  ...previous, firstName: text,
                }));
              }}
            />

            <FloatingLabelInput
              label={"Enter Your Last Name"}
              maxLength={200}
              animationDuration={50}
              inputStyles={{ color: applied === "dark" ? "white" : "black", fontSize:16 }}
              value={userData.lastName}
              onChangeText={(text) => {
                setUserData((previous) => ({
                  ...previous, lastName: text,
                }));
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <View className='w-full px-5 mt-5 absolute bottom-6'>
        <Pressable className={`h-14 justify-center items-center flex-row gap-2 rounded-full bg-amber-500 text-white`}
          onPress={async () => {
            let validFirstName = validateFirstName(userData.firstName);
            let validLastName = validateLastName(userData.lastName);
            const validProfile = validateProfileImage(
              userData.profileImage
                ? { uri: userData.profileImage, type: "", fileSize: 0 }
                : null
            );
            if (validFirstName) {
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: validFirstName,
              })
            } else if (validLastName) {
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: validLastName,
              })
            } else if (validProfile) {
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: validProfile,
              });
            } else {
              try {
                setLoading(true);
                const response = await createNewAccount(userData);
                if (response.status) {
                  if (auth) {
                    await auth.signUp(String(response.userId));
                  }
                } else {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: response.message,
                  });
                }
              } catch (error) {
                console.log(error);
              } finally {
                setLoading(false);
              }
            }
          }}>
          {loading ? (
            <ActivityIndicator size={'large'} color={"green"} />
          ) : (
            <>
              <Text className='text-white font-bold text-xl'>Complete</Text>
              <AntDesign name="file-done" size={24} color="white" />
            </>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
