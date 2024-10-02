import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Componenets/common/Header';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import CreatePodcast from './Pages/CreatePodcast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { setUser } from './slices/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './Pages/firebase';
import { useDispatch } from 'react-redux';
import PrivateRoutes from './Pages/PrivateRoutes';
import PodcastsPage from './Pages/Podcasts';
import PodcastDetails from './Pages/PodcastDetails';
import CreateAnEpisode from './Pages/CreateAnEpisode';


function App() {
  const dispatch=useDispatch();
  useEffect(() => {
  const authUnsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const unsubscribedSnapshot = onSnapshot(
        doc(db, "users", user.uid),
        (userDoc) => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch(
              setUser({
                name: userData.name,
                email: userData.email,
                uid: user.uid,
              })
            );
          }
        },
        (error) => {
          console.log("Error fetching user data:", error);
        }
      );

      return () => {
        unsubscribedSnapshot(); 
      };
    }
  });

  return () => {
    authUnsubscribe(); // Properly cleanup the auth state listener
  };
}); // Missing dependency array added here to ensure the effect only runs on mount

  return (
    <div className='app'>
    <ToastContainer/>
    <Router>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route element={<PrivateRoutes/>} >
      <Route path="/profile" element={<Profile />} />
      <Route path="/CreatePodcast" element={<CreatePodcast />} />
      <Route path="/Podcast" element={<PodcastsPage />} />
      <Route path="/Podcast/:id" element={<PodcastDetails/>} />
      <Route path="/Podcast/:id/create-episode" element={<CreateAnEpisode/>} />
      </Route>
    </Routes>
  </Router>
  </div>
  );
}

export default App;
