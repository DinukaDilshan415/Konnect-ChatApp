import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStack } from '../../App';
import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Entypo, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

type Message = {
    id: number;
    text: string;
    sender: "me" | "friend";
    time: string;
    status?: "sent" | "delivered" | "read";
};

type SingleChatScreenProps = NativeStackScreenProps<RootStack, "SingleChatScreen">

export default function SingleChatScreen({ route, navigation }: SingleChatScreenProps) {

    const { chatId, friendName, lastSeenTime, profileImage } = route.params;

    const [input, setInput] = useState("");

    const [message, setMessage] = useState<Message[]>([
        { id: 3, text: "Hello, Kohomada Hello, Kohomada", sender: "me", time: "10:58 AM", status: "read" },
        { id: 2, text: "Hi, Hello Hi, Hello Hi, Hello Hi, Hello Hi, Hello Hi, Hello", sender: "friend", time: "10:57 AM" },
        { id: 1, text: "Hi", sender: "friend", time: "10:56 AM" },
    ]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
            // headerLeft: () => (
            //     <View className='flex-row justify-center items-center gap-2'>
            //         <Image source={require("../../assets/avatar/avatar_1.png")} className="h-14 w-14 rounded-full border-2 border-gray-400" />
            //         <View className='space-y-2'>
            //             <Text className='font-bold text-2xl'>{friendName}</Text>
            //             <Text className='font-bold text-xs text-gray-500'>Last seen {lastSeenTime}</Text>
            //         </View>
            //     </View>
            // ),
            // headerRight: () => (
            //     <View className='flex-row space-x-4 gap-2'>
            //         <TouchableOpacity className=''>
            //             <Ionicons name="ellipsis-vertical" size={24} color="black" />
            //         </TouchableOpacity>
            //     </View>
            // ),
            header: () => (
                <SafeAreaView className='bg-white'>
                    <View className='flex-row justify-between mx-3 mt-2'>
                        <Ionicons name="arrow-back-circle-outline" size={28} color="black"
                            onPress={() => {
                                navigation.goBack();
                            }} />
                        <Text>Messages</Text>
                        <Feather name="more-horizontal" size={28} color="black" />
                    </View>
                    <View className='flex-row justify-between mx-3 mt-2'>
                        <View className='flex-row justify-center items-center gap-2'>
                            <Image source={require("../../assets/avatar/avatar_1.png")} className="h-14 w-14 rounded-full border-2 border-gray-400" />
                            <View className='space-y-2'>
                                <Text className='font-bold text-2xl'>{friendName}</Text>
                                <Text className='font-bold text-xs text-gray-500'>Last seen {lastSeenTime}</Text>
                            </View>
                        </View>
                        <View className='flex-row justify-center items-center space-x-4 gap-x-4'>
                            <TouchableOpacity className=''>
                                <FontAwesome name="video-camera" size={28} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity className=''>
                                <Ionicons name="call" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                </SafeAreaView>
            ),
        });
    }, [navigation]);

    const renderItem = ({ item }: { item: Message }) => {
        const isMe = item.sender === "me";

        return (
            <View className={`my-1 px-3 max-w-[75%] ${isMe
                ? `self-end bg-yellow-600 rounded-tl-xl rounded-bl-xl rounded-br-xl`
                : `self-start bg-white rounded-tr-xl rounded-bl-xl rounded-br-xl`
                }`}>
                <Text className={`${isMe?`text-white` : `text-black`} text-base`}>{item.text}</Text>
                <View className='flex-row justify-end items-center mt-1'>
                    <Text className={`${isMe?`text-white` : `text-black`} italic text-xs me-2`}>{item.time}</Text>
                    {isMe && <Ionicons
                        name={
                            item.status === "read"
                                ? "checkmark-done-sharp"
                                : item.status === "delivered"
                                    ? "checkmark-done"
                                    : "checkmark"}
                        size={16}
                        color={
                            item.status === "read"
                                ? "#0a84ff"
                                : "#9ca3af"} />}
                </View>
            </View>
        );
    };

    const sendMessage = () => {
        if (input.trim()) {
            const newMsg: Message = {
                id: Date.now(),
                text: input,
                sender: "me",
                time: Date.now().toString(),
                status: "sent",
            };

            setMessage([newMsg, ...message]);
            setInput("");
        }
        return !input.trim();
    }

    return (
        <SafeAreaView className='flex-1 bg-white' edges={["right", "bottom", "left"]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'android' ? 'padding' : 'height'} className='flex-1'
                keyboardVerticalOffset={135}>
                <FlatList
                    data={message}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    className='px-3 py-1 flex-1 bg-gray-300'
                    contentContainerStyle={{ paddingBottom: 60 }}
                    inverted
                />

                <View className='flex-row items-end px-3 py-2 bg-white bottom-0 right-0 gap-2'>
                    <TouchableOpacity className='w-14 h-14 items-center justify-center'>
                        <Entypo name="attachment" size={24} color="black" />
                    </TouchableOpacity>
                    <TextInput
                        className='flex-1 min-h-14 max-h-32 h-auto px-4 py-2 bg-gray-200 rounded-lg text-base'
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        multiline
                        placeholder='Type a message'
                    />
                    <TouchableOpacity
                        className='bg-amber-400 w-14 h-14 items-center justify-center rounded-full'
                        onPress={sendMessage}>
                        <FontAwesome name="send" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
