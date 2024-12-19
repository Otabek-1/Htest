import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResultPage() {
  const location = useLocation();  // `useLocation` hooki orqali yo'naltirilgan holatni olish
  const nav = useNavigate(null);
  // Ma'lumotlar: faqat hozirgi foydalanuvchining natijalari
  const userResult = location.state?.userResult || { name: "Foydalanuvchi", correctAnswers: 0, rank: "N/A" };

  return (
    <div className='w-full h-screen p-5 min-h-screen bg-gray-800 text-white flex flex-col'>
      <h1 className="text-white text-4xl font-semibold">Natijalar: Jahon tarixi</h1>

      {/* Foydalanuvchi natijasi bo'limi */}
      <div className="box bg-gray-600 w-full h-[500px] mt-5 rounded-lg p-5 overflow-y-auto">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">Sizning test natijalaringiz</h2>

        <div className="bg-gray-500 p-4 rounded-lg">
          <p className="text-lg font-bold">Ism: {userResult.name}</p>
          <p className="text-sm">To'g'ri javoblar: {userResult.correctAnswers}</p>
          <p className="text-sm">Orin: {userResult.rank}</p>
        </div>
        <div className="buttons flex w-full gap-3 p-3">
            <button onClick={()=>nav("/main")} className="btn px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-400">Ortga qaytish</button>
            <button className="btn px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-400">Natijalarni ko'rish</button>
        </div>
      </div>
    </div>
  );
}
