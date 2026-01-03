import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("token") || null
  );

  const afterLoginSuccess = (token) => {
    setAuthToken(token);
    localStorage.setItem("token", token);
  };

  const subLogout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              authToken ? (
                <Navigate to="/admin" replace />
              ) : (
                <Login onLoginSuccess={afterLoginSuccess} />
              )
            }
          />

          <Route
            path="/admin"
            element={
              authToken ? (
                <AdminPanel token={authToken} onLogout={subLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/"
            element={
              authToken ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
