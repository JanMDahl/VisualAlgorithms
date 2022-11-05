import { useState } from 'react';
import './App.css';

class Elem {
  value: number;
  isChanging: boolean = false;
  isAlsoChanging: boolean = false;
  isDone: boolean = false;
  isPivot: boolean = false;

  constructor(n: number) {
    this.value = n;
  }
}

function App() {

  const [arrayLength, setArrayLength] = useState(50);

  const [tickMs, setTickMs] = useState(-50);

  const [array, setArray] = useState<Elem[]>(generateArray(arrayLength));

  const bubbleSort = async (arr: Elem[]) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 1; j < arr.length - i; j++) {

        if (arr[j].value < arr[j - 1].value) {
          let temp = arr[j].value;
          arr[j].value = arr[j - 1].value;
          arr[j - 1].value = temp;
        }

        arr[j].isChanging = true;
        arr[j - 1].isAlsoChanging = true;

        await new Promise(resolve => setTimeout(resolve, Math.abs(Math.floor(tickMs / 2))));
        setArray(Array.from(arr));

        arr[j].isChanging = false;
        arr[j - 1].isAlsoChanging = false;
        arr[j - 1].isChanging = true;
        arr[j].isAlsoChanging = true;

        await new Promise(resolve => setTimeout(resolve, Math.abs(Math.floor(tickMs / 2))));
        setArray(Array.from(arr));

        arr[j - 1].isChanging = false;
        arr[j].isAlsoChanging = false;
      }
      arr[arr.length - i - 1].isDone = true;
    }
  }

  const partition = async (arr: Elem[], low: number, high: number) => {
    let pivot = arr[high].value;
    arr[high].isPivot = true;
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j].value < pivot) {
        i++;

        arr[i].isChanging = true;
        arr[j].isAlsoChanging = true;
        await new Promise(resolve => setTimeout(resolve, Math.abs(Math.floor(tickMs / 2))));
        setArray(Array.from(arr));

        let temp = arr[i].value;
        arr[i].value = arr[j].value;
        arr[j].value = temp;

        arr[i].isChanging = false;
        arr[j].isAlsoChanging = false;
        arr[i].isAlsoChanging = true;
        arr[j].isChanging = true;
        await new Promise(resolve => setTimeout(resolve, Math.abs(Math.floor(tickMs / 2))));
        setArray(Array.from(arr));

        arr[i].isAlsoChanging = false;
        arr[j].isChanging = false;
      }
    }
    arr[high].isPivot = false;
    let temp = arr[i + 1].value;
    arr[i + 1].value = arr[high].value;
    arr[high].value = temp;

    return i + 1;
  }

  
  const quickSort = async  (arr: Elem[], low: number, high: number) => {
    if (low < high) {
      let pIndex = await partition(arr, low, high);
      arr[pIndex].isDone = true;

      await quickSort(arr, low, pIndex - 1);
      await quickSort(arr, pIndex + 1, high);
    } else {
      arr[low].isDone = true;
    }
  }

  return (
    <div>
      <div className="button-container">
        <button onClick={() => setArray(generateArray(arrayLength))} id="generate-button">Generate new array</button>
        <button onClick={() => bubbleSort(array)} id="sort">Bubble sort</button>
        <button onClick={() => quickSort(array, 0, array.length - 1)} id="sort">Quick sort</button>
        <button id="sort">Sort</button>
        <p>Array length:</p>
        <input max={300} min={10} type="range" value={arrayLength} onChange={(e) => setArrayLength(e.target.valueAsNumber)}></input>
        <p>Sorting speed:</p>
        <input max={-2} min={-250} type="range" value={tickMs} onChange={(e) => setTickMs(e.target.valueAsNumber)}></input>
      </div>
      <div className="array-container">
        {array.map((elem) => (<div className="array-bar" style={{
          height: elem.value + "px",
          width: `${(1 / array.length) * 100}%`,
          backgroundColor: elem.isChanging ? "#0e3687" : elem.isAlsoChanging ? "#82070f" : elem.isDone ? "#118519" : elem.isPivot ? "#7a510a" : "#131313"
        }}></div>))}
      </div>
    </div>

  );
}

export default App;


const generateArray = (arrL: number): Elem[] => {
  let temp = [];

  for (let i = 0; i < arrL; i++) {
    temp.push(new Elem(Math.floor((Math.random() * 650) + 5)));
  }
  return temp;
}


