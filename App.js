import { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Text,
} from "react-native";
import RenderItem from "./components/RenderItem";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "./components/CustumButton";

export default function App() {
  const [enteredValue, SetEnteredValue] = useState("");
  const [toDoItems, SetToDoItems] = useState([]);

  function valueHandler(val) {
    SetEnteredValue(val);
  }

  function addNewItem() {
    if (enteredValue == "") {
      Alert.alert("Invalid Input!", "Enter goal.", [
        { text: "Okay", style: "destructive" },
      ]);
    } else {
      SetToDoItems((to_do_item) => [
        ...to_do_item,
        { text: enteredValue, id: Math.random().toString() },
      ]);
    }

    SetEnteredValue("");
  }

  function deleteItem(id) {
    SetToDoItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  function editItem({ id, newText }) {
    console.log("editItem", newText);
    SetToDoItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  }

  return (
    <LinearGradient colors={["#c051fd", "#c686e9"]} style={styles.container}>
      <Text style={styles.title}>TO DO LIST</Text>
      <View style={styles.goalContainer}>
        <TextInput
          style={styles.goalInput}
          placeholder="Ad new todo item"
          onChangeText={valueHandler}
          value={enteredValue}
        />
        <CustomButton iconName={'plus'} onpress={addNewItem} />
      </View>

      <View style={styles.goalsContainer}>
        <FlatList
          data={toDoItems}
          renderItem={(itemData) => (
            <RenderItem
              itemData={itemData}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          )}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          removeClippedSubviews={false}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title:{
    marginTop: 100,
    margin: 24,
    fontSize:30,
    fontWeight:'bold',
  },
  goalInput: {
    marginRight:24,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    elevation:8,
  },
  goalContainer: {
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  addButton: {
    margin: 5,
  },
  goalsContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    flex: 1,
    margin: 24,
  },
});
