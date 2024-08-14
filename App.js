import { StyleSheet } from "react-native";
import ToDoScreen from "./screen/ToDoScreen";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <LinearGradient colors={["#c051fd", "#c686e9"]} style={styles.container}>
      <ToDoScreen />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
