import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const clearLocalStorage = () => {
    localStorage.removeItem('gameData'); // Örnek olarak 'gameData' adıyla saklanan önceki oyun verilerini temizler
    sessionStorage.removeItem('gameData'); // Eğer sessionStorage'da da veriler saklanıyorsa
  };

  const handleStartGame = async () => {
    if (player1 && player2) {
      // 1. Yerel depolamayı temizle
      clearLocalStorage();

      try {
        // 2. Sunucudaki mevcut tüm oyuncu kayıtlarını sil
        const deleteResponse = await fetch('http://localhost:5000/players', {
          method: 'DELETE'
        });

        if (!deleteResponse.ok) {
          throw new Error('Tüm kayıtlar silinemedi.');
        }

        // 3. Yeni oyuncu verilerini hazırlama
        const players = [
          { id: 1, name: player1, time: 60 },
          { id: 2, name: player2, time: 60 }
        ];

        // 4. Yeni oyuncu verilerini db.json'a ekle
        await Promise.all(players.map(player => 
          fetch('http://localhost:5000/players', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
          })
        ));

        // 5. Oyunun oynanacağı sayfaya yönlendirme
        navigate('/sinif/lise/tarih/ünite1/konular/konu1/game', { state: { player1, player2 } });

      } catch (error) {
        console.error('Error occurred while starting the game:', error);
        alert('Oyunu başlatırken bir hata oluştu.');
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
          <input type="text" value={player1} onChange={(e) => setPlayer1(e.target.value)} />
        </div>
        <div className="player-input">
          <label>Oyuncu 2:</label>
          <input type="text" value={player2} onChange={(e) => setPlayer2(e.target.value)} />
        </div>
<<<<<<< HEAD
        
        
=======
        <button onClick={handleStartGame} className="start-button">Oyunu Başlat</button>
>>>>>>> e20a45cc509d6e793e08cbb02b4eed3c7dc86045
      </div>
      <button onClick={handleStartGame} className="start-button">Oyunu Başlat</button>
      <button onClick={() => navigate(-1)} className="back-button">Geri</button>
    </div>
  );
}

export default Registration;
