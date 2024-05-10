import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Pressable,
  } from "react-native";
  import React, { useState, useContext } from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { FitnessItems } from "../Context";
  
  const Routine = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const excersise = route.params.excersises;
    const current = excersise[index];
  
    const {
      completed,
      setCompleted,
      minutes,
      setMinutes,
      calories,
      setCalories,
      setWorkout,
      workout,
    } = useContext(FitnessItems);
    console.log(completed, "completed excersise");
    return (
      <SafeAreaView>
        <Image
          style={{ width: "100%", height: 370 }}
          source={{ uri: current.image }}
        />
  
        <Text
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          {current.name}
        </Text>
  
        <Text
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            fontSize: 38,
            fontWeight: "bold",
          }}
        >
          x{current.sets}
        </Text>
        {index + 1 >= excersise.length ? (
          <Pressable
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{
              backgroundColor: "blue",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 30,
              borderRadius: 20,
              padding: 10,
              width: 150,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                color: "white",
              }}
            >
              DONE
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate("Rest");
              setCompleted([...completed, current.name]);
              setWorkout(workout + 1);
              setMinutes(minutes + 2.5);
              setCalories(calories + 6.3);
              setTimeout(() => {
                setIndex(index + 1);
              }, 2000);
            }}
            style={{
              backgroundColor: "blue",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 30,
              borderRadius: 20,
              padding: 10,
              width: 150,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                color: "white",
              }}
            >
              DONE
            </Text>
          </Pressable>
        )}
      </SafeAreaView>
    );
  };
  
  export default Routine;
  
  const styles = StyleSheet.create({});