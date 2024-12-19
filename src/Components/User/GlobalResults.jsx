import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GlobalResults() {
    const nav= useNavigate(null);
    // Dummy data - keyinchalik serverdan olingan ma'lumotlar o'rniga ishlatiladi
    const users = Array.from({ length: 50 }, (_, index) => ({
        name: `Foydalanuvchi ${index + 1}`,
        correctAnswers: Math.floor(Math.random() * 20),
        totalQuestions: 20,
        rank: index + 1,
    }));

    const itemsPerPage = 10; // Har bir sahifada ko'rinadigan foydalanuvchilar soni
    const [currentPage, setCurrentPage] = useState(1);

    // Sahifaga tegishli foydalanuvchilarni hisoblash
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    // Sahifa o'zgartirish funksiyalari
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='w-full h-screen p-5 min-h-screen bg-gray-800 text-white flex flex-col'>
            <div className="flex w-full justify-between items-center">
            <h1 className="text-white text-4xl font-semibold mb-5">Umumiy Natijalar</h1>
            <button onClick={()=>nav("/main")} className="btn px-5 py-3 bg-blue-500 text-white hover:bg-blue-300 rounded-lg">Ortga qaytish</button>
            </div>
            {/* Foydalanuvchilar ro'yxati */}
            <div className="box bg-gray-600 w-full h-[500px] rounded-lg p-5 overflow-y-auto">
                <table className="table-auto w-full text-left text-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b-2 border-gray-500">#</th>
                            <th className="px-4 py-2 border-b-2 border-gray-500">Avatar</th>
                            <th className="px-4 py-2 border-b-2 border-gray-500">Ism</th>
                            <th className="px-4 py-2 border-b-2 border-gray-500">To'g'ri Javoblar</th>
                            <th className="px-4 py-2 border-b-2 border-gray-500">Umumiy Savollar</th>
                            <th className="px-4 py-2 border-b-2 border-gray-500">Orin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-500">
                                <td className="px-4 py-2">{startIndex + index + 1}</td>
                                <td className="px-4 py-2">
                                    <img
                                        src={user.avatar || `https://picsum.photos/10`}
                                        alt="Avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                </td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.correctAnswers}</td>
                                <td className="px-4 py-2">{user.totalQuestions}</td>
                                <td className="px-4 py-2">{user.rank}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* Paginatsiya */}
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
                >
                    Oldingi
                </button>
                <span className="text-gray-300">
                    Sahifa: {currentPage} / {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
                >
                    Keyingi
                </button>
            </div>
        </div>
    );
}
