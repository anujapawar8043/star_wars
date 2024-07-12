import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import CharacterList from './components/CharacterList';

function App() {
  return (
    <>
      <Router >
      <Routes initialIndex={0}>
        <Route index path="/" element={<Login/>}  />
        <Route path="/characters" element={<CharacterList/>} />
      </Routes >
    </Router>
    </>
  );
}

export default App;



