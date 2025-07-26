import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import fitness from "../data/fitness";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RoutineCards = () => {
  const FitnessData = fitness;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {FitnessData.map((item, key) => (
        <Pressable
          onPress={() => navigation.navigate("Workout", {
            image: item.image,
            exercises: item.exercises, // Fixed: was 'excersises'
            id: item.id,
            name: item.name,
            description: item.description,
          })}
          style={({ pressed }) => [
            styles.cardContainer,
            pressed && styles.cardPressed
          ]}
          key={key}
        >
          {/* Card Image */}
          <Image 
            style={styles.cardImage} 
            source={{ uri: item.image }}
            resizeMode="cover"
          />
          
          {/* Overlay Gradient Effect */}
          <View style={styles.overlay} />
          
          {/* Card Content */}
          <View style={styles.cardContent}>
            <Text style={styles.workoutName}>
              {item.name}
            </Text>
            <Text style={styles.workoutDescription}>
              {item.description}
            </Text>
            
            {/* Exercise Count */}
            <View style={styles.exerciseInfo}>
              <MaterialCommunityIcons 
                name="dumbbell" 
                size={16} 
                color="white" 
              />
              <Text style={styles.exerciseCount}>
                {item.exercises?.length || 0} exercises
              </Text>
            </View>
          </View>
          
          {/* Play Icon */}
          <View style={styles.playIconContainer}>
            <MaterialCommunityIcons 
              name="play-circle" 
              size={40} 
              color="white" 
            />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default RoutineCards;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  cardImage: {
    width: "100%",
    height: 160,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  cardContent: {
    position: "absolute",
    left: 20,
    top: 20,
    right: 70, // Leave space for play icon
  },
  workoutName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  workoutDescription: {
    color: "#E0E0E0",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  exerciseInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  exerciseCount: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  playIconContainer: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -20 }],
  },
});