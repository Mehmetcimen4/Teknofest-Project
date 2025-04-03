import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SinifDetay({ sinif }) {
  const navigate = useNavigate();

  const courses = [
    { name: "Tarih", path: "/sinif/lise/9/tarih" },
    { name: "Coğrafya", path: "/sinif/lise/9/cografya" },
    { name: "Fizik", path: "/sinif/lise/9/fizik" },
    { name: "Kimya", path: "/sinif/lise/9/kimya" },
    { name: "Biyoloji", path: "/sinif/lise/9/biyoloji" },
    { name: "Matematik", path: "/sinif/lise/9/matematik" },
    { name: "Edebiyat", path: "/sinif/lise/9/edebiyat" },
    { name: "Din", path: "/sinif/lise/9/din" },
    { name: "İngilizce", path: "/sinif/lise/9/ingilizce" }
  ];

  return (
    <div style={{ backgroundColor: "#66cdaa" }} className="min-h-screen flex flex-col items-center justify-center bg-mediumaquamarine p-5 text-center">
      <h2 className="text-3xl font-bold text-gray-700 mb-8 relative -top-16">{sinif} Dersleri</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {courses.map((course) => (
          <Link 
            key={course.name} 
            to={`${course.path}`} 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-5 rounded-lg shadow-md text-center w-40 transition-all duration-300 hover:shadow-lg"
          >
            {course.name}
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

export default SinifDetay;