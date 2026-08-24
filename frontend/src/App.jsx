import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Login from "./pages/login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Register from "./pages/register";

import "./App.css";


// ===============================
// PROTECTED ROUTE
// ===============================

function ProtectedRoute() {

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}


// ===============================
// MAIN LAYOUT
// ===============================

function MainLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}


// ===============================
// APP
// ===============================

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================= PROTECTED PAGES ================= */}

        <Route element={<ProtectedRoute />}>

          <Route element={<MainLayout />}>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/students"
              element={<Students />}
            />

            <Route
              path="/add-student"
              element={<AddStudent />}
            />

            <Route
              path="/edit-student/:id"
              element={<EditStudent />}
            />

          </Route>

        </Route>


        {/* ================= UNKNOWN URL ================= */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
        

      </Routes>

    </BrowserRouter>
  );
}

export default App;