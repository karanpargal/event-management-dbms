import "./App.css";
import Landing from "./pages/landing/Landing";
import RegistrationPage from "./pages/auth/RegistrationPage";
import LoginPage from "./pages/auth/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/home/home";
import Layout from "./layout/Layout";
import VenueForm from "./components/Venue/VenueForm";
import AddEvent from "./components/Events/AddEvent";
import Events from "./components/Events/Events";
import SingleEventPage from "./components/Events/SingleEventPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/add-venue" element={<VenueForm />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<SingleEventPage />} />
          </Routes>
        </Layout>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
