import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UniteDetay() {
  const navigate = useNavigate();

  const unites = [
    { name: "Ünite 1", path: "/sinif/lise/9/tarih/ünite1" },
    { name: "Ünite 2", path: "/sinif/lise/9/tarih/ünite2" },
    { name: "Ünite 3", path: "/sinif/lise/9/tarih/ünite3" },
    { name: "Ünite 4", path: "/sinif/lise/9/tarih/ünite4" },
    { name: "Ünite 5", path: "/sinif/lise/9/tarih/ünite5" },
    { name: "Ünite 6", path: "/sinif/lise/9/tarih/ünite6" },
    { name: "Ünite 7", path: "/sinif/lise/9/tarih/ünite7" },
    { name: "Ünite 8", path: "/sinif/lise/9/tarih/ünite8" },
    { name: "Ünite 9", path: "/sinif/lise/9/tarih/ünite9" }
  ];

  return (
    <div style={{ backgroundColor: "#66cdaa" }} className="min-h-screen flex flex-col items-center justify-center  p-5 text-center">
      <h2 className="text-3xl font-bold text-gray-700 mb-8 relative -top-16">Üniteler</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {unites.map((unite) => (
          <Link 
            key={unite.name} 
            to={`${unite.path}`} 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-5 rounded-lg shadow-md text-center w-40 transition-all duration-300 hover:shadow-lg"
          >
            {unite.name}
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

export default UniteDetay;