import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import fitness from "../data/fitness";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const routinecards = () => {
  const FitnessData = fitness;
  const navigation = useNavigation();
  return (
    <View>
      {FitnessData.map((item, key) => (
        <Pressable
        onPress={() => navigation.navigate("Workout",{
          image:item.image,
          excersises:item.excersises,
          id:item.id,
        })}
          style={{ alignItems: "center", justifyContent: "center", margin: 10 }}
          key={key}
        >
          <Image style={{ width: "95%", height: 140, borderRadius: 7 }} source={{ uri: item.image }}/>
          <Text style={{position: "absolute",color: "white",fontSize: 16,fontWeight: "bold",left: 20,top: 20,}}>
            {item.name}
          </Text>
          
        </Pressable>
      ))}
    </View>
  );
};

export default routinecards;

const styles = StyleSheet.create({});