import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../fontawesome-free-6.6.0-web/css/all.min.css";

export default function Profile({ userData }) {
  const [user, setUser] = useState({
    avatar: userData?.avatar || "https://picsum.photos/150",
    fullname: userData?.fullname || "Ism Familya",
    bio: userData?.bio || "Bu yerda foydalanuvchi bio chiqadi.",
  });

  const [tempUser, setTempUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // userData yangilansa, user ma'lumotlarini qayta yuklash
  useEffect(() => {
    setUser({
      avatar: userData?.avatar || "https://picsum.photos/150",
      fullname: userData?.fullname ,
      bio: userData?.bio || "Bu yerda foydalanuvchi bio chiqadi.",
    });

    setTempUser({
      avatar: userData?.avatar || "https://picsum.photos/150",
      fullname: userData?.fullname || "Ism Familya",
      bio: userData?.bio || "Bu yerda foydalanuvchi bio chiqadi.",
    });
  }, [userData]);

  // Avatar o'zgarishini boshqarish
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempUser({ ...tempUser, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Yangilangan ma'lumotlarni serverga yuborish
  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("fullname", tempUser.fullname);
      formData.append("bio", tempUser.bio);

      if (tempUser.avatar.startsWith("data:")) {
        const file = await fetch(tempUser.avatar)
          .then((res) => res.blob())
          .then(
            (blob) => new File([blob], "avatar.png", { type: blob.type })
          );
        formData.append("avatar", file);
      }

      const response = await axios.post(
        "http://localhost:4000/api/auth/update-user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setUser(response.data.user); // Update local user data
        setIsEditing(false);
      } else {
        alert("Yangilashda xatolik yuz berdi!");
      }
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Server bilan bog'lanishda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-gray-600 p-8 rounded-lg flex flex-col items-center">
      {/* Profil rasmi va ism */}
      <div className="relative flex items-center mb-8 w-full max-w-lg bg-gray-700 p-6 rounded-lg shadow-lg">
        <div className="relative">
          <img
            src={tempUser.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-500"
          />
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              <label className="cursor-pointer flex items-center">
                <i className="fas fa-camera select-none text-white text-xl" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
        <div className="ml-6 flex-1">
          {isEditing ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setTempUser({ ...tempUser, fullname: e.target.value })
              }
              className="w-full px-4 py-2 rounded bg-gray-500 text-white focus:outline-none"
              placeholder="Ism Familya"
            />
          ) : (
            <h2 className="text-2xl font-semibold text-white">
              {userData.name}
            </h2>
          )}
        </div>
      </div>

      {/* Bio */}
      <div className="w-full max-w-lg bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
        {isEditing ? (
          <textarea
            value={tempUser.bio}
            onChange={(e) => setTempUser({ ...tempUser, bio: e.target.value })}
            className="w-full h-32 px-4 py-2 rounded bg-gray-500 text-white focus:outline-none"
            placeholder="Bio"
          />
        ) : (
          <p className="text-white">{user.bio}</p>
        )}
      </div>

      {/* Tugmalar */}
      <div className="w-full max-w-lg flex justify-between">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded-lg"
            disabled={loading}
          >
            {loading ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-lg"
          >
            Tahrirlash
          </button>
        )}
        <button
          onClick={() => {
            window.localStorage.removeItem("token");
            window.location.reload();
          }}
          className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg"
        >
          Chiqish
        </button>
      </div>
    </div>
  );
}
