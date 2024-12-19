import React, { useEffect, useState } from 'react';
import "../../fontawesome-free-6.6.0-web/css/all.css";
import AdminFact from './AdminFact';
import UsersList from './UsersList';
import AdminTests from './AdminTests';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [active, setActive] = useState("find");
    const [userData, setUserData] = useState(null);  // User data
    const [error, setError] = useState(null);  // Error handling
    const nav = useNavigate(); // Correct usage of useNavigate

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (!token) {
            setError("Foydalanuvchi tizimga kirgan emas.");
            nav('/'); // Redirect to home if no token
            return;
        }

        checkTokenExpiration(); // Check if token is expired

        // Fetch user data with token
        axios.get('http://localhost:4000/api/auth/user/me', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setUserData(response.data); // Set user data
            window.localStorage.setItem('user', response.data.name);
            window.localStorage.setItem('id', response.data.id);
        })
        .catch(err => {
            setError("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi.");
            console.error(err);
        });
    }, [nav]); // Adding nav in the dependency array for consistency

    function checkTokenExpiration() {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
                const currentTime = Math.floor(Date.now() / 1000);
                
                if (decoded.exp < currentTime) {
                    localStorage.removeItem('access_token');
                    alert('Sizning sessiyangiz muddati o‘tdi, iltimos qayta kirishingizni so‘raymiz');
                    window.location.reload(); // Reload page to log out
                }
            } catch (error) {
                console.error('Tokenni dekodlashda xato yuz berdi:', error);
            }
        }
    }

    // If error exists, show it
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen flex bg-gray-900 text-white">
            {/* Sidebar/Navbar */}
            <div className="fixed left-0 top-0 w-64 h-full bg-gray-800 p-6">
                <div className="flex flex-col items-center space-y-8">
                    <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
                    <div className="space-y-4">
                        <button className="flex items-center space-x-2 text-lg text-white hover:text-blue-500" onClick={() => setActive("find")}>
                            <i className="fas fa-search"></i>
                            <span>Search</span>
                        </button>
                        <button className="flex items-center space-x-2 text-lg text-white hover:text-blue-500" onClick={() => setActive("test")}>
                            <i className="fas fa-clipboard-list"></i>
                            <span>Foydalanuvchilar</span>
                        </button>
                        <button className="flex items-center space-x-2 text-lg text-white hover:text-blue-500" onClick={() => setActive("tests")}>
                            <i className="fas fa-question"></i>
                            <span>Testlar</span>
                        </button>
                        <button className="flex items-center space-x-2 text-lg text-white hover:text-blue-500" onClick={() => setActive("history")}>
                            <i className="fas fa-history"></i>
                            <span>History</span>
                        </button>
                        <button className="flex absolute bottom-5 w-full left-6 items-center space-x-2 text-lg text-white hover:text-blue-500" onClick={() => setActive("profile")}>
                            {/* If user data exists, show profile picture or default */}
                            <img src={userData?.profilePicture || "https://picsum.photos/40"} className='object-cover rounded-full' alt="Profile" />
                            <span>{userData ? userData.name : "loading..."}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="ml-64 p-5 w-full">
                {active === "find" && <AdminFact />}
                {active === "test" && <UsersList />}
                {active === "tests" && <AdminTests />}
                {/* Add more conditions as needed */}
            </div>
        </div>
    );
}
