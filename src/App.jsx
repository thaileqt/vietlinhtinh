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
import SearchByGenreResults from './pages/SearchByGenreResults';
import MyBreadcrumb from './components/layout/Breadcrumb';
import Footer from './components/layout/Footer';

import ComposePage from './pages/compose/ComposePage';
import ChapterManager from './pages/compose/ChapterManager';
import EditChapterDetail from './pages/compose/EditChapterDetail';
import AddChapter from './pages/compose/AddChapter';
import EditSeries from './pages/compose/EditSeries';
import AddSeriesPage from './pages/compose/AddSeriesPage';


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
    window.location.reload();
  };

  return (
    <>
      <MyNavbar 
        currentUser={currentUser}
        logOut={logOut} 
      />
      <MyBreadcrumb />

      <div>
        <Routes>
          <Route exact path="/login" element={<LoginPage currentUser={currentUser} />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/profile/:profile_username" element={<ProfilePage />} />

          <Route exact path={"/"} element={<HomePage />} />
          <Route exact path={"/home"} element={<HomePage />} />

          
          <Route exact path={"/series/:slug"} element={<SeriesDetail />} />
          <Route exact path={`/series/:slug/:chapterNumber`} element={<ChapterDetail />} />

          <Route exact path={`/genre/:genre`} element={<SearchByGenreResults />} />
          <Route exact path={`/search?keyword=:keyword`} element={<SearchResults />} />

          <Route exact path={`/compose/all-chapter/:slug`} element={<ChapterManager />} />
          <Route exact path={`/compose/edit-chapter/:slug/:chapterNumber`} element={<EditChapterDetail />} />
          <Route exact path={`/compose/add-chapter/:slug`} element={<AddChapter />} />
          <Route exact path={`/compose/add-series`} element={<AddSeriesPage />} />
          <Route exact path={`/compose/edit-series/:slug`} element={<EditSeries />} />
          <Route exact path="/compose" element={<ComposePage />} /> 

        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App
