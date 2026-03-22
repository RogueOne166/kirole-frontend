import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import FeaturedPage from "./pages/FeaturedPage";
import EventsPage from "./pages/EventsPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import EventDetailPage from "./pages/EventDetailPage";
import SavedPage from "./pages/SavedPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/featured" element={<FeaturedPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/place/:id" element={<PlaceDetailPage />} />
      <Route path="/event/:id" element={<EventDetailPage />} />
      <Route
        path="/saved"
        element={
          <ProtectedRoute>
            <SavedPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
