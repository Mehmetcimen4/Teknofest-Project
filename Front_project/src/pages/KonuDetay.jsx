import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function KonuDetay() {
  const navigate = useNavigate();

  const topics = [
    { name: "Konu 1", path: "/sinif/lise/tarih/ünite1/konular/konu1" },
    { name: "Konu 2", path: "/sinif/lise/tarih/ünite2/konular/konu2" },
    { name: "Konu 3", path: "/sinif/lise/tarih/ünite3/konular/konu3" },
    { name: "Konu 4", path: "/sinif/lise/tarih/ünite4/konular/konu4" }
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
