import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  // Alert,
} from "reactstrap";
import { Alert } from "react-bootstrap";

import logo from "../../assets/images/logo/logonew1.png";

import { ToastContainer, toast } from "react-toastify";
//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, socialLogin, resetLoginFlag } from "../../store/actions";

import withRouter from "../../Components/Common/withRouter";
import axios from "axios";

const initialState = {
  UserName: "",
  Password: "",
};

const IndustryUser = (props) => {
  const { error } = useSelector((state) => ({
    error: state.Login.error,
  }));

  // const [showError, setShowError] = useState(false);
  const [values, setValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { UserName, Password } = values;
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const login = () => {
    setIsSubmit(true);
    setFormErrors(validate(values));

    axios
      .post(`${process.env.REACT_APP_API_URL_BPC}/api/ExamUserLogin`, values)
      .then((res) => {
        console.log(res);
        console.log(res.success)
        if (res.success) {
          console.log(" login", res);

          localStorage.setItem(" Exam User", res._id);
          console.log(res._id)

          window.location.replace("/contact");
        } else {
          toast.error("toast failed!");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Authentication failed!");
      });
  };

  const [errUserName, seterrUserName] = useState(false);
  const [errPassword, setErrPassword] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (values.UserName === "") {
      errors.UserName = "UserName is required!";
      seterrUserName(true);

    } else {
      seterrUserName(false);
    }
    if (values.Password === "") {
      errors.Password = "Password is required!";
      setErrPassword(true);
    }
    if (values.Password !== "") {
      setErrPassword(false);
    }
    return errors;
  };
  const validClassUserName =
    errUserName && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassPassword =
    errPassword && isSubmit ? "form-control is-invalid" : "form-control pe-5";

  document.title = " SignIn | BPC India";
  return (
    <React.Fragment>
      {/* <ParticlesAuth> */}
      <ToastContainer />
      <div className="auth-page-content">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50"></div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card style={{ marginTop: "35%" }}>
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="site-logo">
                        <Link to="/">
                          <img
                            style={{ display: "flex", alignItems: "center" }}
                            src={logo}
                            height={"70px"}
                            width={"80px"}
                            alt="BPC"
                          />
                        </Link>
                      </div>
                    </div>
                    <h5 className="text-primary mt-2">Welcome to BPC Exam portal</h5>
                    <p className="text-muted">Sign in to continue.</p>
                  </div>
                  {error && error ? (
                    <Alert color="danger"> {error} </Alert>
                  ) : null}
                  <div className="p-2 mt-4">
                    {/* <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                      action="#"
                    > */}
                    <div className="mb-3">
                      <Label htmlFor="UserName" className="form-label">
                        UserName
                      </Label>
                      <Input
                        name="UserName"
                        className={validClassUserName}
                        placeholder="Enter UserName"
                        type="text"
                        onChange={handleChange}
                        value={UserName}
                      />
                      {isSubmit && (
                        <p className="text-danger">{formErrors.UserName}</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label" htmlFor="Password-input">
                        Password
                      </Label>
                      <div className="position-relative auth-pass-inputgroup mb-3">
                        <Input
                          name="Password"
                          value={Password}
                          type={showPassword ? "text" : "Password"}
                          className={validClassPassword}
                          placeholder="Enter Password"
                          onChange={handleChange}
                        />
                        {isSubmit && (
                          <p className="text-danger">{formErrors.Password}</p>
                        )}
                        <button
                          className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                          type="button"
                          id="Password-addon"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <i class="ri-eye-off-fill  align-middle"></i>
                          ) : (
                            <i className="ri-eye-fill align-middle"></i>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button
                        color="success"
                        className="btn btn-success w-100"
                        type="submit"
                        onClick={login}
                      >
                        Sign In
                      </Button>
                    </div>
                    {/* </Form> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(IndustryUser);
