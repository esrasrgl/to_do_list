import { render, screen, fireEvent } from "@testing-library/react-native";
import React from "react";
import ToDoScreen from "./ToDoScreen";
import App from "../App";

test("basic test btn", () => {
  render(<App />);
  expect(screen.getByTestId("addText")).toBeTruthy();
});

describe("ToDoScreen", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<ToDoScreen />);
  });

  test("should render correctly", () => {
    wrapper.getByTestId("toDoScreen");
  });

  it("should flatList render correctly", () => {
    wrapper.getByTestId("flatId");
    expect(wrapper).toBeTruthy();
  });

  it("should add new item toDo", () => {
    const enterTetx = wrapper.getByTestId("addText");
    const newText = "newText";
    const addItem = wrapper.getByTestId("pressable");

    fireEvent.changeText(enterTetx, newText);
    expect(enterTetx.props.value).toBe(newText);

    fireEvent.press(addItem);
    let toDoData = wrapper.getByTestId("flatId").props;
    expect(toDoData.data.length).toBe(1);

    fireEvent.changeText(enterTetx, newText + 2);
    fireEvent.press(addItem);

    toDoData = wrapper.getByTestId("flatId").props;
    expect(toDoData.data.length).toBe(2);
  });
});
