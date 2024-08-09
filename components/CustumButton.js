import { Pressable, StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function CustomButton({ iconName, onpress }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.pressed, styles.button] : styles.button
        }
        onPress={onpress}
      >
        <Icon name={iconName} size={20}></Icon>
      </Pressable>
    </View>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 8,
  },
  goalText: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    elevation: 8,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    height: 45,
  },
  pressed: {
    opacity: 0.25,
  },
});
