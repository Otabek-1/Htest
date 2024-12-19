import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import 'aos/dist/aos.css';
import Aos from 'aos';
import "./fontawesome-free-6.6.0-web/css/all.min.css";
import hero_img from "./images/header-hero.webp";
import { Link } from 'react-router-dom';

const App = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        Aos.init();
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    return (
        <div className={`overflow-x-hidden font-sans antialiased ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors`}>
            {/* Header */}
            <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} shadow-md`}>
                <div className="container mx-auto flex items-center justify-between py-4 px-6">
                    <a href="#" className="text-3xl font-extrabold text-blue-400">HistoryTest</a>
                    <nav className="hidden md:flex space-x-8">
                        <a href="#features" className={`text-lg font-medium ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-500'}`}>Xususiyatlar</a>
                        <a href="#about" className={`text-lg font-medium ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-500'}`}>Biz haqimizda</a>
                        <a href="#contact" className={`text-lg font-medium ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-500'}`}>Aloqa</a>
                    </nav>
                    <div className="flex items-center justify-center gap-3">
                        <Link to="/enter" className="bg-blue-500 px-6 py-3 rounded-full text-lg shadow hover:shadow-lg">Boshlash</Link>
                        <button onClick={toggleDarkMode} className="text-white p-2 rounded-full bg-blue-500 hover:bg-blue-400 transition-colors">
                            {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                        </button>
                    </div>

                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-bg py-20 px-10">
                <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
                    <div className="md:w-1/2 relative" data-aos="fade-right">
                        <h1 className="text-4xl md:text-6xl font-bold">Tarixni yangi usulda kashf eting.</h1>
                        <p className="mt-4 text-gray-300">Interaktiv testlar, batafsil jadval va tarixiy hikoyalar orqali o‘rganing. O‘tmishga chuqurroq kirish va bilimlarni kengaytirish!</p>
                        <Link to="/enter" className="bg-blue-500 absolute top-auto  px-6 py-3 rounded-full text-lg shadow hover:shadow-lg">Boshlash</Link>
                    </div>
                    <div className="md:w-1/2" data-aos="fade-left">
                        <img src={hero_img} alt="History Illustration" className="rounded-lg shadow-lg w-[750px] h-[450px] object-top object-cover" style={{filter:"drop-shadow(0px 0px 10px white)"}} />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-10 bg-gray-800">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-8" data-aos="fade-up">Biz bilan:</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-700 shadow rounded-lg" data-aos="fade-up">
                            <i className="fas fa-brain text-blue-400 text-4xl mb-4"></i>
                            <h3 className="text-xl font-bold text-white mb-2">Interaktiv Testlar</h3>
                            <p className="text-gray-300">O‘zingizni qiziqarli savollar bilan sinab ko‘ring va tarixiy bilimlaringizni oshiring.</p>
                        </div>
                        <div className="p-6 bg-gray-700 shadow rounded-lg" data-aos="fade-up" data-aos-delay="100">
                            <i className="fas fa-timeline text-green-400 text-4xl mb-4"></i>
                            <h3 className="text-xl font-bold text-white mb-2">Jadvallar</h3>
                            <p className="text-gray-300">Vaqt davomida sodir bo‘lgan voqealarni eng zamonaviy va chiroyli tarzda kuzating.</p>
                        </div>
                        <div className="p-6 bg-gray-700 shadow rounded-lg" data-aos="fade-up" data-aos-delay="200">
                            <i className="fas fa-book-reader text-yellow-400 text-4xl mb-4"></i>
                            <h3 className="text-xl font-bold text-white mb-2">Qiziqarli Hikoyalar</h3>
                            <p className="text-gray-300">Tarixiy voqealar va shaxslarni jonli va tasviriy hikoyalar orqali o‘rganing.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-10">
                <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
                    <div className="md:w-1/2" data-aos="fade-right">
                        <img src="https://via.placeholder.com/600x400" alt="About Us" className="rounded-lg shadow-lg" />
                    </div>
                    <div className="md:w-1/2" data-aos="fade-left">
                        <h2 className="text-3xl font-bold text-white">HistoryTest haqida</h2>
                        <p className="mt-4 text-gray-300">HistoryTest — bu tarixni o‘rganishning yangi, zamonaviy va interaktiv usuli. Tarixiy davrlarni o‘rganing va dunyo tarixini tushuning.</p>
                        <button className="btn-gradient mt-6 px-6 py-3 rounded-full text-lg shadow hover:shadow-lg">Batafsil</button>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gray-800">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-8" data-aos="fade-up">Biz bilan bog‘laning</h2>
                    <form className="max-w-xl mx-auto space-y-4" data-aos="fade-up">
                        <input type="text" placeholder="Ismingiz" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input type="email" placeholder="Elektron pochta" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <textarea placeholder="Xabar" rows="5" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        <button type="submit" className="btn-gradient px-6 py-3 rounded-full text-lg shadow hover:shadow-lg">Xabarni jo‘natish</button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-6 bg-gray-900 text-gray-400 text-center">
                <p>&copy; 2024 HistoryTest. Barcha huquqlar himoyalangan.</p>
            </footer>
        </div>
    );
};

export default App;
