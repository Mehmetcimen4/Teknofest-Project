import { useState } from 'react';
import { User, Play, BarChart2, LogOut, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar({ isAuthenticated, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const menuItems = [
    { icon: <User size={20} />, text: "Profil", path: "/profile", active: location.pathname === "/profile" },
    { icon: <Play size={20} />, text: "Oyunlar", path: "/gameselection", active: location.pathname === "/gameselection" },
    { icon: <BarChart2 size={20} />, text: "Analizler", path: "/profile", active: location.pathname === "/analytics" },
  ];

  const handleLogout = () => {
    setIsOpen(false);
    
    if (onLogout) {
      onLogout();
    }
    
    navigate('/auth');
  };

  // Kullanıcı giriş yapmamışsa sidebar'ı gösterme
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Toggle button - her zaman görünür */}
      <button 
        className="fixed top-4 left-4 z-30 bg-teal-300 p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
        style={{ backgroundColor: "#66cdaa" }}
      >
        {isOpen ? <X size={20} color="white" /> : <Menu size={20} color="white" />}
      </button>

      {/* Sidebar - position değiştirildi ve overlay kaldırıldı */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-teal-300 shadow-lg flex flex-col z-20 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: "#66cdaa" }}
      >
        {/* Logo area */}
        <div className="p-5 border-b border-teal-400 flex items-center justify-center">
          <h1 className="text-xl font-bold text-white">TUNGA</h1>
        </div>

        {/* Menu items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg text-white hover:bg-teal-400 transition-colors
                              ${item.active ? 'bg-teal-400' : ''}`}
                  onClick={() => setIsOpen(false)} // Menü elemanına tıklandığında sidebar'ı kapat
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-teal-400">
          <button 
            onClick={handleLogout}
            className="flex items-center p-3 w-full rounded-lg text-white hover:bg-teal-400 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span>Çıkış</span>
          </button>
        </div>
      </div>
    </>
  );
}