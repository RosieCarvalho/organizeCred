import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes";
import Parse from "parse/react-native.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppProvider } from "./src/hooks";
import { Platform } from "react-native";
import Constants from "expo-constants";

export default function App() {
  Parse.setAsyncStorage(AsyncStorage);
  Parse.initialize(
    "pEJfIhmdO8ZuQw1fcfUzEfYTkzjgQk0iy4USMM1m",
    "uR0tK7IGNS26PqwsTclfLW7HtZw5OlCoi2kIgqxE"
  );
  Parse.serverURL = "https://parseapi.back4app.com/";

  return (
    <>
      <StatusBar style="auto" />
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
}
