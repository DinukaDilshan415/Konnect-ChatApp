import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./global.css"
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/screens/SplashScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

export type RootStack = {
  SplashScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
  SettingsScreen: undefined;
}

const Stack = createNativeStackNavigator();
 
export default function App() {
  return (
<NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          animation: "fade",
        }}>

        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false
          }} />

        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerShown: false
          }} />

        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{
            headerShown: false
          }} />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen} />

        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen} />

        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}