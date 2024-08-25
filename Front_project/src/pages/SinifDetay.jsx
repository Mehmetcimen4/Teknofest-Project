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
    <div className="sinif-detay">
      <h2>{sinif} Dersleri</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <Link key={course.name} to={`${course.path}`} className="course-button">
            {course.name}
          </Link>
        ))}
      </div>
      <button onClick={() => navigate(-1)} className="back-button">Geri</button>
    </div>
  );
}

export default SinifDetay;
