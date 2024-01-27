/* eslint-disable no-dupe-else-if */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../assets/circle.png";
import cross_icon from "../assets/cross.png";

function TicTacToe() {
  let [data, setData] = useState(Array.from({ length: 9 }, () => ""));
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);

  const toggle = (e, index) => {
    console.log(count);
    if (lock) {
      return;
    }
    const newData = [...data];
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src=${cross_icon}>`;
      newData[index] = "x";
      setData(newData);
      setCount((prevCount) => prevCount + 1);
    } else {
      e.target.innerHTML = `<img src=${circle_icon}>`;
      newData[index] = "0";
      setData(newData);
      setCount((prevCount) => prevCount + 1);
    }
    checkWin(newData);
  };
  // const checkWin = () => {
  //   if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
  //     won(data[2]);
  //   } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
  //     won(data[5]);
  //   } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
  //     won(data[8]);
  //   } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
  //     won(data[6]);
  //   } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
  //     won(data[7]);
  //   } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
  //     won(data[8]);
  //   } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
  //     won(data[8]);
  //   } else if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
  //     won(data[2]);
  //   } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
  //     won(data[6]);
  //   }
  // };
  const checkWin = (newData) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        newData[a] &&
        newData[a] === newData[b] &&
        newData[b] === newData[c]
      ) {
        won(newData[a]);
        return;
      }
    }
    if (!newData.includes("")) {
      setLock(true);
      titleRef.current.innerHTML = "It's a draw!";
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Congrts:<img src=${cross_icon}> `;
    } else {
      titleRef.current.innerHTML = `Congrts:<img src=${circle_icon}> `;
    }
  };
  const resetGame = () => {
    setCount(0);
    setLock(false);
    data.fill("");
    document.querySelectorAll(".boxes").forEach((box) => (box.innerHTML = ""));
    document.querySelector(".title").innerHTML = `
        Tic Tac Toe Game In <span>React</span>
      `;
  };
  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game In <span>React</span>
      </h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="row2">
          <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="row3">
          <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}

export default TicTacToe;
