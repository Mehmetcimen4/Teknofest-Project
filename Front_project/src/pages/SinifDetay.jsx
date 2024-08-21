import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SinifDetay({ sinif }) {
  const navigate = useNavigate();

  const courses = [
    { name: "Tarih", path: "/sinif/lise/tarih" },
    { name: "Coğrafya", path: "/sinif/lise/cografya" },
    { name: "Fizik", path: "/sinif/lise/fizik" },
    { name: "Kimya", path: "/sinif/lise/kimya" },
    { name: "Biyoloji", path: "/sinif/lise/biyoloji" },
    { name: "Matematik", path: "/sinif/lise/matematik" },
    { name: "Edebiyat", path: "/sinif/lise/edebiyat" },
    { name: "Din", path: "/sinif/lise/din" },
    { name: "İngilizce", path: "/sinif/lise/ingilizce" }
  ];

  return (
    <div className="sinif-detay">
      <h2>{sinif} Dersleri</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <Link key={course.name} to={`${course.path}/konular`} className="course-button">
            {course.name}
          </Link>
        ))}
      </div>
      <button onClick={() => navigate(-1)} className="back-button">Geri</button>
    </div>
  );
}

export default SinifDetay;
