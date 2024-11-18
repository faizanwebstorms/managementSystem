import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import DealersLayout from "./layouts/DealersLayout";
import Dealers from "./pages/Dealers";
import { ToastContainer } from "react-toastify";
import Institutions from "./pages/Institutions";
import InstitutionsLayout from "./layouts/InstitutionsLayout";
import PersonalLayout from "./layouts/PersonalLayout";
import Personal from "./pages/Personal";
import DealersDashboardLayout from "./layouts/dealers/DashboardLayout";
import DealersDashboard from "./pages/dealers/Dashboard";
import InstitutionsDashboardLayout from "./layouts/institutions/DashboardLayout";
import InstitutionsDashboard from "./pages/institutions/Dashboard";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<DealersDashboardLayout />}>
              <Route path="/dealers/dashboard" element={<DealersDashboard />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<InstitutionsDashboardLayout />}>
              <Route
                path="/institution/dashboard"
                element={<InstitutionsDashboard />}
              />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<DealersLayout />}>
              <Route path="/dealers" element={<Dealers />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<InstitutionsLayout />}>
              <Route path="/institutions" element={<Institutions />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<PersonalLayout />}>
              <Route path="/personnel" element={<Personal />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
