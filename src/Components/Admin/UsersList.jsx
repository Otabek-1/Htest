import axios from 'axios';
import React, { useEffect, useState } from 'react';



export default function UsersList() {
  const [users, setUsers] = useState([]);
  const usersPerPage = 4; // Bir sahifada nechta foydalanuvchi ko'rsatilishini belgilash
  const [currentPage, setCurrentPage] = useState(1); // Joriy sahifa
  useEffect(() => {
    axios.get('http://localhost:4000/api/auth/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  // Paginatsiya uchun hisoblash
  const totalPages = Math.ceil(users.length / usersPerPage);
  const currentUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );


  // Keyingi va oldingi sahifalarni ko'rsatish funksiyalari
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-600 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Foydalanuvchilar Ro'yxati</h1>

      {/* Jadval */}
      <table className="w-full table-auto bg-gray-700 rounded-lg">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2 text-left">Avatar</th>
            <th className="px-4 py-2 text-left">Full Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="bg-gray-600 hover:bg-gray-500">
              <td className="px-7 py-2">
                {index+1}
              </td>
              <td className="px-4 py-2">{user.fullname}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginatsiya */}
      <div className="flex justify-center mt-8">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Oldingi
        </button>
        <span className="mx-4 text-xl">{`${currentPage} / ${totalPages}`}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Keyingi
        </button>
      </div>
    </div>
  );
}
