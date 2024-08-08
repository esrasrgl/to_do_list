import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import RenderItem from "./components/RenderItem";

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
    <ImageBackground
      source={require("./assets/images/page.jpg")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.goalContainer}>
        <TextInput
          style={styles.goalInput}
          placeholder="Goal"
          onChangeText={valueHandler}
          value={enteredValue}
        />
        <View style={styles.addButton}>
          <Button title="ADD" onPress={addNewItem} />
        </View>
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
          alwaysBounceVertical={false}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  container: {
    flex: 1,
  },
  goalInput: {
    flex: 1,
    backgroundColor: "#f6eaba",
    borderRadius: 8,
  },
  goalContainer: {
    marginTop: 100,
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#48b0eb",
  },
  addButton: {
    margin: 5,
  },
  goalsContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    flex: 5,
    margin: 20,
  },
});
