import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView
} from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FitnessItems } from "../Context";
import { AntDesign } from '@expo/vector-icons';
import "react-native-reanimated";

const Workout = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    completed,
    setCompleted,
  } = useContext(FitnessItems);

  // Get workout data from route params
  const workoutData = {
    image: route.params?.image,
    exercises: route.params?.exercises || [], // Fixed: was excersises
    id: route.params?.id,
    name: route.params?.name || "Workout",
    description: route.params?.description || "7x4 CHALLENGE"
  };

  const completedCount = workoutData.exercises.filter(exercise => 
    completed.includes(exercise.name)
  ).length;

  const startWorkout = () => {
    navigation.navigate("Routine", {
      exercises: workoutData.exercises, // Fixed: was excersises
      workoutName: workoutData.name,
      workoutId: workoutData.id,
      image: workoutData.image
    });
    // Don't clear completed exercises here - let user track progress
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Header Image with Overlay */}
        <View style={styles.headerContainer}>
          <Image
            style={styles.headerImage}
            source={{ uri: workoutData.image }}
            resizeMode="cover"
          />
          
          {/* Dark overlay for better text visibility */}
          <View style={styles.imageOverlay} />
          
          {/* Back Button */}
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back-outline"
              size={28}
              color="white"
            />
          </Pressable>
          
          {/* Workout Title */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.workoutTitle}>{workoutData.name}</Text>
            <Text style={styles.workoutDescription}>{workoutData.description}</Text>
            <Text style={styles.exerciseCount}>
              {workoutData.exercises.length} exercises • {completedCount} completed
            </Text>
          </View>
        </View>

        {/* Exercise List */}
        <View style={styles.exerciseContainer}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          
          {workoutData.exercises.map((item, index) => (
            <View style={styles.exerciseItem} key={index}>
              <Image 
                style={styles.exerciseImage} 
                source={{ uri: item.image }}
                resizeMode="cover"
              />
              
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>
                  {item.name}
                </Text>
                <Text style={styles.exerciseSets}>
                  {item.sets} sets
                </Text>
              </View>
              
              {/* Completion Status */}
              <View style={styles.statusContainer}>
                {completed.includes(item.name) ? (
                  <View style={styles.completedContainer}>
                    <AntDesign name="checkcircle" size={24} color="#4CAF50" />
                    <Text style={styles.completedText}>Done</Text>
                  </View>
                ) : (
                  <View style={styles.pendingContainer}>
                    <View style={styles.pendingCircle} />
                    <Text style={styles.pendingText}>Pending</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Start Button */}
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={startWorkout}
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.startButtonPressed
          ]}
        >
          <Text style={styles.startButtonText}>
            {completedCount > 0 ? 'CONTINUE WORKOUT' : 'START WORKOUT'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Workout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    position: "relative",
    height: 200,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  headerTextContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  workoutTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  workoutDescription: {
    color: "#E0E0E0",
    fontSize: 16,
    marginTop: 4,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  exerciseCount: {
    color: "#B0B0B0",
    fontSize: 14,
    marginTop: 4,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  exerciseContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  exerciseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  exerciseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  exerciseSets: {
    fontSize: 14,
    color: "#666",
  },
  statusContainer: {
    alignItems: "center",
    minWidth: 60,
  },
  completedContainer: {
    alignItems: "center",
  },
  completedText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "500",
    marginTop: 2,
  },
  pendingContainer: {
    alignItems: "center",
  },
  pendingCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    backgroundColor: "white",
  },
  pendingText: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  startButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButtonPressed: {
    backgroundColor: "#1976D2",
    transform: [{ scale: 0.98 }],
  },
  startButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});