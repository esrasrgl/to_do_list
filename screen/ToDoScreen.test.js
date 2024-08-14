import { render, screen } from '@testing-library/react-native';
import React from 'react';
import ToDoScreen from './ToDoScreen';
import App from '../App';


test ('basic test btn', ()=>{
    render(<App/>);
    expect(screen.getByTestId("addText")).toBeTruthy();
  })

describe('ToDoScreen', ()=>{
    test('should render correctly', ()=>{
        const wrapper = render(<ToDoScreen/>);
        wrapper.getByTestId('toDoScreen');
    });

    // test('should navigate to drawer', ()=>{
    //     throw new Error('not implemented');
    // });

    
})