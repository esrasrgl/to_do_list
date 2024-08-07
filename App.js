import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  ImageBackground,
} from "react-native";

export default function App() {
  const [enteredValue, SetEnteredValue] = useState("");
  const [to_do_items, Set_to_do_items] = useState([]);

  function valueHandler(val) {
    SetEnteredValue(val);
  }

  function addNewItem() {
    Set_to_do_items((to_do_item) => [
      ...to_do_item,
      { text: enteredValue, id: Math.random().toString() },
    ]);
    SetEnteredValue("");
  }

  function deleteItem(id) {
    Set_to_do_items((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }
  function editItem(goal) {
    goal.text = '!!EDİT'; // ?
  }

  return (
    <ImageBackground source={require('./assets/images/page.jpg')} resizeMode='cover'style={styles.container} >
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
          data={to_do_items}
          renderItem={(itemData) => {
            return (
              <View style={styles.goalItem}>
                <Text style={styles.goalText}>{itemData.item.text}</Text>
                <View style={styles.addButton}>
                  <Button title="Edit" onPress={() => editItem(itemData.item)} />
                </View>
                <View style={styles.addButton}>
                  <Button title="Delete" onPress={() => deleteItem(itemData.item.id)} />
                </View>
              </View>
            );
          }}
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
  goalItem: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 24,
    margin: 20,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#48b0eb",
  },
  goalsContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    flex: 5,
    margin: 20,
  },
  goalText: {
    flex: 1,
    color: "white",
    fontSize:18,
  },
});
