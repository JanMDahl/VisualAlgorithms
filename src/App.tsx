import { useState } from 'react';
import './App.css';
import Bar from './Bar';
import ButtonContainer, { generateArray } from './components/ButtonContainer';
import ArrayContainer from './components/ArrayContainer';


var globalSetArray: React.Dispatch<React.SetStateAction<Bar[]>> = () => {};
var globalMs: number = -15;

function App() {
  const arrayLength = 75;
  const [array, setArray] = useState<Bar[]>(generateArray(arrayLength));
  globalSetArray = setArray;
  const [ms, setMs] = useState<number>(globalMs);
  globalMs = ms;


  return (
    <>
      <ButtonContainer array={array} setArray={setArray} arrayLength={arrayLength} setMs={setMs} ms={ms} />
      <ArrayContainer array={array} />
    </>
  );
}

export const sleepAndShow = async (arr: Bar[]) => {
  await new Promise(resolve => setTimeout(resolve, Math.abs(Math.floor(globalMs))));
  globalSetArray(Array.from(arr));
}

export default App;


