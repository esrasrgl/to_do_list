import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RenderItem from "../RenderItem";

describe("Render Item", () => {
  const mockDataTodos = { text: "text", id: "3", isDone: false };
  let mockOnPress;
  let wrapper;

  beforeEach(() => {
    mockOnPress = jest.fn();
    wrapper = render(
      <RenderItem item={mockDataTodos} SetToDoItems={mockOnPress} />
    );
  });

  test("renderItem render correctly", () => {
    expect(wrapper.getByText("text")).toBeTruthy();
  });

  it("should update text style when checked", () => {
    const button = wrapper.getAllByTestId("pressable");
    const itemText = wrapper.getByText("text");

    expect(button[0]).toBeTruthy();
    expect(itemText.props.style[1]).toEqual(
      expect.objectContaining({ textDecorationLine: "none" })
    );
    fireEvent.press(button[0]);
    expect(itemText.props.style[1]).toEqual(
      expect.objectContaining({ textDecorationLine: "line-through" })
    );
  });

  it("should edit text when pressed", () => {
    const button = wrapper.getAllByTestId("pressable")[1];
    fireEvent.press(button);
    expect(wrapper.getByTestId("editTextID")).toBeTruthy();
  });

  it("should delete item when pressed", () => {
    const button = wrapper.getAllByTestId("pressable")[2];
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledWith(expect.any(Function));
    const mockItem = mockOnPress.mock.calls[0][0];
    const result = mockItem([mockDataTodos]);
    expect(result).toEqual([]);
  });

  it("should edit item when pressed", () => {
    const newText = "newText";
    const editBtn = wrapper.getAllByTestId("pressable")[1];
    fireEvent.press(editBtn);

    const editText = wrapper.getByTestId("editTextID");
    fireEvent.changeText(editText, newText);
    expect(editText.props.value).toEqual(newText);

    const checkBtn = wrapper.getAllByTestId("pressable")[0];
    fireEvent.press(checkBtn);
    expect(mockOnPress).toHaveBeenCalledWith(expect.any(Function));

    const mockItem = mockOnPress.mock.calls[0][0];
    const result = mockItem([mockDataTodos]);
    expect(result).toEqual([{ text: "newText", id: "3", isDone: false }]);
  });
});
