import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreatePost() {
  const nav = useNavigate(null);
  // Post ma'lumotlarini saqlash uchun state
  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  // Post yaratish funksiyasi
  const handleCreatePost = () => {
    const data = {
      title: post.title,
      content: post.content,
      author: window.localStorage.getItem('user')
    }


    if (post.title.trim() && post.content.trim()) {
      // Ma'lumotlarni serverga yuborish jarayoni shu yerda amalga oshiriladi
      axios.post('http://localhost:4000/api/auth/add-post',data, {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
      })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });

      setPost({ title: '', content: '' }); // Formani tozalash
    } else {
      alert('Sarlavha va mazmun to\'ldirilishi shart!');
    }
  };

  return (
    <div className="w-full min-h-screen p-8 bg-gray-600 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Yangi Post Yaratish</h1>

      {/* Post Sarlavhasi */}
      <input
        type="text"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder="Post Sarlavhasi"
        className="w-full max-w-4xl px-4 py-2 rounded bg-gray-500 text-white mb-6 focus:outline-none focus:ring focus:ring-blue-400"
      />

      {/* Post Mazmuni */}
      <div className="w-full max-w-4xl bg-gray-500 rounded p-4">
        <Editor
          apiKey="55wtw6ufxz1roezqo69ju6tspgcbnqffmrjtw51wqjuh5bhw" // Bepul foydalanish uchun API kalitini qo'shing
          value={post.content}
          onEditorChange={(newValue) => setPost({ ...post, content: newValue })}
          init={{
            height: 300,
            menubar: false,
            plugins: ['link', 'image', 'lists'],
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image',
          }}
        />
      </div>

      {/* Post Tugmalari */}
      <div className="w-full max-w-4xl flex justify-between mt-6">
        <button
          onClick={() => nav("/admin/dashboard")}
          className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded-lg shadow-lg"
        >
          Bekor qilish
        </button>

        <button
          onClick={handleCreatePost}
          className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-lg shadow-lg"
        >
          Postni Saqlash
        </button>
      </div>
    </div>
  );
}
