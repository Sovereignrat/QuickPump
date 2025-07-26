import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FitnessItems } from "../Context";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Routine = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  
  // Fixed: Use exercises instead of excersises
  const exercises = route.params?.exercises || [];
  const workoutName = route.params?.workoutName || "Workout";
  const current = exercises[index];

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

  // Handle empty exercises array
  useEffect(() => {
    if (exercises.length === 0) {
      navigation.goBack();
    }
  }, [exercises, navigation]);

  // Listen for navigation state changes to handle returning from Rest screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // This will be called when returning from Rest screen
      // The index should already be updated by the Rest screen callback
    });

    return unsubscribe;
  }, [navigation]);

  const handleExerciseComplete = () => {
    // Add current exercise to completed list
    if (!completed.includes(current.name)) {
      setCompleted([...completed, current.name]);
    }
    
    // Update workout stats
    setWorkout(workout + 1);
    setMinutes(minutes + 2.5);
    setCalories(calories + 6.3);

    // Check if this is the last exercise
    if (index + 1 >= exercises.length) {
      // Workout complete - navigate to home
      navigation.navigate("Home");
    } else {
      // Navigate to rest screen with proper parameters
      navigation.navigate("Rest", {
        nextExercise: exercises[index + 1],
        currentIndex: index + 1,
        totalExercises: exercises.length,
        onRestComplete: () => {
          // This will be called when rest is complete
          setIndex(index + 1);
        }
      });
      
      // Move to next exercise after a short delay
      setTimeout(() => {
        setIndex(index + 1);
      }, 100);
    }
  };

  const handleSkipExercise = () => {
    if (index + 1 >= exercises.length) {
      navigation.navigate("Home");
    } else {
      setIndex(index + 1);
    }
  };

  // Safety check
  if (!current) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No exercise found</Text>
          <Pressable onPress={() => navigation.goBack()} style={styles.button}>
            <Text style={styles.buttonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const progress = ((index + 1) / exercises.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button and progress */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Pressable>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {index + 1} of {exercises.length}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>

      {/* Exercise Image */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.exerciseImage}
          source={{ uri: current.image }}
          resizeMode="cover"
        />
        
        {/* Workout name overlay */}
        <View style={styles.workoutNameContainer}>
          <Text style={styles.workoutNameText}>{workoutName}</Text>
        </View>
      </View>

      {/* Exercise Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.exerciseName}>{current.name}</Text>
        
        <View style={styles.setsContainer}>
          <Text style={styles.setsText}>x{current.sets}</Text>
          <Text style={styles.setsLabel}>sets</Text>
        </View>

        {/* Exercise tips or instructions */}
        <Text style={styles.instructionText}>
          Complete {current.sets} sets of this exercise
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {/* Skip Button */}
        <Pressable
          onPress={handleSkipExercise}
          style={[styles.button, styles.skipButton]}
        >
          <AntDesign name="stepforward" size={20} color="#666" />
          <Text style={styles.skipButtonText}>SKIP</Text>
        </Pressable>

        {/* Done Button */}
        <Pressable
          onPress={handleExerciseComplete}
          style={({ pressed }) => [
            styles.button,
            styles.doneButton,
            pressed && styles.doneButtonPressed
          ]}
        >
          <AntDesign name="check" size={20} color="white" />
          <Text style={styles.doneButtonText}>
            {index + 1 >= exercises.length ? "FINISH WORKOUT" : "DONE"}
          </Text>
        </Pressable>
      </View>

      {/* Next Exercise Preview */}
      {index + 1 < exercises.length && (
        <View style={styles.nextExerciseContainer}>
          <Text style={styles.nextExerciseLabel}>Next:</Text>
          <Text style={styles.nextExerciseName}>
            {exercises[index + 1].name}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Routine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  progressContainer: {
    flex: 1,
    marginLeft: 16,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 2,
  },
  imageContainer: {
    position: "relative",
    height: 300,
  },
  exerciseImage: {
    width: "100%",
    height: "100%",
  },
  workoutNameContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  workoutNameText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 24,
    alignItems: "center",
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  setsContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  setsText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2196F3",
  },
  setsLabel: {
    fontSize: 16,
    color: "#666",
    marginTop: -8,
  },
  instructionText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  skipButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  skipButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "bold",
  },
  doneButton: {
    flex: 2,
    backgroundColor: "#4CAF50",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  doneButtonPressed: {
    backgroundColor: "#45A049",
    transform: [{ scale: 0.98 }],
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextExerciseContainer: {
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  nextExerciseLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  nextExerciseName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 24,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});