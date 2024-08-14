import { Pressable, StyleSheet, View, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

function CustomButton({ iconName, onpress }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.pressed, styles.button] : styles.button
        }
        onPress={onpress}
        testID="pressable"
      >
        <FontAwesome5 name={iconName} size={20} color="black" />
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
    marginHorizontal: 5,
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
