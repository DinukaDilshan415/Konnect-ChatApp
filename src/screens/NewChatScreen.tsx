import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { User } from '../types/Types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStack } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../theme/ThemeProvider';
import { useUserList } from '../socket/UseUserList';

type NewChatScreenProp = NativeStackNavigationProp<RootStack, "NewChatScreen">;

export default function NewChatScreen() {
    const navigation = useNavigation<NewChatScreenProp>();
    const [searchBar, setSearchBar] = useState(false);
    const [search, setSearch] = useState("");
    const users = useUserList();

    const { applied } = useTheme();

    const logo =
        applied === "dark"
            ? require("../../assets/white-L-logo.png")
            : require("../../assets/yellow-L-logo.png");

    useLayoutEffect(() => {
        {users.length > 0 ? setHaveUsers(true) : setHaveUsers(false)}
        navigation.setOptions({
            title: "",
            headerStyle: {
                backgroundColor: applied === "dark" ? "#1e293b" : "white",
            },
            headerLeft: () => (
                <View className="items-center flex-row gap-x-2">
                    <TouchableOpacity
                        className="justify-center items-center"
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Ionicons name="arrow-back-sharp" size={24} color={applied === "dark" ? "white" : "#1e293b"} />
                    </TouchableOpacity>
                    <View className="flex-col">
                        <Text className="text-lg font-bold dark:text-white">Select Contact</Text>
                        <Text className="text-sm font-bold dark:text-white">{users.length} contacts</Text>
                    </View>
                </View>
            ),
            headerRight: () => (
                <View>
                    <TouchableOpacity className=''
                        onPress={() => {
                            setSearchBar(true);
                        }}>
                        <Ionicons name="search" size={28} color={applied === "dark" ? "white" : "black"} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, users]);

    const renderItem = ({ item }: { item: User }) => (
        <TouchableOpacity
            className="justify-start items-center gap-x-3 px-3 py-2 flex-row bg-slate-50 mt-1"
            onPress={() => {
                navigation.replace("SingleChatScreen", {
                    chatId: item.id,
                    friendName: `${item.displayName}`,
                    lastSeenTime: item.updatedAt,
                    profileImage: item.profileImage
                        ? item.profileImage
                        : `https://ui-avatars.com/api/?name=${item.first_name}+${item.last_name}&background=random`,
                });
            }}
        >
            <View>
                <TouchableOpacity className="h-14 w-14 rounded-full border-1 border-gray-300 justify-center items-center">
                    {item.profileImage ? (
                        <Image
                            source={{ uri: item.profileImage }}
                            className="h-14 w-14 rounded-full"
                        />
                    ) : (
                        <Image
                            source={{
                                uri: `https://ui-avatars.com/api/?name=${item.first_name}+${item.last_name}&background=random`,
                            }}
                            className="h-14 w-14 rounded-full"
                        />
                    )}
                </TouchableOpacity>
            </View>
            <View className="flex-col">
                <Text className="font-bold text-xl">
                    {item.displayName ? item.displayName : item.first_name + " " + item.last_name}
                </Text>
                <Text className="text-lg italic text-slate-600">
                    {item.countryCode}{item.contact_no}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const filterdUsers = [...users]
        .filter((user) => {
            return (
                user.displayName.toLowerCase().includes(search.toLowerCase()) ||
                user.contact_no.includes(search)
            );
        })
        .sort((a, b) => a.first_name.localeCompare(b.last_name));

    const [haveUsers, setHaveUsers] = useState(false);

    return (
        <SafeAreaView
            className="flex-1 bg-white px-2"
            edges={["right", "bottom", "left"]}
        >
            {/* <StatusBar hidden={false} translucent={true} /> */}
            <View className="flex-1">
                {searchBar
                    ?
                    <View className="items-center flex-row mx-2 border-gray-300 border-2 rounded-full px-3 h-14 mt-3">
                        <Ionicons name="search" size={20} color={"gray"} />
                        <TextInput
                            className="flex-1 text-lg font-bold ps-2"
                            placeholder="Search"
                            value={search}
                            onChangeText={(text) => setSearch(text)}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setSearchBar(false);
                            }}>
                            <MaterialIcons name="cancel" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    : <View></View>}
                <View className="px-2 my-2">
                    <TouchableOpacity
                        className="mx-1 mt-2 rounded-2xl gap-x-2 flex-row items-center justify-center h-14 bg-amber-100"
                        onPress={() => navigation.navigate("NewContactScreen")}
                    >
                        <View className="items-center justify-center w-12 h-12 rounded-full">
                            <Feather name="user-plus" size={28} color="#ff7b00" />
                        </View>
                        <Text className="text-xl font-bold text-orange-500">New Contact</Text>
                    </TouchableOpacity>
                </View>
                {haveUsers
                    ?
                    <View className="mt-2">
                        <FlatList
                            data={filterdUsers}
                            renderItem={renderItem}
                        />
                    </View>
                    :
                    <View className='flex-1 justify-center items-center bg-amber-100'>
                        <Image source={require("../../assets/konnect-bg.png")} className='w-full h-full absolute' />
                        <Text className='text-center text-xl font-exo-bold mx-4'>
                            Tap  ' &nbsp;<Feather name="user-plus" size={28} color="#000000" /> New Contact &nbsp;'
                            At the top of your screen to Konnect with Friends
                        </Text>
                    </View>
                }

            </View>
        </SafeAreaView>
    )
}
