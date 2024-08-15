import { View, TextInput, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { deleteItem, editItem } from "../util/util";

const RenderItem = ({ item, SetToDoItems }) => {
  const [editItemId, SetEditItemId] = useState(null);
  const [newText, SetNewText] = useState(item.text);
  const [isDone, setIsDone] = useState(item.isDone);

  return (
    <View style={styles.goalItem}>
      {editItemId === item.id ? (
        <>
          <TextInput
          testID="editTextID"
            style={styles.goalText}
            onChangeText={SetNewText}
            value={newText}
          />
          <CustomButton
            iconName="check"
            onpress={() =>
              editItem(item, newText, SetToDoItems, SetEditItemId, SetNewText)
            }
          />
        </>
      ) : (
        <>
          <CustomButton
            iconName={isDone ? "check-square" : "square"}
            onpress={() => setIsDone((isDone) => !isDone)}
          />
          <Text
          testID="TextID"
            style={[
              styles.goalText,
              { textDecorationLine: isDone ? "line-through" : "none" },
            ]}
          >
            {item.text}
          </Text>
          <CustomButton
            iconName="pencil-alt"
            onpress={() => SetEditItemId(item.id)}
          />
          <CustomButton
            iconName="trash"
            onpress={() => deleteItem(item.id, SetToDoItems)}
          />
        </>
      )}
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  goalItem: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 8,
  },
  goalText: {
    flex: 1,
    color: "black",
    fontSize: 18,
  },
});
