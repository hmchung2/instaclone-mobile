import React from "react";
import { Ionicons } from "@expo/vector-icons";
import useMe from "../hooks/useMe";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";

const Stack = createStackNavigator();

const TransitionScreenOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS, // This is where the transition happens
  gestureEnabled: true,
};

export default function LoggedInNav() {
  const { data } = useMe();

  return (
    <Stack.Navigator screenOptions={TransitionScreenOptions}>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "Upload",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
        }}
        component={UploadForm}
      />
    </Stack.Navigator>
  );
}
