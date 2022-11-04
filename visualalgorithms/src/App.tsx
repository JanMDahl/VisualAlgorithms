import React, { useEffect, useState } from 'react';
import { JsxElement } from 'typescript';
import './App.css';

class Elem {
  value : number;
  isChanging : boolean = false;
  isAlsoChanging : boolean = false;
  isDone : boolean = false;

  constructor(n : number)
  {
    this.value = n;
  }
}

function App() {

  const [array, setArray] = useState<Elem[]>(generateArray());

  const bubbleSort = async (arr : Elem[]) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 1; j < arr.length - i; j++) {

        


        if (arr[j].value < arr[j - 1].value) {
          let temp = arr[j].value;
          arr[j].value = arr[j - 1].value;
          arr[j - 1].value = temp;
        }

        arr[j].isChanging = true;
          arr[j-1].isAlsoChanging = true;
          
          await new Promise(resolve => setTimeout(resolve, 1));
          setArray(Array.from(arr));

          arr[j].isChanging = false;
          arr[j-1].isAlsoChanging = false;
          arr[j-1].isChanging = true;
          arr[j].isAlsoChanging = true;
          

          await new Promise(resolve => setTimeout(resolve, 1));
          setArray(Array.from(arr));

          arr[j-1].isChanging = false;
          arr[j].isAlsoChanging = false;


      }
      arr[arr.length - i - 1].isDone = true;
    }
  }

  return (
    <div>
      <div className="button-container">
        <button onClick={() => setArray(generateArray())} id="generate-button">Generate new array</button>
        <button onClick={() => bubbleSort(array)} id="sort">Bubble sort</button>
        <button id="sort">Quick sort</button>
        <button id="sort">Sort</button>
      </div>
      <div className="array-container">
        {array.map((elem ) => (<div className="array-bar" style={{
                                          height: elem.value + "px",
                                          width: `${(1 / array.length) * 100}%`,
                                          backgroundColor: elem.isChanging ? "blue" : elem.isAlsoChanging ? "red" : elem.isDone ? "green" : "grey" }}></div>))}
      </div>
    </div>

  );
}

export default App;


const generateArray = (): Elem[] => {
  let temp = [];

  for (let i = 0; i < 100; i++) {
    temp.push(new Elem(Math.floor((Math.random() * 625) + 5)));
  }
  return temp;
}


