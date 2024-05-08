import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Rest from "./screen/rest";
import Workout from "./screen/workout";
import Home from "./screen/home";
import Routine from "./screen/routine";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Workout" component={Workout} options={{headerShown:false}}/>
        <Stack.Screen name="Rest" component={Rest} options={{headerShown:false}}/>
        <Stack.Screen name="Routine" component={Routine} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});