import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLettetrs,
  score,
  guesses,
}) => {
  const [letter, setLetter] = useState();
  const letterInputRef = useRef(null);

  console.log("letttttt", letters);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s)</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className="letter" key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>

      <div className="letterContainer">
        <p>Tente adivinha a letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="inputLetter"
            ref={letterInputRef}
            maxLength="1"
            required
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <button>Jogar</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras já ultilizadas:</p>
        {wrongLettetrs.map((l) => (
          <span>{l},</span>
        ))}
      </div>
    </div>
  );
};

export default Game;
