import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './components/Blog/Blog';
// Import các thành phần khác trong App

const App = () => {
  return (
    
      <>
      <Router />
      <Route path="/" element={<Blog />} />
      </>
      
     
  )
}

export default App
