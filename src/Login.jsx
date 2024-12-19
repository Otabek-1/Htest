import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);  // Login yoki Registerni ko'rsatish
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Errorni saqlash
  const [success, setSuccess] = useState(''); // Success xabarini saqlash
  const navigate = useNavigate(); // Sahifaga yo'naltirish uchun

  // Login yoki Register formalari uchun handlerlar
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? 'http://localhost:4000/api/auth/login'
      : 'http://localhost:4000/api/auth/register';
  
    // Ro'yxatdan o'tish uchun parolni tasdiqlash
    if (!isLogin && password !== confirmPassword) {
      setError('Parollar mos kelmaydi');
      return;
    }
  
    const userData = isLogin
      ? { email, password }
      : { name, email, password };
  
    try {
      const response = await axios.post(url, userData);
  
      if (isLogin) {
        setSuccess('Muvaffaqiyatli tizimga kirdingiz!');
        localStorage.setItem('token', response.data.token);
        const userRole = response.data.role;
        if (userRole === 'creator') {
          navigate('/admin/dashboard');
        } else {
          navigate('/main');
        }
      } else {
        setSuccess('Muvaffaqiyatli ro\'yxatdan o\'tish!');
        setTimeout(() => setIsLogin(true), 2000);  // Registerdan keyin login sahifasiga o'tish
      }
      setError(''); // Xatolik bo'lmasligi uchun errorni tozalash
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Xatolik yuz berdi';
      setError(errorMessage);
      setSuccess(''); // Successni tozalash
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-[600px]">
        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          {isLogin ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
        </h2>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {typeof error === 'string' ? error : 'Xatolik yuz berdi'}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="text-green-500 text-center mb-4">
            {success}
          </div>
        )}

        {/* Login Form */}
        {isLogin && (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email kiriting"
                className="w-full px-6 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white text-lg"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-medium text-gray-300">
                Parol
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolni kiriting"
                className="w-full px-6 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white text-lg"
              />
            </div>
            <div className="mb-8 flex flex-col justify-between items-center">
              <button type="submit" className="w-full py-4 mb-4 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 focus:outline-none">
                Kirish
              </button>
              <button 
                type="button" 
                className="w-full py-4 mb-4 text-blue-500 bg-gray-700 text-lg rounded-md hover:bg-gray-600 focus:outline-none"
                onClick={() => setIsLogin(false)}
              >
                Ro'yxatdan o'tish
              </button>
            </div>
            <div className="text-center">
              <button 
                type="button" 
                className="text-lg text-blue-500 hover:underline focus:outline-none"
                onClick={() => alert("Parolni tiklash tugmasi bosildi")}
              >
                Parolni unutdingizmi?
              </button>
            </div>
          </form>
        )}

        {/* Register Form */}
        {!isLogin && (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-lg font-medium text-gray-300">
                Foydalanuvchi nomi
              </label>
              <input
                id="username"
                type="text"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Foydalanuvchi nomini tanlang"
                className="w-full px-6 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white text-lg"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Emailni kiriting"
                className="w-full px-6 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white text-lg"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-medium text-gray-300">
                Parol
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolni yarating"
                className="w-full px-6 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white text-lg"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-300">
                Parolni tasdiqlang
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Parolni tasdiqlang"
                className="w-full px-6 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white text-lg"
              />
            </div>
            <div className="mb-8 flex flex-col justify-between items-center">
              <button type="submit" className="w-full py-4 mb-4 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 focus:outline-none">
                Ro'yxatdan o'tish
              </button>
              <button 
                type="button" 
                className="w-full py-4 mb-4 text-blue-500 bg-gray-700 text-lg rounded-md hover:bg-gray-600 focus:outline-none"
                onClick={() => setIsLogin(true)}
              >
                Kirish
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
