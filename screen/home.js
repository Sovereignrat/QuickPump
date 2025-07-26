import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import React, { useContext } from "react";
import FitnessCards from "../components/routinecards";
import { FitnessItems } from "../Context";
import "react-native-reanimated";

const Home = () => {
  // Fixed: Include all the context variables you're using
  const { minutes, calories, workout } = useContext(FitnessItems);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>
            Welcome Back!
          </Text>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {minutes}
              </Text>
              <Text style={styles.statLabel}>
                MINS
              </Text>
            </View>
            
            {/* Fixed: Show actual workout count from context */}
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {workout}
              </Text>
              <Text style={styles.statLabel}>
                WORKOUTS
              </Text>
            </View>
            
            {/* Fixed: Show actual calories from context */}
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {Math.round(calories)}
              </Text>
              <Text style={styles.statLabel}>
                CALORIES
              </Text>
            </View>
          </View>

          {/* Image Section */}
          <View style={styles.imageContainer}>
            <Image 
              style={styles.heroImage}
              source={{
                uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
              }}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Fitness Cards Section */}
        <View style={styles.cardsContainer}>
          <FitnessCards />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "black",
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  statLabel: {
    color: "#D0D0D0",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "500",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  cardsContainer: {
    padding: 16,
    paddingBottom: 30,
  },
});