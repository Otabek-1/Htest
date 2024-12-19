import React, { useEffect, useState } from 'react';
import "../../fontawesome-free-6.6.0-web/css/all.css";
import axios from 'axios';

import SearchField from './Search';
import Test from './Test';
import History from './History';
import Tests from './Tests';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [active, setActive] = useState("profile");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        checkTokenExpiration();  // Tokenni tekshirish

        const token = localStorage.getItem('token');  // Tokenni olish
        if (!token) {
            setError("Foydalanuvchi tizimga kirgan emas.");
            nav('/');
            return;
        }

        axios.get('http://localhost:4000/api/auth/user/me', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setUserData(response.data);
                window.localStorage.setItem('id', response.data.id);
                window.localStorage.setItem('user', response.data.name);
            })
            .catch(err => {
                setError("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi.");
                console.error(err);
            });
    }, []);

    function checkTokenExpiration() {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1]));
                const currentTime = Math.floor(Date.now() / 1000);

                if (decoded.exp < currentTime) {
                    localStorage.removeItem('access_token');
                    alert('Sizning sessiyangiz muddati o‘tdi, iltimos qayta kirishingizni so‘raymiz');
                    nav('/');
                }
            } catch (error) {
                console.error('Tokenni dekodlashda xato yuz berdi:', error);
            }
        }
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen flex bg-gray-900 text-white">
            <div className="fixed left-0 top-0 w-64 h-full bg-gray-800 p-6">
                <div className="flex flex-col items-center space-y-8">
                    <h2 className="text-2xl font-bold text-white">Umumiy</h2>
                    <div className="space-y-4">
                        <button className="flex items-center space-x-2 text-lg text-white hover:text-blue-500" onClick={() => setActive("find")}>
                            <i className="fas fa-search"></i>
                            <span>Search</span>
                        </button>
                        <button className="flex items-center space-x-2 text-lg text-white hover:text-blue-500" onClick={() => setActive("test")}>
                            <i className="fas fa-clipboard-list"></i>
                            <span>Test</span>
                        </button>
                        <button className="flex items-center space-x-2 text-lg text-white hover:text-blue-500" onClick={() => setActive("tests")}>
                            <i className="fas fa-question"></i>
                            <span>Testlar</span>
                        </button>
                        <button className="flex items-center space-x-2 text-lg text-white hover:text-blue-500" onClick={() => setActive("history")}>
                            <i className="fas fa-history"></i>
                            <span>History</span>
                        </button>
                        <button className="flex absolute bottom-5 w-full left-20 items-center space-x-2 text-lg text-white hover:text-blue-500" onClick={() => setActive("profile")}>
                            <i className="fas fa-user"></i>
                            <span>{userData ? userData.name : "Loading..."}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="ml-64 p-5 w-full">
                {active === "find" ? <SearchField /> : active === "test" ? <Test /> : active === "history" ? <History /> : active === "tests" ? <Tests /> : null}
            </div>
        </div>
    );
}
