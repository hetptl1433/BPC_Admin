import React from "react";
import { Navigate } from "react-router-dom";

import Country from "../pages/LocationSetUp/Country/Country";
import City from "../pages/LocationSetUp/City/City";
import State from "../pages/LocationSetUp/State/State";
import CompanyLocation from "../pages/LocationSetUp/CompanyLocation";
import Login from "../pages/Authentication/Login";
import CategoryMaster from "../pages/Category/CategoryMaster";
import Blogs from "../pages/Blogs/Blogs";
import PromocodeMaster from "../pages/Subscription/PromocodeMaster";
import ProductDetails from "../pages/Products/ProductsDetails";
import UserProfile from "../pages/Authentication/user-profile";
import Banner from "../pages/CMS/Banner";
import CompanyDetails from "../pages/Setup/CompanyDetails";
import AdminUser from "../pages/Auth/AdminUser";
import ContactUs from "../pages/CMS/ContactUs";
import Review from "../pages/CMS/Review";
import NewProject from "../pages/CMS/NewProject";
import SocialMedia from "../pages/CMS/SocialMedia";
import YTDesc from "../pages/YTDesc/YTDesc";
import HomeAbout from "../pages/HomeAbout/HomeAbout";
import Visionmission from "../pages/CMS/Visionmission";
import AboutUs from "../pages/AboutUs/AboutUs";
import Gallery from "../pages/Gallery/Gallery";
import NeonSignsCategoryMaster from "../pages/Category/NeonSignsCategory";
import LEDCategoryMaster from "../pages/Category/LEDCategoryMaster";
import LEDBoard from "../pages/LEDBoard/LEDBoard";
import NeonSigns from "../pages/NeonSigns/NeonSigns";
import NeonDesc from "../pages/NeonSigns/NeonDesc";
import Logo from "../pages/Logo/Logo";
import NeonGoProducts from "../pages/NeonGoProducts/NeonGoProducts";
import ControllerProducts from "../pages/ControllerProducts/ControllerProducts";
import Service from "../pages/Services/Service";
import { components } from "react-select";
import NewsPage from "../pages/NEWS/NewsPage";

const authProtectedRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },
  { path: "/profile", component: <UserProfile /> },
  { path: "/country", component: <Country /> },
  { path: "/city", component: <City /> },
  { path: "/state", component: <State /> },
  { path: "/location", component: <CompanyLocation /> },
  { path: "/admin-user", component: <AdminUser /> },
  { path: "/company-details", component: <CompanyDetails /> },
  {path:"/contact",component:<ContactUs/>},
  {path:"/socialmedia", component:<SocialMedia/>},
  {path:"/logo", component:<Logo/>},
  {path:"/aboutus", component:<AboutUs/>},
  {path:"/galleryimg", component:<Gallery/>},
  {path:"/ytdesc", component:<YTDesc/>},
  {path:"/home-about", component:<HomeAbout/>},
  {path:"/vision-mission", component:<Visionmission/>},
  { path: "/category", component: <CategoryMaster /> },
  { path: "/neonsigns-category", component: <NeonSignsCategoryMaster/> },
  { path: "/led-category", component: <LEDCategoryMaster/> },
  {path:"/review",component:<Review/>},
  { path: "/blogs", component: <Blogs /> },
  { path: "/banner", component: <Banner /> },
  { path: "/promocode-master", component: <PromocodeMaster /> },
  {path:"/newproject",component:<NewProject/>},
  { path: "/product-details", component: <ProductDetails /> },
  { path: "/ledboard-details", component: <LEDBoard /> },
  { path: "/neonsigns-details", component: <NeonSigns /> },
  { path: "/neondesc-details", component: <NeonDesc /> },
  { path: "/neongo-products", component: <NeonGoProducts /> },
  { path: "/controller-products", component: <ControllerProducts /> },
  { path: "/service", component: <Service/> },
  { path: "/news", component: <NewsPage></NewsPage>},



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
];

export { authProtectedRoutes, publicRoutes };
