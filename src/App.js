import { useState } from 'react';
import './App.css';

function App() {

  let [oldExpression, setOldExpression] = useState("");
  let [expression, setExpression] = useState("");

  let numerics = new Set("0123456789");
  let operators = new Set("+-*/");
  let buttons = ["(", ")", "%", "AC", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"]

  let handleKeyUp = function(event){
    console.log(event.key);
    if(event.key === "Backspace") {
      setExpression(expression.slice(0,-1));
    } else if(numerics.has(event.key) || operators.has(event.key)){
      setExpression(expression + event.key);
    } else if(event.key === "Enter"){ // eslint-disable-next-line
      let evaluation = eval(expression); 
      setOldExpression(expression);
      expression = setExpression(String(evaluation));
    }
  }

  return (
    <div className="App" tabIndex={0} onKeyUp={handleKeyUp}>

      <div  
        style={{
        width: "400px",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "20px",
        borderRadius: "10px",
        overflow: "hidden",
        margin: "20px"
        }}
      >

    <h5>{oldExpression}</h5>
    <h1>{expression}</h1>
    </div>
    <div 
        style={{
        width: "400px",
        background: "#ffffff",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "20px",
        borderRadius: "10px",
        flexWrap: "wrap"
        }}
      >
        {buttons.map(function (buttonValue, idx) {
          return (
            <button 
            style={{
              width: "90px",
              height: "40px",
              padding: "5px",
              margin: "5px",
              fontSize: "19px"
            }}
            >
              {buttonValue}
            </button>
          );
        })}

    </div>
    </div>
  );
}

export default App;
