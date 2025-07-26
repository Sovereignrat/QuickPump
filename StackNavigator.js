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
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right', // Smooth transitions
          gestureEnabled: true, // Enable swipe back gesture
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            title: 'Fitness Home',
          }}
        />
        
        <Stack.Screen 
          name="Workout" 
          component={Workout} 
          options={{
            title: 'Workout',
            animation: 'slide_from_bottom', // Different animation for workout
          }}
        />
        
        <Stack.Screen 
          name="Rest" 
          component={Rest} 
          options={{
            title: 'Rest Timer',
            gestureEnabled: false, // Prevent accidental swipe during rest
          }}  
        />
        
        <Stack.Screen 
          name="Routine" 
          component={Routine} 
          options={{
            title: 'Exercise Routine',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});