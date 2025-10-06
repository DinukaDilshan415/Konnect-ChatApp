import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ChatsScreen from './ChatsScreen';
import GroupScreen from './GroupScreen';
import CallsScreen from './CallsScreen';
import MoreScreen from './MoreScreen';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import HomeChatScreen from './HomeChatScreen';
import MoreParentScreen from './MoreParentScreen';

const Tabs = createBottomTabNavigator();

export default function HomeTabs() {
    return (
        <Tabs.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
                if (route.name === "Chats") {
                    return (<Ionicons name="chatbox-ellipses" size={28} color={color} />)
                } else if (route.name === "Groups") {
                    return <MaterialIcons name="groups" size={28} color={color} />
                } else if (route.name === "Calls") {
                    return <Ionicons name="call" size={28} color={color} />
                } else if (route.name === "More") {
                    return <MaterialIcons name="app-settings-alt" size={28} color={color} />
                }

            },
            tabBarLabelStyle: { fontSize: 14, fontWeight: '700' },
            tabBarActiveTintColor: "#ffa200",
            tabBarInactiveTintColor: "#9e9e9e",
            tabBarStyle: {
                height: 67,
                paddingTop: 0,
            },
            tabBarActiveBackgroundColor: "#fff8ec",

            // tabBarBackground: () => (
            //     <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
            // ),
        })}>
            <Tabs.Screen
                name='Chats'
                component={ChatsScreen}
                options={{
                    headerShown: false
                }} />

            <Tabs.Screen
                name='Groups'
                component={GroupScreen} />

            <Tabs.Screen
                name='Calls'
                component={CallsScreen} />

            <Tabs.Screen
                name='More'
                component={MoreParentScreen}
                options={{
                    headerShown: false
                }} />

        </Tabs.Navigator>
    );
}
