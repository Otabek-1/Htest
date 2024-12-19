import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate hookini import qilish

export default function TestPage() {
  const navigate = useNavigate();  // useNavigate hookini chaqirish

  // State-lar
  const [currentTest, setCurrentTest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [nextORfinish, setNextOrFinish] = useState("Keyingi test");
  const [testFinished, setTestFinished] = useState(false);

  const tests = [
    {
      question: 'Qaysi yil Rim imperiyasi quladi?',
      options: ['476', '1453', '800', '1215'],
      correct: 0,
    },
    {
      question: 'Buyuk geografik kashfiyotlar qaysi davrga to\'g\'ri keladi?',
      options: ['XIV asr', 'XV asr', 'XVI asr', 'XVII asr'],
      correct: 1,
    },
    {
      question: 'Ikkinchi jahon urushi qaysi yilda tugadi?',
      options: ['1941', '1943', '1945', '1950'],
      correct: 2,
    },
  ];

  useEffect(() => {
    if (timeLeft > 0 && !testFinished) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, testFinished]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextTest = () => {
    if (currentTest === tests.length - 1) {
      setTestFinished(true);
      navigate('/result', { state: { score: score + 1 } });  // Test tugagach, natijalarni ko'rsatish sahifasiga yo'naltirish
    }

    if (currentTest === tests.length - 2) {
      setNextOrFinish("Testni yakunlash");
    } else {
      setNextOrFinish("Keyingi test");
    }

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    if (tests[currentTest].correct === selectedOption) {
      setScore(score + 1);
    }

    if (currentTest < tests.length - 1) {
      setCurrentTest(currentTest + 1);
      setSelectedOption(null);
    } else {
      setTestFinished(true);
    }
  };

  const handlePrevtTest = () => {
    if (currentTest > 0) {
      setCurrentTest(currentTest - 1);
      setSelectedOption(answers[currentTest - 1] || null);
    }
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  return (
    <div className='w-full h-screen p-5 min-h-screen bg-gray-800 text-white flex flex-col'>
      <h1 className='text-3xl font-bold mb-5'>Test: Jahon tarixi</h1>
      <div className='mb-5 text-lg'>
        Qolgan vaqt: <span className='font-mono text-yellow-400'>{formatTime(timeLeft)}</span>
      </div>
      <div className='mt-2 mb-5 flex space-x-2'>
        {tests.map((_, index) => (
          <div key={index} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold cursor-pointer shadow-lg ${currentTest === index ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'}`}>
            {index + 1}
          </div>
        ))}
      </div>

      <div className='flex-1 bg-gray-700 rounded-lg p-5 shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>{tests[currentTest].question}</h2>
        <div className='grid grid-cols-1 gap-3'>
          {tests[currentTest].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`w-full text-left px-4 py-3 rounded hover:bg-gray-500 ${selectedOption === index ? 'bg-blue-500' : 'bg-gray-600'}`}
            >
              {option}
            </button>
          ))}
        </div>

        <button onClick={handlePrevtTest} className='mt-5 bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded mx-2'>
          Oldingi test
        </button>

        <button onClick={handleNextTest} className='mt-5 bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded'>
          {nextORfinish}
        </button>
      </div>
    </div>
  );
}
