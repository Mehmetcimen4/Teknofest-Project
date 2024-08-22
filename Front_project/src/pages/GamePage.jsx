import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Game.css';

function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [player1, setPlayer1] = useState(() => localStorage.getItem('player1') || 'Oyuncu 1');
  const [player2, setPlayer2] = useState(() => localStorage.getItem('player2') || 'Oyuncu 2');
  const [playerTurn, setPlayerTurn] = useState('left'); // İlk olarak soldaki oyuncunun sırası
  const [player1Time, setPlayer1Time] = useState(60);
  const [player2Time, setPlayer2Time] = useState(60);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
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
    // Verileri JSON server'dan çekme
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:5000/players');
        const data = await response.json();
        if (data.length >= 2) {
          setPlayer1(data[0].name);
          setPlayer2(data[1].name);
          localStorage.setItem('player1', data[0].name);
          localStorage.setItem('player2', data[1].name);
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchPlayers();
  }, []);

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

  const handleSendMessage = () => {
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
