import React, { useState } from 'react';
import { School, Book, Award, Clock, CheckCircle, XCircle, BarChart, ChevronDown, ChevronUp, User } from 'lucide-react';

export default function OgrenciProfil() {
  const [activeTab, setActiveTab] = useState('genel');
  const [expandedLesson, setExpandedLesson] = useState(null);

  // Profil bilgileri
  const profile = {
    ad: "Ahmet Yılmaz",
    sinif: "12-A",
    okul: "Atatürk Anadolu Lisesi",
    bolum: "Sayısal",
    okulNo: "1234",
    kayitYili: "2021",
    mezuniyetYili: "2025",
    profileImage: null // Varsayılan olarak null
  };

  // Ders tahmin oyunu istatistikleri
  const lessonStats = [
    {
      id: 1,
      ders: "Matematik",
      genel: {
        sira: 45,
        toplamKatilimci: 850,
        yuzdelik: 5.3,
        dogruSayisi: 78,
        yanlisSayisi: 12,
        ortSure: "1:24"
      },
      aylik: {
        sira: 28,
        toplamKatilimci: 850,
        yuzdelik: 3.3,
        dogruSayisi: 45,
        yanlisSayisi: 5,
        ortSure: "1:12"
      }
    },
    {
      id: 2,
      ders: "Fizik",
      genel: {
        sira: 120,
        toplamKatilimci: 720,
        yuzdelik: 16.7,
        dogruSayisi: 56,
        yanlisSayisi: 24,
        ortSure: "2:05"
      },
      aylik: {
        sira: 65,
        toplamKatilimci: 720,
        yuzdelik: 9.0,
        dogruSayisi: 32,
        yanlisSayisi: 8,
        ortSure: "1:42"
      }
    },
    {
      id: 3,
      ders: "Kimya",
      genel: {
        sira: 72,
        toplamKatilimci: 680,
        yuzdelik: 10.6,
        dogruSayisi: 65,
        yanlisSayisi: 15,
        ortSure: "1:48"
      },
      aylik: {
        sira: 40,
        toplamKatilimci: 680,
        yuzdelik: 5.9,
        dogruSayisi: 38,
        yanlisSayisi: 7,
        ortSure: "1:32"
      }
    },
    {
      id: 4,
      ders: "Biyoloji",
      genel: {
        sira: 32,
        toplamKatilimci: 600,
        yuzdelik: 5.3,
        dogruSayisi: 82,
        yanlisSayisi: 8,
        ortSure: "1:15"
      },
      aylik: {
        sira: 18,
        toplamKatilimci: 600,
        yuzdelik: 3.0,
        dogruSayisi: 42,
        yanlisSayisi: 3,
        ortSure: "1:08"
      }
    },
    {
      id: 5,
      ders: "Türkçe",
      genel: {
        sira: 95,
        toplamKatilimci: 900,
        yuzdelik: 10.6,
        dogruSayisi: 70,
        yanlisSayisi: 30,
        ortSure: "2:30"
      },
      aylik: {
        sira: 75,
        toplamKatilimci: 900,
        yuzdelik: 8.3,
        dogruSayisi: 35,
        yanlisSayisi: 15,
        ortSure: "2:15"
      }
    }
  ];

  const toggleLesson = (id) => {
    if (expandedLesson === id) {
      setExpandedLesson(null);
    } else {
      setExpandedLesson(id);
    }
  };

  // Performans seviyesine göre renk belirleme
  const getPerformanceColor = (yuzdelik) => {
    if (yuzdelik <= 5) return "text-green-600";
    if (yuzdelik <= 10) return "text-blue-600";
    if (yuzdelik <= 20) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div style={{ backgroundColor: "#66cdaa" }} className="min-h-screen bg-emerald-50">
      <div  className="max-w-4xl mx-auto p-4">
        {/* Üst Bilgi Kartı */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-emerald-400 h-24"></div>
          <div className="px-6 pb-6 pt-0 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end mb-4">
              {/* Profil Resmi */}
              <div className="relative -mt-16 mb-4 md:mb-0">
                {profile.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt="Profil" 
                    className="w-32 h-32 rounded-full border-4 border-white bg-emerald-100"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-emerald-200 flex items-center justify-center">
                    <User size={64} className="text-emerald-600" />
                  </div>
                )}
              </div>
              
              {/* İsim ve Okul Bilgileri */}
              <div className="md:ml-6 flex-grow">
                <h1 className="text-3xl font-bold text-gray-800">{profile.ad}</h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <School className="w-5 h-5 mr-2" />
                  <span>{profile.okul} - {profile.sinif}</span>
                </div>
              </div>
            </div>

            {/* Okul Bilgileri Tablosu */}
            <div className="bg-emerald-50 rounded-lg p-4 mt-4">
              <h3 className="text-lg font-semibold text-emerald-800 mb-3 flex items-center">
                <School className="w-5 h-5 mr-2" />
                Okul Bilgileri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-32">Bölüm:</span>
                  <span className="text-gray-800">{profile.bolum}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-32">Okul No:</span>
                  <span className="text-gray-800">{profile.okulNo}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-32">Kayıt Yılı:</span>
                  <span className="text-gray-800">{profile.kayitYili}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-32">Mezuniyet Yılı:</span>
                  <span className="text-gray-800">{profile.mezuniyetYili}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ders İstatistikleri Bölümü */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-emerald-400 py-4 px-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <BarChart className="mr-2" />
              Tahmin Oyunu İstatistikleri
            </h2>
          </div>

          {/* Sekme Başlıkları */}
          <div className="flex border-b border-gray-200">
            <button 
              className={`py-3 px-6 font-medium ${activeTab === 'genel' ? 'text-emerald-600 border-b-2 border-emerald-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab('genel')}
            >
              Genel İstatistikler
            </button>
            <button 
              className={`py-3 px-6 font-medium ${activeTab === 'aylik' ? 'text-emerald-600 border-b-2 border-emerald-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab('aylik')}
            >
              Aylık İstatistikler
            </button>
          </div>

          {/* Ders Listesi */}
          <div className="p-6">
            {lessonStats.map((lesson) => (
              <div key={lesson.id} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 bg-emerald-50 cursor-pointer"
                  onClick={() => toggleLesson(lesson.id)}
                >
                  <div className="flex items-center">
                    <Book className="text-emerald-600 mr-3" />
                    <span className="font-medium text-gray-800">{lesson.ders}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-6 flex items-center">
                      <Award className="text-emerald-600 mr-1" />
                      <span className="font-medium text-gray-800">
                        {activeTab === 'genel' ? `${lesson.genel.sira}. sıra` : `${lesson.aylik.sira}. sıra`}
                      </span>
                    </div>
                    {expandedLesson === lesson.id ? 
                      <ChevronUp className="text-gray-600" /> : 
                      <ChevronDown className="text-gray-600" />
                    }
                  </div>
                </div>

                {expandedLesson === lesson.id && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-emerald-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-600 mb-1">Sıralama</h4>
                        <div className="flex items-center">
                          <Award className="text-emerald-600 mr-2" />
                          <div>
                            <p className="font-bold text-gray-800">
                              {activeTab === 'genel' ? lesson.genel.sira : lesson.aylik.sira} / 
                              {activeTab === 'genel' ? lesson.genel.toplamKatilimci : lesson.aylik.toplamKatilimci}
                            </p>
                            <p className={`text-sm ${getPerformanceColor(activeTab === 'genel' ? lesson.genel.yuzdelik : lesson.aylik.yuzdelik)}`}>
                              İlk %{activeTab === 'genel' ? lesson.genel.yuzdelik : lesson.aylik.yuzdelik}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-emerald-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-600 mb-1">Doğru / Yanlış</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CheckCircle className="text-green-600 mr-1" />
                            <span className="font-bold text-gray-800">
                              {activeTab === 'genel' ? lesson.genel.dogruSayisi : lesson.aylik.dogruSayisi}
                            </span>
                          </div>
                          <span className="text-gray-400 mx-2">/</span>
                          <div className="flex items-center">
                            <XCircle className="text-red-600 mr-1" />
                            <span className="font-bold text-gray-800">
                              {activeTab === 'genel' ? lesson.genel.yanlisSayisi : lesson.aylik.yanlisSayisi}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-emerald-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-600 mb-1">Ort. Çözüm Süresi</h4>
                        <div className="flex items-center">
                          <Clock className="text-emerald-600 mr-2" />
                          <span className="font-bold text-gray-800">
                            {activeTab === 'genel' ? lesson.genel.ortSure : lesson.aylik.ortSure} dk
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Başarı Rozeti Kartı */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-emerald-400 py-4 px-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Award className="mr-2" />
              Başarı Rozetleri
            </h2>
          </div>
          <div className="p-6 flex flex-wrap gap-4 justify-center">
            {['Matematik Ustası', 'Biyoloji Avcısı', 'Hızlı Çözümcü', 'İlk 50\'de'].map((rozet, index) => (
              <div key={index} className="bg-emerald-50 rounded-full px-6 py-2 flex items-center">
                <Award className="text-emerald-600 mr-2" />
                <span className="font-medium text-gray-800">{rozet}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}