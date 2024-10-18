import React from "react";
import { Navigate } from "react-router-dom";

import Country from "../pages/LocationSetUp/Country/Country";
import City from "../pages/LocationSetUp/City/City";
import State from "../pages/LocationSetUp/State/State";
import CompanyLocation from "../pages/LocationSetUp/CompanyLocation";
import Login from "../pages/Authentication/Login";

import Blogs from "../pages/Blogs/Blogs";
import UserProfile from "../pages/Authentication/user-profile";
import Banner from "../pages/CMS/Banner";
import AdminUser from "../pages/Auth/AdminUser";
import ContactUs from "../pages/CMS/ContactUs";
import Visionmission from "../pages/CMS/Visionmission";
import Gallery from "../pages/Gallery/Gallery";
import Logo from "../pages/Logo/Logo";

import Service from "../pages/Services/Service";
import { components } from "react-select";
import NewsPage from "../pages/NEWS/NewsPage";
import Courses from "../pages/Courses/Courses";
import LocationNumUs from "../pages/LocationNum/LocationNum";
import ExtraBooking from "../pages/ExtraBooking/ExtraBooking";
import Content from "../pages/Content/Content";
import EmailPage from "../pages/Email/EmailPage";
import HallBooking from "../pages/HallBooking/HallBooking";
import HallImageMaster from "../pages/Category/HallImageMaster";
import HalleBoard from "../pages/HallImage/HallImage";
import TestCategory from "../pages/TestCat/TestCat";
import TestCatMaster from "../pages/TextCatMaster/TextCatMaster";
import Points from "../pages/Points/Point";
import PointMaster from "../pages/PointMaster/PointMaster";
import TestQuestionMaster from "../pages/TestQuestionMaster/TestQuestionMaster";
import Area from "../pages/LocationSetUp/Area/Area";
import Industry from "../pages/Industry/Industry";
import UserGroup from "../pages/UserGroup/UserGroup";
import IndustryUserMaster from "../pages/IndustryUserMaster/IndustryUserMaster";
import BannerImage from "../pages/CMS/Banner";
import BannerImages from "../pages/BannerImage/BannerImage";
import CompanyProfile from "../pages/CompanyProfile/CompanyProfile";
import MediaFiles from "../pages/Media/Media";
import ContentContact from "../pages/ContentContact/ContentContact";
import DownloadFiles from "../pages/Download/Download";
import ServeFiles from "../pages/Serve/Serve";
import IndustryUser from "../pages/Authentication/ExamUser";
import ExamUser from "../pages/Authentication/ExamUser";
import EmailMaster from "../pages/EmailMaster/EmailMaster";
import EmailForm from "../pages/EmailForm/EmailForm";
import EmailTemplete from "../pages/EmailTemplete/EmailTemplete";
import ContactForm from "../pages/ContactForm/ContactForm";
import CourseForm from "../pages/CourseForm/CourseForm";
import RoutineActvity from "../pages/RoutineActivity/RoutinActivity";
import BookingDetails from "../pages/BookingDetails/BookingDetails";
import Result from "../pages/Result/Result";
import ResultPage from "../pages/ResultPage/ResultPage";
import LegacyResult from "../pages/LegacyResult/LegacyResult";
import LegacyResultPage from "../pages/LegacyResultPage/LegacyResultPage";
import PopUpFile from "../pages/PopUp/PopUp";
import RACPdf from "../pages/RACPdf/RACPdf";
// import HalleImage from "../pages/HallImage/HallImage";

const authProtectedRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },
  { path: "/profile", component: <UserProfile /> },
  { path: "/country", component: <Country /> },
  { path: "/city", component: <City /> },
  { path: "/state", component: <State /> },
  { path: "/location", component: <CompanyLocation /> },
  { path: "/admin-user", component: <AdminUser /> },
  { path: "/contact", component: <ContactUs /> },
  { path: "/logo", component: <Logo /> },
  { path: "/galleryimg", component: <Gallery /> },
  { path: "/vision-mission", component: <Visionmission /> },
  { path: "/blogs", component: <Blogs /> },
  { path: "/banner", component: <Banner /> },
  { path: "/service", component: <Service /> },
  { path: "/news", component: <NewsPage></NewsPage> },
  { path: "/courses", component: <Courses /> },
  { path: "/locationnum", component: <LocationNumUs /> },
  { path: "/ExtraBooking", component: <ExtraBooking /> },
  { path: "/content", component: <Content /> },
  { path: "/email", component: <EmailPage /> },
  { path: "/HallBooking", component: <HallBooking /> },
  { path: "/HallImage", component: <HallImageMaster /> },
  { path: "/HallImagePage", component: <HalleBoard /> },
  { path: "/TestGroup", component: <TestCategory /> },
  { path: "/TestMaster", component: <TestCatMaster /> },
  { path: "/Point", component: <Points /> },
  { path: "/PointMaster", component: <PointMaster /> },
  { path: "/TestQuestion", component: <TestQuestionMaster /> },
  { path: "/Area", component: <Area /> },
  { path: "/industry", component: <Industry /> },
  { path: "/UserGroups", component: <UserGroup /> },
  { path: "/IndustryUserMaster", component: <IndustryUserMaster /> },
  { path: "/BannerImage", component: <BannerImages /> },
  { path: "/CompanyProfile", component: <CompanyProfile /> },
  { path: "/media", component: <MediaFiles /> },
  { path: "/ContentContact", component: <ContentContact /> },
  { path: "/download", component: <DownloadFiles /> },
  { path: "/serve", component: <ServeFiles /> },
  { path: "/EmailMaster", component: <EmailMaster /> },
  { path: "/EmailForm", component: <EmailForm /> },
  { path: "/EmailTemplete", component: <EmailTemplete /> },
  { path: "/ContactForm", component: <ContactForm /> },
  { path: "/CoursesForm", component: <CourseForm /> },
  { path: "/RoutineActivity", component: <RoutineActvity /> },
  { path: "/BookingDetails", component: <BookingDetails /> },
  { path: "/Result", component: <Result /> },
  { path: "/Result/:tid", component: <ResultPage /> },
  { path: "/LegacyResult", component: <LegacyResult /> },
  { path: "/LegacyResult/:tid", component: <LegacyResultPage /> },
  { path: "/PopupFile", component: <PopUpFile />},

  {
    path: "/",
    exact: true,
    component: <Navigate to="/category" />,
  },
  { path: "*", component: <Navigate to="/category" /> },
];

const publicRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },
  { path: "/", component: <Login /> },
  { path: "examlogin", component: <ExamUser/>},
   { path: "/RACPDF", component: <RACPdf />},

];

export { authProtectedRoutes, publicRoutes };
