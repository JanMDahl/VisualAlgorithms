export default class Bar {
    value: number;
    isChanging: boolean = false;
    isAlsoChanging: boolean = false;
    isDone: boolean = false;
    isPivot: boolean = false;
  
    constructor(n: number) {
      this.value = n;
    }
  }