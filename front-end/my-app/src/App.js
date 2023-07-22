import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import About from './components/about/About';
import AddNote from './components/addNotes/AddNote';
import Profile from './components/profile/Profile';
import NoteState from './context/notes/NoteState';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Mofal from './components/Mofal';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"

function App() {
  let name=localStorage.getItem('name')
  return (
<>
<NoteState>
<Navbar />
    <Routes>
      
      <Route exact path='/' element={<Home />}></Route>
      <Route exact path='/about' element={<About />}></Route>
      <Route exact path='/addNote' element={<AddNote />}></Route>
      <Route exact path='/profile' element={<Profile name={name} />}></Route>
      <Route exact path='/modal/:id' element={<Mofal />}></Route>
      <Route exact path='/signUp' element={<SignUp />}></Route>
      <Route exact path='/login' element={<Login />}></Route>
    </Routes>
    </NoteState>
    </>
  );
}

export default App;
