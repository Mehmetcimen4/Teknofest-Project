import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Game.css';

function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { player1, player2 } = location.state || { player1: 'Oyuncu 1', player2: 'Oyuncu 2' };

  const [playerTurn, setPlayerTurn] = useState('left'); // İlk olarak soldaki oyuncunun sırası
  const [player1Time, setPlayer1Time] = useState(60);
  const [player2Time, setPlayer2Time] = useState(60);
  const [player1Messages, setPlayer1Messages] = useState([]);
  const [player2Messages, setPlayer2Messages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let timer;
    if (playerTurn === 'left' && player1Time > 0) {
      timer = setInterval(() => {
        setPlayer1Time((prev) => prev - 1);
      }, 1000);
    } else if (playerTurn === 'right' && player2Time > 0) {
      timer = setInterval(() => {
        setPlayer2Time((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [playerTurn, player1Time, player2Time]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    if (playerTurn === 'left') {
      setPlayer1Messages([...player1Messages, message]);
      setPlayerTurn('right');
    } else {
      setPlayer2Messages([...player2Messages, message]);
      setPlayerTurn('left');
    }

    setMessage(''); // Mesaj alanını temizle
  };

  return (
    <div className="game-page">
      <div className="top-bar">
        <div className="player-info">
          <h3>{player1}</h3>
          <div className="timer">{player1Time}s</div>
        </div>
        <div className="player-info">
          <h3>{player2}</h3>
          <div className="timer">{player2Time}s</div>
        </div>
      </div>
      <div className="chat-box">
        {player1Messages.map((msg, index) => (
          <div key={index} className="message left-message">
            {msg}
          </div>
        ))}
        {player2Messages.map((msg, index) => (
          <div key={index} className="message right-message">
            {msg}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={(playerTurn === 'left' && player2Time <= 0) || (playerTurn === 'right' && player1Time <= 0)}
        />
        <button onClick={handleSendMessage} disabled={message.trim() === ''}>
          Gönder
        </button>
      </div>
      <button onClick={() => navigate(-1)} className="back-button">Geri</button>
    </div>
  );
}

export default GamePage;
