import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import * as MediaLibrary from 'expo-media-library'

import DrawerScreen from "./app/navigations/Drawer";
import { persistor } from "./app/store/store";
import store from "./app/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";

export default function App() {
  
  useEffect(() =>{
    (async() =>{
      const {status} = await  MediaLibrary.requestPermissionsAsync()
      if(status !== 'granted'){
        console.log('Premission to access the media library is required ')
      }else{
        console.log("Premission Granted ! ")
      }
    })();
  },[])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <DrawerScreen />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
