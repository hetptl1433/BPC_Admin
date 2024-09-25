import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import DataTable from "react-data-table-component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { createContactForm, getContactForm, removeContactForm, updateContactForm } from "../../functions/ContactForm/ContactForm";
import TextArea from "antd/es/input/TextArea";

const initialState = {
  Name: "",
  Email: "",
  Mobile: "",
  Company: "",
  City: "",
  Services: "",
  Help: "",
  HereFrom: "",
  KnowMore: false,
  IsActive: false,
};

const ContactForm = () => {
  const [values, setValues] = useState(initialState);
//   const { Title, subTitle, Desc, ytLink, IsActive } = values;
const [successmsg, setSucessmsg] = useState(false);
const [Name, setName] = useState("");
const [Email, setEmail] = useState("");
const [Mobile, setMobile] = useState("");
const [Company, setCompany] = useState("");
const [City, setCity] = useState("");
const [Services, setServices] = useState("");
const [Help, setHelp] = useState("");
const [HereFrom, setHereFrom] = useState("");
const [KnowMore, setKnowMore] = useState(false);
const [IsActive, setIsActive] = useState(true);


  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
const [errName, setErrName] = useState(false);
const [errEmail, setErrEmail] = useState(false);
const [errMobile, setErrMobile] = useState(false);
const [errCompany, setErrCompany] = useState(false);
const [errCity, setErrCity] = useState(false);
const [errServices, setErrServices] = useState(false);
const [errHelp, setErrHelp] = useState(false);
const [errHereFrom, setErrHereFrom] = useState(false);
  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [categories, setCategories] = useState([]);



  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const [modal_list, setmodal_list] = useState(false);
  const tog_list = () => {
    setmodal_list(!modal_list);
    setValues(initialState);
    setIsSubmit(false);
setName("");
setEmail("");
setMobile("");
setCompany("");
setCity("");
setServices("");
setHelp("");
setHereFrom("");
setKnowMore(false);
setIsActive(false);

  };

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);
  const handleTog_edit = (_id) => {
    setmodal_edit(!modal_edit);
    setIsSubmit(false);
    set_Id(_id);
    getContactForm(_id)
      .then((res) => {
     setName(res.Name)
     setEmail(res.Email)
     setMobile(res.Mobile)
     setCompany(res.Company)
     setCity(res.City)
     setServices(res.Services)
     setHelp(res.Help)
     setHereFrom(res.HereFrom)
     setKnowMore(res.KnowMore);
     setIsActive(res.IsActive);


      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    setValues({ ...values, IsActive: e.target.checked });
    setIsActive(e.target.checked)
  };


  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    console.log("country", values);
   let errors = validate(
     Name,
     Email,
     Mobile,
     Company,
     City,
     Services,
     Help,
     HereFrom,
   );
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
        // setLoadingOption(true);
      const formdata = new FormData();

    formdata.append("Name", Name);
    formdata.append("Email", Email);
    formdata.append("Mobile", Mobile);
    formdata.append("Company", Company);
    formdata.append("City", City);
    formdata.append("Services", Services);
    formdata.append("Help", Help);
    formdata.append("HereFrom", HereFrom);
    formdata.append("KnowMore", KnowMore);
    formdata.append("IsActive", IsActive);
      createContactForm(formdata)
      .then((res) => {
        console.log(res);
      setName("");
      setEmail("");
      setMobile("");
      setCompany("");
      setCity("");
      setServices("");
      setHelp("");
      setHereFrom("");
      setKnowMore(false);
      toast.success("Data submitted Successfully!");
      setIsActive(false);

        fetchCategories();
        setmodal_list(!modal_list);
      })
      .catch((err) => {
        console.log("Error from server:", err);
      });
    }

    // createContactForm(values)
    //   .then((res) => {
    //     setmodal_list(!modal_list);
    //     setValues(initialState);
    //     fetchCategories();
        // if (res.isOk) {
        //   setmodal_list(!modal_list);
        //   setValues(initialState);
        //   fetchCategories();
        // } else {
        //   if (res.field === 1) {
        //     setErrCN(true);
        //     setFormErrors({
        //       categoryName: "This Category name is already exists!",
        //     });
        //   }
        // }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeContactForm(remove_id)
      .then((res) => {
         toast.success("Data deleted Successfully!");
   setName("");
   setEmail("");
   setMobile("");
   setCompany("");
   setCity("");
   setServices("");
   setHelp("");
   setHereFrom("");
   setKnowMore(false);
   setIsActive(false);

        setmodal_delete(!modal_delete);
        fetchCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   let erros = validate(
  //     Name,
  //     Email,
  //     Mobile,
  //     Company,
  //     City,
  //     Services,
  //     Help,
  //     HereFrom,
  //   );
  //   setFormErrors(erros);
  //   setIsSubmit(true);

  //   if (Object.keys(erros).length === 0) {

  //       const formdata = new FormData();

  //         formdata.append("Name", Name);
  //         formdata.append("Email", Email);
  //         formdata.append("Mobile", Mobile);
  //         formdata.append("Company", Company);
  //         formdata.append("City", City);
  //         formdata.append("Services", Services);
  //         formdata.append("Help", Help);
  //         formdata.append("HereFrom", HereFrom);
  //         formdata.append("KnowMore", KnowMore);
  //         formdata.append("IsActive", IsActive);

  //     updateContactForm(_id, formdata)
  //       .then((res) => {
  //         setmodal_edit(!modal_edit);
  //         fetchCategories();
  //       })
  //       .catch((err) => {
  //           console.log("Error from server:", err);
  //       });
  //   }
  // };

  const validate = (
    Name,
    Email,
    Mobile,
    Company,
    City,
    Services,
    Help,
    HereFrom,
    KnowMore
  ) => {
    const errors = {};

    // Validate MailerName
if (Name === "") {
  errors.Name = "Name is required!";
  setErrName(true);
} else {
  setErrName(false);
}

// Validate Email
if (Email === "") {
  errors.Email = "Email is required!";
  setErrEmail(true);
} else {
  setErrEmail(false);
}

// Validate Mobile
if (Mobile === "") {
  errors.Mobile = "Mobile is required!";
  setErrMobile(true);
} else {
  setErrMobile(false);
}

// Validate Company
if (Company === "") {
  errors.Company = "Company is required!";
  setErrCompany(true);
} else {
  setErrCompany(false);
}

// Validate City
if (City === "") {
  errors.City = "City is required!";
  setErrCity(true);
} else {
  setErrCity(false);
}

// Validate Services
if (Services === "") {
  errors.Services = "Services are required!";
  setErrServices(true);
} else {
  setErrServices(false);
}

// Validate Help
if (Help === "") {
  errors.Help = "Help is required!";
  setErrHelp(true);
} else {
  setErrHelp(false);
}

// Validate HereFrom
if (HereFrom === "") {
  errors.HereFrom = "Source of referral (Here From) is required!";
  setErrHereFrom(true);
} else {
  setErrHereFrom(false);
}

    return errors;
  };


  const validClassName =
  errName && isSubmit ? "form-control is-invalid" : "form-control";

const validClassEmail =
  errEmail && isSubmit ? "form-control is-invalid" : "form-control";

const validClassMobile =
  errMobile && isSubmit ? "form-control is-invalid" : "form-control";

const validClassCompany =
  errCompany && isSubmit ? "form-control is-invalid" : "form-control";

const validClassCity =
  errCity && isSubmit ? "form-control is-invalid" : "form-control";

const validClassServices =
  errServices && isSubmit ? "form-control is-invalid" : "form-control";

const validClassHelp =
  errHelp && isSubmit ? "form-control is-invalid" : "form-control";

const validClassHereFrom =
  errHereFrom && isSubmit ? "form-control is-invalid" : "form-control";
  

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();

  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };

  useEffect(() => {
    // fetchUsers(1); // fetch page 1 of users
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchCategories = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-by-params/ContactForm`,
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
          setCategories(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setCategories([]);
        }
        // console.log(res);
      });

    setLoading(false);
  };

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };
  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };
  const col = [
    {
      name: " Name",
      selector: (row) => row.Name,
      sortable: true,
      sortField: "Name",
      maxWidth: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      sortable: true,
      sortField: "Email",
      maxWidth: "150px",
    },
    {
      name: "City",
      selector: (row) => row.City,
      sortable: true,
      sortField: "City",
      maxWidth: "150px",
    },

    {
      name: "Accepted News Letter",
      selector: (row) => {
        return <p>{row.KnowMore ? "Yes, Accepted" : "No, Rejected"}</p>;
      },
      sortable: false,
      sortField: "Status",
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
                  View
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

  document.title = "ContactForm | BPC";

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Form- ContactForm"
            title="Form- ContactForm"
            pageTitle="Form "
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" sm={6} lg={4} md={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Form Master</h2>
                    </Col>

                    <Col sm={6} lg={4} md={6}>
                      <div className="text-end mt-2">
                        {/* <Input
                          type="checkbox"
                          className="form-check-input"
                          name="filter"
                          value={filter}
                          defaultChecked={true}
                          onChange={handleFilter}
                        />
                        <Label className="form-check-label ms-2">Active</Label> */}
                      </div>
                    </Col>
                    <Col className="col-sm-auto" sm={12} lg={4} md={12}>
                      <div className="d-flex justify-content-sm-end">
                        <div className="search-box ms-2">
                          <input
                            type="text"
                            className="form-control search"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <div id="customerList">
                    <div className="table-responsive table-card mt-1 mb-1 text-right">
                      <DataTable
                        columns={col}
                        data={categories}
                        progressPending={loading}
                        sortServer
                        onSort={(column, sortDirection, sortedRows) => {
                          handleSort(column, sortDirection);
                        }}
                        pagination
                        paginationServer
                        paginationTotalRows={totalRows}
                        paginationRowsPerPageOptions={[10, 50, 100, totalRows]}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Add Modal */}

      {/* <Modal
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_list(false);
            setIsSubmit(false);
          }}
        >
          Add Description
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassMailerName}
                placeholder="Enter Mailer Name"
                required
                name="MailerName"
                value={MailerName}
                onChange={(e) => setMailerName(e.target.value)}
              />
              <Label>
                Mailer Name <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.MailerName}</p>
              )}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="email"
                className={validClassEmail}
                placeholder="Enter Email"
                required
                name="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label>
                Email <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Email}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="password"
                className={validClassPassword}
                placeholder="Enter Password"
                required
                name="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Label>
                Password <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Password}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassOutgoingServer}
                placeholder="Enter Outgoing Server"
                required
                name="OutgoingServer"
                value={OutgoingServer}
                onChange={(e) => setOutgoingServer(e.target.value)}
              />
              <Label>
                Outgoing Server <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.OutgoingServer}</p>
              )}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassOutgoingPort}
                placeholder="Enter Outgoing Port"
                required
                name="outgoingPort"
                value={outgoingPort}
                onChange={(e) => setOutgoingPort(e.target.value)}
              />
              <Label>
                Outgoing Port <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.outgoingPort}</p>
              )}
            </div>
            <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="SSLType"
                value={SSLType}
                onChange={handleSSL}
              />
              <Label className="form-check-label">SSL Type</Label>
            </div>
            <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="IsActive"
                value={IsActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label">Is Active</Label>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={handleClick}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setmodal_list(false);
                  setValues(initialState);
                  setIsSubmit(false);
                }}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal> */}

      {/* Show Modal */}
      <Modal
        isOpen={modal_edit}
        toggle={() => {
          handleTog_edit();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_edit(false);
            setIsSubmit(false);
          }}
        >
          Show Details
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassName}
                placeholder="Enter Name"
                readOnly
                name="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)} // You may want to disable this as well if fields are read-only
              />
              <Label>
                Name <span className="text-danger"></span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Name}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="email"
                className={validClassEmail}
                placeholder="Enter Email"
                readOnly
                name="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)} // You may want to disable this as well if fields are read-only
              />
              <Label>
                Email <span className="text-danger"></span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Email}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassMobile}
                placeholder="Enter Mobile"
                readOnly
                name="Mobile"
                value={Mobile}
                onChange={(e) => setMobile(e.target.value)} // You may want to disable this as well if fields are read-only
              />
              <Label>
                Mobile <span className="text-danger"></span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Mobile}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassCompany}
                placeholder="Enter Company"
                readOnly
                name="Company"
                value={Company}
                onChange={(e) => setCompany(e.target.value)} // You may want to disable this as well if fields are read-only
              />
              <Label>
                Company <span className="text-danger"></span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Company}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassCity}
                placeholder="Enter City"
                readOnly
                name="City"
                value={City}
                onChange={(e) => setCity(e.target.value)} // You may want to disable this as well if fields are read-only
              />
              <Label>
                City <span className="text-danger"></span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.City}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassServices}
                placeholder="Enter Services"
                readOnly
                name="Services"
                value={Services}
                onChange={(e) => setServices(e.target.value)} // You may want to disable this as well if fields are read-only
              />
              <Label>
                Services <span className="text-danger"></span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Services}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassHelp}
                placeholder="Enter Help"
                readOnly
                name="Help"
                value={Help}
                onChange={(e) => setHelp(e.target.value)} // You may want to disable this as well if fields are read-only
              />
              <Label>
                Help <span className="text-danger"></span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Help}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassHereFrom}
                placeholder="Enter Source of Referral"
                readOnly
                name="HereFrom"
                value={HereFrom}
                onChange={(e) => setHereFrom(e.target.value)} // You may want to disable this as well if fields are read-only
              />
              <Label>
                Here From <span className="text-danger"></span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.HereFrom}</p>}
            </div>

            <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="KnowMore"
                checked={KnowMore}
                onChange={handleCheck}
              />
              <Label className="form-check-label">Know More</Label>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setmodal_edit(false);
                  setIsSubmit(false);
                  setFormErrors({});
                }}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Remove Modal */}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(false);
          }}
        >
          Remove Category
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
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default ContactForm;
