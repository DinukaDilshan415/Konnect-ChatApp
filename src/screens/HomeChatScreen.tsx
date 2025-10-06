import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useState } from 'react'
import { FlatList, Image, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStack } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import { Exo_400Regular, Exo_700Bold, useFonts } from '@expo-google-fonts/exo';
import { Fredoka_400Regular } from '@expo-google-fonts/fredoka';
import { Quicksand_400Regular } from '@expo-google-fonts/quicksand';

const chats = [
    {
        id: 1,
        name: "Sahan Perera",
        lastMessage: "Hello, Kamal",
        time: "9:46 pm",
        unread: 2,
        profile: require("../../assets/avatar/avatar_1.png"),
    },
    {
        id: 2,
        name: "Fathima",
        lastMessage: "Hello, Sahn. Oyata kohomada",
        time: "Yesterday",
        unread: 0,
        profile: require("../../assets/avatar/avatar_2.png"),
    },
    {
        id: 3,
        name: "Nayana",
        lastMessage: "Hello, Kamal",
        time: "2025/9/24",
        unread: 2,
        profile: require("../../assets/avatar/avatar_3.png"),
    },
    {
        id: 4,
        name: "Tharaka Sankalpa Sir",
        lastMessage: "Sir,",
        time: "10.00 pm",
        unread: 1,
        profile: require("../../assets/avatar/avatar_4.png"),
    },
    {
        id: 5,
        name: "Pansilu Piyumantha ACH",
        lastMessage: "Mokada Karanne",
        time: "2025/09/20",
        unread: 2,
        profile: require("../../assets/avatar/avatar_5.png"),
    },
    {
        id: 6,
        name: "Hasitha Lakmal",
        lastMessage: "Mokada karanne Anjana",
        time: "2025/09/18",
        unread: 2,
        profile: require("../../assets/avatar/avatar_6.png"),
    },
    {
        id: 7,
        name: "Hasitha Lakmal",
        lastMessage: "Mokada karanne Anjana",
        time: "2025/09/18",
        unread: 2,
        profile: require("../../assets/avatar/avatar_6.png"),
    },
    {
        id: 8,
        name: "Hasitha Lakmal",
        lastMessage: "Mokada karanne Anjana",
        time: "2025/09/18",
        unread: 2,
        profile: require("../../assets/avatar/avatar_6.png"),
    },
];

type HomeChatScreenProps = NativeStackNavigationProp<RootStack, "HomeChatScreen">;

export default function HomeChatScreen() {
    const [fontsLoaded] = useFonts({
        Exo_400Regular,
        Exo_700Bold,
        Fredoka_400Regular,
        Quicksand_400Regular,
    });

    const navigation = useNavigation<HomeChatScreenProps>();
    const [search, setSearch] = useState("");
    const [searchBar, setSearchBar] = useState(false);
    //   const chatList = useChatList();
    const [isModalVisible, setModalVisible] = useState(false);

    //   useWebSocketPing(4000 * 60);

    const { applied } = useTheme();

    const logo =
        applied === "dark"
            ? require("../../assets/white-L-logo.png")
            : require("../../assets/yellow-L-logo.png");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerStyle: {
                backgroundColor: applied === "dark" ? "#1e293b" : "white",
            },
            headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
            headerLeft: () => (
                <View className='justify-center items-center'>
                    <Image source={logo} className='w-48 h-20' />
                </View>
            ),
            headerRight: () => (
                <View className='flex-row space-x-4 gap-3'>
                    <TouchableOpacity className=''
                        onPress={() => {
                            setSearchBar(true);
                        }}>
                        <Ionicons name="search" size={28} color={applied === "dark" ? "white" : "black"} />
                    </TouchableOpacity>
                    <TouchableOpacity className=''
                        onPress={() => setModalVisible(true)}>
                        <AntDesign name="plus" size={28} color={applied === "dark" ? "white" : "black"} />
                    </TouchableOpacity>

                    <Modal
                        animationType='fade'
                        visible={isModalVisible}
                        transparent={true}
                        onRequestClose={() => setModalVisible(false)}
                        className=''
                    >
                        <Pressable className='flex-1 items-end'
                            onPress={() => {
                                setModalVisible(false)
                            }}>
                            <Pressable className=''
                                onPress={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <View className='justify-end items-end p-1 w-60 '>
                                    <View className='bg-white rounded-2xl w-60 p-3'
                                        style={{
                                            shadowColor: "#000",
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 5,
                                        }}
                                    >
                                        <TouchableOpacity className='h-12 my-2 px-3 items-start flex-row gap-3'
                                            onPress={() => {
                                                navigation.navigate("NewContactScreen");
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Ionicons name="person-add-outline" size={24} color="black" />
                                            <Text className='font-bold text-xl'>Add Friend</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className='h-12 my-2 px-3 items-start  flex-row gap-3'
                                            onPress={() => {
                                                navigation.navigate('ProfileScreen');
                                                setModalVisible(false);
                                            }}
                                        >
                                            <AntDesign name="usergroup-add" size={24} color="black" />
                                            <Text className='font-bold text-xl'>Create Group</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Pressable>
                        </Pressable>
                    </Modal>
                </View>
            )
        });
    }, [navigation, isModalVisible]);

    const filterdChats = chats.filter((chat) => {
        return (
            chat.name.toLowerCase().includes(search.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(search.toLowerCase())
        );
    });

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            className="flex-row items-center py-2 px-3 bg-gray-50 my-0.5"
            onPress={() => {
                navigation.navigate("SingleChatScreen", {
                    chatId: 1,
                    friendName: "Anjana",
                    lastSeenTime: "8:07 PM",
                    profileImage: require("../../assets/avatar/avatar_1.png"),
                });
            }}
        >
            <Image source={item.profile} className="h-16 w-16 rounded-full" />
            <View className="flex-1 ms-2">
                <View className="flex-row justify-between">
                    <Text
                        className="font-exo-bold text-xl text-gray-600"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.name}
                    </Text>
                    <Text className="font-bold text-xs text-gray-500">{item.time}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text
                        className="text-gray-500 flex-1 text-base font-quicksand"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.lastMessage}
                    </Text>
                    {item.unread > 0 && (
                        <View className="bg-amber-500 rounded-md py-1 px-2 ms-2">
                            <Text className="text-slate-50 text-sm font-bold">
                                {item.unread}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-white p-0" edges={["right", "bottom", "left"]}>
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

            <View className="mt-1">
                <FlatList
                    data={filterdChats}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 80 }}
                />
            </View>
            <View className="absolute bg-amber-400 bottom-6 right-6 h-16 w-16 rounded-xl"
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 5,
                    elevation: 5,
                }}
            >
                <TouchableOpacity className="h-16 w-16  rounded-3xl justify-center items-center"
                    onPress={() => {
                        navigation.navigate("NewChatScreen");
                    }}
                >
                    <MaterialCommunityIcons name="chat-plus" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
