import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registration() {
  const navigate = useNavigate();
  const [player1, setPlayer1] = useState(localStorage.getItem("player1") || "");
  const [player2, setPlayer2] = useState(localStorage.getItem("player2") || "");
  const [time, setTime] = useState(localStorage.getItem("time") || 60); // Default to 60 seconds

  const handleStartGame = async (e) => {
    e.preventDefault();
    
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
        localStorage.setItem('player1Time', time);
        localStorage.setItem('player2Time', time);
        localStorage.setItem('player1Score', 0);
        localStorage.setItem('player2Score', 0);
        localStorage.setItem('time', time);

        // Navigate to the game page
        const response = await axios.post("http://localhost:5000/start-game");
        localStorage.setItem('target', response.data.target);
        navigate('/sinif/lise/9/tarih/ünite1/konu1/game');
        
      } catch (error) {
        console.error('Error starting the game:', error);
        alert('An error occurred while starting the game. Please try again.');
      }
    } else {
      alert('Please enter the names of both players.');
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
    localStorage.removeItem('time');
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');
    navigate("/sinif/lise/9/tarih/ünite1");
  };

  return (
    <div style={{ backgroundColor: "#66cdaa" }} className="min-h-screen flex flex-col items-center justify-center p-5 text-center">
      
      
      <div className=" rounded-lg p-6  flex flex-col items-center gap-4 w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-700 relative ">Oyuncu Kayıtı</h2>
        <div className="w-full mb-4 ">
          <label className="block text-lg font-medium text-gray-700 mb-1">Oyuncu 1:</label>
          <input 
            type="text" 
            value={player1} 
            onChange={(e) => setPlayer1(e.target.value)} 
            placeholder="Oyuncu 1 için isim giriniz"
            className="w-full p-2 border-2 border-sky-500 bg-white text-black rounded-lg"
          />
        </div>
        
        <div className="w-full mb-4 ">
          <label className="block text-lg font-medium text-gray-700 mb-1">Oyuncu 2:</label>
          <input 
            type="text" 
            value={player2} 
            onChange={(e) => setPlayer2(e.target.value)} 
            placeholder="Oyuncu 2 için isim giriniz"
            className="w-full p-2 border-2 border-sky-500 bg-white text-black rounded-lg"
          />
        </div>
        
        <div className="w-full mb-4 ">
          <label className="block text-lg font-medium text-gray-700 mb-1">Zaman seçimi:</label>
          <select 
            value={time} 
            onChange={(e) => setTime(parseInt(e.target.value))}
            className="w-full p-2 border-2 border-sky-500 rounded-lg bg-white text-black"
          >
            <option value={60}>60 saniye</option>
            <option value={90}>90 saniye</option>
            <option value={120}>120 saniye</option>
          </select>
        </div>
        
        <button 
          onClick={handleStartGame} 
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-5 rounded-lg shadow-md mt-4 transition-all duration-300 hover:shadow-lg"
        >
          Oyuna başla
        </button>
      </div>

      <button 
        onClick={handleBackButton} 
        className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
      >
        Geri
      </button>
    </div>
  );
}

export default Registration;