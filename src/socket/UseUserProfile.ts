import { useEffect, useState } from "react";
import { useWebSocket } from "./WebSocketProvider";
import { User, WSResponse } from "../types/Types";

export function useUserProfile() {
    const { socket, sendMessage } = useWebSocket();
    const [userProfile, setUserProfile] = useState<User>();

    useEffect(() => {
        if (!socket) {
            return;
        }
        sendMessage({ type: "set_user_profile" });
        const onMessage = (event: MessageEvent) => {
            const response: WSResponse = JSON.parse(event.data);
            if (response.type === "user_profile") {
                setUserProfile(response.payload);
                console.log(response.payload);
            }
        };
        socket.addEventListener("message", onMessage);
        return () => {
            socket.removeEventListener("message", onMessage);
        };
    }, [socket]);
    return { userProfile: userProfile, setUserProfile: setUserProfile };
}