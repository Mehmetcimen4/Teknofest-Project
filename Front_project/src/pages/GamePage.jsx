import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Game.css';

function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [player1, setPlayer1] = useState(() => localStorage.getItem('player1') || 'Oyuncu 1');
  const [player2, setPlayer2] = useState(() => localStorage.getItem('player2') || 'Oyuncu 2');
  const [playerTurn, setPlayerTurn] = useState('left');
  const [player1Time, setPlayer1Time] = useState(() => parseInt(localStorage.getItem('player1Time')) || 60);
  const [player2Time, setPlayer2Time] = useState(() => parseInt(localStorage.getItem('player2Time')) || 60);
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('messages')) || []);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const latestPlayer1 = localStorage.getItem('player1');
    const latestPlayer2 = localStorage.getItem('player2');
    const latestPlayer1Time = parseInt(localStorage.getItem('player1Time'));
    const latestPlayer2Time = parseInt(localStorage.getItem('player2Time'));

    if (latestPlayer1) setPlayer1(latestPlayer1);
    if (latestPlayer2) setPlayer2(latestPlayer2);
    if (latestPlayer1Time) setPlayer1Time(latestPlayer1Time);
    if (latestPlayer2Time) setPlayer2Time(latestPlayer2Time);

    setMessages(JSON.parse(localStorage.getItem('messages')) || []);
    setPlayerTurn('left');
  }, [location]);

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

  useEffect(() => {
    localStorage.setItem('player1Time', player1Time);
    localStorage.setItem('player2Time', player2Time);
    localStorage.setItem('playerTurn', playerTurn);
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [player1Time, player2Time, playerTurn, messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const newMessage = {
      sender: playerTurn === 'left' ? player1 : player2,
      text: message,
      side: playerTurn === 'left' ? 'left' : 'right',
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));

    setPlayerTurn(playerTurn === 'left' ? 'right' : 'left');
    setMessage('');
  };

  const handleBackButton = () => {
    // Sıfırla
    localStorage.removeItem('player1Time');
    localStorage.removeItem('player2Time');
    localStorage.removeItem('messages');
    localStorage.removeItem('playerTurn');
    navigate(-1);
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
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.side}-message`}
          >
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={(playerTurn === 'left' && player2Time <= 0) || (playerTurn === 'right' && player1Time <= 0)}
        />
        <button type="submit" disabled={message.trim() === ''}>
          Gönder
        </button>
      </form>
      <button onClick={handleBackButton} className="back-button">Geri</button>
    </div>
  );
}

export default GamePage;
