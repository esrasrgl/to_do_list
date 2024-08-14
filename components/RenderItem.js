import { View, TextInput, Button, Text, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { deleteItem, editItem} from "../util/util";

const RenderItem = ({ itemData, SetToDoItems }) => {
  const [editItemId, SetEditItemId] = useState(null);
  const [newText, SetNewText] =useState(itemData.item.text);
  const [isDone, setIsDone] = useState(itemData.item.isDone);

  function CheckBoxHandler() {
    return (
      <CustomButton
        iconName={isDone ? "check-square" : "square"}
        onpress={() => setIsDone((isDone) => !isDone)}
      />
    );
  }

  return (
    <View style={styles.goalItem}>
      {editItemId === itemData.item.id ? (
        <>
          <TextInput
            style={styles.goalText}
            onChangeText={SetNewText}
            value={newText}
          />
          <CustomButton
            iconName="check"
            onpress={() => editItem(itemData.item, newText, SetToDoItems,SetEditItemId,SetNewText)}
          />
        </>
      ) : (
        <>
          <CheckBoxHandler />
          <Text
            style={[
              styles.goalText,
              { textDecorationLine: isDone ? "line-through" : "none" },
            ]}
          >
            {itemData.item.text}
          </Text>
          <CustomButton
            iconName="pencil-alt"
            onpress={() => SetEditItemId(itemData.item.id)}
          />
          <CustomButton
            iconName="trash"
            onpress={() => deleteItem(itemData.item.id, SetToDoItems)}
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
