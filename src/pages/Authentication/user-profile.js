import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";

import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

import avatar from "../../assets/images/users/avatar-1.jpg";
import logo from "../../assets/images/logo/logo-neon.png";

// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import axios from "axios";
import { getAdminUser } from "../../functions/Auth/AdminUser";

const UserProfile = () => {
  const dispatch = useDispatch();

  
  const [idx, setidx] = useState("1");

  const [userName, setUserName] = useState("Project Name");

  const [firstName, setFirstName]= useState("");
  const [lastName, setLastName]= useState("");
  const [photo, setPhoto]= useState("");
  const [password, setPassword]= useState("");
  const [email, setemail] = useState("");
  const [IsActive, setIsActive] = useState();

  const { user, success, error } = useSelector(state => ({
    user: state.Profile.user,
    success: state.Profile.success,
    error: state.Profile.error
  }));

  const fetchUserData = async ()=>{
    try {
      const userId = localStorage.getItem("AdminUser");
      await getAdminUser(userId).then((response)=> {
        console.log(response);
        setFirstName(response.firstName);
        setLastName(response.lastName);
        setPassword(response.password);
        setemail(response.email);
        setPhoto(`${process.env.REACT_APP_API_URL_COFFEE}/${response.bannerImage}`);
        setIsActive(response.IsActive);
        // console.log(IsActive);
      })
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));

      if (!isEmpty(user)) {
        obj.data.first_name = user.first_name;
        sessionStorage.removeItem("authUser");
        sessionStorage.setItem("authUser", JSON.stringify(obj));
      }

     

      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
    fetchUserData();
  }, [dispatch, user]);






  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      first_name: userName || 'Admin',
      idx: idx || '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    }
  });

  document.title = `Profile | ${firstName} ${lastName}`;
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">Username Updated To {userName}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="mx-3">
                      <img
                        src={photo}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{`${firstName} ${lastName}`|| "Admin"}</h5>
                        {/* <p className="mb-1">Last Name : {lastName}</p> */}
                        <p className="mb-1">Email Id : {email}</p>
                        <p className="mb-1">Password : {password}</p>
                        <p className="mb-1">IsActive : {IsActive? "Yes" : "No"}</p>

                        {/* <p className="mb-0">Id No : #{idx}</p> */}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="form-group">
                  <Label className="form-label">User Name</Label>
                  <Input
                    name="first_name"
                    // value={name}
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.first_name || ""}
                    invalid={
                      validation.touched.first_name && validation.errors.first_name ? true : false
                    }
                  />
                  {validation.touched.first_name && validation.errors.first_name ? (
                    <FormFeedback type="invalid">{validation.errors.first_name}</FormFeedback>
                  ) : null}
                  <Input name="idx" value={idx} type="hidden" />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update User Name
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
