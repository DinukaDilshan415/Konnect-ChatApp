import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import MoreScreen from './MoreScreen';

const Stack = createNativeStackNavigator();

export default function MoreParentScreen() {
  return (
        <Stack.Navigator>
          <Stack.Screen
            name="MoreScreen"
            component={MoreScreen} />
        </Stack.Navigator>
  )
}
