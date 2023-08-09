import React, { useState, useEffect } from "react";
import "./App.css";

const NUM_PAIRS = 18;

const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const App = () => {
  const [tiles, setTiles] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    const numbers = Array.from({ length: NUM_PAIRS }, (_, index) => index + 1);
    const pairedNumbers = numbers.concat(numbers);
    const shuffledNumbers = shuffleArray(pairedNumbers);
    const initialTiles = shuffledNumbers.map((number) => ({
      number,
      isFlipped: false,
    }));
    setTiles(initialTiles);
  }, []);

  useEffect(() => {
    if (selectedTiles.length === 2) {
      const [firstIndex, secondIndex] = selectedTiles;
      const firstTile = tiles[firstIndex];
      const secondTile = tiles[secondIndex];

      if (firstTile.number === secondTile.number) {
        setMatchedPairs((prevPairs) => [...prevPairs, firstTile.number]);
      } else {
        setTimeout(() => {
          setTiles((prevTiles) =>
            prevTiles.map((tile, index) =>
              selectedTiles.includes(index)
                ? { ...tile, isFlipped: false }
                : tile
            )
          );
        }, 1000);
      }
      setSelectedTiles([]);
    }
  }, [selectedTiles, tiles]);

  const handleTileClick = (index) => {
    if (selectedTiles.length < 2 && !tiles[index].isFlipped) {
      setSelectedTiles((prevSelected) => [...prevSelected, index]);
      setTiles((prevTiles) =>
        prevTiles.map((tile, tileIndex) =>
          tileIndex === index ? { ...tile, isFlipped: true } : tile
        )
      );
    }
  };

  return (
    <div>
      <h1>Memory Game</h1>
      <div className="grid">
        {tiles.map((tile, index) => (
          <div key={index} onClick={() => handleTileClick(index)}>
            {tile.isFlipped ? tile.number : "Click Me"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
