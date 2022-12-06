import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthContext } from "./contexts/AuthContext";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { Loader } from "./components/Loader";
import "materialize-css";
import "./styles/App.css";
import "./styles/Card.css";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader info={"Loading..."} />;
  }

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="App">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
