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

  const [arrayLength, setArrayLength] = useState(75);

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

        await showAndWait(arr);

        arr[j].isChanging = false;
        arr[j - 1].isAlsoChanging = false;
        arr[j - 1].isChanging = true;
        arr[j].isAlsoChanging = true;

        await showAndWait(arr);

        arr[j - 1].isChanging = false;
        arr[j].isAlsoChanging = false;
      }
      arr[arr.length - i - 1].isDone = true;
    }
  }

  const cocktailSort = async (arr: Elem[]) => {
    let swapped = true;
    let start = 0;
    let end = arr.length;

    while (swapped) {
      swapped = false;

      for (let i = start; i < end - 1; i++) {
        if (arr[i].value > arr[i + 1].value) {
          let temp = arr[i].value;
          arr[i].value = arr[i + 1].value;
          arr[i + 1].value = temp;
          swapped = true;
        }

        arr[i].isChanging = true;
        arr[i + 1].isAlsoChanging = true;

        await showAndWait(arr);

        arr[i].isChanging = false;
        arr[i + 1].isAlsoChanging = false;
        arr[i + 1].isChanging = true;
        arr[i].isAlsoChanging = true;

        await showAndWait(arr);

        arr[i + 1].isChanging = false;
        arr[i].isAlsoChanging = false;
      }

      if (!swapped) {
        break;
      }

      swapped = false;
      arr[end - 1].isDone = true;
      end = end - 1;

      for (let i = end - 1; i >= start; i--) {
        if (arr[i].value > arr[i + 1].value) {
          let temp = arr[i].value;
          arr[i].value = arr[i + 1].value;
          arr[i + 1].value = temp;
          swapped = true;
        }

        arr[i].isChanging = true;
        arr[i + 1].isAlsoChanging = true;

        await showAndWait(arr);

        arr[i].isChanging = false;
        arr[i + 1].isAlsoChanging = false;
        arr[i + 1].isChanging = true;
        arr[i].isAlsoChanging = true;

        await showAndWait(arr);

        arr[i + 1].isChanging = false;
        arr[i].isAlsoChanging = false;
      }
      arr[start].isDone = true;
      start = start + 1;
    }
    arr.forEach((e) => e.isDone = true);
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
        await showAndWait(arr);

        let temp = arr[i].value;
        arr[i].value = arr[j].value;
        arr[j].value = temp;

        arr[i].isChanging = false;
        arr[j].isAlsoChanging = false;
        arr[i].isAlsoChanging = true;
        arr[j].isChanging = true;
        await showAndWait(arr);

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


  const quickSort = async (arr: Elem[], low: number, high: number) => {
    if (low < high) {
      let pIndex = await partition(arr, low, high);
      arr[pIndex].isDone = true;

      await quickSort(arr, low, pIndex - 1);
      await quickSort(arr, pIndex + 1, high);
    } else {
      arr[low].isDone = true;
    }
  }

  const merge = async (arr: Elem[], left: number, mid: number, right: number) => {
    let first = arr.slice(left, mid + 1);
    let second = arr.slice(mid + 1, right + 1);

    first.forEach((e) => e.isAlsoChanging = true);
    second.forEach((e) => e.isPivot = true);

    let i = 0;
    let j = 0;

    let k = left;

    while (i < first.length && j < second.length) {
      if (first[i].value <= second[j].value) {
        arr[k] = first[i];
        i++;
      } else {
        arr[k] = second[j];
        j++;
      }
      arr[k].isChanging = true;
      await showAndWait(arr);
      arr[k].isChanging = false;
      k++;
    }

    while (i < first.length) {
      arr[k] = first[i];
      i++;
      arr[k].isChanging = true;
      await showAndWait(arr);
      arr[k].isChanging = false;
      k++;
    }

    while (j < second.length) {
      arr[k] = second[j];
      j++;

      arr[k].isChanging = true;
      await showAndWait(arr);
      arr[k].isChanging = false;

      k++;
    }
    first.forEach((e) => e.isAlsoChanging = false);
    second.forEach((e) => e.isPivot = false);
  }

  const mergeSort = async (arr: Elem[], left: number, right: number) => {
    if (left < right) {
      let mid = left + Math.floor((right - left) / 2);

      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);

    }
    if (left === 0 && right === arr.length - 1) {
      arr.forEach((e) => e.isDone = true);
    }
    await showAndWait(arr);
  }

  const getMax = (arr: Elem[], n: number) => {
    let max = arr[0].value;

    for (let i = 1; i < n; i++) {
      if (arr[i].value > max) {
        max = arr[i].value;
      }
    }
    return max;
  }

  const countSort = async (arr: Elem[], n: number, exp: number) => {

    let output: Elem[] = [];
    let i: number;
    let count: number[] = [];

    for (i = 0; i < 10; i++) {
      count[i] = 0;
    }

    for (let i = 0; i < n; i++) {
      count[Math.floor(arr[i].value / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      output[count[Math.floor(arr[i].value / exp) % 10] - 1] = arr[i];
      count[Math.floor(arr[i].value / exp) % 10]--;
    }

    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      arr[i].isChanging = true;
      await showAndWait(arr);
      arr[i].isChanging = false;
    }
  }

  const radixSort = async (arr: Elem[], n: number) => {
    let m = getMax(arr, n);

    for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
      await countSort(arr, n, exp);
    }

    arr.forEach((e) => e.isDone = true);
    await showAndWait(arr);
  }


  async function showAndWait(arr: Elem[]) {
    await new Promise(resolve => setTimeout(resolve, Math.abs(Math.floor(tickMs / 2))));
    setArray(Array.from(arr));
  }

  return (
    <div>
      <div className="button-container">
        <button onClick={() => setArray(generateArray(arrayLength))} id="generate-button">Generate new array</button>
        <button onClick={() => reset()} id="reset-button">Reset</button>
        <button onClick={() => bubbleSort(array)} id="sort">Bubble sort</button>
        <button onClick={() => quickSort(array, 0, array.length - 1)} id="sort">Quick sort</button>
        <button onClick={() => mergeSort(array, 0, array.length - 1)} id="sort">Merge sort</button>
        <button onClick={() => radixSort(array, array.length)} id="sort">Radix sort</button>
        <button onClick={() => cocktailSort(array)} id="sort">Cocktail sort</button>
        <div className="slider-container">
          <p>Array length</p>
          <input max={525} min={10} type="range" className="input" defaultValue={arrayLength} onChange={(e) => {
            setArray(generateArray(e.target.valueAsNumber))
            setArrayLength(e.target.valueAsNumber)
          }}></input>
        </div>
        <div className="slider-container">
        <p>Sorting speed</p>
        <input max={-2} min={-150} type="range" className="input" defaultValue={tickMs} onChange={(e) => tickMs = e.target.valueAsNumber}></input>
        </div>
      </div>
      <div className="array-container">
        {array.map((elem) => (<div className="array-bar" style={{
          height: (elem.value / 21) + "%",
          width: `${(1 / array.length) * 100}%`,
          backgroundColor: elem.isChanging ? "#006E90" : elem.isAlsoChanging ? "#FF6F59" : elem.isDone ? "#C0FDFB" : elem.isPivot ? "#FCAA67" : "#5D737E"
        }}></div>))}
      </div>
    </div>
  );
}

export default App;

const generateArray = (arrL: number): Elem[] => {
  let temp = [];

  for (let i = 0; i < arrL; i++) {
    temp.push(new Elem(Math.floor((Math.random() * 2000) + 5)));
  }
  return temp;
}

const reset = () => {
  window.location.reload();
}

var tickMs = -10;
