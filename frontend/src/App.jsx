import React from 'react';
import { Route, Routes , Navigate } from "react-router";
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import CallPage from './pages/CallPage.jsx';
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import PageLoader from './components/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';



const App = () => {

  //axios

 const {isLoading,authUser} = useAuthUser()

 const isAuthenticated = Boolean(authUser);
 const isOnboarded = authUser?.isOnboarded;

  if(isLoading) return <PageLoader/>;
 
  return (

    <div className="text-5xl h-screen" data-theme="night">
      <Toaster />

      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded? 
            (<HomePage />) : 
            ( <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />) 
          } />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage />: <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage />: <Navigate to="/" />} />
        <Route path="/onboarding" element={isAuthenticated ? <OnboardingPage />: <Navigate to="/login" />} />
        <Route path="/notification" element={isAuthenticated  ? <NotificationsPage />: <Navigate to="/login"/>} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage />: <Navigate to="/login"/>} />
        <Route path="/call" element={isAuthenticated ? <CallPage />: <Navigate to="/login"/>} />
      </Routes>
    </div>

  )
}

export default App