import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Gameplay } from "./pages/Gameplay";
import { Battle } from "./pages/Battle";
import { Profile } from "./pages/Profile";
import { Rules } from "./pages/Rules";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes path>
        <Route path="/" element={<Home />} exact />
        <Route path="/battle" element={<Battle />} exact />
        <Route path="/rules" element={<Rules />} exact />
        <Route path="/profile" element={<Profile />} exact />
        <Route path="/battle/:id" element={<Gameplay />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
