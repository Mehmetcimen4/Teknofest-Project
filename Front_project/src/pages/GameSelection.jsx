import React from 'react';
import { Link } from 'react-router-dom';

const GameSelection = () => {
  return (
    <div style={{ backgroundColor: "#66cdaa" }} className="min-h-screen flex flex-col items-center justify-center  p-5">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-700 text-center mb-8">Oyun Modları</h1>
        
        <div className="bg-darkgreen/50 rounded-lg p-5  flex flex-col items-center gap-4">
          <Link 
            to="/sinif" 
            className="w-48 py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-lg"
          >
            Tek Kişilik 
          </Link>
          
          <Link 
            to="/sinif" 
            className="w-48 py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-lg"
          >
            Online 
          </Link>
          
          <Link 
            to="/sinif" 
            className="w-48 py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-lg"
          >
            Sınıf 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameSelection;