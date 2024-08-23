import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [time, setTime] = useState(60); // Default to 60 seconds

  const handleStartGame = (e) => {
    e.preventDefault(); // Formun otomatik olarak submit edilmesini engelle

    if (player1 && player2) {
      try {
        // Oyuncu isimlerini ve zamanı localStorage'a kaydet
        localStorage.setItem('player1', player1);
        localStorage.setItem('player2', player2);
        localStorage.setItem('player1Time', time); // Oyuncu 1 için süre
        localStorage.setItem('player2Time', time); // Oyuncu 2 için süre

        // Oyuna yönlendirme
        navigate('/sinif/lise/tarih/ünite1/konular/konu1/game');
        
      } catch (error) {
        console.error('Oyunu başlatırken bir hata oluştu:', error);
        alert('Oyunu başlatırken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } else {
      alert('Lütfen her iki oyuncunun adını da girin.');
    }
  };

  return (
    <div className="registration-page">
      <h2>Oyuncu Kaydı</h2>
      <div className='menu'>
        <div className="player-input">
          <label>Oyuncu 1:</label>
          <input 
            type="text" 
            value={player1} 
            onChange={(e) => setPlayer1(e.target.value)} 
            placeholder="Oyuncu 1 adını girin"
          />
        </div>
        <div className="player-input">
          <label>Oyuncu 2:</label>
          <input 
            type="text" 
            value={player2} 
            onChange={(e) => setPlayer2(e.target.value)} 
            placeholder="Oyuncu 2 adını girin"
          />
        </div>
        <div className="time-selection">
          <label>Zaman Seçimi:</label>
          <select value={time} onChange={(e) => setTime(parseInt(e.target.value))}>
            <option value={60}>60 saniye</option>
            <option value={90}>90 saniye</option>
            <option value={120}>120 saniye</option>
          </select>
        </div>
        <button onClick={handleStartGame} className="start-button">Oyunu Başlat</button>
      </div>

      <button onClick={() => navigate(-1)} className="back-button">Geri</button>
    </div>
  );
}

export default Registration;
