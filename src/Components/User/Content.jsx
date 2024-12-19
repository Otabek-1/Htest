import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Content() {
  // URL-dan parametrlardan "article" ni olish
  const { article } = useParams();
  const [content, setContent] = useState([]);

  axios.get(`http://localhost:4000/api/auth/show/${article}`)
    .then(res => {
      setContent(res.data);
    })
    .catch(err => {
      console.log(err);
    })

  async function like(){
    await axios.put(`http://localhost:4000/api/auth/like/${article}`,{id:window.localStorage.getItem('id')})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="w-full h-full min-h-screen py-8 px-36 bg-gray-600 text-white flex flex-col">
      <h1 className="text-4xl font-bold">{content.title}</h1>

      <div className="article-body min-h-screen w-full flex flex-col mt-6">
        <div className='flex flex-col gap-3' dangerouslySetInnerHTML={{ __html: content.content }} />
      </div>

      <div className="others w-full min-h-32 bg-gray-500 mt-5 rounded-lg flex flex-col p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg">Muallif: <b>{content.author}</b></span>
          <span className="text-sm italic">
            Chop etilgan: {content.created_at ? new Intl.DateTimeFormat('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).format(new Date(content.created_at.replace('Z', '+00:00'))): null} 
           </span>

        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <i className="fas fa-eye mr-2" /> {content.view_count} marta ko'rilgan
            </span>
            <span className="flex items-center">
              <i className="fas fa-thumbs-up mr-2" /> {content.likes ? content.likes.length : null} yoqdi
            </span>
          </div>

          <button onClick={()=>like()} className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500">
            <i className="fas fa-thumbs-up mr-2" /> Yoqdi
          </button>
        </div>
      </div>
    </div>
  );
}
