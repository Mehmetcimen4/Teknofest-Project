import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Game.css';
import Modal from "../Components/Modal";

function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [player1, setPlayer1] = useState(() => localStorage.getItem('player1') || 'Oyuncu 1');
  const [player2, setPlayer2] = useState(() => localStorage.getItem('player2') || 'Oyuncu 2');
  const [playerTurn, setPlayerTurn] = useState(() => localStorage.getItem('playerTurn') || 'left');
  const [player1Time, setPlayer1Time] = useState(() => parseInt(localStorage.getItem('player1Time')) || 60);
  const [player2Time, setPlayer2Time] = useState(() => parseInt(localStorage.getItem('player2Time')) || 60);
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('messages')) || []);
  const [message, setMessage] = useState('');
  const [player1Score, setPlayer1Score] = useState(() => parseInt(localStorage.getItem('player1Score')) || 0);
  const [player2Score, setPlayer2Score] = useState(() => parseInt(localStorage.getItem('player2Score')) || 0);
  const [aiResponse, setaiResponse] = useState('');
  const [target, setTarget] = useState('');
  const [timersExpired, setTimersExpired] = useState(false);
  const [winner, setWinner] = useState('');
  const [secondStageStarted, setSecondStageStarted] = useState(false); // İkinci aşama başladı mı?

  useEffect(() => {
    const storedPlayer1 = localStorage.getItem('player1') || 'Oyuncu 1';
    const storedPlayer2 = localStorage.getItem('player2') || 'Oyuncu 2';
    const storedPlayerTurn = localStorage.getItem('playerTurn') || 'left';
    const storedPlayer1Time = parseInt(localStorage.getItem('player1Time')) || 60;
    const storedPlayer2Time = parseInt(localStorage.getItem('player2Time')) || 60;
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const storedPlayer1Score = parseInt(localStorage.getItem('player1Score')) || 0;
    const storedPlayer2Score = parseInt(localStorage.getItem('player2Score')) || 0;
    const storedAiResponse = localStorage.getItem('aiResponse') || 'evet';

    setPlayer1(storedPlayer1);
    setPlayer2(storedPlayer2);
    setPlayerTurn(storedPlayerTurn);
    setPlayer1Time(storedPlayer1Time);
    setPlayer2Time(storedPlayer2Time);
    setMessages(storedMessages);
    setPlayer1Score(storedPlayer1Score);
    setPlayer2Score(storedPlayer2Score);
    setaiResponse(storedAiResponse);
  }, []);

  useEffect(() => {
    const timer1 = setInterval(() => {
      if (playerTurn === 'left' && player1Time > 0) {
        setPlayer1Time(prev => prev - 1);
      }
    }, 1000);
  
    const timer2 = setInterval(() => {
      if (playerTurn === 'right' && player2Time > 0) {
        setPlayer2Time(prev => prev - 1);
      }
    }, 1000);
  
    if (player1Time <= 0 && player2Time <= 0 && !timersExpired) {
      endTime();  
    }
  
    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, [player1Time, player2Time, playerTurn, timersExpired]);
  
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
    localStorage.setItem('player1Score', player1Score);
    localStorage.setItem('player2Score', player2Score);
    localStorage.setItem('aiResponse', aiResponse);
  }, [player1Time, player2Time, playerTurn, messages, player1Score, player2Score, aiResponse]);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
  
    try {
      const response = await axios.post("http://localhost:5000/getResponse", { message });
      const target = response.data.target.toLowerCase().trim();
      const assistantMessage = response.data.assistantMessage.toLowerCase().trim();
  
      setaiResponse(assistantMessage);
      setTarget(target);
  
      const newMessage = {
        sender: playerTurn === 'left' ? player1 : player2,
        text: message,
        side: playerTurn === 'left' ? 'left' : 'right',
        aiAnswer: assistantMessage,
      };
  
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      
      if (assistantMessage === 'evet.') {
        if (playerTurn === 'left') {
          setPlayer1Score((prev) => {
            const newScore = prev + (secondStageStarted ? 20 : 10);
            localStorage.setItem('player1Score', newScore);
            return newScore;
          });
        } else {
          setPlayer2Score((prev) => {
            const newScore = prev + (secondStageStarted ? 20 : 10);
            localStorage.setItem('player2Score', newScore);
            return newScore;
          });
        }
      }

      // "Doğru!" cevabı alındığında 2. aşamayı başlat
      if (assistantMessage === 'doğru!') {
        setSecondStageStarted(true);
        setPlayer1Time(prev => prev + 60);
        setPlayer2Time(prev => prev + 60);
      }

      if ((playerTurn === 'left' && player1Time > 0) || (playerTurn === 'right' && player2Time > 0)) {
        setPlayerTurn(playerTurn === 'left' ? 'right' : 'left');
      }
  
      setMessage('');
    } catch (err) {
      console.error("Hata oluştu:", err.message);
      return;
    }
  };
  
  const handleBackButton = () => {
    localStorage.removeItem('player1Time');
    localStorage.removeItem('player2Time');
    localStorage.removeItem('messages');
    localStorage.removeItem('playerTurn');
    localStorage.removeItem('player1Score');
    localStorage.removeItem('player2Score');
    localStorage.removeItem('aiResponse');
    navigate(-1);
  };

  const handleSurrender = (side) => {
    if (side === 'left') {
      setPlayer1Time(0);
      setPlayerTurn('right');
      setPlayer2Score(prev => {
        const newScore = prev + 1;
        localStorage.setItem('player2Score', newScore);
        return newScore;
      });
    } else if (side === 'right') {
      setPlayer2Time(0);
      setPlayerTurn('left');
      setPlayer1Score(prev => {
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

  const colorMessage = (answer) => {
    let color = "";
    if (answer === "evet.") {
      color = "green-message";
    }else if (answer === "hayır."){
      color = "red-message"
    }else if (answer === "doğru!"){
      color = "yellow-message"
    }
    return color;
  }

  const endTime = () => {
    if (player1Time <= 0 && player2Time <= 0 && !timersExpired) {
      setTimersExpired(true);

      let winner = "";

      if (player1Score > player2Score) {
        winner = `${player1} (Left)`;
      } else if (player2Score > player1Score) {
        winner = `${player2} (Right)`;
      } else {
        winner = "Dostluk";
      }

      setWinner(winner);  
      setModalOpen(true); 
    }
    return winner;  
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
        
        {secondStageStarted && (
  <div className="target-area">
    <p>İkinci aşama başladı!</p>
    <p>Hedef: {target}</p>
  </div>
)}

        
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
          <div
            key={index}
            className={`message ${msg.side}-message ${colorMessage(msg.aiAnswer)}`}
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
      {modalOpen && (
        <Modal setOpenModal={setModalOpen} winner={endTime()}>
          <div className="endTimePage">
            <div className="winner">Kazanan: {endTime()}</div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default GamePage;
