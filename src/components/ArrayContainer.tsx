import Bar from '../Bar';

function ArrayContainer(props: any) {
  return (
    <div className="array-container">
      {props.array.map((bar: Bar) => (<div className="array-bar" style={{
        height: (bar.value / 21) + "%",
        width: `${(1 / props.array.length) * 100}%`,
        backgroundColor: bar.isChanging ? "#006E90" : bar.isAlsoChanging ? "#FF6F59" : bar.isDone ? "#C0FDFB" : bar.isPivot ? "#FCAA67" : "#5D737E",
        transition: "60ms"
      }}></div>))}
    </div>
  );
}

export default ArrayContainer;