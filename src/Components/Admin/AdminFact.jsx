import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


export default function AdminFact() {
  const [searchQuery, setSearchQuery] = useState(''); // Qidiruv so'rovi
  const [searchResults, setSearchResults] = useState([]); // Qidiruv 
  const [posts, setPosts] = useState([]);
  const nav = useNavigate(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/auth/get-posts")
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const handleSearch = async () => {
    // Bu yerda haqiqiy API chaqiruvi yoki qidiruv funktsiyasi bo'lishi mumkin
    // Masalan, tarixiy ma'lumotlarni qidirish uchun
    if (searchQuery.trim() !== '') {
      // Qidiruv natijalari (demo ma'lumotlari)
      setSearchResults({ title: "Result", body: "lorem ipsum dolor sit amet, consectet ut liber..." });
    } else {
      setSearchResults([]);
    }
  };
  return (
    <div className='w-full min-h-screen bg-gray-600 p-5 '>
      <div className='bg-gray-800 p-6 rounded-lg shadow-lg mb-8'>
        <button onClick={() => nav("/create-post")} className='btn px-3 select-none py-3 bg-green-500 text-white rounded-lg text-md mb-3' >Kontent qo'shish</button>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tarixiy fakt yoki shaxsni kiriting"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSearch}
          >
            Qidirish
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <h4 className="text-lg font-bold text-white">Qidiruv Natijalari:</h4>
        <ul className="text-white space-y-2">
          {posts
            .filter(post => {
              // If searchQuery is not empty, filter the posts
              if (searchQuery) {
                return post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  post.content.toLowerCase().includes(searchQuery.toLowerCase());
              }
              // If searchQuery is empty, return all posts
              return true;
            })
            .map((post, index) => (
              <li key={index} className="flex flex-col gap-3">
                <Link to={`/show/${post.slug}`} key="0" className="bg-gray-700 p-4 rounded-md shadow-sm flex flex-col gap-2">
                  <h3 className="result-title text-white text-2xl font-bold">{post.title}</h3>
                  <div className="text-sm opacity-50" dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) + "..." }} />
                </Link>
                <div className="buttons flex gap-5">
                  <button className="px-2 py-1 bg-blue-500 rounded-lg">Batafsil</button>
                  <button className="px-2 py-1 bg-red-500 rounded-lg">O'chirish</button>
                </div>
              </li>
            ))}


        </ul>
      </div>
    </div>
  )
}
