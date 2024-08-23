import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Game.css';

function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [player1, setPlayer1] = useState(() => localStorage.getItem('player1') || 'Oyuncu 1');
  const [player2, setPlayer2] = useState(() => localStorage.getItem('player2') || 'Oyuncu 2');
  const [playerTurn, setPlayerTurn] = useState('left'); // İlk olarak soldaki oyuncunun sırası
  const [player1Time, setPlayer1Time] = useState(() => parseInt(localStorage.getItem('player1Time')) || 60);
  const [player2Time, setPlayer2Time] = useState(() => parseInt(localStorage.getItem('player2Time')) || 60);
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('messages')) || []);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Oyuncu isimlerini her oyuna girişte en güncel haliyle localStorage'dan çek
    const latestPlayer1 = localStorage.getItem('player1');
    const latestPlayer2 = localStorage.getItem('player2');

    if (latestPlayer1) setPlayer1(latestPlayer1);
    if (latestPlayer2) setPlayer2(latestPlayer2);

    // Yeni bir oyuna başladığınızda süreleri ve mesajları sıfırla
    setPlayer1Time(60);
    setPlayer2Time(60);
    setMessages([]);
    setPlayerTurn('left');
    localStorage.removeItem('player1Time');
    localStorage.removeItem('player2Time');
    localStorage.removeItem('messages');
  }, [location]);

  useEffect(() => {
    // Zamanlayıcıyı başlat
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
    // Bilgileri localStorage'a kaydet
    localStorage.setItem('player1Time', player1Time);
    localStorage.setItem('player2Time', player2Time);
    localStorage.setItem('playerTurn', playerTurn);
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [player1Time, player2Time, playerTurn, messages]);

  const handleSendMessage = (e) => {
    e.preventDefault(); // Sayfa yenilemesini engelle
    if (message.trim() === '') return;

    const newMessage = {
      sender: playerTurn === 'left' ? player1 : player2,
      text: message,
      side: playerTurn === 'left' ? 'left' : 'right',
    };

    setMessages([...messages, newMessage]);

    // Sıra değişikliği
    setPlayerTurn(playerTurn === 'left' ? 'right' : 'left');

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
      <button onClick={() => navigate(-1)} className="back-button">Geri</button>
    </div>
  );
}

export default GamePage;
