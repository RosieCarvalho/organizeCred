import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Home";
import AddCards from "../Cards/Add";
import Despesas from "../Despesas/Detail";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddCards" component={AddCards} />
        <Stack.Screen name="Detalhe" component={Despesas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
