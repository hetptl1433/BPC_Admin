import React from "react";
import { Navigate } from "react-router-dom";

import CountryN from "../pages/LocationSetUp/Country/CountryN";
import City from "../pages/LocationSetUp/City/City";
import State from "../pages/LocationSetUp/State/State";
import CompanyLocation from "../pages/LocationSetUp/CompanyLocation";

import Login from "../pages/Authentication/Login";

import DrinkCategoryMaster from "../pages/Category/DrinkCategoryMaster";
import GrindCategoryMaster from "../pages/Category/GrindCategoryMaster";
import Blogs from "../pages/Blogs/Blogs";
import Inquiry from "../pages/PolicyAndInquiry/Inquiry";
import NewsletterSubs from "../pages/PolicyAndInquiry/NewsLetterSubs";
import PolicyMaster from "../pages/PolicyAndInquiry/PolicyMaster";
import Users from "../pages/Auth/Users";
import FAQ from "../pages/PolicyAndInquiry/FAQ";
import UserSubscription from "../pages/Subscription/UserSubscription";
import SubscriptionMaster from "../pages/Subscription/SubscriptionMaster";
import PromocodeMaster from "../pages/Subscription/PromocodeMaster";
import ProductDetails from "../pages/Products/ProductsDetails";
import OrderDetails from "../pages/Products/Orders";

const authProtectedRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },
  { path: "/country", component: <CountryN /> },
  { path: "/city", component: <City /> },
  { path: "/state", component: <State /> },
  { path: "/location", component: <CompanyLocation /> },

  { path: "/manage-users", component: <Users /> },
  { path: "/drink-category", component: <DrinkCategoryMaster /> },
  { path: "/grind-category", component: <GrindCategoryMaster /> },
  { path: "/blogs", component: <Blogs /> },
  { path: "/inquiry", component: <Inquiry /> },
  { path: "/newsletter-subscription", component: <NewsletterSubs /> },
  { path: "/policy-master", component: <PolicyMaster /> },
  { path: "/faqs", component: <FAQ /> },
  { path: "/user-subscriptions", component: <UserSubscription /> },
  { path: "/subscription-master", component: <SubscriptionMaster /> },
  { path: "/faqs", component: <FAQ /> },
  { path: "/promocode-master", component: <PromocodeMaster /> },

  { path: "/product-details", component: <ProductDetails /> },
  { path: "/order-details", component: <OrderDetails /> },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/drink-category" />,
  },
  { path: "*", component: <Navigate to="/drink-category" /> },
];

const publicRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },
  { path: "/", component: <Login /> },
];

export { authProtectedRoutes, publicRoutes };
