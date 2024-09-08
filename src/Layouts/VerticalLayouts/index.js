import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";

// Import Data
import navdata from "../LayoutMenuData";
//i18n
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/Common/withRouter";

const VerticalLayout = (props) => {
  const [locationSetup, setLocationSetup] = useState(false);
  const [result, setResult] = useState(false);
  const [setup, setSetup] = useState(false);
  const [params, setParams] = useState(false);

  const [product, setproduct] = useState(false);
  const [order, setOrder] = useState(false);
  const [category, setCategory] = useState(false);
  const [homecomponents, sethomecomponents] = useState(false);
  const [subs, setSubs] = useState(false);
  const [inquiry, setInquiry] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [neonsigns, setNeonSigns] = useState(false);
  const [Email, setEmail] = useState(false);
  const [cms, setCMS] = useState(false);
  const [locationBar, setLocationBar] = useState(false);
  const [testbar, setTestbar]= useState(false);
  const [industrybar, setIndustrybar]= useState(false);
  const [forms, setForms] = useState(false);

  const [contentBar, setContentBar]= useState(false);

  const navData = navdata().props.children;
  const path = props.router.location.pathname;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const initMenu = () => {
      const pathName = process.env.PUBLIC_URL + path;
      const ul = document.getElementById("navbar-nav");
      const items = ul.getElementsByTagName("a");
      let itemsArray = [...items]; // converts NodeList to Array
      removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find((x) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    if (props.layoutType === "vertical") {
      initMenu();
    }
  }, [path, props.layoutType]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute(
        "aria-expanded",
        "true"
      );
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement
          .closest(".collapse")
          .classList.add("show");
        if (
          parentCollapseDiv.parentElement.closest(".collapse")
            .previousElementSibling
        )
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.classList.add("active");
        if (
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
        ) {
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .classList.add("show");
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .previousElementSibling.classList.add("active");
        }
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains("active"));

    actiItems.forEach((item) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  };

  return (
    <React.Fragment>
      {/* menu Items */}
      {/* <li className="menu-title">
        <span data-key="t-menu">Menu</span>
      </li> */}

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setSetup(!setup);
          }}
        >
          <span data-key="t-apps"> Setup </span>
        </Link>

        <Collapse className="menu-dropdown" isOpen={setup}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/company-details" className="nav-link">
                Company Details
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin-user" className="nav-link">
                Admin Users
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/#" className="nav-link">
                Roles
              </Link>
            </li> */}

            {/* <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="#"
                data-bs-toggle="collapse"
                onClick={() => {
                  setLocationSetup(!locationSetup);
                }}
              >
                <span data-key="t-apps"> Location Setup </span>
              </Link>
              <Collapse
                className="menu-dropdown"
                isOpen={locationSetup}
                //   id="sidebarApps"
              >
                <ul className="nav nav-sm flex-column test">
                  <li className="nav-item">
                    <Link to="/country" className="nav-link">
                      Country
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/state" className="nav-link">
                      State
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/city" className="nav-link">
                      City
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/location" className="nav-link">
                      Company Location
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li> */}
          </ul>
        </Collapse>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setParams(!params);
          }}
        >
          <span data-key="t-apps"> Parameters </span>
        </Link>

        <Collapse className="menu-dropdown" isOpen={params}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="#"
                data-bs-toggle="collapse"
                onClick={() => {
                  setCategory(!category);
                }}
              >
                <span data-key="t-apps"> Category Master</span>
              </Link>
              <Collapse className="menu-dropdown" isOpen={category}>
                <ul className="nav nav-sm flex-column test">
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/category">
                      <span data-key="t-apps">Products Category </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link menu-link"
                      to="/neonsigns-category"
                    >
                      <span data-key="t-apps">BPC Signs Category </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/led-category">
                      <span data-key="t-apps">LED Category </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/HallImage">
                      <span data-key="t-apps">Hall Image Category </span>
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul>
        </Collapse>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setproduct(!product);
          }}
        >
          <span data-key="t-apps"> Product Master </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={product}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            {/* <li className="nav-item">
              <Link to="/product-details" className="nav-link">
                Product Details
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/neongo-products" className="nav-link">
                NeonGo Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/controller-products" className="nav-link">
                Controller Products
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>

      {/* <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setPolicy(!policy);
          }}
        >
          <span data-key="t-apps"> Policy and Promos</span>
        </Link>
        <Collapse className="menu-dropdown" isOpen={policy}>
          <ul className="nav nav-sm flex-column test"></ul>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/promocode-master" className="nav-link">
                Promocode Master
              </Link>
            </li>
          </ul>
          <ul className="nav nav-sm flex-column test"></ul>
        </Collapse>
      </li> */}

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setCMS(!cms);
          }}
        >
          <span data-key="t-apps"> CMS </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={cms}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/galleryimg">
                <span data-key="t-apps">Gallery Images</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/service">
                <span data-key="t-apps">Services</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/HallImagePage">
                <span data-key="t-apps">Hall Image</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/HallBooking">
                <span data-key="t-apps">Hall Booking</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link menu-link" to="/courses">
                <span data-key="t-apps">Courses </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link menu-link" to="/ExtraBooking">
                <span data-key="t-apps">Extra Booking </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/news" className="nav-link">
                News
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="#"
                data-bs-toggle="collapse"
                onClick={() => {
                  setContentBar(!contentBar);
                }}
              >
                <span data-key="t-apps"> Content</span>
              </Link>
              <Collapse className="menu-dropdown" isOpen={contentBar}>
                <ul className="nav nav-sm flex-column test"></ul>
                <ul className="nav nav-sm flex-column test">
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/Content">
                      <span data-key="t-apps">Content</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/BannerImage" className="nav-link">
                      Banner Image
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/CompanyProfile" className="nav-link">
                      Company Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/media" className="nav-link">
                      Media
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/ContentContact" className="nav-link">
                      Contact
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/download" className="nav-link">
                      Download
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/serve" className="nav-link">
                      Serve
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-sm flex-column test"></ul>
              </Collapse>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="#"
                data-bs-toggle="collapse"
                onClick={() => {
                  setEmail(!Email);
                }}
              >
                <span data-key="t-apps"> Email</span>
              </Link>
              <Collapse className="menu-dropdown" isOpen={Email}>
                <ul className="nav nav-sm flex-column test"></ul>
                <ul className="nav nav-sm flex-column test">
                  <li className="nav-item">
                    <Link to="/EmailMaster" className="nav-link">
                      Email Master
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/EmailForm" className="nav-link">
                      Email Form master
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/EmailTemplete" className="nav-link">
                      Email templete
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-sm flex-column test"></ul>
              </Collapse>
            </li>

            <li className="nav-item">
              <Link className="nav-link " to="/RoutineActivity">
                <span data-key="t-apps"> Routine Sheet</span>
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setResult(!result);
          }}
        >
          <span data-key="t-apps"> Result </span>
        </Link>

        <Collapse className="menu-dropdown" isOpen={result}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/Result" className="nav-link">
                Result
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setTestbar(!testbar);
          }}
        >
          <span data-key="t-apps"> Test </span>
        </Link>

        <Collapse className="menu-dropdown" isOpen={testbar}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/TestGroup" className="nav-link">
                Test Group
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/TestMaster" className="nav-link">
                Test Category Master
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Point" className="nav-link">
                Point Category
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/PointMaster" className="nav-link">
                Point Master
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/TestQuestion" className="nav-link">
                Test Question Master
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>
      <li>
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setIndustrybar(!industrybar);
          }}
        >
          <span data-key="t-apps"> User </span>
        </Link>
        <Collapse className="menu-dropdown" isOpen={industrybar}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/Industry" className="nav-link">
                Industry
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/UserGroups" className="nav-link">
                User Group Master
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/IndustryUserMaster" className="nav-link">
                User Master
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>
      <li>
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setForms(!forms);
          }}
        >
          <span data-key="t-apps"> Forms </span>
        </Link>
        <Collapse className="menu-dropdown" isOpen={forms}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/ContactForm" className="nav-link">
                Contact Us Form
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/CoursesForm" className="nav-link">
                Courses inquiry form
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/RoutineActivity" className="nav-link">
                Routine Activity Sheet
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/BookingDetails" className="nav-link">
                Booking Details
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>
    </React.Fragment>
  );
};

VerticalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(VerticalLayout));
