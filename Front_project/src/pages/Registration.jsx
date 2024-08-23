import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleStartGame = () => {
    if (player1 && player2) {
      try {
        // En güncel oyuncu isimlerini localStorage'a kaydet
        localStorage.setItem('player1', player1);
        localStorage.setItem('player2', player2);

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
        <button onClick={handleStartGame} className="start-button">Oyunu Başlat</button>
      </div>

      <button onClick={() => navigate(-1)} className="back-button">Geri</button>
    </div>
  );
}

export default Registration;
