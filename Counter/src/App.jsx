import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [by, setBy] = useState(1);

  return (
    <>
      <h2>Counter</h2>
      <p>{count}</p>
          <button onClick={() => {
              console.log(typeof(count), typeof(by))
              setCount(count-by)
      }} style={{ margin: "5px" }}>-</button>
          <button onClick={() => {
              console.log(typeof count, typeof by);
              setCount(count+by)
      }} style={{ margin: "5px" }}>+</button>
      <p>
        Increment/Decrement by
        <input
          style={{ width: "40px" }}
          type="number"
          value={by}
          onChange={(e) => {
            setBy(Number(e.target.value));
          }}
        />
      </p>
          <button onClick={() => {
              setCount(0)
      }}>reset</button>
    </>
  );
}

export default App;
