import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import GraphView from "./pages/GraphView";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import RequireGuest from "./components/RequireGuest";
import Layout from "./components/Layout";

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="post/:id" element={<PostDetail />} />
      <Route path="graph" element={<GraphView />} />
      <Route path="profile/:username" element={<Profile />} />
      {/* <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} /> */}
      {/* ✅ Protect Profile Page */}
      <Route element={<ProtectedRoute />}>
        <Route path="profile" element={<Profile />} />
        <Route path="home" element={<Home />} />
      </Route>
    </Route>
    <Route element={<RequireGuest />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
    </Routes>
  </Router>
);

export default AppRoutes;