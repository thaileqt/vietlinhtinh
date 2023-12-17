import { useState, useEffect } from 'react';
import './App.css';
import eventBus from './commons/EventBus';
import AuthService from './services/auth.service';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MyNavbar from './components/layout/Navbar';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SeriesDetail from './pages/SeriesDetail';
import SearchResults from './pages/SearchResults';
import ChapterDetail from './pages/ChapterDetail';

function App() {
  // const [count, setCount] = useState(0)

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
 

    eventBus.on("logout", () => {
      logOut();
    });

    return () => {
      eventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(currentUser);
  };

  return (
    <>
      <MyNavbar 
        currentUser={currentUser}
        logOut={logOut} 
      />
      <div>
        <Routes>
          <Route exact path="/login" element={<LoginPage currentUser={currentUser} />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/profile/:profile_username" element={<ProfilePage />} />

          <Route exact path={"/"} element={<HomePage />} />
          <Route exact path={"/home"} element={<HomePage />} />

          
          <Route exact path={"/series/:slug"} element={<SeriesDetail />} />
          <Route exact path={`/series/:slug/:chapterNumber`} element={<ChapterDetail />} />

          <Route exact path={`/search?keyword=:keyword`} element={<SearchResults />} />
        </Routes>
      </div>
    </>
  )
}

export default App
