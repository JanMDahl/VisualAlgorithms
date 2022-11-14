import Bar from "./Bar";
import { sleepAndShow } from "./App"

export const bubbleSort = async (arr: Bar[]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length - i; j++) {

      arr[j].isChanging = true;
      arr[j - 1].isAlsoChanging = true;

      await sleepAndShow(arr);

      if (arr[j].value < arr[j - 1].value) {
        let temp = arr[j].value;
        arr[j].value = arr[j - 1].value;
        arr[j - 1].value = temp;

        arr[j].isChanging = false;
        arr[j].isAlsoChanging = true;
        arr[j - 1].isChanging = true;
      }

      await sleepAndShow(arr);

      arr[j].isChanging = false;
      arr[j - 1].isAlsoChanging = false;
      arr[j].isAlsoChanging = false;
      arr[j - 1].isChanging = false;
    }
    arr[arr.length - i - 1].isDone = true;
  }
}

export const cocktailSort = async (arr: Bar[]) => {
  let swapped = true;
  let start = 0;
  let end = arr.length;

  while (swapped) {
    swapped = false;

    for (let i = start; i < end - 1; i++) {
      arr[i].isChanging = true;
      arr[i + 1].isAlsoChanging = true;

      await sleepAndShow(arr);

      if (arr[i].value > arr[i + 1].value) {
        let temp = arr[i].value;
        arr[i].value = arr[i + 1].value;
        arr[i + 1].value = temp;
        swapped = true;

        arr[i].isChanging = false;
        arr[i].isAlsoChanging = true;
        arr[i + 1].isChanging = true;
      }
      await sleepAndShow(arr);

      arr[i].isChanging = false;
      arr[i + 1].isAlsoChanging = false;
      arr[i].isAlsoChanging = false;
      arr[i + 1].isChanging = false;
    }

    if (!swapped) {
      break;
    }

    swapped = false;
    arr[end - 1].isDone = true;
    end = end - 1;

    for (let i = end - 1; i >= start; i--) {
      arr[i].isChanging = true;
      arr[i + 1].isAlsoChanging = true;

      await sleepAndShow(arr);

      if (arr[i].value > arr[i + 1].value) {
        let temp = arr[i].value;
        arr[i].value = arr[i + 1].value;
        arr[i + 1].value = temp;
        swapped = true;

        arr[i].isChanging = false;
        arr[i].isAlsoChanging = true;
        arr[i + 1].isChanging = true;
      }


      await sleepAndShow(arr);

      arr[i].isChanging = false;
      arr[i + 1].isAlsoChanging = false;
      arr[i + 1].isChanging = false;
      arr[i].isAlsoChanging = false;
    }
    arr[start].isDone = true;
    start = start + 1;
  }
  arr.forEach((e) => e.isDone = true);
}

const partition = async (arr: Bar[], low: number, high: number) => {
  let pivot = arr[high].value;
  arr[high].isPivot = true;
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j].value < pivot) {
      i++;

      arr[i].isChanging = true;
      arr[j].isAlsoChanging = true;
      await sleepAndShow(arr);

      let temp = arr[i].value;
      arr[i].value = arr[j].value;
      arr[j].value = temp;

      arr[i].isChanging = false;
      arr[j].isAlsoChanging = false;
      arr[i].isAlsoChanging = true;
      arr[j].isChanging = true;
      await sleepAndShow(arr);

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


export const quickSort = async (arr: Bar[], low: number, high: number) => {
  if (low < high) {
    let pIndex = await partition(arr, low, high);
    arr[pIndex].isDone = true;

    await quickSort(arr, low, pIndex - 1);
    await quickSort(arr, pIndex + 1, high);
  } else {
    arr[low].isDone = true;
  }
}

const merge = async (arr: Bar[], left: number, mid: number, right: number) => {
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
    await sleepAndShow(arr);
    arr[k].isChanging = false;
    k++;
  }

  while (i < first.length) {
    arr[k] = first[i];
    i++;
    arr[k].isChanging = true;
    await sleepAndShow(arr);
    arr[k].isChanging = false;
    k++;
  }

  while (j < second.length) {
    arr[k] = second[j];
    j++;

    arr[k].isChanging = true;
    await sleepAndShow(arr);
    arr[k].isChanging = false;

    k++;
  }
  first.forEach((e) => e.isAlsoChanging = false);
  second.forEach((e) => e.isPivot = false);
}

export const mergeSort = async (arr: Bar[], left: number, right: number) => {
  if (left < right) {
    let mid = left + Math.floor((right - left) / 2);

    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);

  }
  if (left === 0 && right === arr.length - 1) {
    arr.forEach((e) => e.isDone = true);
  }
  await sleepAndShow(arr);
}

const getMax = (arr: Bar[], n: number) => {
  let max = arr[0].value;

  for (let i = 1; i < n; i++) {
    if (arr[i].value > max) {
      max = arr[i].value;
    }
  }
  return max;
}

const countSort = async (arr: Bar[], n: number, exp: number) => {

  let output: Bar[] = [];
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
    await sleepAndShow(arr);
    arr[i].isChanging = false;
  }
}

export const radixSort = async (arr: Bar[], n: number) => {
  let m = getMax(arr, n);

  for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
    await countSort(arr, n, exp);
  }

  arr.forEach((e) => e.isDone = true);
  await sleepAndShow(arr);
}