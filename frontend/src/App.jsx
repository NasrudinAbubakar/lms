import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { CartContext, ProfileContext } from "./views/plugin/Context";
import apiInstance from "./utils/axios";
import CartId from "./views/plugin/CartId";

import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoute";

import Register from "../src/views/auth/Register";
import Login from "../src/views/auth/Login";
import Logout from "./views/auth/Logout";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreateNewPassword from "./views/auth/CreateNewPassword";

import Index from "./views/base/Index";
import CourseDetail from "./views/base/CourseDetail";
import Cart from "./views/base/Cart";
import Checkout from "./views/base/Checkout";
import Success from "./views/base/Success";
import Search from "./views/base/Search";

import StudentDashboard from "./views/student/Dashboard";
import StudentCourses from "./views/student/Courses";
import StudentCourseDetail from "./views/student/CourseDetail";
import Wishlist from "./views/student/Wishlist";
import StudentProfile from "./views/student/Profile";
import useAxios from "./utils/useAxios";
import UserData from "./views/plugin/UserData";
import StudentChangePassword from "./views/student/ChangePassword";
import Dashboard from "./views/instructor/Dashboard";
import Courses from "./views/instructor/Courses";
import Review from "./views/instructor/Review";
import Students from "./views/instructor/Students";
import Earning from "./views/instructor/Earning";
import Orders from "./views/instructor/Orders";
import Coupon from "./views/instructor/Coupon";
import TeacherNotification from "./views/instructor/TeacherNotification";
import QA from "./views/instructor/QA";
import ChangePassword from "./views/instructor/ChangePassword";
import Profile from "./views/instructor/Profile";
import CourseCreate from "./views/instructor/CourseCreate";
import CourseEdit from "./views/instructor/CourseEdit";
import CourseEditCurriculum from "./views/instructor/CourseEditCurriculum";
import BecomeTeacher from "./views/instructor/BecomeTeacher";

function App() {
    const [cartCount, setCartCount] = useState(0);
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        apiInstance.get(`course/cart-list/${CartId()}/`).then((res) => {
            setCartCount(res.data?.length);
        });

        useAxios.get(`user/profile/${UserData()?.user_id}/`).then((res) => {
            setProfile(res.data);
        });
    }, []);

    return (
        <CartContext.Provider value={[cartCount, setCartCount]}>
            <ProfileContext.Provider value={[profile, setProfile]}>
                <BrowserRouter>
                    <MainWrapper>
                        <Routes>
                            <Route path="/register/" element={<Register />} />
                            <Route path="/login/" element={<Login />} />
                            <Route path="/logout/" element={<Logout />} />
                            <Route path="/forgot-password/" element={<ForgotPassword />} />
                            <Route path="/create-new-password/" element={<CreateNewPassword />} />

                            {/* Base Routes */}
                            <Route path="/" element={<Index />} />
                            <Route path="/course-detail/:slug/" element={<CourseDetail />} />
                            <Route path="/cart/" element={<Cart />} />
                            <Route path="/checkout/:order_oid/" element={<Checkout />} />
                            <Route path="/payment-success/:order_oid/" element={<Success />} />
                            <Route path="/search/" element={<Search />} />

                            {/* Student Routes */}
                            <Route
                                path="/student/dashboard/"
                                element={
                                    <PrivateRoute>
                                        <StudentDashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/student/courses/"
                                element={
                                    <PrivateRoute>
                                        <StudentCourses />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/student/courses/:enrollment_id/"
                                element={
                                    <PrivateRoute>
                                        <StudentCourseDetail />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/student/wishlist/"
                                element={
                                    <PrivateRoute>
                                        <Wishlist />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/student/profile/"
                                element={
                                    <PrivateRoute>
                                        <StudentProfile />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/student/change-password/"
                                element={
                                    <PrivateRoute>
                                        <StudentChangePassword />
                                    </PrivateRoute>
                                }
                            />

                            {/* Teacher Routes */}

                            <Route
                                path="/instructor/dashboard/"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/instructor/dashboard/"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/instructor/courses/"
                                element={
                                    <PrivateRoute>
                                        <Courses />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/instructor/reviews/"
                                element={
                                    <PrivateRoute>
                                        <Review />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/instructor/students/"
                                element={
                                    <PrivateRoute>
                                        <Students />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/instructor/earning/"
                                element={
                                    <PrivateRoute>
                                        <Earning />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/instructor/orders/"
                                element={
                                    <PrivateRoute>
                                        <Orders />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/instructor/coupon/"
                                element={
                                    <PrivateRoute>
                                        <Coupon />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/instructor/notifications/"
                                element={
                                    <PrivateRoute>
                                        <TeacherNotification />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/instructor/question-answer/"
                                element={
                                    <PrivateRoute>
                                        <QA />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/instructor/change-password/"
                                element={
                                    <PrivateRoute>
                                        <ChangePassword />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/instructor/profile/"
                                element={
                                    <PrivateRoute>
                                        <Profile />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/instructor/create-course/"
                                element={
                                    <PrivateRoute>
                                        <CourseCreate />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/instructor/edit-course/:course_id/"
                                element={
                                    <PrivateRoute>
                                        <CourseEdit />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/instructor/edit-course/:course_id/curriculum/"
                                element={
                                    <PrivateRoute>
                                        <CourseEditCurriculum />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="/become-teacher" element={<BecomeTeacher />} />
                        </Routes>
                    </MainWrapper>
                </BrowserRouter>
            </ProfileContext.Provider>
        </CartContext.Provider>
    );
}

export default App;
