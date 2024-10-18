import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

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
import axios from "axios";
import DataTable from "react-data-table-component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { createCourseForm, getCourseForm, removeCourseForm, updateCourseForm } from "../../functions/CourseForm/CourseForm";
import TextArea from "antd/es/input/TextArea";

const initialState = {
  Email: "",
  Mobile: "",
  ContactPerson: "",
  CompanyName: "",
  CourseName: "",
 
  IsActive: true,
};

const CourseForm = () => {
  const [values, setValues] = useState(initialState);
//   const { Title, subTitle, Desc, ytLink, IsActive } = values;
const [successmsg, setSucessmsg] = useState(false);
const [Email, setEmail] = useState("");
const [Mobile, setMobile] = useState("");
const [ContactPerson, setContactPerson] = useState("");
const [CompanyName, setCompanyName] = useState("");
const [CourseName, setCourseName] = useState("");

const [IsActive, setIsActive] = useState(true);


  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
const [errEmail, setErrEmail] = useState(false);
const [errMobile, setErrMobile] = useState(false);
const [errContactPerson, setErrContactPerson] = useState(false);
const [errCompanyName, setErrCompanyName] = useState(false);
const [errCourseName, setErrCourseName] = useState(false);

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
setEmail("");
setMobile("");
setContactPerson("");
setCompanyName("");
setCourseName("");

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
    getCourseForm(_id)
      .then((res) => {
     setEmail(res.Email)
     setMobile(res.Mobile)
     setContactPerson(res.ContactPerson)
     setCompanyName(res.CompanyName)
     setCourseName(res.CourseName)
   
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
   let errors = validate(
     Email,
     Mobile,
     ContactPerson,
     CompanyName,
     CourseName,
   
   );
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
        // setLoadingOption(true);
      const formdata = new FormData();

    formdata.append("Email", Email);
    formdata.append("Mobile", Mobile);
    formdata.append("ContactPerson", ContactPerson);
    formdata.append("CompanyName", CompanyName);
    formdata.append("CourseName", CourseName);

    formdata.append("IsActive", IsActive);
      createCourseForm(formdata)
      .then((res) => {
      setEmail("");
      setMobile("");
      setContactPerson("");
      setCompanyName("");
      setCourseName("");
    
      setIsActive(false);

        fetchCategories();
        setmodal_list(!modal_list);
        toast.success("Data submitted successfully");
      })
      .catch((err) => {
        console.log("Error from server:", err);
      });
    }

    // createCourseForm(values)
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
    removeCourseForm(remove_id)
      .then((res) => {
   setEmail("");
   setMobile("");
   setContactPerson("");
   setCompanyName("");
   setCourseName("");
   
   setIsActive(false);

        setmodal_delete(!modal_delete);
        fetchCategories();
        toast.success("Data deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let erros = validate(
      Email,
      Mobile,
      ContactPerson,
      CompanyName,
      CourseName,
    
    );
    setFormErrors(erros);
    setIsSubmit(true);

    if (Object.keys(erros).length === 0) {

        const formdata = new FormData();

          formdata.append("Email", Email);
          formdata.append("Mobile", Mobile);
          formdata.append("ContactPerson", ContactPerson);
          formdata.append("CompanyName", CompanyName);
          formdata.append("CourseName", CourseName);
        
          formdata.append("IsActive", IsActive);

      updateCourseForm(_id, formdata)
        .then((res) => {
          setmodal_edit(!modal_edit);
          fetchCategories();
        })
        .catch((err) => {
            console.log("Error from server:", err);
        });
    }
  };

  const validate = (
    Email,
    Mobile,
    ContactPerson,
    CompanyName,
    CourseName,
   
  ) => {
    const errors = {};

    // Validate MailerName


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

// Validate ContactPerson
if (ContactPerson === "") {
  errors.ContactPerson = "ContactPerson is required!";
  setErrContactPerson(true);
} else {
  setErrContactPerson(false);
}

// Validate CompanyName
if (CompanyName === "") {
  errors.CompanyName = "CompanyName is required!";
  setErrCompanyName(true);
} else {
  setErrCompanyName(false);
}

// Validate CourseName
if (CourseName === "") {
  errors.CourseName = "CourseName are required!";
  setErrCourseName(true);
} else {
  setErrCourseName(false);
}

    return errors;
  };



const validClassEmail =
  errEmail && isSubmit ? "form-control is-invalid" : "form-control";

const validClassMobile =
  errMobile && isSubmit ? "form-control is-invalid" : "form-control";

const validClassContactPerson =
  errContactPerson && isSubmit ? "form-control is-invalid" : "form-control";

const validClassCompanyName =
  errCompanyName && isSubmit ? "form-control is-invalid" : "form-control";

const validClassCourseName =
  errCourseName && isSubmit ? "form-control is-invalid" : "form-control";



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
        `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-by-params/CourseForm`,
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
      name: "Course Name",
      selector: (row) => row.CourseName,
      sortable: true,
      sortField: "Course Name",
      maxWidth: "150px",
    },
    {
      name: "ContactPerson",
      selector: (row) => row.ContactPerson,
      sortable: true,
      sortField: "ContactPerson",
      maxWidth: "150px",
    },
    {
      name: "CompanyName",
      selector: (row) => row.CompanyName,
      sortable: true,
      sortField: "CompanyName",
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

  document.title = "CourseForm | BPC";

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Form- CourseForm"
            title="Form- CourseForm"
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
                className={validClassCourseName}
                placeholder="Enter CourseName"
                readOnly
                name="CourseName"
                value={CourseName}
                onChange={(e) => setCourseName(e.target.value)} // You may want to disable this as well if fields are read-only
              />
              <Label>
                CourseName <span className="text-danger"></span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.CourseName}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassContactPerson}
                placeholder="Enter ContactPerson"
                readOnly
                name="ContactPerson"
                value={ContactPerson}
                onChange={(e) => setContactPerson(e.target.value)} // You may want to disable this as well if fields are read-only
              />
              <Label>
                ContactPerson <span className="text-danger"></span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.ContactPerson}</p>
              )}
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
                className={validClassCompanyName}
                placeholder="Enter CompanyName"
                readOnly
                name="CompanyName"
                value={CompanyName}
                onChange={(e) => setCompanyName(e.target.value)} // You may want to disable this as well if fields are read-only
              />
              <Label>
                CompanyName <span className="text-danger"></span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.CompanyName}</p>
              )}
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
          Remove Record
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

export default CourseForm;
