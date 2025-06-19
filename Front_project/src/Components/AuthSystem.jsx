import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, FaLock, FaSchool, FaGraduationCap, FaIdCard, 
  FaChalkboardTeacher, FaArrowLeft, FaUserPlus, FaSignInAlt, 
  FaEye, FaEyeSlash 
} from 'react-icons/fa';

const AuthSystem = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('');
  const [formStep, setFormStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [studentForm, setStudentForm] = useState({
    firstName: '',
    lastName: '',
    securityNum: '',
    birthDate: '',
    enrolledSchool: '',
    grade: '',
    eduLevel: '',
    email: '',
    password: ''
  });

  const [teacherForm, setTeacherForm] = useState({
    firstName: '',
    lastName: '',
    securityNum: '',
    birthDate: '',
    enrolledSchool: '',
    branch: '',
    eduLevel: '',
    email: '',
    password: ''
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const API_BASE_URL = 'http://localhost:5268/api/auth';

  // TCKN validation
  const validateTCKN = (tckn) => {
    if (!tckn || tckn.length !== 11 || isNaN(tckn)) return false;
    let sumFirst10 = 0;
    for (let i = 0; i < 10; i++) {
      sumFirst10 += parseInt(tckn.charAt(i));
    }
    const eleventhDigit = parseInt(tckn.charAt(10));
    let sumFirst9 = 0;
    for (let i = 0; i < 9; i++) {
      sumFirst9 += parseInt(tckn.charAt(i));
    }
    const tenthDigit = sumFirst9 % 10;
    return (sumFirst10 % 10 === eleventhDigit) && (tenthDigit === parseInt(tckn.charAt(9)));
  };

  // Email validation
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Password validation
  const validatePassword = (password) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
  };

  const handleTypeSelect = (type) => {
    setUserType(type);
    setFormStep(1);
    setError('');
  };

  const handleFormChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'student') {
      setStudentForm(prev => ({ ...prev, [name]: value }));
    } else if (formType === 'teacher') {
      setTeacherForm(prev => ({ ...prev, [name]: value }));
    } else {
      setLoginForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAPICall = async (endpoint, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Client-side validations
      if (!isLogin) {
        const form = userType === 'student' ? studentForm : teacherForm;
        if (!validateTCKN(form.securityNum)) {
          throw new Error('Geçersiz T.C. Kimlik Numarası');
        }
        if (!validateEmail(form.email)) {
          throw new Error('Geçerli bir E-posta adresi girin');
        }
        if (!validatePassword(form.password)) {
          throw new Error('Şifre en az 8 karakter olmalı ve büyük harf, küçük harf ve sayı içermeli');
        }
        if (userType === 'student' && !['birinci', 'ikinci', 'üçüncü', 'dördüncü'].includes(studentForm.grade)) {
          throw new Error('Geçerli bir sınıf seçin (Birinci, İkinci, Üçüncü, Dördüncü)');
        }
        if (!['ilk', 'orta', 'lise'].includes(form.eduLevel)) {
          throw new Error('Geçerli bir eğitim seviyesi seçin (İlkokul, Ortaokul, Lise)');
        }
      } else {
        if (!validateEmail(loginForm.email)) {
          throw new Error('Geçerli bir E-posta adresi girin');
        }
      }

      // Prepare API data
      let apiData, endpoint;
      if (isLogin) {
        endpoint = '/signin';
        apiData = { email: loginForm.email, password: loginForm.password };
      } else {
        endpoint = '/signup';
        apiData = userType === 'student' ? {
          userType: 'student',
          firstName: studentForm.firstName,
          lastName: studentForm.lastName,
          email: studentForm.email,
          password: studentForm.password,
          securityNum: studentForm.securityNum,
          birthDate: studentForm.birthDate,
          eduLevel: studentForm.eduLevel,
          grade: studentForm.grade,
          enrolledSchool: studentForm.enrolledSchool
        } : {
          userType: 'teacher',
          firstName: teacherForm.firstName,
          lastName: teacherForm.lastName,
          email: teacherForm.email,
          password: teacherForm.password,
          securityNum: teacherForm.securityNum,
          birthDate: teacherForm.birthDate,
          eduLevel: teacherForm.eduLevel,
          branch: teacherForm.branch,
          enrolledSchool: teacherForm.enrolledSchool
        };
      }

      const result = await handleAPICall(endpoint, apiData);

      // Handle successful response
      if (result.token) {
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('userFullName', result.fullname);
        localStorage.setItem('userType', result.userType);
        localStorage.setItem('userId', result._id);
        setFormStep(2);
      }
    } catch (error) {
      let errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
      try {
        const parsedError = JSON.parse(error.message);
        if (parsedError.message && typeof parsedError.message === 'object') {
          errorMessage = Object.values(parsedError.message).join(', ');
        } else {
          errorMessage = parsedError.message || errorMessage;
        }
      } catch (e) {
        errorMessage = error, errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    if (formStep === 1) setFormStep(0);
    else if (formStep === 2) setFormStep(1);
    else navigate('/');
    setError('');
  };

  const handleSuccessfulAuth = () => {
    onAuthSuccess();
    navigate('/');
  };

  const clearForms = () => {
    setStudentForm({
      firstName: '', lastName: '', securityNum: '', birthDate: '',
      enrolledSchool: '', grade: '', eduLevel: '', email: '', password: ''
    });
    setTeacherForm({
      firstName: '', lastName: '', securityNum: '', birthDate: '',
      enrolledSchool: '', branch: '', eduLevel: '', email: '', password: ''
    });
    setLoginForm({ email: '', password: '' });
  };

  // Mapping for user-friendly labels
  const gradeOptions = [
    { value: 'birinci', label: '1. Sınıf' },
    { value: 'ikinci', label: '2. Sınıf' },
    { value: 'üçüncü', label: '3. Sınıf' },
    { value: 'dördüncü', label: '4. Sınıf' }
  ];

  const eduLevelOptions = [
    { value: 'ilk', label: 'İlkokul' },
    { value: 'orta', label: 'Ortaokul' },
    { value: 'lise', label: 'Lise' }
  ];

  // User type selection screen
  if (formStep === 0) {
    return (
      <div style={{ backgroundColor: '#66cdaa' }} className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-green-800">
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="space-y-3">
            <button
              onClick={() => handleTypeSelect('student')}
              className="flex items-center justify-between w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition"
            >
              <span className="flex items-center">
                <FaGraduationCap className="mr-2" />
                Öğrenci
              </span>
              <span>→</span>
            </button>
            
            <button
              onClick={() => handleTypeSelect('teacher')}
              className="flex items-center justify-between w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition"
            >
              <span className="flex items-center">
                <FaChalkboardTeacher className="mr-2" />
                Öğretmen
              </span>
              <span>→</span>
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                clearForms();
              }}
              className="text-green-600 hover:text-green-800 font-medium"
            >
              {isLogin ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten hesabınız var mı? Giriş yapın'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Form screen
  if (formStep === 1) {
    return (
      <div style={{ backgroundColor: '#66cdaa' }} className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <FaArrowLeft className="mr-1" /> Geri
          </button>
          
          <h1 className="text-xl font-bold text-center mb-4">
            {isLogin 
              ? `${userType === 'student' ? 'Öğrenci' : 'Öğretmen'} Girişi` 
              : `${userType === 'student' ? 'Öğrenci' : 'Öğretmen'} Kaydı`}
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-3">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-3">
            {isLogin ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={loginForm.email}
                      onChange={(e) => handleFormChange(e, 'login')}
                      className="block w-full pl-10 pr-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={loginForm.password}
                      onChange={(e) => handleFormChange(e, 'login')}
                      className="block w-full pl-10 pr-10 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                      minLength="8"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-400 hover:text-gray-500" />
                      ) : (
                        <FaEye className="text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : userType === 'student' ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                    <input
                      type="text"
                      name="firstName"
                      value={studentForm.firstName}
                      onChange={(e) => handleFormChange(e, 'student')}
                      className="block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                      minLength="3"
                      maxLength="25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                    <input
                      type="text"
                      name="lastName"
                      value={studentForm.lastName}
                      onChange={(e) => handleFormChange(e, 'student')}
                      className="block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                      minLength="2"
                      maxLength="25"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                  <input
                    type="email"
                    name="email"
                    value={studentForm.email}
                    onChange={(e) => handleFormChange(e, 'student')}
                    className="block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">T.C. Kimlik No</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaIdCard className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="securityNum"
                      value={studentForm.securityNum}
                      onChange={(e) => handleFormChange(e, 'student')}
                      className="block w-full pl-10 pr-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                      minLength="11"
                      maxLength="11"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doğum Tarihi</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={studentForm.birthDate}
                    onChange={(e) => handleFormChange(e, 'student')}
                    className="block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Okul</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSchool className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="enrolledSchool"
                      value={studentForm.enrolledSchool}
                      onChange={(e) => handleFormChange(e, 'student')}
                      className="block w-full pl-10 pr-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Eğitim Seviyesi</label>
                    <select
                      name="eduLevel"
                      value={studentForm.eduLevel}
                      onChange={(e) => handleFormChange(e, 'student')}
                      className="block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="">Seçiniz</option>
                      {eduLevelOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sınıf</label>
                    <select
                      name="grade"
                      value={studentForm.grade}
                      onChange={(e) => handleFormChange(e, 'student')}
                      className="block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                      disabled={!studentForm.eduLevel}
                    >
                      <option value="">Seçiniz</option>
                      {gradeOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={studentForm.password}
                      onChange={(e) => handleFormChange(e, 'student')}
                      className="block w-full pl-10 pr-10 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                      minLength="8"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-400 hover:text-gray-500" />
                      ) : (
                        <FaEye className="text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">En az 8 karakter, büyük/küçük harf ve sayı içermeli</p>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                    <input
                      type="text"
                      name="firstName"
                      value={teacherForm.firstName}
                      onChange={(e) => handleFormChange(e, 'teacher')}
                      className="block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                      minLength="3"
                      maxLength="25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                    <input
                      type="text"
                      name="lastName"
                      value={teacherForm.lastName}
                      onChange={(e) => handleFormChange(e, 'teacher')}
                      className="block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                      minLength="2"
                      maxLength="25"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                  <input
                    type="email"
                    name="email"
                    value={teacherForm.email}
                    onChange={(e) => handleFormChange(e, 'teacher')}
                    className="block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">T.C. Kimlik No</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaIdCard className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="securityNum"
                      value={teacherForm.securityNum}
                      onChange={(e) => handleFormChange(e, 'teacher')}
                      className="block w-full pl-10 pr-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                      minLength="11"
                      maxLength="11"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doğum Tarihi</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={teacherForm.birthDate}
                    onChange={(e) => handleFormChange(e, 'teacher')}
                    className="block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Çalıştığı Okul</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSchool className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="enrolledSchool"
                      value={teacherForm.enrolledSchool}
                      onChange={(e) => handleFormChange(e, 'teacher')}
                      className="block w-full pl-10 pr-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branş</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaChalkboardTeacher className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="branch"
                      value={teacherForm.branch}
                      onChange={(e) => handleFormChange(e, 'teacher')}
                      className="block w-full pl-10 pr-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                      placeholder="Matematik, Türkçe, Fen Bilgisi vb."
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eğitim Seviyesi</label>
                  <select
                    name="eduLevel"
                    value={teacherForm.eduLevel}
                    onChange={(e) => handleFormChange(e, 'teacher')}
                    className="block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Seçiniz</option>
                    {eduLevelOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={teacherForm.password}
                      onChange={(e) => handleFormChange(e, 'teacher')}
                      className="block w-full pl-10 pr-10 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                      minLength="8"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-400 hover:text-gray-500" />
                      ) : (
                        <FaEye className="text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">En az 8 karakter, büyük/küçük harf ve sayı içermeli</p>
                </div>
              </>
            )}
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : isLogin ? (
                  <><FaSignInAlt className="mr-2" /> Giriş Yap</>
                ) : (
                  <><FaUserPlus className="mr-2" /> Kayıt Ol</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Success screen
  return (
    <div className="bg-green-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          {isLogin ? 'Giriş Başarılı!' : 'Kayıt Başarılı!'}
        </h2>
        
        <p className="text-sm text-gray-500 mb-6">
          {isLogin 
            ? 'Tahmin oyununa hoş geldiniz! Şimdi oyuna başlayabilirsiniz.' 
            : 'Kayıt işleminiz tamamlandı! Şimdi giriş yapabilirsiniz.'}
        </p>
        
        <button
          onClick={handleSuccessfulAuth}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Anasayfaya Git
        </button>
        
        {!isLogin && (
          <button
            onClick={() => {
              setIsLogin(true);
              setFormStep(0);
              clearForms();
            }}
            className="w-full mt-3 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Giriş Sayfasına Dön
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthSystem;