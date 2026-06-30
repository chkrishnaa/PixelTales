import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import Feedback from "./pages/Feedback";
import Party from "./pages/Party";
import PartyRoom from "./pages/PartyRoom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AuthCallback from "./pages/auth/AuthCallback";
import MovieDetails from "./pages/MovieDetails";
import Page404 from "./pages/Page404";
import Review from "./pages/Review";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Google OAuth callback — outside AuthLayout */}
        <Route path="auth/callback" element={<AuthCallback />} />

        <Route path="/" element={<Home />} />

        {/* Party room — full-screen, no main nav */}
        <Route path="party/room" element={<PartyRoom />} />

        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="community" element={<Community />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="review" element={<Review />} />
          <Route path="write-review" element={<Review />} />
          <Route path="profile" element={<Profile />} />
          <Route path="party" element={<Party />} />

          <Route path="movie/:id" element={<MovieDetails />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
