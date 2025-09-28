import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, StatusBar, Pressable, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';

const SignupScreen: React.FC = () => {
  const [firstname, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignup = () => {
    if (!firstname || !lastName) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    Alert.alert('Success', `Welcome, ${name}!`);
  };

  const { applied } = useTheme();

  const logo =
    applied === "dark"
      ? require("../../assets/white-L-logo.png")
      : require("../../assets/black-L-logo.png");

  return (
    // <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={{ flex: 1 }}>
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      // extraScrollHeight={50} // space between input & keyboard
      keyboardShouldPersistTaps="handled">
      <SafeAreaView className="flex-1 justify-center bg-white dark:bg-slate-700 px-6">
        <StatusBar hidden={false} barStyle={'dark-content'} className='bg-white dark:bg-slate-700' />
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View className='justify-center items-center w-full'>
            <Image source={logo} className='w-64 h-28' />
          </View>
          <TextInput
            className="w-full border border-gray-300 rounded-md p-3 mb-4 text-gray-700"
            placeholder="First Name"
            value={firstname}
            onChangeText={setFirstName}
          />

          <TextInput
            className="w-full border border-gray-300 rounded-md p-3 mb-4 text-gray-700"
            placeholder="Last Name"
            keyboardType="default"
            autoCapitalize="none"
            value={lastName}
            onChangeText={setLastName}
          />

          <View className='absolute bottom-10 w-full items-end'>
            <Pressable
              className="bg-blue-600 w-40 py-3 rounded-md "
              onPress={handleSignup}
            >
              <Text className="text-white text-center font-semibold">Next</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAwareScrollView>
    // </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
