import "./GameOver.css";

const GameOver = ({ retryGame, score }) => {
  return (
    <div>
      <h1>Fim de jogo</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <button onClick={retryGame}>Reiniciar o jogo</button>
    </div>
  );
};

export default GameOver;
