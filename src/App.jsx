import { useState } from "react";
import './App.css'
import Board from "./components/game-board.jsx";

const shuffleImmutable = (array) => {
  const clonedArray = [...array];
  for (let i = clonedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
  }
  return clonedArray;
};

const OG_ORDER_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [orderArray, setOrderArray] = useState(OG_ORDER_ARRAY);

  function handleCardSelect(e) {
    const id = e.currentTarget.id;
    if (selectedIds.includes(id)){
      if (currentScore > highScore) {
        setHighScore(currentScore);
      }
      setCurrentScore(0);
      setOrderArray(OG_ORDER_ARRAY);
      setSelectedIds([]);
    } else {
      const nextScore = currentScore + 1;

      setSelectedIds((previousSelectedIds) => [...previousSelectedIds, id]);
      setCurrentScore(nextScore);

      if (nextScore > highScore) {
        setHighScore(nextScore);
      }

      const shuffledArray = shuffleImmutable(orderArray);
      setOrderArray(shuffledArray);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <p>Current Score: {currentScore}</p>
        <p>High Score: {highScore}</p>
      </div>
      <div className="game-board">
        <Board
          orderArray={orderArray}
          onCardSelect={handleCardSelect}
        />
      </div>
    </div>
  )
}

export default App
