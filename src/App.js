import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Rooms from "./pages/rooms/Rooms";
import RoomDetails from "./pages/roomDetails/RoomDetails";
import Booking from "./pages/booking/Booking";
import ContactUs from "./pages/contactUs/ContactUs";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Payment from "./pages/payment/Payment";

import AdminPage from "./pages/admin/AdminPage";
import AdminLogin from "./pages/adminLogin/AdminLogin";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoom from "./pages/rooms/AdminRoom";

const UserLayout = () => <Outlet />;
const AdminLayout = () => <Outlet />;

function App() {
  return (
    <Router>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:id" element={<RoomDetails />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* Protected routes: require user login */}
          <Route element={<PrivateRoute type="USER" />}>
            <Route path="payment" element={<Payment />} />
            <Route path="mybookings" element={<Booking />} />
          </Route>
        </Route>

        {/* ================ USER PROTECTED ROUTES ================ */}
        <Route element={<UserLayout />}>
          <Route element={<PrivateRoute type="USER" />}></Route>
        </Route>

        {/* ================== ADMIN ROUTES ================== */}
        <Route path="admin" element={<AdminLayout />}>
          {/* Public admin route (login page) */}
          <Route index element={<AdminLogin />} /> {/* URL: /admin */}
          <Route path="login" element={<AdminLogin />} />{" "}
          {/* optional alias: /admin/login */}
          {/* Protected Admin Area */}
          <Route element={<PrivateRoute type="ADMIN" />}>
            <Route path="app" element={<Outlet />}>
              <Route index element={<AdminPage />} /> {/* URL: /admin/app */}
              <Route path="page" element={<AdminPage />} />{" "}
              <Route path="room" element={<AdminRoom />} />
              {/* optional alias: /admin/app/dashboard */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
