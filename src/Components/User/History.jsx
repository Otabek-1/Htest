import React, { useState } from 'react';

export default function History() {
  const [tests, setTests] = useState([
    { testName: 'Jahon Tarixi', score: 85, date: '2024-12-10' },
    { testName: 'O\'zbekiston Tarixi', score: 92, date: '2024-12-05' },
    { testName: 'Rim Tarixi', score: 78, date: '2024-11-25' },
  ]);

  return (
    <div className="w-full bg-gray-800 h-full rounded-xl p-6 flex flex-col gap-6">
      <h2 className="text-white text-3xl font-bold text-center">Oldingi Testlar</h2>

      {/* Test History List */}
      <div className="history-list flex flex-col gap-4 mt-5">
        {tests.map((test, index) => (
          <div
            key={index}
            className="test-item bg-gray-700 rounded-lg p-5 flex flex-col gap-3 shadow-md hover:shadow-xl transition duration-300"
          >
            <h3 className="test-title text-xl font-semibold text-white">{test.testName}</h3>
            <p className="test-date text-sm text-gray-400">Test olingan sana: {test.date}</p>
            <div className="test-result flex items-center justify-between">
              <p className="test-score text-sm text-green-400 font-semibold">Natija: {test.score} ball</p>
              <button className="view-details px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                Batafsil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
