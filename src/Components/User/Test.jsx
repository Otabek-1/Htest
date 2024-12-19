import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Test() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate(null);

  // Modalni ochish
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Modalni yopish
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-gray-800 h-full rounded-xl p-6 flex flex-col gap-6">
      <h2 className="text-white text-3xl font-bold text-center">Testlar</h2>

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
          <li className="test-item bg-gray-600 rounded-lg p-5 flex flex-col gap-3 shadow-md hover:shadow-xl transition duration-300">
            <h3 className="test-title text-xl font-semibold text-white">Jahon Tarixi</h3>
            <p className="desc text-sm text-gray-300">
              Dunyo tarixiga oid savollar va testlar. Tarixiy faktlarni sinab ko'ring!
            </p>
            <div className="flex justify-between items-center">
              <button
                onClick={openModal}
                className="start px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
              >
                Boshlash
              </button>
            </div>
          </li>

          {/* Example Test Item */}
          <li className="test-item bg-gray-600 rounded-lg p-5 flex flex-col gap-3 shadow-md hover:shadow-xl transition duration-300">
            <h3 className="test-title text-xl font-semibold text-white">O'zbekiston Tarixi</h3>
            <p className="desc text-sm text-gray-300">
              O'zbekiston tarixi va madaniyati haqida bilimlarni sinab ko'ring!
            </p>
            <div className="flex justify-between items-center">
              <button
                onClick={openModal}
                className="start px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
              >
                Boshlash
              </button>
            </div>
          </li>
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-white text-xl font-semibold text-center ">Aniq boshlamoqchimisiz?</h3>
            <p className='mb-4 text-sm text-center text-gray-500'>Bu testni faqat 1 marta ishlashingiz mumkin!</p>
            <div className="flex justify-between gap-4">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition duration-200"
              >
                Yo'q
              </button>
              <button
                onClick={() => {
                  closeModal();
                  nav("/test");
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-200"
              >
                Ha, boshlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
