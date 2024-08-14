import { Alert } from "react-native";

export function addNewItem(enteredValue, SetEnteredValue, SetToDoItems) {
  if (enteredValue == "") {
    Alert.alert("Invalid Input!", "Enter goal.", [
      { text: "Okay", style: "destructive" },
    ]);
    return;
  }
  SetToDoItems((to_do_item) => [
    ...to_do_item,
    { text: enteredValue, id: Math.random().toString(), isDone: false },
  ]);
  SetEnteredValue("");
}

export function deleteItem(id, SetToDoItems) {
  SetToDoItems((currentItems) => {
    const foundId = currentItems.some((item) => item.id === id);
    if (!foundId) {
      throw new Error("item not found");
    }
    return currentItems.filter((item) => item.id !== id);
  });
}

export function editItem(
  dataItem,
  newText,
  SetToDoItems,
  SetEditItemId,
  SetNewText
) {
  if (newText == "") {
    SetNewText(dataItem.text);
    Alert.alert("Invalid Input!", "Enter goal.", [
      { text: "Okay", style: "destructive" },
    ]);
    return;
  }
  console.log("edit dataItem", dataItem);
  SetToDoItems((currentItems) =>
    currentItems.map((item) =>
      item.id === dataItem.id ? { ...item, text: newText } : item
    )
  );
  SetEditItemId(null);
}
