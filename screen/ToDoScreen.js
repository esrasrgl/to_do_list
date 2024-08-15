import { useState } from "react";
import { StyleSheet, TextInput, View, FlatList, Text } from "react-native";
import RenderItem from "../components/RenderItem";
import CustomButton from "../components/CustomButton";
import { addNewItem } from "../util/util";

export default function ToDoScreen() {
  const [enteredValue, SetEnteredValue] = useState("");
  const [toDoItems, SetToDoItems] = useState([]);

  return (
    <>
      <Text style={styles.title}>TO DO LIST</Text>
      <View style={styles.goalContainer} testID  ='toDoScreen'>
        <TextInput
          style={styles.goalInput}
          placeholder=" Ad new todo item"
          onChangeText={SetEnteredValue}
          value={enteredValue}
          testID="addText"
        />
        <CustomButton
          iconName={"plus"}
          onpress={() =>
            addNewItem(enteredValue, SetEnteredValue, SetToDoItems)
          }
        />
      </View>
      <View style={styles.goalsContainer}>
        <FlatList
          testID="flatId"
          data={toDoItems}
          renderItem={(itemData) => (
            <RenderItem item={itemData.item} SetToDoItems={SetToDoItems} />
          )}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          removeClippedSubviews={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 100,
    margin: 24,
    fontSize: 30,
    fontWeight: "bold",
  },
  goalInput: {
    marginRight: 24,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 8,
  },
  goalContainer: {
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  goalsContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    flex: 1,
    margin: 24,
  },
});
