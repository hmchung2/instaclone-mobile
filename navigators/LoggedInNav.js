import React from "react";

import useMe from "../hooks/useMe";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import Upload from "../screens/Upload";

const Stack = createStackNavigator();

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  gestureEnabled: true,
  headerShown: false,
};

export default function LoggedInNav() {
  const { data } = useMe();

  return (
    <Stack.Navigator screenOptions={TransitionScreenOptions}>
      <Stack.Screen name="Tabs" component={TabsNav} />
      <Stack.Screen name="Upload" component={Upload} />
    </Stack.Navigator>
  );
}
