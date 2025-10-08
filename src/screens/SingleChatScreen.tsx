import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStack } from '../../App';
import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Entypo, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSingleChat } from '../socket/UseSingleChat';
import { UseSendChat } from '../socket/UseSendChat';
import { formatChatTime } from '../util/DateFormatter';
import { Chat } from '../types/Types';

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
    const singleChat = useSingleChat(chatId);
    const messages = singleChat.messages;
    const friend = singleChat.friend;
    const sendMessage = UseSendChat();
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
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
                            <Image source={{ uri: profileImage }} className="h-14 w-14 rounded-full border-2 border-gray-400" />
                            <View className='space-y-2'>
                                <Text className='font-bold text-2xl'>{friendName}</Text>
                                <Text className='font-bold text-xs text-gray-500'>
                                    {friend?.status === "ONLINE"
                                        ? "Online"
                                        : `Last seen ${formatChatTime(
                                            friend?.updatedAt ?? ""
                                        )}`}
                                </Text>
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
    }, [navigation, friend]);

    const renderItem = ({ item }: { item: Chat }) => {
        const isMe = item.from_user.id !== chatId;

        return (
            <View className={`my-1 px-3 max-w-[75%] ${isMe
                ? `self-end bg-yellow-600 rounded-tl-xl rounded-bl-xl rounded-br-xl`
                : `self-start bg-white rounded-tr-xl rounded-bl-xl rounded-br-xl`
                }`}>
                <Text className={`${isMe ? `text-white` : `text-black`} text-base`}>{item.message}</Text>
                <View className='flex-row justify-end items-center mt-1'>
                    <Text className={`${isMe ? `text-white` : `text-black`} italic text-xs me-2`}>{formatChatTime(item.createdAt)}</Text>
                    {isMe && <Ionicons
                        name={
                            item.status === "READ"
                                ? "checkmark-done-sharp"
                                : item.status === "DELIVERED"
                                    ? "checkmark-done"
                                    : "checkmark"}
                        size={16}
                        color={
                            item.status === "READ"
                                ? "#0a84ff"
                                : "#c2c2c2"} />}
                </View>
            </View>
        );
    };

    const handleSendChat = () => {
        if (!input.trim()) {
            return;
        }
        sendMessage(chatId, input);
        setInput("");
    };

    return (
        <SafeAreaView className='flex-1 bg-white' edges={["right", "bottom", "left"]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'android' ? 'padding' : 'height'} className='flex-1'
                keyboardVerticalOffset={135}>
                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
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
                        onPress={handleSendChat}>
                        <FontAwesome name="send" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
