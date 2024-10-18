import React, { useState, useEffect } from "react";
import {
  Input,
  Label,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { ToastContainer, toast } from "react-toastify";

import DataTable from "react-data-table-component";
import axios from "axios";
import { createCompanyProfileDetails, getCompanyProfileDetails, removeCompanyProfileDetails, updateCompanyProfileDetails } from "../../functions/CompanyProfile/CompanyProfile";

const CompanyProfile = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [_id, set_Id] = useState("");

  const initialState = {
    CompanyName: "",
    Email: "",
    SalesEmail: "",
    SupportEmail: "",
    PartnerEmail: "",
    Address: "",
    PhoneOff1: "",
    PhoneOff2: "",
    MobileOne1: "",
    MobileOne2: "",
    productImage: "",
    IsActive: false,
  };


  const [remove_id, setRemove_id] = useState("");

  //search and pagination state
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [values, setValues] = useState(initialState);

 const {
   CompanyName,
   Email,
   SalesEmail,
   SupportEmail,
   PartnerEmail,
   Address,
   PhoneOff1,
   PhoneOff2,
   MobileOne1,
   MobileOne2,
   productImage,
   IsActive,
 } = values;


  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    {
      name: "Company Name",
      selector: (row) => row.CompanyName,
      sortable: true,
      sortField: "CompanyName",
      minWidth: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      sortable: true,
      sortField: "Email",
      minWidth: "150px",
    },
    {
        name: "Image",
        selector: (row) =>  renderImage(row.productImage),
        sortable: false,
        sortField: "productImage",
        minWidth: "150px",
      },
    
    {
      name: "Action",
      selector: (row) => {
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
              <div className="edit">
                <button
                  className="btn btn-sm btn-success edit-item-btn "
                  data-bs-toggle="modal"
                  data-bs-target="#showModal"
                  onClick={() => handleTog_edit(row._id)}
                >
                  Edit
                </button>
              </div>

              <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => tog_delete(row._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      },
      sortable: false,
      minWidth: "180px",
    },
  ];
  const renderImage = (uploadimage) => {
    const imageUrl = `${process.env.REACT_APP_API_URL_BPC}/${uploadimage}`;

    return (
      <img
        src={imageUrl}
        alt="Image"
        style={{ width: "75px", height: "75px", padding: "5px" }}
      />
    );
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchProducts = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-by-params/CompanyProfile-details`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: query,
          IsActive: filter,
        }
      )
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          setLoading(false);
          setData(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setData([]);
        }
      });

    setLoading(false);
  };

  const [errPN, setErrPN] = useState(false);
  const [errCN, setErrCN] = useState(false);
  const [errPI, setErrPI] = useState(false);
  const [errwt, setErrwt] = useState(false);
  const [errut, setErrut] = useState(false);
  
  const [errEmail, setErrEmail] = useState(false);
  const [errSalesEmail, setErrSalesEmail] = useState(false);
  const [errSupportEmail, setErrSupportEmail] = useState(false);
  const [errPartnerEmail, setErrPartnerEmail] = useState(false);
  const [errAddress, setErrAddress] = useState(false);
  const [errPhoneOff1, setErrPhoneOff1] = useState(false);
  const [errPhoneOff2, setErrPhoneOff2] = useState(false);
  const [errMobileOne1, setErrMobileOne1] = useState(false);
  const [errMobileOne2, setErrMobileOne2] = useState(false);

  const [errPr, setErrPr] = useState(false);

 const validate = (values) => {
   const errors = {};

   if (values.CompanyName === "") {
     errors.CompanyName = "Company Name is required";
     setErrCN(true);
   } else {
     setErrCN(false);
   }

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   // Email validation
   if (values.Email === "") {
     errors.Email = "Email is required";
     setErrEmail(true);
   } else if (!emailRegex.test(values.Email)) {
     errors.Email = "Invalid email format";
     setErrEmail(true);
   } else {
     setErrEmail(false);
   }

   // Sales Email validation
   if (values.SalesEmail === "") {
     errors.SalesEmail = "Sales Email is required";
     setErrSalesEmail(true);
   } else if (!emailRegex.test(values.SalesEmail)) {
     errors.SalesEmail = "Invalid Sales Email format";
     setErrSalesEmail(true);
   } else {
     setErrSalesEmail(false);
   }

   // Support Email validation
   if (values.SupportEmail === "") {
     errors.SupportEmail = "Support Email is required";
     setErrSupportEmail(true);
   } else if (!emailRegex.test(values.SupportEmail)) {
     errors.SupportEmail = "Invalid Support Email format";
     setErrSupportEmail(true);
   } else {
     setErrSupportEmail(false);
   }

   // Partner Email validation
   if (values.PartnerEmail === "") {
     errors.PartnerEmail = "Partner Email is required";
     setErrPartnerEmail(true);
   } else if (!emailRegex.test(values.PartnerEmail)) {
     errors.PartnerEmail = "Invalid Partner Email format";
     setErrPartnerEmail(true);
   } else {
     setErrPartnerEmail(false);
   }

   if (values.Address === "") {
     errors.Address = "Address is required";
     setErrAddress(true);
   } else {
     setErrAddress(false);
   }

  const phoneRegex = /^\d{10}$/;

  // Phone Office 1 validation
  if (values.PhoneOff1 === "") {
    errors.PhoneOff1 = "Phone Office 1 is required";
    setErrPhoneOff1(true);
  } else if (!phoneRegex.test(values.PhoneOff1)) {
    errors.PhoneOff1 = "Phone Office 1 must be a 10-digit number";
    setErrPhoneOff1(true);
  } else {
    setErrPhoneOff1(false);
  }

  // Phone Office 2 validation
  if (values.PhoneOff2 === "") {
    errors.PhoneOff2 = "Phone Office 2 is required";
    setErrPhoneOff2(true);
  } else if (!phoneRegex.test(values.PhoneOff2)) {
    errors.PhoneOff2 = "Phone Office 2 must be a 10-digit number";
    setErrPhoneOff2(true);
  } else {
    setErrPhoneOff2(false);
  }

  // Mobile One 1 validation
  if (values.MobileOne1 === "") {
    errors.MobileOne1 = "Mobile One 1 is required";
    setErrMobileOne1(true);
  } else if (!phoneRegex.test(values.MobileOne1)) {
    errors.MobileOne1 = "Mobile One 1 must be a 10-digit number";
    setErrMobileOne1(true);
  } else {
    setErrMobileOne1(false);
  }

  // Mobile One 2 validation
  if (values.MobileOne2 === "") {
    errors.MobileOne2 = "Mobile One 2 is required";
    setErrMobileOne2(true);
  } else if (!phoneRegex.test(values.MobileOne2)) {
    errors.MobileOne2 = "Mobile One 2 must be a 10-digit number";
    setErrMobileOne2(true);
  } else {
    setErrMobileOne2(false);
  }

   if (values.productImage === "") {
     errors.productImage = "Product Image is required";
     setErrPI(true);
   } else {
     setErrPI(false);
   }

   return errors;
 };
const validClassCompanyName =
  errCN && isSubmit ? "form-control is-invalid" : "form-control";
const validClassEmail =
  errEmail && isSubmit ? "form-control is-invalid" : "form-control";
const validClassSalesEmail =
  errSalesEmail && isSubmit ? "form-control is-invalid" : "form-control";
const validClassSupportEmail =
  errSupportEmail && isSubmit ? "form-control is-invalid" : "form-control";
const validClassPartnerEmail =
  errPartnerEmail && isSubmit ? "form-control is-invalid" : "form-control";
const validClassAddress =
  errAddress && isSubmit ? "form-control is-invalid" : "form-control";
const validClassPhoneOff1 =
  errPhoneOff1 && isSubmit ? "form-control is-invalid" : "form-control";
const validClassPhoneOff2 =
  errPhoneOff2 && isSubmit ? "form-control is-invalid" : "form-control";
const validClassMobileOne1 =
  errMobileOne1 && isSubmit ? "form-control is-invalid" : "form-control";
const validClassMobileOne2 =
  errMobileOne2 && isSubmit ? "form-control is-invalid" : "form-control";
const validClassPI =
  errPI && isSubmit ? "form-control is-invalid" : "form-control";


  const [modal_delete, setmodal_delete] = useState(false);

  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);

  const handlecheck = (e) => {
    setValues({ ...values, IsActive: e.target.checked });
  };

  const [modal_list, setModalList] = useState(false);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [ledCategories, setLEDCategories] = useState([]);

 

  const handleClick = (e) => {
    e.preventDefault();
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
      const formdata = new FormData();

   formdata.append("productImage", values.productImage);
   formdata.append("CompanyName", values.CompanyName);
   formdata.append("Email", values.Email);
   formdata.append("SalesEmail", values.SalesEmail);
   formdata.append("SupportEmail", values.SupportEmail);
   formdata.append("PartnerEmail", values.PartnerEmail);
   formdata.append("Address", values.Address);
   formdata.append("PhoneOff1", values.PhoneOff1);
   formdata.append("PhoneOff2", values.PhoneOff2);
   formdata.append("MobileOne1", values.MobileOne1);
   formdata.append("MobileOne2", values.MobileOne2);
   formdata.append("IsActive", values.IsActive);

      createCompanyProfileDetails(formdata)
        .then((res) => {
          // setModalList(!modal_list);
          setShowForm(false);
          setValues(initialState);
          setCheckImagePhoto(false);
          setPhotoAdd("");
          setIsSubmit(false);
          setFormErrors({});
          fetchProducts();
          toast.success("Data submitted Successfully!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const tog_list = () => {
    setModalList(!modal_list);
    setIsSubmit(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeCompanyProfileDetails(remove_id)
      .then((res) => {
         toast.success("Data deleted Successfully!");
        setmodal_delete(!modal_delete);

        fetchProducts();

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
    const formdata = new FormData();

 formdata.append("productImage", values.productImage);
 formdata.append("CompanyName", values.CompanyName);
 formdata.append("Email", values.Email);
 formdata.append("SalesEmail", values.SalesEmail);
 formdata.append("SupportEmail", values.SupportEmail);
 formdata.append("PartnerEmail", values.PartnerEmail);
 formdata.append("Address", values.Address);
 formdata.append("PhoneOff1", values.PhoneOff1);
 formdata.append("PhoneOff2", values.PhoneOff2);
 formdata.append("MobileOne1", values.MobileOne1);
 formdata.append("MobileOne2", values.MobileOne2);
 formdata.append("IsActive", values.IsActive);

    updateCompanyProfileDetails(_id, formdata)
      .then((res) => {
        // setmodal_edit(!modal_edit);
        setPhotoAdd("");
        setUpdateForm(false);
         toast.success("Data edited Successfully!");
        fetchProducts();
        setCheckImagePhoto(false);
        setValues(initialState);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const handleAddCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setPhotoAdd("");
    setCheckImagePhoto(false);
    // setModalList(false);
    setShowForm(false);
    setUpdateForm(false);
    setValues(initialState);
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setPhotoAdd("");
    setUpdateForm(false);
    setShowForm(false);

    setCheckImagePhoto(false);
    setValues(initialState);
  };

  const handleTog_edit = (_id) => {
    // setmodal_edit(!modal_edit);
    setIsSubmit(false);
    setUpdateForm(true);

    set_Id(_id);
    console.log(_id);
    setFormErrors(false);
    getCompanyProfileDetails(_id)
      .then((res) => {
        setValues({
          ...values,
          CompanyName: res.CompanyName,
          Email: res.Email,
          SalesEmail: res.SalesEmail,
          SupportEmail: res.SupportEmail,
          PartnerEmail: res.PartnerEmail,
          Address: res.Address,
          PhoneOff1: res.PhoneOff1,
          PhoneOff2: res.PhoneOff2,
          MobileOne1: res.MobileOne1,
          MobileOne2: res.MobileOne2,
          productImage: res.productImage,
          IsActive: res.IsActive,
        });

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const [photoAdd, setPhotoAdd] = useState();
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);

  const PhotoUpload = (e) => {
    if (e.target.files.length > 0) {
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);

      image.onload = () => {
        const width = image.width;
        const height = image.height;

        // Now, you have the image width and height available.
        // You can use this information when sending the image to the backend.
      };

      setPhotoAdd(imageurl);
      setValues({ ...values, productImage: e.target.files[0] });
      setCheckImagePhoto(true);
    }
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };

  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };
  document.title = "Company Profile | BPC";

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Company Profile"
            title="Company Profile"
            pageTitle="CMS"
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Company Profile
                      </h2>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div
                        style={{
                          display: showForm || updateForm ? "none" : "",
                        }}
                      >
                        <div className="text-end mt-1">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            name="filter"
                            value={filter}
                            defaultChecked={true}
                            onChange={handleFilter}
                          />
                          <Label className="form-check-label ms-2">
                            Active
                          </Label>
                        </div>
                      </div>
                    </Col>
                    <Col className="col-sm-auto" lg={4} md={12} sm={12}>
                      <div className="d-flex justify-content-sm-end">
                        {/* add btn */}
                        <div
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <div className="d-flex justify-content-sm-end">
                                <div>
                                  <Button
                                    color="success"
                                    className="add-btn me-1"
                                    onClick={() => {
                                      setShowForm(!showForm);
                                      setValues(initialState);
                                      // setFileId(Math.random() * 100000);
                                    }}
                                    // onClick={() => tog_list()}
                                    // id="create-btn"
                                  >
                                    <i className="ri-add-line align-bottom me-1"></i>
                                    Add
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        {/* update list btn */}

                        <div
                          style={{
                            display: showForm || updateForm ? "" : "none",
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <div className="text-end">
                                <button
                                  className="btn bg-success text-light mb-3 "
                                  onClick={() => {
                                    setValues(initialState);
                                    setShowForm(false);
                                    setUpdateForm(false);
                                    // setFileId(Math.random() * 100000);
                                  }}
                                >
                                  <i class="ri-list-check align-bottom me-1"></i>{" "}
                                  List
                                </button>
                              </div>
                            </Col>
                          </Row>
                          {/* </div> */}
                        </div>

                        {/* search */}
                        <div
                          className="search-box ms-2"
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <input
                            className="form-control search"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}
                          />
                          <i className="ri-search-line search-icon "></i>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                {/* ADD FORM  */}
                <div
                  style={{
                    display: showForm && !updateForm ? "block" : "none",
                  }}
                >
                  <CardBody>
                    <React.Fragment>
                      <Col xxl={12}>
                        <Card className="">
                          {/* <PreviewCardHeader title="Billing Product Form" /> */}
                          <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                                  <Row>
                                    <Col lg={6}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className={validClassCompanyName}
                                          placeholder="Enter company name"
                                          required
                                          name="CompanyName"
                                          value={values.CompanyName}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="company-name-field"
                                          className="form-label"
                                        >
                                          Company Name{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.CompanyName}
                                          </p>
                                        )}
                                      </div>
                                    </Col>
                                    <Col lg={6}></Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="email"
                                          className={validClassEmail}
                                          placeholder="Enter email"
                                          required
                                          name="Email"
                                          value={values.Email}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="email-field"
                                          className="form-label"
                                        >
                                          Email{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.Email}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="email"
                                          className={validClassSalesEmail}
                                          placeholder="Enter sales email"
                                          required
                                          name="SalesEmail"
                                          value={values.SalesEmail}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="sales-email-field"
                                          className="form-label"
                                        >
                                          Sales Email{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.SalesEmail}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="email"
                                          className={validClassSupportEmail}
                                          placeholder="Enter support email"
                                          required
                                          name="SupportEmail"
                                          value={values.SupportEmail}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="support-email-field"
                                          className="form-label"
                                        >
                                          Support Email{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.SupportEmail}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="email"
                                          className={validClassPartnerEmail}
                                          placeholder="Enter partner email"
                                          required
                                          name="PartnerEmail"
                                          value={values.PartnerEmail}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="partner-email-field"
                                          className="form-label"
                                        >
                                          Partner Email{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.PartnerEmail}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className={validClassAddress}
                                          placeholder="Enter address"
                                          required
                                          name="Address"
                                          value={values.Address}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="address-field"
                                          className="form-label"
                                        >
                                          Address{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.Address}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className={validClassPhoneOff1}
                                          placeholder="Enter phone office 1"
                                          required
                                          name="PhoneOff1"
                                          value={values.PhoneOff1}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="phone-off1-field"
                                          className="form-label"
                                        >
                                          Phone Office 1{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.PhoneOff1}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className={validClassPhoneOff2}
                                          placeholder="Enter phone office 2"
                                          required
                                          name="PhoneOff2"
                                          value={values.PhoneOff2}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="phone-off2-field"
                                          className="form-label"
                                        >
                                          Phone Office 2{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.PhoneOff2}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className={validClassMobileOne1}
                                          placeholder="Enter mobile one 1"
                                          required
                                          name="MobileOne1"
                                          value={values.MobileOne1}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="mobile-one1-field"
                                          className="form-label"
                                        >
                                          Mobile One 1{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.MobileOne1}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className={validClassMobileOne2}
                                          placeholder="Enter mobile one 2"
                                          required
                                          name="MobileOne2"
                                          value={values.MobileOne2}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="mobile-one2-field"
                                          className="form-label"
                                        >
                                          Mobile One 2{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.MobileOne2}
                                          </p>
                                        )}
                                      </div>
                                    </Col>
                                  </Row>

                                  <Col lg={6}>
                                    <label>
                                      Image{" "}
                                      <span className="text-danger">*</span>
                                    </label>

                                    <input
                                      type="file"
                                      name="productImage"
                                      className={validClassPI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload}
                                    />
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.productImage}
                                      </p>
                                    )}
                                    {checkImagePhoto ? (
                                      <img
                                        //   src={image ?? myImage}
                                        className="m-2"
                                        src={photoAdd}
                                        alt="Profile"
                                        width="180"
                                        height="200"
                                      />
                                    ) : null}
                                  </Col>

                                  <div className="mt-5">
                                    <Col lg={6}>
                                      <div className="form-check mb-2">
                                        <Input
                                          type="checkbox"
                                          name="IsActive"
                                          value={IsActive}
                                          onChange={handlecheck}
                                          checked={IsActive}
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor="activeCheckBox"
                                        >
                                          Is Active
                                        </Label>
                                      </div>
                                    </Col>
                                  </div>

                                  <Col lg={12}>
                                    <div className="hstack gap-2 justify-content-end">
                                      <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        id="add-btn"
                                        onClick={handleClick}
                                      >
                                        Submit
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleAddCancel}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </CardBody>{" "}
                        </Card>
                      </Col>
                    </React.Fragment>
                  </CardBody>
                </div>

                {/* UPDATE FORM  */}
                <div
                  style={{
                    display: !showForm && updateForm ? "block" : "none",
                  }}
                >
                  <CardBody>
                    <React.Fragment>
                      <Col xxl={12}>
                        <Card className="">
                          <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                                  <Row>
                                    <Col lg={6}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className={validClassCompanyName}
                                          placeholder="Enter company name"
                                          required
                                          name="CompanyName"
                                          value={values.CompanyName}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="company-name-field"
                                          className="form-label"
                                        >
                                          Company Name{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.CompanyName}
                                          </p>
                                        )}
                                      </div>
                                    </Col>
                                    <Col lg={6}></Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="email"
                                          className={validClassEmail}
                                          placeholder="Enter email"
                                          required
                                          name="Email"
                                          value={values.Email}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="email-field"
                                          className="form-label"
                                        >
                                          Email{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.Email}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="email"
                                          className={validClassSalesEmail}
                                          placeholder="Enter sales email"
                                          required
                                          name="SalesEmail"
                                          value={values.SalesEmail}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="sales-email-field"
                                          className="form-label"
                                        >
                                          Sales Email{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.SalesEmail}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="email"
                                          className={validClassSupportEmail}
                                          placeholder="Enter support email"
                                          required
                                          name="SupportEmail"
                                          value={values.SupportEmail}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="support-email-field"
                                          className="form-label"
                                        >
                                          Support Email{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.SupportEmail}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="email"
                                          className={validClassPartnerEmail}
                                          placeholder="Enter partner email"
                                          required
                                          name="PartnerEmail"
                                          value={values.PartnerEmail}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="partner-email-field"
                                          className="form-label"
                                        >
                                          Partner Email{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.PartnerEmail}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className={validClassAddress}
                                          placeholder="Enter address"
                                          required
                                          name="Address"
                                          value={values.Address}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="address-field"
                                          className="form-label"
                                        >
                                          Address{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.Address}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className={validClassPhoneOff1}
                                          placeholder="Enter phone office 1"
                                          required
                                          name="PhoneOff1"
                                          value={values.PhoneOff1}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="phone-off1-field"
                                          className="form-label"
                                        >
                                          Phone Office 1{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.PhoneOff1}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className={validClassPhoneOff2}
                                          placeholder="Enter phone office 2"
                                          required
                                          name="PhoneOff2"
                                          value={values.PhoneOff2}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="phone-off2-field"
                                          className="form-label"
                                        >
                                          Phone Office 2{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.PhoneOff2}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className={validClassMobileOne1}
                                          placeholder="Enter mobile one 1"
                                          required
                                          name="MobileOne1"
                                          value={values.MobileOne1}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="mobile-one1-field"
                                          className="form-label"
                                        >
                                          Mobile One 1{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.MobileOne1}
                                          </p>
                                        )}
                                      </div>
                                    </Col>

                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className={validClassMobileOne2}
                                          placeholder="Enter mobile one 2"
                                          required
                                          name="MobileOne2"
                                          value={values.MobileOne2}
                                          onChange={handleChange}
                                        />
                                        <label
                                          htmlFor="mobile-one2-field"
                                          className="form-label"
                                        >
                                          Mobile One 2{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.MobileOne2}
                                          </p>
                                        )}
                                      </div>
                                    </Col>
                                  </Row>

                                  <Col lg={6}>
                                    <label>
                                      Product Image{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      key={"productImage" + _id}
                                      type="file"
                                      name="productImage"
                                      className={validClassPI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload}
                                    />
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.productImage}
                                      </p>
                                    )}

                                    {values.productImage || photoAdd ? (
                                      <img
                                        // key={photoAdd}
                                        className="m-2"
                                        src={
                                          checkImagePhoto
                                            ? photoAdd
                                            : `${process.env.REACT_APP_API_URL_BPC}/${values.productImage}`
                                        }
                                        width="180"
                                        height="200"
                                      />
                                    ) : null}
                                  </Col>
                                  <div className="mt-5">
                                    <Col lg={6}>
                                      <div className="form-check mb-2">
                                        <Input
                                          type="checkbox"
                                          name="IsActive"
                                          value={IsActive}
                                          onChange={handlecheck}
                                          checked={IsActive}
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor="activeCheckBox"
                                        >
                                          Is Active
                                        </Label>
                                      </div>
                                    </Col>
                                  </div>

                                  <Col lg={12}>
                                    <div className="text-end">
                                      <button
                                        type="submit"
                                        className=" btn btn-success m-1"
                                        id="add-btn"
                                        onClick={handleUpdate}
                                      >
                                        Update
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleUpdateCancel}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </React.Fragment>
                  </CardBody>
                </div>

                {/* list */}
                <div
                  style={{
                    display: showForm || updateForm ? "none" : "block",
                  }}
                >
                  <CardBody>
                    <div>
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        <DataTable
                          columns={columns}
                          data={data}
                          progressPending={loading}
                          sortServer
                          onSort={(column, sortDirection, sortedRows) => {
                            handleSort(column, sortDirection);
                          }}
                          pagination
                          paginationServer
                          paginationTotalRows={totalRows}
                          paginationRowsPerPageOptions={[
                            10,
                            50,
                            100,
                            totalRows,
                          ]}
                          onChangeRowsPerPage={handlePerRowsChange}
                          onChangePage={handlePageChange}
                        />
                      </div>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/*Remove Modal*/}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
          setValues([]);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(!modal_delete);
          }}
        >
          <span style={{ marginRight: "210px" }}>Remove Company Profile</span>
          {/* <Button
            type="button"
            onClick={() => {
              setmodal_delete(false);
            }}
            className="btn-close"
            aria-label="Close"
          ></Button> */}
        </ModalHeader>

        <form>
          <ModalBody>
            <div className="mt-2 text-center">
              <lord-icon
                src="https://cdn.lordicon.com/gsqxdxog.json"
                trigger="loop"
                colors="primary:#f7b84b,secondary:#f06548"
                style={{ width: "100px", height: "100px" }}
              ></lord-icon>
              <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                <h4>Are you sure ?</h4>
                <p className="text-muted mx-4 mb-0">
                  Are you Sure You want to Remove this Record ?
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-danger"
                id="add-btn"
                onClick={handleDelete}
              >
                Remove
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setmodal_delete(false)}
              >
                Close
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default CompanyProfile;
