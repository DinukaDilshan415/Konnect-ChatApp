import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useMemo, useState } from "react";

type AuthContextType = {
    userId: string | null;
    isLoading: boolean;
    isPin: boolean;
    signUp: (id: string) => Promise<void>;
    signOut: () => Promise<void>;
    setIsPin: (status: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const USER_ID_KEY = "userId";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isPin, setIsPin] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                const storedId = await AsyncStorage.getItem(USER_ID_KEY);
                setUserId(storedId);

            } catch (error) {
                console.warn(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
            checkIsPin();
        })();
    }, []);

    const signUp = async (id: string) => {
        await AsyncStorage.setItem(USER_ID_KEY, id);
        setUserId(id);
    };

    const signOut = async () => {
        await AsyncStorage.removeItem(USER_ID_KEY);
        await AsyncStorage.clear();
        setUserId(null);
    };

    const checkIsPin = async () => {
        const pinStatus = await AsyncStorage.getItem('pin');
        if (pinStatus === "1") {
            setIsPin(true);
        } else {
            setIsPin(false);
        }
    };

    const value = useMemo(() => ({ userId, isLoading, isPin, checkIsPin, signUp, signOut, setIsPin }), [userId, isLoading, isPin]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};