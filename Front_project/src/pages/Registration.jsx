import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleStartGame = () => {
    if (player1 && player2) {
      navigate('/sinif/lise/tarih/ünite1/konular/konu1/game', { state: { player1, player2 } });
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
          <input type="text" value={player1} onChange={(e) => setPlayer1(e.target.value)} />
        </div>
        <div className="player-input">
          <label>Oyuncu 2:</label>
          <input type="text" value={player2} onChange={(e) => setPlayer2(e.target.value)} />
        </div>
        
        
      </div>
      <button onClick={handleStartGame} className="start-button">Oyunu Başlat</button>
      <button onClick={() => navigate(-1)} className="back-button">Geri</button>
      
    </div>
  );
}

export default Registration;
