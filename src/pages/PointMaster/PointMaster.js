import React, { useState, useEffect } from "react";
import UiContent from "../../Components/Common/UiContent";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { ToastContainer, toast } from "react-toastify";



import { Link } from "react-router-dom";
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
  Row,
  Label,
  Input,
} from "reactstrap";



import { getPointMaster, updatePointMaster,listPointMaster,createPointMaster, removeAndUpdatePointMaster,removePointMaster, } from "../../functions/PointMaster/PointMaster";
import { getpoint, listpoint } from "../../functions/Points/Point";
import { getTestCategory, listTestCategory } from "../../functions/TestCat/TestCat";
import { getTestCatMasterDetails, listTestCatMasterDetails } from "../../functions/TextCategoryMaster/TextCatMaster";
import axios from "axios";
import DataTable from "react-data-table-component";

const initialState = {
  PointMasterName: "",
  PointMasterTitle:"",
  PointMasterPoints: "",
  // PointMasterCode: "",
  TestCategoryID: "",
  TestMasterID: "",
  PointID: "",
  isActive: false,
};

const PointMaster = () => {
  const [values, setValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [remove_id, setRemove_id] = useState("");
  const [_id, set_Id] = useState("");
  //validation check
  const [errCiN, setErrCiN] = useState(false);
  const [errCC, setErrCC] = useState(false);
  const [errSN, setErrSN] = useState(false);
  const [errCN, setErrCN] = useState(false);
  const [errPN, setErrPN]= useState(false);
  const [errPNN, setErrPNN] = useState(false);
  const [errPMN, setErrPMN] = useState(false);
  const [errPT, setErrPT] = useState(false);
  



  const [query, setQuery] = useState("");

const {
  PointMasterName,
  PointMasterTitle,
  PointMasterPoints,
  TestCategoryID,
  TestMasterID,
  PointID,
  isActive,
} = values;


  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const [modal_list, setmodal_list] = useState(false);
  const tog_list = () => {
    setmodal_list(!modal_list);
    setIsSubmit(false);
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
    getPointMaster(_id)
      .then((res) => {
        console.log(res);
       setValues({
         ...values,
         PointMasterName: res.PointMasterName,
         PointMasterTitle: res.PointMasterTitle,
         PointMasterPoints: res.PointMasterPoints,
         TestCategoryID: res.TestCategoryID,
         TestMasterID: res.TestMasterID,
         PointID: res.PointID,
         isActive: res.isActive,
       });

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("PointMaster update", values);
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);

    if (Object.keys(erros).length === 0) {
      updatePointMaster(_id, values)
        .then((res) => {
          console.log("updated PointMaster form", res);
          setmodal_edit(!modal_edit);
          fetchPointMaster();
          setValues(initialState);
          toast.success("Data edited successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [PointMasters, setPointMasters] = useState([]);
const [TestCategories, setTestCategories] = useState([]);
  const [Pointss, setPointss] = useState([]);
  const [TestMasters, setTestMasters] = useState([]);

  useEffect(() => {
    loadTestCategories();
    // loadPointMaster();
    loadTestMasters();
    loadPoints();
  }, []);

  const loadPoint = () => {
    listPointMaster().then((res) => {
      setPointss(res);
      console.log(res);
    });
  };
  const loadTestCategories = () => {
    setLoading(true);
    listTestCategory()
      .then((res) => {
        // console.log("Response from backend:", res);
        setTestCategories(res);
        //  console.log("Updated testCategories:", TestCategories);
      })
      .catch((err) => {
        // console.error("locha ai che", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

 
const loadPoints = () => {
  listpoint()
    .then((res) => {
      console.log("Points fetched:", res);
      setPointss(res);
    })
    .catch((error) => {
      console.error("Error loading points:", error);
    });
};
    const loadTestMasters = () => {
      listTestCatMasterDetails()
        .then((res) => {
          setTestMasters(res);
          console.log("Test Masters:", res);
        })
        .catch((err) => {
          console.error("Error loading test masters:", err);
        });
    };
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    console.log(e.target.checked);
    setValues({ ...values, isActive: e.target.checked });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(values);
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);

    console.log(Object.keys(erros).length);
    if (Object.keys(erros).length === 0) {
      createPointMaster(values)
        .then((res) => {
          if (res.isOk) {
            console.log(res);
            setmodal_list(!modal_list);
            setValues(initialState);
            setIsSubmit(false);
            setFormErrors({});
            fetchPointMaster();
            toast.success("Data submitted successfully");
          } 
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("Point Master Removed", remove_id);
    removePointMaster(remove_id)
      .then((res) => {
        console.log("deleted", res);
        setmodal_delete(false);
        fetchPointMaster();
        toast.success("Data deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validate = (values) => {
    const errors = {};
    if (values.PointMasterName == "") {
      errors.PointMasterName = "Point Master name is required!";
      setErrPN(true);
    }
    if (values.PointMasterName !== "") {
      setErrPN(false);
    }
    if (values.PointMasterTitle == "") {
      errors.PointMasterTitle = "Point Master Test   is required!";
      setErrPT(true);
    }
    if (values.PointMasterName !== "") {
      setErrPT(false);
    }
if (values.PointMasterPoints == "") {
  errors.PointMasterPoints = "Point   is required!";
  setErrPNN(true);
}
if (values.PointMasterPoints !== "") {
  setErrPNN(false);
}
    if (values.TestCategoryID == "") {
      errors.TestCategoryID = "Select Test Category name!";
      setErrCN(true);
    }
    if (values.TestCategoryID !== "") {
      setErrCN(false);
    }
     if (values.PointID == "") {
       errors.PointID = "Select Point Category name!";
       setErrCN(true);
     }
     if (values.PointID !== "") {
       setErrCN(false);
     }
    if (values.TestMasterID == "") {
      errors.TestMasterID = "Select Test Master name!";
      setErrSN(true);
    }
    if (values.TestMasterID !== "") {
      setErrSN(false);
    }

    return errors;
  };

  const validClassTestCategoryName =
    errCN && isSubmit ? "form-control is-invalid" : "form-control";
     const validClassPointName =
       errPN && isSubmit ? "form-control is-invalid" : "form-control";

      const validClassPointMasterPointName =
        errPNN && isSubmit ? "form-control is-invalid" : "form-control";
          const validClassName =
            errPMN && isSubmit ? "form-control is-invalid" : "form-control";
              const validClassPointMasterTitle =
                errPT && isSubmit ? "form-control is-invalid" : "form-control";
  // const validClassCityCode =
  //   errCC && isSubmit ? "form-control is-invalid" : "form-control";
  const 
  validClassPointMasterName =
    errCiN && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassTestMasterName =
    errSN && isSubmit ? "form-control is-invalid" : "form-control";

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
    fetchPointMaster();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchPointMaster = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(`${process.env.REACT_APP_API_URL_BPC}/api/auth/location/PMParam`, {
        skip: skip,
        per_page: perPage,
        sorton: column,
        sortdir: sortDirection,
        match: query,
        isActive: filter,
      })
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          setLoading(false);
          setPointMasters(res.data);
          //console.log("response", res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setPointMasters([]);
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
      name: "Test Group",
      selector: (row) => row.categoryDetails.categoryName,
      sortable: true,
      sortField: "TestCategory",
    },
    {
      name: "Test Category ",
      selector: (row) => row.TestNameDetails.TestName,
      sortable: true,
      sortField: "TestMaster",
    },
    {
      name: "Point Category ",
      selector: (row) => row.PointDetails.PointName,
      sortable: true,
      sortField: "TestMaster",
    },
    {
      name: "Name / Title",
      selector: (row) => `${row.PointMasterName} / ${row.PointMasterTitle}`,
      sortable: true,
      sortField: "Name",
      minWidth: "180px",
    },
    {
      name: "Points ",
      selector: (row) => row.PointMasterPoints,
      sortable: true,
      sortField: "TestMaster",
    },
    {
      name: "Status",
      selector: (row) => {
        return <p>{row.isActive ? "Active" : "InActive"}</p>;
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

  document.title = "Point Master | BPC India";
  return (
    <React.Fragment>
      <UiContent />
      <ToastContainer />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Location Setup"
            title="City"
            pageTitle="Location SetUp"
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Point Master
                      </h2>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
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
                    <Col className="col-sm-auto" lg={4} md={6} sm={6}>
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
                        data={PointMasters}
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
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_list(false);
            setIsSubmit(false);
            setValues(initialState);
          }}
        >
          Add Point Master
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating  mb-3">
              <select
                name="TestCategoryID"
                className={validClassTestCategoryName}
                onChange={handleChange}
              >
                <option>Please Select</option>
                {TestCategories.map((c) => (
                  <React.Fragment key={c._id}>
                    {c.IsActive && (
                      <option value={c._id}>{c.categoryName}</option>
                    )}
                  </React.Fragment>
                ))}
              </select>
              <Label>
                {" "}
                Test Category<span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.TestCategoryID}</p>
              )}
            </div>

            <div className="form-floating  mb-3">
              <select
                name="TestMasterID"
                className={validClassTestMasterName}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                {TestMasters.map((s) => {
                  console.log("Processing TestMaster:", s);
                  return (
                    s.IsActive &&
                    TestCategoryID === s.category && (
                      <option key={s._id} value={s._id}>
                        {s.TestName}
                      </option>
                    )
                  );
                })}
              </select>

              <Label>
                {" "}
                Test Master <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.TestMasterID}</p>
              )}
            </div>
            <div className="form-floating  mb-3">
              <select
                name="PointID"
                className={validClassPointName}
                onChange={handleChange}
              >
                <option>Please Select</option>
                {Pointss.map((c) => {
                  return (
                    <React.Fragment key={c._id}>
                      {c.IsActive && (
                        <option value={c._id}>{c.PointName}</option>
                      )}
                    </React.Fragment>
                  );
                })}
              </select>
              <Label>
                {" "}
                Point Name<span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.PointID}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassPointMasterName}
                placeholder="Enter Point Name"
                id="PointMasterName"
                name="PointMasterName"
                value={PointMasterName}
                onChange={handleChange}
              />
              <Label>
                Name <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.PointMasterName}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassPointMasterTitle}
                placeholder="Enter Point Title"
                id="PointMasterTitle"
                name="PointMasterTitle"
                value={PointMasterTitle}
                onChange={handleChange}
              />
              <Label>
                Title <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.PointMasterTitle}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassPointMasterTitle}
                placeholder="Enter Point value"
                id="PointMasterPointTitle"
                name="PointMasterPoints"
                value={PointMasterPoints}
                onChange={handleChange}
              />
              <Label>
                Points <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.PointMasterPoints}</p>
              )}
            </div>
            <div className=" mb-3">
              <Input
                type="checkbox"
                className="form-check-input"
                name="isActive"
                value={isActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label ms-1">Is Active</Label>
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
                  setFormErrors({});
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
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_edit(false);
            setIsSubmit(false);
            setValues(initialState); // Reset form values if needed
          }}
        >
          Edit Point Master
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <select
                name="TestCategoryID"
                className={validClassTestCategoryName}
                onChange={handleChange}
                value={TestCategoryID}
              >
                <option>Please Select</option>
                {TestCategories.map((c) => (
                  <React.Fragment key={c._id}>
                    {c.IsActive && (
                      <option value={c._id}>{c.categoryName}</option>
                    )}
                  </React.Fragment>
                ))}
              </select>
              <Label>
                Test Category <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.TestCategoryID}</p>
              )}
            </div>

            <div className="form-floating mb-3">
              <select
                name="TestMasterID"
                className={validClassTestMasterName}
                onChange={handleChange}
                value={TestMasterID}
              >
                <option value="">Please Select</option>
                {TestMasters.map((s) => (
                  <React.Fragment key={s._id}>
                    {s.IsActive && TestCategoryID === s.category && (
                      <option value={s._id}>{s.TestName}</option>
                    )}
                  </React.Fragment>
                ))}
              </select>
              <Label>
                Test Master <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.TestMasterID}</p>
              )}
            </div>

            <div className="form-floating mb-3">
              <select
                name="PointID"
                className={validClassPointName}
                onChange={handleChange}
                value={PointID}
              >
                <option>Please Select</option>
                {Pointss.map((p) => (
                  <React.Fragment key={p._id}>
                    {p.IsActive && <option value={p._id}>{p.PointName}</option>}
                  </React.Fragment>
                ))}
              </select>
              <Label>
                Point Name <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.PointID}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassPointName}
                placeholder="Enter Point Name"
                id="PointMasterName"
                name="PointMasterName"
                value={PointMasterName}
                onChange={handleChange}
              />
              <Label>
                Name <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.PointMasterName}</p>
              )}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassPointMasterTitle}
                placeholder="Enter Point Title"
                id="PointMasterTitle"
                name="PointMasterTitle"
                value={PointMasterTitle}
                onChange={handleChange}
              />
              <Label>
                Title <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.PointMasterTitle}</p>
              )}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassPointMasterPointName}
                placeholder="Enter Points"
                id="PointMasterPoints"
                name="PointMasterPoints"
                value={PointMasterPoints}
                onChange={handleChange}
              />
              <Label>
                Points <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.PointMasterPoints}</p>
              )}
            </div>

            <div className="mb-3">
              <Input
                type="checkbox"
                className="form-check-input"
                name="isActive"
                checked={isActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label ms-1">Is Active</Label>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                id="update-btn"
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
          setmodal_delete(!modal_delete);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(false);
          }}
        >
          Remove point master
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

export default PointMaster;
