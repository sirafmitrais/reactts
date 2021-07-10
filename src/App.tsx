import React from 'react';
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
}> = ({ items }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
)

type peopleData = {
  "name":string,
  "age":number,
  "job":string
}

interface peoplePayload {
  peopleList : peopleData[];
}


function App() {
  const onListClick = useCallback((item: string) => {
    alert(item)
  }, []);



  const [people, setPeople] = useState<peoplePayload | null>(null);

  return (
    <div className="App">
      <Heading title="Baracode"></Heading>
      <Box>
        Hello there
      </Box>
      <List items={["one","two","three"]} onClick={onListClick}/>
      <Box>

      </Box>
    </div>
  );
}

export default App;
