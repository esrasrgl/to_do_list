import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

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
    goal.text = 'EDİT';
  }

  return (
    <View style={styles.container}>
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
        {to_do_items.map((goal) => (
          <View key={goal.id} style={styles.goalItem}>
            <Text style={styles.goalText}>{goal.text}</Text>
            <View style={styles.addButton}>
              <Button title="Edit" onPress={() => editItem(goal)} />
            </View>
            <View style={styles.addButton}>
              <Button title="Delete" onPress={() => deleteItem(goal.id)} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  goalsContainer: {
    flex: 5,
    margin: 20,
  },
  goalInput: {
    flex: 1,
    backgroundColor: "white",
  },
  goalContainer: {
    marginTop: 100,
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "orange",
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
    backgroundColor: "orange",
  },
  goalText: {
    flex: 1,
    color: "white",
  },
});
