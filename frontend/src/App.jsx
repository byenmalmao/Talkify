import React from 'react';
import {Route,Routes} from "react-router";
import HomePage from './pages/HomePage.jsx';
import SignUpPage from  './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import CallPage from './pages/CallPage.jsx';



const App = () => {
  return (
    <div className="text-5xl h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/onboarding" element={<OnboardingPage/>}/>
        <Route path="notification" element={<NotificationsPage/>}/>
        <Route path="chat" element={<ChatPage/>}/>
        <Route path="call" element={<CallPage/>}/>
      </Routes> 
    </div>

  )
}

export default App