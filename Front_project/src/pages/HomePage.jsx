import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#66cdaa" }} className="min-h-screen flex items-center justify-center  p-5">
      <div style={{ backgroundColor: "#66cdaa" }}  className="max-w-3xl w-full bg-white rounded-lg  ">
        <h2 className="text-2xl font-bold text-center text-black mb-6 relative ">TUNGA Yapay Zeka Destekli Tahmin Oyunu</h2>
        
        <div style={{ backgroundColor: "#66cdaa" }} className="mb-8  p-4">
          <h3 className="text-xl font-semibold text-black mb-4">Oyun Kuralları</h3>
          <ul className="space-y-2 list-disc pl-6 text-gray-700">
            <li>Yapay zeka bir kavram düşünecek</li>
            <li>Size verilen ipuçlarını kullanarak kavramı tahmin etmeye çalışın</li>
            <li>Her doğru tahmin için puan kazanırsınız</li>
            <li>Daha az denemede doğru tahmin, daha yüksek puan demektir</li>
            <li>Her yanlış tahmin için ipucu sayısı artar</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-blue-700">
            <span className="font-bold">İpucu:</span> Dikkat et ve ipuçlarını iyi oku. Kelimeler arasındaki bağlantıları kurarak daha hızlı sonuca ulaşabilirsin!
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link 
            to="/gameselection" 
            className="bg-blue-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Hemen Oyna
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;