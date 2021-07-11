import React, { useReducer, useRef } from 'react';
import { useCallback, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { isTemplateExpression } from 'typescript';

const Heading = ({title}:{title: string},{name}:{name: string}) => (
  <h2>
    {title}
  </h2>
)

const Box:React.FunctionComponent = ({ children }) => (
  <div
    style={{
      padding: '1rem',
      fontWeight: "bold",
    }}
  >
    {children}
  </div>
);

const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void;
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>{item}</li>
    ))}
  </ul>
)


const useNumber = (initialValue: number) => useState<number>(initialValue)

type UseNumberType = ReturnType<typeof useNumber>[0]
type UseNumberSetType = ReturnType<typeof useNumber>[1]


type IncrementerType = {
  value: UseNumberType;
  setValue: UseNumberSetType;
}

const Incrementer = ({ value, setValue}: IncrementerType) => 
  <button onClick={() => setValue(value + 1)}>
    Add - {value}
  </button>;

type peopleData = {
  "name":string,
  "age":number,
  "job":string
}

interface peoplePayload {
  peopleList : peopleData[];
}

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };


function App() {
  const onListClick = useCallback((item: string) => {
    alert(item)
  }, []);

  const [people, setPeople] = useState<peoplePayload | null>(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    fetch('/dataPeople.json')
      .then(resp => resp.json())
      .then(data => {
        setPeople(data)
      });
  }, []);

  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
      default:
        throw new Error();
    }
  }, []);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  return (
    <div className="App">
      <Heading title="Baracode"></Heading>
      <Box>
        Hello there
      </Box>
      <Incrementer value={value} setValue={setValue}></Incrementer>
      <List items={["one","two","three"]} onClick={onListClick}/>
      <Box>
        {JSON.stringify(people)}
      </Box>

      <Heading title="Todo"></Heading>
      {todos.map((todo) => (
        <div key = {todo.id}>
          {todo.text}
          <button 
            onClick={() => 
              dispatch({
                type: "REMOVE", 
                id: todo.id,
                })
              }
            >
            Remove
          </button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </div>
    </div>
  );
}

export default App;
