import React, { useState } from 'react';
import axios from 'axios';

export default function CreateTest() {
  const [test, setTest] = useState({
    title: '',
    participantsCount: 0,
    participantsList: [],
    startTime: '',
    duration: 0,
    description: '',
    questions: [],
  });

  const handleAddQuestion = () => {
    setTest({
      ...test,
      questions: [
        ...test.questions,
        { question: '', options: ['', '', '', ''], correctOption: 0 },
      ],
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...test.questions];
    updatedQuestions[index][field] = value;
    setTest({ ...test, questions: updatedQuestions });
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedQuestions = [...test.questions];
    updatedQuestions[index].options[optionIndex] = value;
    setTest({ ...test, questions: updatedQuestions });
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = test.questions.filter((_, i) => i !== index);
    setTest({ ...test, questions: updatedQuestions });
  };

  const handleSubmit = async () => {
    if (test.title.trim() && test.description.trim() && test.questions.length > 0) {
      const formattedData = {
        title: test.title,
        participantsCount: test.participantsCount,
        participantsList: test.participantsList,
        startTime: test.startTime,
        duration: test.duration,
        description: test.description,
        questions: test.questions.map((q) => ({
          question: q.question,
          options: q.options,
          correctOption: q.correctOption,
        })),
      };

      try {
        const response = await axios.post(
          'http://localhost:4000/api/auth/create-test',
          formattedData
        );

        if (response.status === 200) {
          alert('Test muvaffaqiyatli saqlandi!');
          setTest({
            title: '',
            participantsCount: 0,
            participantsList: [],
            startTime: '',
            duration: 0,
            description: '',
            questions: [],
          });
        } else {
          alert('Testni saqlashda xatolik yuz berdi.');
        }
      } catch (error) {
        console.error('Xatolik yuz berdi:', error);
        alert("Server bilan bog'lanishda xatolik yuz berdi.");
      }
    } else {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Test Yaratish</h1>

      {/* Test Sarlavhasi */}
      <div className="mb-6">
        <input
          type="text"
          value={test.title}
          onChange={(e) => setTest({ ...test, title: e.target.value })}
          placeholder="Test Sarlavhasi"
          className="w-full max-w-4xl px-4 py-2 rounded bg-gray-700 text-white"
        />
      </div>

      {/* Qatnashuvchilar soni */}
      <div className="mb-6">
        <input
          type="number"
          value={test.participantsCount}
          onChange={(e) => setTest({ ...test, participantsCount: parseInt(e.target.value) })}
          placeholder="Qatnashuvchilar soni"
          className="w-full max-w-4xl px-4 py-2 rounded bg-gray-700 text-white"
        />
      </div>

      {/* Boshlanish vaqti */}
      <div className="mb-6">
        <input
          type="datetime-local"
          value={test.startTime}
          onChange={(e) => setTest({ ...test, startTime: e.target.value })}
          placeholder="Boshlanish vaqti"
          className="w-full max-w-4xl px-4 py-2 rounded bg-gray-700 text-white"
        />
      </div>

      {/* Davomiylik */}
      <div className="mb-6">
        <input
          type="number"
          value={test.duration}
          onChange={(e) => setTest({ ...test, duration: parseInt(e.target.value) })}
          placeholder="Test davomiyligi (daqiqa)"
          className="w-full max-w-4xl px-4 py-2 rounded bg-gray-700 text-white"
        />
      </div>

      {/* Test Tavsifi */}
      <div className="mb-6">
        <textarea
          value={test.description}
          onChange={(e) => setTest({ ...test, description: e.target.value })}
          placeholder="Test Tavsifi"
          rows="4"
          className="w-full max-w-4xl px-4 py-2 rounded bg-gray-700 text-white"
        />
      </div>

      {/* Savollar Qo'shish */}
      {test.questions.map((question, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Savol {index + 1}</h3>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
            placeholder="Savolni kiriting"
            className="w-full max-w-4xl px-4 py-2 rounded bg-gray-700 text-white mb-2"
          />

          {/* Variantlar */}
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                placeholder={`Variant ${optionIndex + 1}`}
                className="w-full max-w-4xl px-4 py-2 rounded bg-gray-700 text-white"
              />
            </div>
          ))}

          {/* To'g'ri javob */}
          <select
            value={question.correctOption}
            onChange={(e) => handleQuestionChange(index, 'correctOption', parseInt(e.target.value))}
            className="w-full max-w-4xl px-4 py-2 rounded bg-gray-700 text-white"
          >
            {question.options.map((_, optionIndex) => (
              <option key={optionIndex} value={optionIndex}>
                Variant {optionIndex + 1}
              </option>
            ))}
          </select>

          <button
            onClick={() => handleDeleteQuestion(index)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Savolni O'chirish
          </button>
        </div>
      ))}

      {/* Savol Qo'shish */}
      <button onClick={handleAddQuestion} className="bg-blue-500 text-white px-4 py-2 rounded">
        Savol Qo'shish
      </button>

      {/* Testni Saqlash */}
      <button onClick={handleSubmit} className="ml-4 bg-green-500 text-white px-4 py-2 rounded">
        Testni Saqlash
      </button>
    </div>
  );
}
