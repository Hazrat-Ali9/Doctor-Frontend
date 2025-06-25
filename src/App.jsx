import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AddressBar from './components/AddressBar';
import InfoBar from './components/InfoBar';
import Slider from './components/Slider';
import { AppProvider } from './context/AppContext';
import BookAppointmentModal from './components/BookAppointmentModal';
import AdminLayout from './pages/Admin/AdminLayout';
import Login from './pages/login/login';
import Experties from './pages/Experties';
import Reviews from './pages/Reviews';
import AdminHome from './pages/Admin/AdminHome';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminAbout from './pages/Admin/AdminAbout';
import AddHospitalForm from './pages/Admin/AdminForms';
import ReviewTable from './pages/Admin/AdminReviews';
import AdminExperties from './pages/Admin/AdminExperties';
import UpdateExpertie from './pages/Admin/UpdateExpertie';
import AddExpertie from './pages/Admin/AddExpertie';
import AdminWorkingHours from './pages/Admin/AdminWorkingHours';
import UpdateWorkingHours from './pages/Admin/UpdateWorkingHours';
import AddWorkingHours from './pages/Admin/AddWorkingHours';
import ReviewAppointments from './pages/Admin/ReviewAppointments';
import AdminSettings from './pages/Admin/AdminSetting';
import AdminBio from './pages/Admin/AdminBio';
import Cookies from 'js-cookie';

function App() {
  console.log("Token: ",Cookies.get('authToken'));
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Layout with AddressBar, InfoBar, and Slider */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/expertise" element={<Experties />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {!Cookies.get('authToken') && <Route path="/admin-login" element={<Login />} />}

          {/* Admin Routes */}
          {Cookies.get('authToken') &&<Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/about" element={<AdminAbout />} />
            <Route path="/admin/reviews" element={<ReviewTable />} />
            <Route path="/admin/experties" element={<AdminExperties />} />
            <Route path="/admin/experties/:id" element={<UpdateExpertie />} />
            <Route path="/admin/experties/add" element={<AddExpertie />} />
            <Route path="/admin/workinghours" element={<AdminWorkingHours />} />
            <Route path="/admin/workinghours/:id" element={<UpdateWorkingHours />} />
            <Route path="/admin/workinghours/add" element={<AddWorkingHours />} />
            <Route path="/admin/updateClinicInfo" element={<AddHospitalForm />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/bio" element={<AdminBio />} />
            <Route path="/admin/reviewAppointment" element={<ReviewAppointments />} />
            

          </Route>}
        </Routes>
        <BookAppointmentModal />
      </BrowserRouter>
    </AppProvider>
  );
}

// New MainLayout component
const MainLayout = () => (
  <>
    <AddressBar />
    <InfoBar />
    <Navbar />
    <Slider />
    <Outlet /> {/* This renders the child routes */}
    <Footer />
  </>
);

export default App;
