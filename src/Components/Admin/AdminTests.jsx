import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Test() {
  const [testsData, setTestsData] = useState([]);
  const nav = useNavigate(null);
  const colors = ['text-red-500', 'text-green-500', 'text-blue-400'];


  useEffect(() => {
    setInterval(() => {
      axios.get('http://localhost:4000/api/auth/get-tests')
        .then(res => {
          setTestsData(res.data);
          console.log(res.data);

        })
        .catch(err => {
          console.log(err);
        })
    }, 5000);
  }, [])
  return (
    <div className="w-full bg-gray-800 h-full rounded-xl p-6 flex flex-col gap-6">
      <h2 className="text-white text-3xl font-bold text-center">Testlar</h2>
      <button onClick={() => nav("/create-test")} className='btn px-3 select-none py-3 bg-green-500 text-white rounded-lg text-md mb-3' >Test yaratish</button>

      {/* Search Field */}
      <div className="search-field w-full flex items-center p-4 bg-gray-700 rounded-xl gap-3 shadow-lg">
        <input
          type="text"
          id="test-search"
          className="w-full p-4 rounded-lg bg-gray-600 text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ishlagan yoki ishlamoqchi bo'lgan testni qidirish"
        />
        <button
          type="submit"
          className="submit-button px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-200"
        >
          Qidirish
        </button>
      </div>

      {/* Test List */}
      <div className="test-table w-full bg-gray-700 rounded-xl p-4">
        <ul className="tests flex flex-col gap-4">
          {/* Test Item */}
          {
            testsData.map(test => {
              return (
                <li className="test-item bg-gray-600 rounded-lg p-5 flex flex-col gap-4 shadow-md hover:shadow-xl transition duration-300">
                  <div className="flex items-center gap-10">
                    {/* Test Image */}
                    <i className={`fas fa-question fa-8x ${colors[Math.floor(Math.random() * colors.length)]}`}></i>
                    <div>
                      <h3 className="test-title text-xl font-semibold text-white">{test.title}</h3>
                      <p className="desc text-sm text-gray-300">
                        {test.description}
                      </p>
                      <div className="mt-2 text-gray-400 text-xs">
                        <p>Savollar soni: {test.questions.length}</p>
                        <p>Qatnashayotganlar: {`${test.participantsList.length}/${test.participantsCount}`} </p>
                        <p>Boshlanish vaqti: 2024-12-20</p>
                        <p>Tugash vaqti: 2024-12-30</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    {/* Register Button */}
                    <button className="register px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200">
                      Tahrirlash
                    </button>
                  </div>
                </li>
              )
            })
          }


        </ul>
      </div>
    </div>
  );
}
