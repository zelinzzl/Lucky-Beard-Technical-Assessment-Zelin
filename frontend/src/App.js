import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Pages
import BlogListing from './pages/BlogListing';
import BlogCreation from './pages/BlogCreation';
import Articles from './pages/Articles';
import NotFound from './pages/NotFound';

//Components
// import Header from './components/Header';
// import Footer from './components/Footer';
// import VideoBlock from './components/Video';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BlogListing />} />
                <Route path="/blogs/:name" element={<BlogListing />} />
                <Route path="/blogs/category/:category" element={<BlogListing />} />
                <Route path="/BlogCreation" element={<BlogCreation />} />
                <Route path="/Articles/:id" element={<Articles />} />
                <Route path="*" element={<NotFound />} /> {/* 404 Page */}
                {/* <Route path="/Header" element={<Header />} />
                <Route path="/Footer" element={<Footer />} />
                <Route path="/VideoBlock" element={<VideoBlock />} /> */}
            </Routes>
        </Router>
    );
}

export default App;