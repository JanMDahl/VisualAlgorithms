import { bubbleSort, quickSort, mergeSort, radixSort, cocktailSort } from '../algos';

const reset = () => {
    window.location.reload();
}

function ButtonContainer(props: any) {
    return (
        <>
            <div className="button-container">
                <button onClick={() => props.generateArray()} id="generate-button">Generate new array</button>
                <button onClick={() => reset()} id="reset-button">Reset</button>
                <button onClick={() => bubbleSort(props.array)} id="sort">Bubble sort</button>
                <button onClick={() => quickSort(props.array, 0, props.array.length - 1)} id="sort">Quick sort</button>
                <button onClick={() => mergeSort(props.array, 0, props.array.length - 1)} id="sort">Merge sort</button>
                <button onClick={() => radixSort(props.array, props.array.length)} id="sort">Radix sort</button>
                <button onClick={() => cocktailSort(props.array)} id="sort">Cocktail sort</button>
                <div className="slider-container">
                    <p>Array length</p>
                    <input max={400} min={35} type="range" className="input" defaultValue={props.arrayLength} onChange={(e) => {
                        props.setArrayLength(e.target.valueAsNumber);
                    }}></input>
                </div>
                <div className="slider-container">
                    <p>Sorting speed</p>
                    <input max={-1} min={-125} type="range" className="input" defaultValue={props.ms} onChange={(e) => props.setMs(e.target.valueAsNumber)}></input>
                </div>
            </div>
        </>
    );
}

export default ButtonContainer;