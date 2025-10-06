import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./global.css"
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/screens/SplashScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import GetStartScreen from "./src/screens/GetStartScreen";
import GetContactScreen from "./src/screens/GetContactScreen";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { UserRegistrationProvider } from "./src/components/UserContext";
import HomeTabs from "./src/screens/HomeTabs";
import SingleChatScreen from "./src/screens/SingleChatScreen";
import NewChatScreen from "./src/screens/NewChatScreen";
import NewContactScreen from "./src/screens/NewContactScreen";

export type RootStack = {
  SplashScreen: undefined;
  GetStartScreen: undefined;
  GetContactScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
  HomeScreen: undefined;
  HomeChatScreen: undefined;
  ProfileScreen: undefined;
  SettingsScreen: undefined;
  NewChatScreen: undefined;
  NewContactScreen: undefined;
  MoreScreen: undefined;
  SingleChatScreen: {
    chatId: number;
    friendName: string;
    lastSeenTime: string;
    profileImage: string;
  };
}

const Stack = createNativeStackNavigator<RootStack>();


export default function App() {
  return (
    <AlertNotificationRoot>
      <ThemeProvider>
        <UserRegistrationProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="HomeScreen"
              screenOptions={{
                animation: "slide_from_right",
              }}
            >

              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{
                  headerShown: false
                }} />

              <Stack.Screen
                name="GetStartScreen"
                component={GetStartScreen}
                options={{
                  headerShown: false
                }} />

              <Stack.Screen
                name="GetContactScreen"
                component={GetContactScreen}
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
                component={HomeTabs}
                options={{
                  headerShown: false
                }} />

              <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen} />

              <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen} />

              <Stack.Screen
                name="SingleChatScreen"
                component={SingleChatScreen} />

              <Stack.Screen
                name="NewChatScreen"
                component={NewChatScreen}
              />

              <Stack.Screen
                name="NewContactScreen"
                component={NewContactScreen}
              />

            </Stack.Navigator>
          </NavigationContainer>
        </UserRegistrationProvider>
      </ThemeProvider>
    </AlertNotificationRoot>
  );
}