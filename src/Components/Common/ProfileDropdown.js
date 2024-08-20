import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import axios from "axios";
// // import images
// import avatar1 from "../../assets/images/users/avatar-1.jpg";
// import logo from "../../assets/images/logo/grace_lab_logo.jpg";

const ProfileDropdown = () => {
  const { user } = useSelector((state) => ({
    user: state.Profile.user,
  }));

  const handleLogout = () => {
    localStorage.removeItem("AdminUser");
    window.location.replace("/");
  };

  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("AdminUser");
        const response = await axios.get(`${process.env.REACT_APP_API_URL_BPC}/api/auth/get/adminUser/${userId}`);
        console.log("response", response);
        const userData = response; // Access response data
        setUserName(userData.firstName);
        console.log("image", userData.bannerImage);
        const logoUrl = `${process.env.REACT_APP_API_URL_BPC}/${userData.bannerImage}`;
        setLogo(logoUrl);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Empty dependency array to fetch user data only once when the component mounts
  const [logo, setLogo] = useState('');
  // Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={logo}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {userName}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Welcome {userName}!</h6>
          <DropdownItem href="/profile">
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">Profile</span>
          </DropdownItem>
          <DropdownItem onClick={handleLogout}>
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
