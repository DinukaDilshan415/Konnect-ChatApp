import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { UserRegistrationData } from "../components/UserContext";
import { Alert } from "react-native";

const API = process.env.EXPO_PUBLIC_APP_URL + "/Konnect-Backend"

export const createNewAccount = async (
  userRegistrationData: UserRegistrationData
) => {
  let formData = new FormData();
  formData.append("firstName", userRegistrationData.firstName);
  formData.append("lastName", userRegistrationData.lastName);
  formData.append("countryCode", userRegistrationData.countryCode);
  formData.append("contactNo", userRegistrationData.contactNo);
  formData.append("profileImage", {
    uri: userRegistrationData.profileImage,
    name: "profile.png",
    type: "image/png",
  } as any);

  const response = await fetch(API + "/UserController", {
    method: "POST",
    body: formData,
    // headers: {
    //     "Content-Type": "multipart/form-data",
    // }
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    return "Account creation failed !";
  }
};

export const uploadProfileImage = async (userId: string, imageUri: string) => {
  let formData = new FormData();
  formData.append("userId", userId);
  formData.append("profileImage", {
    uri: imageUri,
    type: "image/png", // change if PNG
    name: "profile.png",
  } as any);

  const response = await fetch(API + "/ProfileController", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    return await response.json();
  } else {
    console.warn("Profile image uploading failed!");
  }
};

export const checkUserAccount = async (callingCode: string, phoneNo: string) => {
  try {
    const response = await fetch(API + "/CheckUser?callingCode=" + callingCode + "&phoneNo=" + phoneNo);
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      console.log("checkUserAccount failed");
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed !',
        textBody: 'checkUserAccount failed !',
      })
    }

  } catch (error) {
    console.error('Error checkUserAccount:', error);
  }
};