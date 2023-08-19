import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/loginPage';
import Register from './pages/registeruser';
import Note from './pages/Note';
import Profile from './pages/Profile';
import About from './pages/about';
import AppPage from './pages/AppPage';
function App() {
  return (
      <Router>
        <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/Signup" element = {<Register/>}/>
        <Route path="/Notes" element = {<Note/>}/>
        <Route path="/profile" element = {<Profile/>}/>
        <Route path="/about" element = {<About/>}/>
        <Route path="/AppPage" element = {<AppPage/>}/>
        
        {/* <Route path="/createNote/:id" element = {<Home/>}/>
        <Route path="/getNote/:id" element = {<Home/>}/>
        <Route path="/updateNote/:id" element = {<Home/>}/>
        <Route path="/deleteNote/:id" element = {<Home/>}/>
        <Route path="/createUser" element = {<Home/>}/> */}
        </Routes>
      </Router>
  );
}

export default App;
