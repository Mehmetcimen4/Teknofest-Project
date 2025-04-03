import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function KonuDetay() {
  const navigate = useNavigate();

  const topics = [
    { name: "Konu 1", path: "/sinif/lise/9/tarih/ünite1/konu1" },
    { name: "Konu 2", path: "/sinif/lise/9/tarih/ünite2/konu2" },
    { name: "Konu 3", path: "/sinif/lise/9/tarih/ünite3/konu3" },
    { name: "Konu 4", path: "/sinif/lise/9/tarih/ünite4/konu4" }
  ];

  return (
    <div style={{ backgroundColor: "#66cdaa" }} className="min-h-screen flex flex-col items-center justify-center bg-mediumaquamarine p-5 text-center">
      <h2 className="text-3xl font-bold text-gray-700 mb-8 relative -top-16">Konular</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {topics.map((topic) => (
          <Link 
            key={topic.name} 
            to={`${topic.path}/registration`} 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-5 rounded-lg shadow-md text-center w-40 transition-all duration-300 hover:shadow-lg"
          >
            {topic.name}
          </Link>
        ))}
      </div>
      
      <button 
        onClick={() => navigate(-1)} 
        className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
      >
        Geri
      </button>
    </div>
  );
}

export default KonuDetay;