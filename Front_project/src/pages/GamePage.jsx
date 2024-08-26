import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Game.css';

function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [player1, setPlayer1] = useState(() => localStorage.getItem('player1') || 'Oyuncu 1');
  const [player2, setPlayer2] = useState(() => localStorage.getItem('player2') || 'Oyuncu 2');
  const [playerTurn, setPlayerTurn] = useState(() => localStorage.getItem('playerTurn') || 'left');
  const [player1Time, setPlayer1Time] = useState(() => parseInt(localStorage.getItem('player1Time')) || 60);
  const [player2Time, setPlayer2Time] = useState(() => parseInt(localStorage.getItem('player2Time')) || 60);
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('messages')) || []);
  const [message, setMessage] = useState('');
  const [player1Score, setPlayer1Score] = useState(() => parseInt(localStorage.getItem('player1Score')) || 0);
  const [player2Score, setPlayer2Score] = useState(() => parseInt(localStorage.getItem('player2Score')) || 0);

  // Sıfırla ve oyunu başlat
  useEffect(() => {
    localStorage.setItem('player1Time', player1Time);
    localStorage.setItem('player2Time', player2Time);
    localStorage.setItem('playerTurn', 'left');
    localStorage.setItem('messages', JSON.stringify([]));
    localStorage.setItem('player1Score', player1Score);
    localStorage.setItem('player2Score', player2Score);
  }, []);

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
    if (player1Time <= 0 && playerTurn === 'left') {
      setPlayerTurn('right');
    } else if (player2Time <= 0 && playerTurn === 'right') {
      setPlayerTurn('left');
    }

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

    // Update the turn and time
    if ((playerTurn === 'left' && player1Time > 0) || (playerTurn === 'right' && player2Time > 0)) {
      setPlayerTurn(playerTurn === 'left' ? 'right' : 'left');
    }
    setMessage('');
  };

  const handleBackButton = () => {
    localStorage.removeItem('player1Time');
    localStorage.removeItem('player2Time');
    localStorage.removeItem('messages');
    localStorage.removeItem('playerTurn');
    localStorage.removeItem('player1Score');
    localStorage.removeItem('player2Score');
    navigate(-1);
  };

  const handleSurrender = (side) => {
    if (side === 'left') {
      setPlayer1Time(0);
      setPlayerTurn('right');
      setPlayer2Score((prev) => {
        const newScore = prev + 1;
        localStorage.setItem('player2Score', newScore);
        return newScore;
      });
    } else if (side === 'right') {
      setPlayer2Time(0);
      setPlayerTurn('left');
      setPlayer1Score((prev) => {
        const newScore = prev + 1;
        localStorage.setItem('player1Score', newScore);
        return newScore;
      });
    }
  };

  const isSendDisabled = () => {
    if (playerTurn === 'left' && player1Time <= 0) return true;
    if (playerTurn === 'right' && player2Time <= 0) return true;
    return false;
  };

  return (
    <div className="game-page">
      <div className="top-bar">
        <div className="player-info">
          <div className="left-player">
            <div className="timer">{player1Time}s</div>
            <div className="score">Puan: {player1Score}</div>
            <h3 className="player-name">{player1}</h3>
            
            <button onClick={() => handleSurrender('left')} className="pes-et-button" disabled={player1Time <= 0}>
              Pes Et
            </button>
          </div>
        </div>

        <div className="player-info">
          <div className="right-player">
            <div className="timer">{player2Time}s</div>
             <div className="score">Puan: {player2Score}</div>
            <h3 className="player-name">{player2}</h3>
           
            <button onClick={() => handleSurrender('right')} className="pes-et-button" disabled={player2Time <= 0}>
              Pes Et
            </button>
          </div>
        </div>
      </div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.side}-message`}>
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSendDisabled()}
        />
        <button type="submit" disabled={message.trim() === '' || isSendDisabled()}>
          Gönder
        </button>
      </form>

      <div className="navigation-buttons">
        <button onClick={handleBackButton} className="back-button">
          Geri
        </button>
        <button onClick={() => navigate('/')} className="home-button">
          Ana Sayfa
        </button>
      </div>
    </div>
  );
}

export default GamePage;
