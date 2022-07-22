// CSS
import "./App.css";
// React
import { useEffect, useState } from "react";
// Data
import { wordsList } from "./data/wordsList";
// Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQtd = 5;

function App() {
  const [gameState, setGameState] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [lettersList, setLettersList] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQtd);
  const [score, setScore] = useState(0);

  // Starts the screts word game
  const startGame = () => {
    clearLetterStates();
    // pick word and pick category
    const { word, category } = pickWordAndCategory();
    // create array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // Fill states
    setPickedCategory(category);
    setPickedWord(word);
    setLettersList(wordLetters);
    console.log("wordLetters", wordLetters);
    console.log("lettersList", lettersList);

    setGameState(stages[1].name);
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      // reset all state
      clearLetterStates();
      setGameState(stages[2].name);
    }
  }, [guesses]);

  // Check win condition
  useEffect(() => {
    const uniqueLetter = [...new Set(lettersList)];
    console.log("unique", uniqueLetter);
    // win condition
    if (guessedLetters.length === uniqueLetter.length) {
      // add score
      setScore((actualScore) => (actualScore += 100));
      startGame();
    }
  }, [guessedLetters, lettersList]);

  // Check game over
  useEffect(() => {
    if (guesses <= 0) {
      // reset all state

      clearLetterStates();
      setGameState(stages[2].name);
    }
  }, [guesses]);

  const pickWordAndCategory = () => {
    // pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    console.log("category", category);

    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return { word, category };
  };

  // restarts the screts word game
  const retryGame = () => {
    setScore(0);
    setGuesses(guessesQtd);
    setGameState(stages[0].name);
  };

  // process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // Check if letter das already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a guess
    if (lettersList.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actuaWrongLetters) => [
        ...actuaWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }

    console.log(letter, "verifyLEtter");
    console.log(guessedLetters, "Guessed");
    console.log(wrongLetters, "Wrong");
  };

  return (
    <div className="App">
      {gameState === "start" && <StartScreen startGame={startGame} />}
      {gameState === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={lettersList}
          guessedLetters={guessedLetters}
          wrongLettetrs={wrongLetters}
          score={score}
          guesses={guesses}
        />
      )}
      {gameState === "end" && <GameOver retryGame={retryGame} score={score} />}
    </div>
  );
}

export default App;
