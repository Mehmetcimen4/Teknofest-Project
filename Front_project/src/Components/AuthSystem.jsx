import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaSchool, FaGraduationCap, FaIdCard, FaChalkboardTeacher, FaArrowLeft, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { MdClass, MdSchool } from 'react-icons/md';

function AuthSystem({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState(''); // 'student' or 'teacher'
  const [formStep, setFormStep] = useState(0); // 0: type selection, 1: form, 2: confirmation
  const navigate = useNavigate();
  
  const [studentForm, setStudentForm] = useState({
    name: '',
    surname: '',
    tcNo: '',
    school: '',
    grade: '',
    level: '' // 'primary', 'middle', 'high'
  });
  
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    surname: '',
    tcNo: '',
    school: '',
    subject: '',
    level: '' // 'primary', 'middle', 'high'
  });
  
  const [loginForm, setLoginForm] = useState({
    tcNo: '',
    password: ''
  });
  
  const handleTypeSelect = (type) => {
    setUserType(type);
    setFormStep(1);
  };
  
  const handleFormChange = (e, formType) => {
    const { name, value } = e.target;
    
    if (formType === 'student') {
      setStudentForm({
        ...studentForm,
        [name]: value
      });
    } else if (formType === 'teacher') {
      setTeacherForm({
        ...teacherForm,
        [name]: value
      });
    } else if (formType === 'login') {
      setLoginForm({
        ...loginForm,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle API calls for authentication/registration
    setFormStep(2);
  };
  
  const handleGoBack = () => {
    if (formStep === 1) {
      setFormStep(0);
      setUserType('');
    } else if (formStep === 2) {
      setFormStep(1);
    } else {
      navigate('/');
    }
  };
  
  const handleExternalAuth = (type) => {
    // This would integrate with e-okul or e-devlet APIs
    console.log(`Authenticating with ${type}`);
    // Simulate successful authentication and trigger the auth success callback
    onAuthSuccess();
    navigate('/');
  };

  const handleSuccessfulAuth = () => {
    // Call the onAuthSuccess callback to update authentication state in the parent
    onAuthSuccess();
    navigate('/');
  };
  
  // Light green theme colors
  const primaryColor = 'bg-green-50';
  const secondaryColor = 'bg-green-500';
  const secondaryHoverColor = 'hover:bg-green-600';
  const accentColor = 'bg-green-100';
  const textColor = 'text-green-800';
  const borderColor = 'border-green-300';
  const focusRingColor = 'focus:ring-green-500';
  
  // User type selection screen
  if (formStep === 0) {
    return (
      <div style={{ backgroundColor: "#66cdaa" }} className={`auth-container ${primaryColor} min-h-screen flex items-center justify-center p-4`}>
        <div style={{ backgroundColor: "#66cdaa" }} className=" rounded-lg  w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
            {isLogin ? "Tahmin Oyununa Giriş Yap" : "Tahmin Oyununa Kayıt Ol"}
          </h1>
          
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleTypeSelect('student')}
              className={`flex items-center justify-between ${secondaryColor} ${secondaryHoverColor} text-white font-bold py-3 px-4 rounded transition duration-300`}
            >
              <span className="flex items-center">
                <FaGraduationCap className="mr-2" size={20} />
                Öğrenci
              </span>
              <span>→</span>
            </button>
            
            <button
              onClick={() => handleTypeSelect('teacher')}
              className={`flex items-center justify-between ${secondaryColor} ${secondaryHoverColor} text-white font-bold py-3 px-4 rounded transition duration-300`}
            >
              <span className="flex items-center">
                <FaChalkboardTeacher className="mr-2" size={20} />
                Öğretmen
              </span>
              <span>→</span>
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className={`${textColor} hover:text-green-700 font-medium`}
            >
              {isLogin 
                ? "Hesabınız yok mu? Kayıt olun" 
                : "Zaten hesabınız var mı? Giriş yapın"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Registration/Login forms
  if (formStep === 1) {
    return (
      <div style={{ backgroundColor: "#66cdaa" }} className={`auth-container ${primaryColor} min-h-screen flex items-center justify-center p-4`}>
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md overflow-y-auto max-h-screen">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <FaArrowLeft className="mr-1" /> Geri
          </button>
          
          <h1 className="text-2xl font-bold text-center mb-6">
            {isLogin 
              ? `${userType === 'student' ? 'Öğrenci' : 'Öğretmen'} Girişi` 
              : `${userType === 'student' ? 'Öğrenci' : 'Öğretmen'} Kaydı`}
          </h1>
          
          {/* External Auth Options */}
          <div className="mb-6">
            <button
              onClick={() => handleExternalAuth(userType === 'student' ? 'e-okul' : 'e-devlet')}
              className={`w-full flex items-center justify-center font-bold py-3 px-4 rounded mb-3 transition duration-300 ${accentColor} ${textColor} hover:bg-green-200`}
            >
              {userType === 'student' ? 'e-Okul ile Giriş Yap' : 'e-Devlet ile Giriş Yap'}
            </button>
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 bg-white">veya</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
          </div>
          
          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            {isLogin ? (
              // Login Form - Simplified for both student and teacher
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tcNo">
                    T.C. Kimlik No
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                      <FaIdCard />
                    </span>
                    <input
                      type="text"
                      id="tcNo"
                      name="tcNo"
                      value={loginForm.tcNo}
                      onChange={(e) => handleFormChange(e, 'login')}
                      className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor}`}
                      required
                      minLength="11"
                      maxLength="11"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Şifre
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={loginForm.password}
                      onChange={(e) => handleFormChange(e, 'login')}
                      className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor}`}
                      required
                    />
                  </div>
                </div>
              </div>
            ) : userType === 'student' ? (
              // Student Registration Form
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-4 sm:space-y-0">
                  <div className="sm:w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Ad
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={studentForm.name}
                        onChange={(e) => handleFormChange(e, 'student')}
                        className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor}`}
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                      Soyad
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={studentForm.surname}
                        onChange={(e) => handleFormChange(e, 'student')}
                        className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor}`}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tcNo">
                    T.C. Kimlik No
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                      <FaIdCard />
                    </span>
                    <input
                      type="text"
                      id="tcNo"
                      name="tcNo"
                      value={studentForm.tcNo}
                      onChange={(e) => handleFormChange(e, 'student')}
                      className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor}`}
                      required
                      minLength="11"
                      maxLength="11"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="school">
                    Okul
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                      <FaSchool />
                    </span>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      value={studentForm.school}
                      onChange={(e) => handleFormChange(e, 'student')}
                      className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor}`}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
                    Okul Seviyesi
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                      <MdSchool />
                    </span>
                    <select
                      id="level"
                      name="level"
                      value={studentForm.level}
                      onChange={(e) => handleFormChange(e, 'student')}
                      className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor} appearance-none`}
                      required
                    >
                      <option value="">Seçiniz</option>
                      <option value="primary">İlkokul</option>
                      <option value="middle">Ortaokul</option>
                      <option value="high">Lise</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grade">
                    Sınıf
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                      <MdClass />
                    </span>
                    <select
                      id="grade"
                      name="grade"
                      value={studentForm.grade}
                      onChange={(e) => handleFormChange(e, 'student')}
                      className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor} appearance-none`}
                      required
                      disabled={!studentForm.level}
                    >
                      <option value="">Seçiniz</option>
                      {studentForm.level === 'primary' && (
                        <>
                          <option value="1">1. Sınıf</option>
                          <option value="2">2. Sınıf</option>
                          <option value="3">3. Sınıf</option>
                          <option value="4">4. Sınıf</option>
                        </>
                      )}
                      {studentForm.level === 'middle' && (
                        <>
                          <option value="5">5. Sınıf</option>
                          <option value="6">6. Sınıf</option>
                          <option value="7">7. Sınıf</option>
                          <option value="8">8. Sınıf</option>
                        </>
                      )}
                      {studentForm.level === 'high' && (
                        <>
                          <option value="9">9. Sınıf</option>
                          <option value="10">10. Sınıf</option>
                          <option value="11">11. Sınıf</option>
                          <option value="12">12. Sınıf</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Şifre
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor}`}
                      required
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Teacher Registration Form
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-4 sm:space-y-0">
                  <div className="sm:w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Ad
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={teacherForm.name}
                        onChange={(e) => handleFormChange(e, 'teacher')}
                        className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor}`}
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                      Soyad
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={teacherForm.surname}
                        onChange={(e) => handleFormChange(e, 'teacher')}
                        className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor}`}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tcNo">
                    T.C. Kimlik No
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                      <FaIdCard />
                    </span>
                    <input
                      type="text"
                      id="tcNo"
                      name="tcNo"
                      value={teacherForm.tcNo}
                      onChange={(e) => handleFormChange(e, 'teacher')}
                      className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor}`}
                      required
                      minLength="11"
                      maxLength="11"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="school">
                    Çalıştığı Okul
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                      <FaSchool />
                    </span>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      value={teacherForm.school}
                      onChange={(e) => handleFormChange(e, 'teacher')}
                      className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor}`}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                    Branş
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                      <FaChalkboardTeacher />
                    </span>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={teacherForm.subject}
                      onChange={(e) => handleFormChange(e, 'teacher')}
                      className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor}`}
                      required
                      placeholder="Matematik, Türkçe, Fen Bilgisi vb."
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
                    Eğitim Seviyesi
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                      <MdSchool />
                    </span>
                    <select
                      id="level"
                      name="level"
                      value={teacherForm.level}
                      onChange={(e) => handleFormChange(e, 'teacher')}
                      className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor} appearance-none`}
                      required
                    >
                      <option value="">Seçiniz</option>
                      <option value="primary">İlkokul</option>
                      <option value="middle">Ortaokul</option>
                      <option value="high">Lise</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Şifre
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`w-full pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:ring-2 ${focusRingColor}`}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <button
                type="submit"
                className={`w-full flex items-center justify-center font-bold py-3 px-4 rounded transition duration-300 ${secondaryColor} ${secondaryHoverColor} text-white`}
              >
                {isLogin 
                  ? <><FaSignInAlt className="mr-2" /> Giriş Yap</> 
                  : <><FaUserPlus className="mr-2" /> Kayıt Ol</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  // Confirmation/Success screen
  return (
    <div style={{ backgroundColor: "#66cdaa" }} className={`auth-container ${primaryColor} min-h-screen flex items-center justify-center p-4`}>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {isLogin ? "Giriş Başarılı!" : "Kayıt Başarılı!"}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {isLogin 
            ? "Tahmin oyununa hoş geldiniz! Şimdi oyuna başlayabilirsiniz." 
            : "Kayıt işleminiz tamamlandı! Şimdi giriş yapabilirsiniz."}
        </p>
        
        <button
          onClick={handleSuccessfulAuth}
          className={`w-full ${secondaryColor} ${secondaryHoverColor} text-white font-bold py-3 px-4 rounded transition duration-300`}
        >
          Anasayfaya Git
        </button>
        
        {!isLogin && (
          <button
            onClick={() => {
              setIsLogin(true);
              setFormStep(0);
            }}
            className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition duration-300"
          >
            Giriş Sayfasına Dön
          </button>
        )}
      </div>
    </div>
  );
}

export default AuthSystem;