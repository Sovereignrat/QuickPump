import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screen/home";
import StackNavigator from "./StackNavigator";
import { StyleSheet, Text, View } from "react-native";
import { FitnessContext } from "./Context";


export default function App() {
  return (
    <FitnessContext>
      <StackNavigator />
    </FitnessContext>
  ) ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
