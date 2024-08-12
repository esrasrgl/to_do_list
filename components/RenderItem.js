import { View, TextInput, Button, Text, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustumButton";

const RenderItem = ({ itemData, editItem, deleteItem }) => {
  const [editItemId, SetEditItemId] = useState(null);
  const [newText, SetNewText] =useState(itemData.item.text);
  const [isDone, setIsDone] = useState(itemData.item.isDone);

  function editItemHandler(edit, item) {
    if (newText == "") {
      SetNewText(item.text);

      Alert.alert("Invalid Input!", "Enter goal.", [
        { text: "Okay", style: "destructive" },
      ]);
    } else {
      edit({ id: item.id, newText: newText });
    }

    SetEditItemId(null);
  }

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
            onpress={() => editItemHandler(editItem, itemData.item)}
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
            onpress={() => deleteItem(itemData.item.id)}
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
