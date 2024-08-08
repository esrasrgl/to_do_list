import { View, TextInput, Button, Text, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";

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
      <Button
        title="Save"
        onPress={() => editItemHandler(editItem, itemData.item)}
      />
    </View>
  ) : (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{itemData.item.text}</Text>
      <View style={styles.addButton}>
        <Button
          title="Edit"
          onPress={() => SetEditItemId(itemData.item.id)}
        />
      </View>
      <View style={styles.addButton}>
        <Button title="Delete" onPress={() => deleteItem(itemData.item.id)} />
      </View>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
    addButton: {
      margin: 5,
    },
    goalItem: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginHorizontal: 24,
      margin: 20,
      padding: 10,
      borderRadius: 6,
      backgroundColor: "#48b0eb",
    },
    goalText: {
      flex: 1,
      color: "white",
      fontSize: 18,
    },
  });