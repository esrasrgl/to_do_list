import { View, TextInput, Button, Text, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustumButton";

const RenderItem = ({ itemData, editItem, deleteItem }) => {
  const [editItemId, SetEditItemId] = useState(null);
  const [newText, SetNewText] = React.useState(itemData.item.text);

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

  return editItemId === itemData.item.id ? (
    <View style={styles.goalItem}>
      <TextInput
        style={styles.goalText}
        onChangeText={SetNewText}
        value={newText}
      />
      <CustomButton iconName={'check'} onpress={() => editItemHandler(editItem, itemData.item)}/>
    </View>
  ) : (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{itemData.item.text}</Text>
      <View style={styles.addButton}>
        <CustomButton
          iconName={"pencil"}
          onpress={() => SetEditItemId(itemData.item.id)}
        />
      </View>
      <View style={styles.addButton}>
        <CustomButton
          iconName={"trash"}
          onpress={() => deleteItem(itemData.item.id)}
        />
      </View>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  addButton: {
    marginHorizontal: 5,
  },
  goalItem: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
  checkbox: {
    alignSelf: "center",
  },
});
