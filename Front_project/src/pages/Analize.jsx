import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";
import { 
  Users, 
  Clock, 
  Trophy, 
  BookOpen, 
  Calendar,
  CheckCircle,
  XCircle,
  GraduationCap,
  Filter
} from "lucide-react";

// Örnek veri
const mockStudents = [
  { id: 1, name: "Ayşe Yılmaz", correct: 87, wrong: 13, avgTime: 45, level: 5, subject: "Matematik" },
  { id: 2, name: "Mehmet Kaya", correct: 92, wrong: 8, avgTime: 38, level: 6, subject: "Türkçe" },
  { id: 3, name: "Zeynep Demir", correct: 78, wrong: 22, avgTime: 52, level: 4, subject: "Fen Bilgisi" },
  { id: 4, name: "Ali Öztürk", correct: 84, wrong: 16, avgTime: 41, level: 5, subject: "Sosyal Bilgiler" },
  { id: 5, name: "Ela Çelik", correct: 95, wrong: 5, avgTime: 35, level: 7, subject: "Matematik" },
  { id: 6, name: "Burak Şahin", correct: 71, wrong: 29, avgTime: 58, level: 3, subject: "Fen Bilgisi" },
  { id: 7, name: "Deniz Arslan", correct: 81, wrong: 19, avgTime: 44, level: 4, subject: "Türkçe" },
  { id: 8, name: "Ceren Korkmaz", correct: 88, wrong: 12, avgTime: 40, level: 5, subject: "Sosyal Bilgiler" },
  { id: 9, name: "Mert Aydın", correct: 76, wrong: 24, avgTime: 50, level: 4, subject: "Matematik" },
  { id: 10, name: "İrem Yıldız", correct: 90, wrong: 10, avgTime: 37, level: 6, subject: "Fen Bilgisi" },
];

const timeData = [
  { name: "Hafta 1", avgTime: 54 },
  { name: "Hafta 2", avgTime: 50 },
  { name: "Hafta 3", avgTime: 47 },
  { name: "Hafta 4", avgTime: 45 },
  { name: "Hafta 5", avgTime: 41 },
  { name: "Hafta 6", avgTime: 38 },
];

const correctRateData = [
  { name: "Hafta 1", dogruOrani: 72 },
  { name: "Hafta 2", dogruOrani: 75 },
  { name: "Hafta 3", dogruOrani: 78 },
  { name: "Hafta 4", dogruOrani: 82 },
  { name: "Hafta 5", dogruOrani: 85 },
  { name: "Hafta 6", dogruOrani: 88 },
];

const subjects = ["Tümü", "Matematik", "Türkçe", "Fen Bilgisi", "Sosyal Bilgiler"];
const timeFrames = ["Genel", "Aylık", "Haftalık"];
const sortOptions = ["Doğru Sayısı", "Yanlış Sayısı", "Çözüm Süresi", "Seviye"];

