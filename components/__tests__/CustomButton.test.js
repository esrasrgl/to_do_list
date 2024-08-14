import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomButton from "../CustomButton";
import { addNewItem, deleteItem, editItem } from "../../util/util";

describe("Custom Button", () => {
  it("shoul render correctly", () => {
    const wrapper = render(<CustomButton />);
    wrapper.getByTestId("pressable");
  });

  it("should call onpress when clicked", () => {
    const mockOnPress = jest.fn();

    const { getByTestId } = render(
      <CustomButton iconName="check" onpress={mockOnPress} />
    );

    const button = getByTestId("pressable");
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it("should add a new item", () => {
    const enteredValue = "add text";
    const SetEnteredValue = jest.fn();
    const SetToDoItems = jest.fn();

    addNewItem(enteredValue, SetEnteredValue, SetToDoItems);
    expect(SetToDoItems).toHaveBeenCalledWith(expect.any(Function));

    const mockItems = SetToDoItems.mock.calls[0][0];
    const result = mockItems([{ text: "text", id: "1", isDone: false }]);
    expect(result).toEqual([
      { text: "text", id: "1", isDone: false },
      { text: "add text", id: expect.any(String), isDone: false },
    ]);

    expect(SetEnteredValue).toHaveBeenCalledWith("");
  });

  it("should delete item", () => {
    const id = "1";
    const SetToDoItems = jest.fn();

    deleteItem(id, SetToDoItems);

    const mockItems = SetToDoItems.mock.calls[0][0];
    const result = mockItems([{ text: "text", id: "1", isDone: false }]);

    expect(result).toHaveLength(0);
  });

  it("delete item id is not found", () => {
    const notFoundId = "not found id";
    const SetToDoItems = jest.fn();

    expect(() => {
      deleteItem(notFoundId, SetToDoItems);
      const mockItems = SetToDoItems.mock.calls[0][0];
      const result = mockItems([{ text: "", id: "1" }]);
    }).toThrow("item not found");
  });

  it("should edit item", () => {
    const dataItem = { text: "text", id: "1", isDone: false };
    const newText = "update text";
    const SetToDoItems = jest.fn();
    const SetEditItemId = jest.fn();
    const SetNewText = jest.fn();

    editItem(dataItem, newText, SetToDoItems, SetEditItemId, SetNewText);

    const mockItems = SetToDoItems.mock.calls[0][0];
    const result = mockItems([
      { text: "text", id: "1", isDone: false },
      { text: "text", id: "2", isDone: false },
    ]);

    expect(result).toEqual([
      { text: "update text", id: "1", isDone: false },
      { text: "text", id: "2", isDone: false },
    ]);
    expect(SetEditItemId).toHaveBeenCalledWith(null);
  });
});
