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

type NewChatScreenProp = NativeStackNavigationProp<RootStack, "NewChatScreen">;

export default function NewChatScreen() {
    const navigation = useNavigation<NewChatScreenProp>();
    const [searchBar, setSearchBar] = useState(false);
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            firstName: "Anjana",
            lastName: "Dilhara",
            countryCode: "+94",
            contactNo: "762711882",
            createdAt: "2025-09-29 18:37:00",
            updatedAt: "2025-10-01 01:53:06",
            status: "ACTIVE",
            profileImage: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80",
            first_name: "",
            last_name: "",
            contact_no: "",
        },
        {
            id: 2,
            firstName: "Ben",
            lastName: "Tenison",
            countryCode: "+921",
            contactNo: "21324212321",
            createdAt: "2025-09-39 19:17:00",
            updatedAt: "2025-10-01 06:23:06",
            status: "NOT_IN_LIST",
            profileImage: "https://img.freepik.com/premium-vector/cool-cartoon-boy-avatar_987671-675.jpg?semt=ais_hybrid&w=740&q=80",
            first_name: "",
            last_name: "",
            contact_no: "",
        },
        {
            id: 3,
            firstName: "Michel",
            lastName: "Marsh",
            countryCode: "+93",
            contactNo: "84134454",
            createdAt: "2025-09-39 19:17:00",
            updatedAt: "2025-10-01 06:23:06",
            status: "ACTIVE",
            first_name: "",
            last_name: "",
            contact_no: "",
        }
    ]);

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
            className="justify-start items-center gap-x-3 px-3 py-2 flex-row bg-gray-50 mt-1"
            onPress={() => {
                navigation.replace("SingleChatScreen", {
                    chatId: item.id,
                    friendName: `${item.firstName} ${item.lastName}`,
                    lastSeenTime: item.updatedAt,
                    profileImage: item.profileImage
                        ? item.profileImage
                        : `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
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
                                uri: `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
                            }}
                            className="h-14 w-14 rounded-full"
                        />
                    )}
                </TouchableOpacity>
            </View>
            <View className="flex-col gap-y-1">
                <Text className="font-bold text-xl">
                    {item.firstName} {item.lastName}
                </Text>
                <Text className="text-sm italic">
                    {item.countryCode} {item.contactNo}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const filterdUsers = [...users]
        .filter((user) => {
            return (
                user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase()) ||
                user.contactNo.includes(search)
            );
        })
        .sort((a, b) => a.firstName.localeCompare(b.firstName));

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
                <View className="mt-2">
                    <FlatList
                        data={filterdUsers}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
