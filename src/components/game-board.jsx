import { useState, useEffect } from "react";
import Card from "./card.jsx";

const POKEMON_NAMES = [
  "ditto",
  "pikachu",
  "charizard",
  "bulbasaur",
  "squirtle",
  "clefairy",
  "nidoking",
  "abra",
  "muk",
  "shellder"
]

// Board div that rerenders every time a card is selected
function Board({ orderArray, onCardSelect }) {
  const [cardInfos, setCardInfos] = useState([]);

  // the image URLs should only be loaded once upon the first mount
  useEffect(() => {
    async function fetchCardInfos() {
      const fetchedCardInfos = await Promise.all(
      POKEMON_NAMES.map(async (pokemonName) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        const data = await response.json();
        return {
          name: pokemonName,
          imageUrl:data.sprites.front_default
        };
      })
      );
      setCardInfos(fetchedCardInfos);
    }
    
    fetchCardInfos();
    

    return () => {
      console.log("Running effect cleanup function")
      setCardInfos([]);
    }
  }, []);
  
  return (
    <>
    {orderArray.map((index) => {
      //  don't render anything until the effect is done running
      if (cardInfos.length === 0) {
        return;
      }
      const currentCard = cardInfos[index];
      return (
        <Card
          key={currentCard.name}
          name={currentCard.name}
          imageUrl={currentCard.imageUrl}
          onCardSelect={onCardSelect}
        />

      )
    }
    )}
    </>
  )

}

export default Board;