export default function StudentAnalytics() {
  const [selectedSubject, setSelectedSubject] = useState("Tümü");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("Genel");
  const [sortBy, setSortBy] = useState("Doğru Sayısı");
  
  // Filtreleme ve sıralama fonksiyonu
  const filteredAndSortedStudents = () => {
    let filtered = [...mockStudents];
    
    // Ders filtreleme
    if (selectedSubject !== "Tümü") {
      filtered = filtered.filter(s => s.subject === selectedSubject);
    }
    
    // Sıralama
    switch (sortBy) {
      case "Doğru Sayısı":
        filtered.sort((a, b) => b.correct - a.correct);
        break;
      case "Yanlış Sayısı":
        filtered.sort((a, b) => b.wrong - a.wrong);
        break;
      case "Çözüm Süresi":
        filtered.sort((a, b) => a.avgTime - b.avgTime);
        break;
      case "Seviye":
        filtered.sort((a, b) => b.level - a.level);
        break;
      default:
        filtered.sort((a, b) => b.correct - a.correct);
    }
    
    return filtered;
  };
  
  // İstatistik hesaplama
  const calculateStats = () => {
    let filtered = mockStudents;
    if (selectedSubject !== "Tümü") {
      filtered = filtered.filter(s => s.subject === selectedSubject);
    }
    
    const totalCorrect = filtered.reduce((sum, student) => sum + student.correct, 0);
    const totalWrong = filtered.reduce((sum, student) => sum + student.wrong, 0);
    const avgTime = filtered.reduce((sum, student) => sum + student.avgTime, 0) / filtered.length;
    const avgLevel = filtered.reduce((sum, student) => sum + student.level, 0) / filtered.length;
    
    return {
      totalCorrect,
      totalWrong,
      avgTime: avgTime.toFixed(1),
      avgLevel: avgLevel.toFixed(1),
      correctRate: ((totalCorrect / (totalCorrect + totalWrong)) * 100).toFixed(1)
    };
  };
  
  const stats = calculateStats();
  const students = filteredAndSortedStudents();

  return (
    <div className="min-h-screen">
      {/* Başlık ve Özet Bölümü */}
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-emerald-800 mb-4">Öğrenci Analiz Paneli</h1>
          
          {/* Filtreler */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-emerald-50 p-3 rounded-lg flex items-center gap-2">
              <BookOpen size={20} className="text-emerald-700" />
              <select 
                className="bg-emerald-50 text-emerald-800 font-medium focus:outline-none"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div className="bg-emerald-50 p-3 rounded-lg flex items-center gap-2">
              <Calendar size={20} className="text-emerald-700" />
              <select 
                className="bg-emerald-50 text-emerald-800 font-medium focus:outline-none"
                value={selectedTimeFrame}
                onChange={(e) => setSelectedTimeFrame(e.target.value)}
              >
                {timeFrames.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            
            <div className="bg-emerald-50 p-3 rounded-lg flex items-center gap-2">
              <Filter size={20} className="text-emerald-700" />
              <select 
                className="bg-emerald-50 text-emerald-800 font-medium focus:outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-emerald-50 p-4 rounded-lg shadow flex items-center">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <CheckCircle size={24} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-emerald-800 font-medium">Doğru Oranı</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.correctRate}%</p>
              </div>
            </div>
            
            <div className="bg-emerald-50 p-4 rounded-lg shadow flex items-center">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <Clock size={24} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-emerald-800 font-medium">Ort. Çözüm Süresi</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.avgTime} sn</p>
              </div>
            </div>
            
            <div className="bg-emerald-50 p-4 rounded-lg shadow flex items-center">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <GraduationCap size={24} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-emerald-800 font-medium">Ort. Seviye</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.avgLevel}</p>
              </div>
            </div>
            
            <div className="bg-emerald-50 p-4 rounded-lg shadow flex items-center">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <Users size={24} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-emerald-800 font-medium">Toplam Öğrenci</p>
                <p className="text-2xl font-bold text-emerald-600">{students.length}</p>
              </div>
            </div>
          </div>
          
          {/* Grafikler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-4 border border-emerald-100">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4">Ortalama Çözüm Süresi Trendi</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={timeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0f2f1" />
                  <XAxis dataKey="name" stroke="#2e7d73" />
                  <YAxis stroke="#2e7d73" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#e0f2f1", borderColor: "#66cdaa" }}
                    formatter={(value) => [`${value} sn`, 'Ort. Süre']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgTime" 
                    stroke="#009688" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 border border-emerald-100">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4">Haftalık Doğru Oranı</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={correctRateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0f2f1" />
                  <XAxis dataKey="name" stroke="#2e7d73" />
                  <YAxis stroke="#2e7d73" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#e0f2f1", borderColor: "#66cdaa" }}
                    formatter={(value) => [`%${value}`, 'Doğru Oranı']}
                  />
                  <Bar dataKey="dogruOrani" fill="#26a69a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Öğrenci Sıralaması */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-emerald-100">
            <h3 className="text-lg font-semibold p-4 bg-emerald-50 text-emerald-800 border-b border-emerald-100">
              Öğrenci Sıralaması - {selectedSubject} ({selectedTimeFrame})
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-emerald-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-emerald-800">Sıra</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-emerald-800">Öğrenci</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-emerald-800">Ders</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-emerald-800">
                      <div className="flex items-center">
                        <CheckCircle size={16} className="mr-1 text-emerald-600" />
                        Doğru
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-emerald-800">
                      <div className="flex items-center">
                        <XCircle size={16} className="mr-1 text-red-500" />
                        Yanlış
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-emerald-800">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1 text-emerald-600" />
                        Süre (sn)
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-emerald-800">
                      <div className="flex items-center">
                        <Trophy size={16} className="mr-1 text-emerald-600" />
                        Seviye
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100">
                  {students.map((student, index) => (
                    <tr key={student.id} className={index % 2 === 0 ? "bg-white" : "bg-emerald-50"}>
                      <td className="py-3 px-4 font-medium text-emerald-800">{index + 1}</td>
                      <td className="py-3 px-4 font-medium text-gray-800">{student.name}</td>
                      <td className="py-3 px-4 text-gray-800">{student.subject}</td>
                      <td className="py-3 px-4 text-emerald-600 font-medium">{student.correct}</td>
                      <td className="py-3 px-4 text-red-500 font-medium">{student.wrong}</td>
                      <td className="py-3 px-4 text-gray-800">{student.avgTime} sn</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span className="bg-emerald-100 text-emerald-800 py-1 px-2 rounded-full text-xs font-medium">
                            Seviye {student.level}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}