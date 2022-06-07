import './App.css'
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom"
import Videogames from './pages/Videogames';
import VideogamesDetails from './pages/VideogamesDetails';
import Profile from './pages/user/Profile';
import Collections from './pages/user/Collections';
import ProfileEdit from './pages/user/ProfileEdit';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Error from './pages/error/Error';
import NotFound from './pages/error/NotFound';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">

    <Navbar/>

    <Routes>
      <Route path={"/"} element={ <Home/> } />
      <Route path={"/videogames"} element={ <Videogames/> } />
      <Route path={"/videogames/:id/details"} element={ <VideogamesDetails/> } />
      <Route path={"/profile"} element={ <Profile/> } />
      <Route path={"/profile/:id/edit"} element={ <ProfileEdit/> } />
      <Route path={"/videogames/:id/collections"} element={ <Collections/> } />
      <Route path={"/signup"} element={ <Signup/> } />
      <Route path={"/login"} element={ <Login/> } />

      {/* ---------- */}

      <Route path={"/error"} element={ <Error/> } />
      <Route path={"*"} element={ <NotFound/> } />

    </Routes>
      
    </div>
  );
}

export default App;
