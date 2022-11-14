import { useEffect, useState } from 'react';
import './App.css';
import Bar from './Bar';
import ButtonContainer from './components/ButtonContainer';
import ArrayContainer from './components/ArrayContainer';


var globalSetArray: React.Dispatch<React.SetStateAction<Bar[]>> = () => { };
var globalMs: number = -15;

function App() {

  const [arrayLength, setArrayLength] = useState<number>(75);
  const [array, setArray] = useState<Bar[]>([]);

  const generateArray = () => {
    let temp = [];

    for (let i = 0; i < arrayLength; i++) {
      temp.push(new Bar(Math.floor((Math.random() * 2000) + 10)));
    }
    setArray(temp);
  }

  useEffect(() => {
    generateArray();
  }, [arrayLength]);

  globalSetArray = setArray;

  const [ms, setMs] = useState<number>(globalMs);
  globalMs = ms;

  return (
    <>
      <ButtonContainer
        setMs={setMs}
        ms={ms}
        array={array}
        setArrayLength={setArrayLength}
        setArray={setArray}
        arrayLength={arrayLength}
        generateArray={generateArray}
      />
      <ArrayContainer array={array} />
    </>
  );
}

export const sleepAndShow = async (arr: Bar[]) => {
  await new Promise(resolve => setTimeout(resolve, Math.abs(globalMs)));
  globalSetArray(Array.from(arr));
}

export default App;


