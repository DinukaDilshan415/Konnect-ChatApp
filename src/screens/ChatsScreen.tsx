import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeChatScreen from './HomeChatScreen';

const Stack = createNativeStackNavigator();

export default function ChatsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeChatScreen} />
    </Stack.Navigator>
  )
}
