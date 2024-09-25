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
import DataTable, { SortOrder } from "react-data-table-component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { createCoursesFun, getCoursesFun, removeCoursesFun, updateCoursesFun } from "../../functions/Courses/Courses";
import TextArea from "antd/es/input/TextArea";

const initialState = {
  Name: "",
  Duration: "",
  Timing: "",
  Eligibility: "",
  Fees: "",
  SortOrder:"",
  Desc: "",
  IsActive: false,
};

const Courses = () => {
  const [values, setValues] = useState(initialState);
//   const { Title, subTitle, Desc, ytLink, IsActive } = values;
const [Name, setName] = useState("");
const [Duration, setDuration] = useState("");
const [Timing, setTiming] = useState("");
const [Eligibility, setEligibility] = useState("");
const [Fees, setFees] = useState("");
const [SortOrder, setSortOrder] = useState("");
const [Desc, setDesc] = useState("");
const [IsActive, setIsActive] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [errTI, setErrTI] = useState(false);
  const [errNA, setErrNA] = useState(false);
  const [errDU, setErrDU] = useState(false);
  const [errEL, setErrEL] = useState(false);
  const [errFE, setErrFE,] = useState(false);
  const [errSO, setErrSO] = useState(false);
  const [errSTI, setErrSTI] = useState(false);
  const [errDS, setErrDS] = useState(false);
  

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
    setDuration("");
    setTiming("");
    setEligibility("");
    setFees("");
    setSortOrder("");
    setDesc("");
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
    getCoursesFun(_id)
      .then((res) => {
        console.log(res);
        setName(res.Name);
        setDuration(res.Duration);
        setTiming(res.Timing);
        setEligibility(res.Eligibility);
        setFees(res.Fees);
        setSortOrder(res.SortOrder);
        setDesc(res.Desc);
        setIsActive(res.IsActive)
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    // setValues({ ...values, IsActive: e.target.checked });
    setIsActive(e.target.checked)
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    let errors = validate(
      Name,
      Duration,
      Timing,
      Eligibility,
      Fees,
      SortOrder,
      Desc,
      IsActive
    );
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
        // setLoadingOption(true);
      const formdata = new FormData();

      formdata.append("Name", Name);
      formdata.append("Duration", Duration);
      formdata.append("Timing", Timing);
      formdata.append("Eligibility", Eligibility);
      formdata.append("Fees", Fees);
      formdata.append("SortOrder", SortOrder);
      formdata.append("Desc", Desc);
        formdata.append("IsActive", IsActive);


     
      createCoursesFun(formdata)
      .then((res) => {
        console.log(res);
        console.log(Name);
        console.log(Duration);
        console.log(Timing);
        console.log(Eligibility);
        
        setName("");
        setDuration("");
        setTiming("");
        setEligibility("");
        setFees("");
        setSortOrder("");
        setDesc("");
        setIsActive(false);
        fetchCategories();
        setmodal_list(!modal_list);
        toast.success("Data submitted successfully");
      })
      .catch((err) => {
        console.log("Error from server:", err);
      });
    }


  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeCoursesFun(remove_id)
      .then((res) => {
        setName("");
        setDuration("");
        setTiming("");
        setEligibility("");
        setFees("");
        setSortOrder("");
        setDesc("");
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
      Name,
      Duration,
      Timing,
      Eligibility,
      Fees,
      SortOrder,
      Desc,
    );
    setFormErrors(erros);
    setIsSubmit(true);

    if (Object.keys(erros).length === 0) {

        const formdata = new FormData();

     
      formdata.append("name", Name);
      formdata.append("Duration", Duration);
      formdata.append("Timing", Timing);
      formdata.append("Eligibility", Eligibility);
      formdata.append("Fees", Fees);
      formdata.append("SortOrder", SortOrder);
      formdata.append("Description", Desc);
      formdata.append("IsActive", IsActive);
      updateCoursesFun(_id, formdata)
        .then((res) => {
          setmodal_edit(!modal_edit);
          fetchCategories();
          toast.success("Data updated successfully");
        })
        .catch((err) => {
            console.log("Error from server:", err);
        });
    }
  };

  const validate = (
    Name,
    Duration,
    Timing,
    Eligibility,
    Fees,
    SortOrder,
    Desc,
    IsActive
  ) => {
    const errors = {};

    if (Name === "") {
      errors.Name = "Course Name is required!";
      setErrNA(true);
    }
    if (Name !== "") {
      setErrNA(false);
    }
    if (Duration === "") {
      errors.Duration = "Duration is required!";
      setErrDU(true);
      }
      if (Duration !== "") {
        setErrDU(false);
        }
        if (Timing === "") {
          errors.Timing = "Timing is required!";
          setErrSTI(true);
          }
          if (Timing !== "") {
            setErrSTI(false);
            }
            
    if (Eligibility === "") {
      errors.Eligibility = "Eligibility is required!";
      setErrEL(true);
    }
    if (Eligibility !== "") {
      setErrEL(false);
    }
    if (Desc === "") {
      errors.Desc = "Description is required!";
      setErrDS(true);
    }
    if (Desc !== "") {
      setErrDS(false);
    }
    if (Fees === "") {
      errors.Fees = "Fees is required!";
      setErrFE(true);
    }
    if (Fees !== "") {
      setErrFE(false);
    }
     if (SortOrder === "") {
       errors.SortOrder = "Sort order is required!";
       setErrSO(true);
     }
     if (SortOrder !== "") {
       setErrSO(false);
     }
    return errors;
  };

  const validClassTitle =
    errNA && isSubmit ? "form-control is-invalid" : "form-control";
    const validClassSORTORDER =
      errSO && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassFEES =
    errFE && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassDesc =
    errDS && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassEligibility = 
    errEL && isSubmit ? "form-control is-invalid" : "form-control";
      const validClassDU =
        errDU && isSubmit ? "form-control is-invalid" : "form-control";
          const validClassTIMING =
            errSTI && isSubmit ? "form-control is-invalid" : "form-control";
      const validFEES =
        errFE && isSubmit ? "form-control is-invalid" : "form-control";
          const validDURATION =
            errDU && isSubmit ? "form-control is-invalid" : "form-control";

  

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
        `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-by-params/CoursesFun`,
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
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
      sortField: "Name",
      maxWidth: "150px",
    },
    {
        name: "Duration",
        selector: (row) => row.Duration,
        sortable: true,
        sortField: "Duration",
        maxWidth: "150px",
      },
      {
        name: "Sort Order",
        selector: (row) => row.SortOrder,
        sortable: true,
        sortField: "Sort Order",
        maxWidth: "250px",
      },
      {
        name: "Fees",
        selector: (row) => row.Fees,
        sortable: false,
        sortField: "Fees",
        maxWidth: "150px",
      },
    {
      name: "Status",
      selector: (row) => {
        return <p>{row.IsActive ? "Active" : "InActive"}</p>;
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

  document.title = "Courses | BPC india";

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="Courses" title="Courses" pageTitle="CMS " />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" sm={6} lg={4} md={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Courses</h2>
                    </Col>

                    <Col sm={6} lg={4} md={6}>
                      <div className="text-end mt-2">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          name="filter"
                          value={filter}
                          defaultChecked={true}
                          onChange={handleFilter}
                        />
                        <Label className="form-check-label ms-2">Active</Label>
                      </div>
                    </Col>
                    <Col className="col-sm-auto" sm={12} lg={4} md={12}>
                      <div className="d-flex justify-content-sm-end">
                        <div className="ms-2">
                          <Button
                            color="success"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
                            Add
                          </Button>
                        </div>
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

      <Modal
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
        size="xl"
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_list(false);
            setIsSubmit(false);
          }}
        >
          Add Courses
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassTitle}
                placeholder="Enter Name"
                required
                name="Name"
                value={Name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Label>
                Course Name <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Name}</p>}
            </div>
            <div className="form-floating mb-3 ">
              <Input
                type="text"
                className={validClassDU}
                placeholder="Duration"
                required
                name="Duration"
                value={Duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              />
              <Label>
                {" "}
                Duration <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Duration}</p>}
            </div>
            <div className="form-floating mb-3 ">
              <Input
                type="text"
                className={validClassTIMING}
                placeholder="Enter Timing"
                required
                name="Timing"
                value={Timing}
                onChange={(e) => {
                  setTiming(e.target.value);
                }}
              />
              <Label>
                {" "}
                Timing <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Timing}</p>}
            </div>
            <div className="form-floating mb-3 ">
              <Input
                type="text"
                className={validClassEligibility}
                placeholder="Enter Eligibility"
                required
                name="Eligibility"
                value={Eligibility}
                onChange={(e) => {
                  setEligibility(e.target.value);
                }}
              />
              <Label>
                {" "}
                Eligibility <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.Eligibility}</p>
              )}
            </div>
            <div className="form-floating mb-3 ">
              <Input
                type="text"
                className={validClassFEES}
                placeholder="Fees"
                required
                name="Fees"
                value={Fees}
                onChange={(e) => {
                  setFees(e.target.value);
                }}
              />
              <Label>
                {" "}
                Fees <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Fees}</p>}
            </div>

            <div className="mb-3">
              <Label>
                Description <span className="text-danger">*</span>
              </Label>
              <CKEditor
                key={"Desc_" + _id}
                editor={ClassicEditor}
                data={Desc}
                onChange={(event, editor) => {
                  const data = editor.getData();

                  setDesc(data);
                }}
              />

              {isSubmit && <p className="text-danger">{formErrors.Desc}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="number"
                className={validClassSORTORDER}
                placeholder="Enter Sort Order"
                required
                name="Sort Order"
                value={SortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                }}
              />
              <Label>
                Sort Order <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.SortOrder}</p>
              )}
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
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={modal_edit}
        toggle={() => {
          handleTog_edit();
        }}
        centered
      size="xl"
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_edit(false);
            setIsSubmit(false);
          }}
        >
          Edit Courses
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassTitle}
                placeholder="Enter Name"
                required
                name="Name"
                value={Name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Label>
                Course Name <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Name}</p>}
            </div>
            <div className="form-floating mb-3 ">
              <Input
                type="text"
                className={validClassDU}
                placeholder="Duration"
                required
                name="Duration"
                value={Duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              />
              <Label>
                {" "}
                Duration <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Duration}</p>}
            </div>
            <div className="form-floating mb-3 ">
              <Input
                type="text"
                className={validClassTIMING}
                placeholder="Enter Timing"
                required
                name="Timing"
                value={Timing}
                onChange={(e) => {
                  setTiming(e.target.value);
                }}
              />
              <Label>
                {" "}
                Timing <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Timing}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassEligibility}
                placeholder="Enter Eligibility"
                required
                name="Eligibility"
                value={Eligibility}
                onChange={(e) => {
                  setEligibility(e.target.value);
                }}
              />
              <Label>
                {" "}
                Eligibility <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.Eligibility}</p>
              )}
            </div>
            <div className="form-floating mb-3 ">
              <Input
                type="text"
                className={validClassFEES}
                placeholder="Fees"
                required
                name="Fees"
                value={Fees}
                onChange={(e) => {
                  setFees(e.target.value);
                }}
              />
              <Label>
                {" "}
                Fees <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Fees}</p>}
            </div>
            <div className="mb-3">
              {/* <TextArea
                type="text"
                className={validClassDesc}
                placeholder="Enter Description"
                required
                name="Desc"
                value={Desc}
                rows={15}
                onChange={(e)=>{setDesc(e.target.value)}}
              /> */}
              <Label>
                Description <span className="text-danger">*</span>
              </Label>
              <CKEditor
                key={"Desc_" + _id}
                editor={ClassicEditor}
                data={Desc}
                onChange={(event, editor) => {
                  const data = editor.getData();

                  setDesc(data);
                }}
              />

              {isSubmit && <p className="text-danger">{formErrors.Desc}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassSORTORDER}
                placeholder="Enter Sort Order"
                required
                name="Sort Order"
                value={SortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                }}
              />
              <Label>
                Sort Order <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.SortOrder}</p>
              )}
            </div>
            <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="IsActive"
                value={IsActive}
                checked={IsActive}
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
                onClick={handleUpdate}
              >
                Update
              </button>

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
          Remove Courses
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

export default Courses;
