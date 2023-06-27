import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './app.css';
import { Header } from './components';
import { Posts, Login, CreatePost, Article } from './pages';

const App = () => {
  return (
    <>
    <Header />
    <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/article/:id" element={<Article/>} />
    </Routes>
    </>
  )
} 

export default App;