import { useState } from 'react';
import { User, Play, BarChart2, LogOut, Menu, X, Bell } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar({ isAuthenticated, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Örnek bildirimler - gerçek uygulamada bu veriler props olarak geçilebilir veya API'dan alınabilir
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Yeni oyun eklendi: Hafıza Kartları", read: false, date: "2 saat önce" },
    { id: 2, message: "Analiz raporunuz hazır", read: false, date: "1 gün önce" },
    { id: 3, message: "Profil bilgilerinizi güncelleyin", read: true, date: "3 gün önce" },
  ]);
  
  const unreadCount = notifications.filter(notif => !notif.read).length;
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    // Sidebar kapandığında bildirimleri de kapat
    if (isOpen) setShowNotifications(false);
  };
  
  const toggleNotifications = (e) => {
    e.stopPropagation(); // Tıklamanın sidebar'ı etkilememesi için event'i durdur
    setShowNotifications(!showNotifications);
  };
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };
  
  const menuItems = [
    { icon: <User size={20} />, text: "Profil", path: "/profile", active: location.pathname === "/profile" },
    { icon: <Play size={20} />, text: "Oyunlar", path: "/gameselection", active: location.pathname === "/gameselection" },
    { icon: <BarChart2 size={20} />, text: "Analizler", path: "/analytics", active: location.pathname === "/analytics" },
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
      {/* Toggle button - sidebar açıkken z-indeksi daha yüksek */}
      <button 
        className={`fixed top-4 left-4 p-2 rounded-md shadow-md z-30 ${isOpen ? 'z-40' : 'z-30'}`}
        onClick={toggleSidebar}
        style={{ backgroundColor: "#66cdaa" }}
      >
        {isOpen ? <X size={20} color="white" /> : <Menu size={20} color="white" />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 shadow-lg flex flex-col z-20 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: "#66cdaa" }}
      >
        {/* Logo area - mt-12 eklendi top padding için */}
        <div className="mt-12 p-5 border-b border-teal-400 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">TUNGA</h1>
          
          {/* Notification bell icon */}
          <div className="relative">
            <button 
              className="text-white p-1 rounded-full hover:bg-teal-400"
              onClick={toggleNotifications}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Notification dropdown - sağa hizalı ve daha küçük */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                <div className="p-2 bg-teal-100 flex justify-between items-center">
                  <h3 className="font-semibold text-sm text-gray-700">Bildirimler</h3>
                  {unreadCount > 0 && (
                    <button 
                      className="text-xs text-teal-700 hover:text-teal-900 px-1 py-0.5 bg-teal-50 rounded"
                      onClick={markAllAsRead}
                    >
                      Okundu
                    </button>
                  )}
                </div>
                
                <div className="max-h-52 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-teal-50' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex justify-between items-start">
                          <p className="text-xs text-gray-800">{notification.message}</p>
                          {!notification.read && (
                            <span className="h-2 w-2 bg-teal-500 rounded-full flex-shrink-0 mt-1"></span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-500 text-xs">
                      Bildirim bulunmuyor
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
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
                  onClick={() => setIsOpen(false)}
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