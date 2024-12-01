import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function NotFound() {
    return (
        <>
            <div className="flex flex-col min-h-screen bg-shapes-pattern bg-no-repeat bg-cover">
                <Header />
                <main className="flex-grow flex flex-col items-center justify-center text-center p-10">
                    <h1 className="text-6xl font-bold text-gray-800 mb-6">404</h1>
                    <p className="text-xl text-gray-600 mb-4">
                        Oops! The page you’re looking for doesn’t exist.
                    </p>
                    <a
                        href="/"
                        className="text-blue-600 hover:text-blue-800 underline text-lg"
                    >
                        Go back to Home
                    </a>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default NotFound;