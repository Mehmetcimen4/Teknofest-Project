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
    <div className="konu-detay">
      <h2>Konular</h2>
      <div className="courses-grid">
        {topics.map((topic) => (
          <Link key={topic.name} to={`${topic.path}/registration`} className="course-button">
            {topic.name}
          </Link>
        ))}
      </div>
      <button onClick={() => navigate(-1)} className="back-button">Geri</button>
    </div>
  );
}

export default KonuDetay;
