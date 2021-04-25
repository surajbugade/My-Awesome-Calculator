import { useState } from "react";
import "./App.css";

function App() {
  let [oldExpression, setOldExpression] = useState("");
  let [expression, setExpression] = useState("0");
  let [prev, setPrev] = useState("ANS");

  let numerics = new Set("0123456789");
  let operators = new Set("+-*/%.");
  
  let buttons = [
    "^_^",
    "AC",
    "CE",
    "%",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  let evaluateExpression = function () {
    try {
        // eslint-disable-next-line
      let evaluation = eval(expression);
      setOldExpression(expression + " =");
      expression = setExpression(String(evaluation));
      setPrev("ANS");
    } catch {
      setOldExpression(expression + " =");
      setExpression("Error");
      setPrev("Err");
    }
  }

  let putNumerics = function (value) {
    if(prev === "ANS") {
      setOldExpression("ANS = " + expression);
      setExpression(value);
    } else if(prev === "AC") {
      setExpression(expression.slice(0, -1) + value);
    } else if(prev === "Err") {
      setExpression(value);
    } else {
      setExpression(expression + value);
    }
    setPrev("NUM");
  }

  let putOperator = function (value) {
    if(prev === "Err") {
      setExpression("0" + value);
    } else if(prev !== "OP"){
      setExpression(expression + value);
    } else {
      setExpression(expression.slice(0, -1) + value);
    }
    setPrev("OP");
  }

  let putDelete = function () {
    if(expression.length >= 1){
      setExpression(expression.slice(0, -1));
    }
    setPrev("DEL");
  }
  
  let clearAll = function () {
    if(expression.length >= 1){
      if(prev === "ANS") {
        setOldExpression("ANS = " + expression);
      }
      setExpression("0");
    }
    setPrev("AC");
  }

  let handleKeyUp = function (event) {
    console.log(event.key);
    if (event.key === "Backspace") {
      putDelete();
    } else if (event.key === "Delete") {
      clearAll();
    } else if (numerics.has(event.key)) {
      putNumerics(event.key);
    } else if(operators.has(event.key)) {
      putOperator(event.key);
    } else if (event.key === "Enter") {
      evaluateExpression();
    }
  };

  return (
    <div className="App" tabIndex={0} onKeyUp={handleKeyUp}>
      <div style = {{
        padding: "10px",
        borderRadius: "15px",
        background: "#333333",
        display: "flex",
        flexDirection: "column"
      }}>
        <div
        style = {{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        > 
          <img src = "calculate.png" alt = "Calc"
            style = {{
              height: "50px",
              marginRight: "10px"
            }} />
          <h1 style = {{
            color: "#ffffff",
            textAlign: "center",
            fontFamily: "Lobster Two, cursive",
            fontSize: "38px"
          }}>
            My Awesome Calculator
          </h1>
        </div>
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
        <h4>{oldExpression}</h4>
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
          margin: "20px",
          borderRadius: "10px",
          flexWrap: "wrap",
        }}
      >
        {buttons.map(function (buttonValue, idx) {
          return (
            <button className = "Calc" 
              style={{
                width: "90px",
                height: "40px",
                padding: "5px",
                margin: "5px",
                borderRadius: "10px",
                fontSize: "20px",
                fontFamily: "JetBrains Mono, monospace"
              }}
              onClick={function () {
                if (buttonValue === "CE") {
                  putDelete();
                } else if (buttonValue === "AC") {
                  clearAll();
                } else if (numerics.has(buttonValue)) {
                  putNumerics(buttonValue);
                } else if(operators.has(buttonValue)) {
                  putOperator(buttonValue);
                } else if (buttonValue === "=") {
                  evaluateExpression();
                }
              }}
              >
              {buttonValue}
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default App;
