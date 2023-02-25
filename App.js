__DEV__ = true;
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutNav from "./navigators/LoggedOutNav";
import * as SplashScreen from "expo-splash-screen";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar, cache } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";

SplashScreen.preventAutoHideAsync();
const MyTheme = {
  colors: {
    background: "black",
    text: "white",
  },
};
export default function App() {
  const [ready, setReady] = useState(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  useEffect(() => {
    async function prepare() {
      try {
        await preload();
        // await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setReady(true);

        /// temp !!!!  ///
        // console.log("pk");
        isLoggedInVar(false);
        tokenVar("");
        //////////////////
      }
    }

    prepare();
  }, []);

  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    // await persistCache({
    //   cache,
    //   storage: new AsyncStorageWrapper(AsyncStorage),
    // });
    return startLoading();
  };

  const startLoading = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/logo.png"),
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png",
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer theme={MyTheme}>
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
      </View>
    </ApolloProvider>
  );
}
