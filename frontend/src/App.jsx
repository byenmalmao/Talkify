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

import { useQuery } from "@tanstack/react-query";
import {axiosInstance} from "./lib/axios.js";
const App = () => {

  //axios

  //react query tanstack query ()
  const { data: authData, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");

      return res.data;
    },
    retry: false, //authcheck
  });

  const authUser = authData?.user
 
  return (

    <div className="text-5xl h-screen" data-theme="night">
      <Toaster />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage />: <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage />: <Navigate to="/" />} />
        <Route path="/onboarding" element={authUser ? <OnboardingPage />: <Navigate to="/login" />} />
        <Route path="/notification" element={authUser  ? <NotificationsPage />: <Navigate to="/login"/>} />
        <Route path="/chat" element={authUser ? <ChatPage />: <Navigate to="/login"/>} />
        <Route path="/call" element={authUser ? <CallPage />: <Navigate to="/login"/>} />
      </Routes>
    </div>

  )
}

export default App