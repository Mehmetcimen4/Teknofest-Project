import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Registration() {
  const navigate = useNavigate();
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [time, setTime] = useState(60); // Default to 60 seconds
  const [restart,setRestart] = useState("yes");
  const handleStartGame = async (e) => {
    e.preventDefault(); // Prevent the form from automatically submitting
    //setRestart("yes");
    if (player1 && player2) {
      try {
        
        // Clear any old game data from localStorage
        localStorage.removeItem('player1Time');
        localStorage.removeItem('player2Time');
        localStorage.removeItem('messages');
        localStorage.removeItem('playerTurn');
        localStorage.removeItem('player1Score');
        localStorage.removeItem('player2Score');

        // Store player names, time, and initial scores in localStorage
        localStorage.setItem('player1', player1);
        localStorage.setItem('player2', player2);
        localStorage.setItem('player1Time', time); // Set time for player 1
        localStorage.setItem('player2Time', time); // Set time for player 2
        localStorage.setItem('player1Score', 0); // Initial score for player 1
        localStorage.setItem('player2Score', 0); // Initial score for player 2

        // Navigate to the game page
        const response = await axios.post("http://localhost:5000/start-game");
        navigate('/sinif/lise/9/tarih/ünite1/konu1/game');
        
      } catch (error) {
        console.error('Error starting the game:', error);
        alert('An error occurred while starting the game. Please try again.');
      }
    } else {
      alert('Please enter the names of both players.');
    }
  };
  /*
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    let aiResponse = '';
    try {
      
      const response = await axios.post("http://localhost:5000/getResponse", { message });
      const target = response.data.target.toLowerCase().trim();
      aiResponse = response.data.assistantMessage.toLowerCase().trim();
      console.log({target});
      if (aiResponse === 'evet') {
        aiResponse += '.';
      } else if (aiResponse === 'hayır') {
        aiResponse += '.';
      }
    } catch (err) {
      console.error("Hata oluştu:", err.message);
      return; // Exit if there's an error
    }
  */
  return (
    <div className="registration-page">
      <h2>Oyuncu Kayıtı</h2>
      <div className='menu'>
        <div className="player-input">
          <label>Oyuncu 1:</label>
          <input 
            type="text" 
            value={player1} 
            onChange={(e) => setPlayer1(e.target.value)} 
            placeholder="Oyuncu 1 için isim giriniz"
          />
        </div>
        <div className="player-input">
          <label>Oyuncu 2:</label>
          <input 
            type="text" 
            value={player2} 
            onChange={(e) => setPlayer2(e.target.value)} 
            placeholder="Oyuncu 2 için isim giriniz"
          />
        </div>
        <div className="time-selection">
          <label>Zaman seçimi:</label>
          <select value={time} onChange={(e) => setTime(parseInt(e.target.value))}>
            <option value={60}>60 saniye</option>
            <option value={90}>90 saniye</option>
            <option value={120}>120 saniye</option>
          </select>
        </div>
        <button onClick={handleStartGame} className="start-button">Oyuna başla</button>
      </div>

      <button onClick={() => navigate(-1)} className="back-button">Geri</button>
    </div>
  );
}

export default Registration;
