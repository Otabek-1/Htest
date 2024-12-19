import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Test() {
  const [tests, setTests] = useState([]);
  const userId = window.localStorage.getItem('id');
  const token = window.localStorage.getItem('token');

  // Testlarni serverdan olish funksiyasi
  const fetchTests = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/auth/get-tests');
      setTests(response.data);
    } catch (error) {
      console.log('Fetch Tests Error:', error);
    }
  };

  // Sahifa yuklanganda testlarni olish
  useEffect(() => {
    fetchTests();
  }, []);

  async function Register(testId) {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/auth/register-to-test/${testId}`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response.data);
      // Testlar holatini yangilash
      fetchTests(); // Testlarni qayta yuklash
    } catch (error) {
      console.error('Register Error:', error);
    }
  }

  async function unRegister(testId) {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/auth/unregister-from-test/${testId}`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response.data);
      // Testlar holatini yangilash
      fetchTests(); // Testlarni qayta yuklash
    } catch (error) {
      console.error('Unregister Error:', error);
    }
  }

  return (
    <div className="w-full bg-gray-800 h-full rounded-xl p-6 flex flex-col gap-6">
      <h2 className="text-white text-3xl font-bold text-center">Testlar</h2>

      <div className="test-table w-full bg-gray-700 rounded-xl p-4">
        <ul className="tests flex flex-col gap-4">
          {tests
            .filter(test => test.participantsList.includes(userId)) // Faqat ro'yxatdan o'tmagan testlar
            .map(test => {
              return (
                <li key={test._id} className="test-item bg-gray-600 rounded-lg p-5 flex flex-col gap-4 shadow-md hover:shadow-xl transition duration-300">
                  <div className="flex items-center gap-4">
                    <i className="fas fa-question fa-8x"></i>
                    <div>
                      <h3 className="test-title text-xl font-semibold text-white">{test.title}</h3>
                      <p className="desc text-sm text-gray-300">{test.description}</p>
                      <div className="mt-2 text-gray-400 text-xs">
                        <p>Savollar soni: {test.questions.length}</p>
                        <p>Qatnashayotganlar: {test.participantsList.length}/{test.participantsCount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => Register(test._id)}
                      className="register px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
                    >
                      Ro'yxatdan o'tish
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
