import React, { useState, useEffect } from "react";

import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
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

import {
  listCity,
  listState,
  listCountry,
  getCity,
  updateCity,
} from "../../../functions/Location/Location";

import {
  listAreaLoc,
  createAreaLoc,
  removeAndUpdateAreaLoc,
  removeAreaLoc,
  getAreaLoc,
  updateAreaLoc,
} from "../../../functions/Location/Area";
import axios from "axios";
import DataTable from "react-data-table-component";

const initialState = {
  AreaName: "",
  // CityCode: "",
  CityID: "",
  CountryID: "",
  StateID: "",
  isActive: false,
};

const Area = () => {
  const [values, setValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [remove_id, setRemove_id] = useState("");
  const [_id, set_Id] = useState("");
  //validation check
  const [errCiN, setErrCiN] = useState(false);
  const [errCTiN, setErrCTiN] = useState(false);

  const [errCC, setErrCC] = useState(false);
  const [errSN, setErrSN] = useState(false);
  const [errAN, setErrAN] = useState(false);
  const [errCN, setErrCN] = useState(false);

  const [query, setQuery] = useState("");

  const {
    AreaName,
    // CityCode,
     CityID,
    CountryID,
    StateID,
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
    getAreaLoc(_id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          AreaName: res.AreaName,
          // CityCode: res.CityCode,
          CountryID: res.CountryID,
          CityID: res.CityID,

          StateID: res.StateID,
          isActive: res.isActive,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("AreaLoc update", values);
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);

    if (Object.keys(erros).length === 0) {
      updateAreaLoc(_id, values)
        .then((res) => {
          console.log("updated AreaLoc form", res);
          setmodal_edit(!modal_edit);
          fetchAreaLoc();
          setValues(initialState);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const [Areas, setAreas] = useState([]);

  const [Cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    loadCountries();
    loadCities();
    loadStates();
  }, []);

  const loadCities = () => {
    listCity().then((res) => {
      setCities(res);
      console.log(res);
    });
  };

  const loadCountries = () => {
    listCountry().then((res) => setCountries(res));
  };

  const loadStates = () => {
    listState().then((res) => {
      setStates(res);
      //console.log(res);
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
      createAreaLoc(values)
        .then((res) => {
          if (res.isOk) {
            console.log(res);
            setmodal_list(!modal_list);
            setValues(initialState);
            setIsSubmit(false);
            setFormErrors({});
            fetchAreaLoc();
          } else {
            if (res.field === 1) {
              setErrCiN(true);
              setFormErrors({ AreaLocName: "AreaLoc with this name is exists!" });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("state id", remove_id);
    removeAreaLoc(remove_id)
      .then((res) => {
        console.log("deleted", res);
        setmodal_delete(false);
        fetchAreaLoc();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validate = (values) => {
    const errors = {};
    if (values.AreaName == "") {
      errors.AreaName = "Area name is required!";
      setErrCiN(true);
    }
    if (values.AreaName !== "") {
      setErrCiN(false);
    }

     if (values.CityID == "") {
       errors.CityID = "City is required!";
       setErrCTiN(true);
     }
     if (values.CityID !== "") {
       setErrCTiN(false);
     }

    if (values.CountryID == "") {
      errors.CountryID = "Select country name!";
      setErrCN(true);
    }
    if (values.CountryID !== "") {
      setErrCN(false);
    }
    if (values.StateID == "") {
      errors.StateID = "Select state name!";
      setErrSN(true);
    }
    if (values.StateID !== "") {
      setErrSN(false);
    }
    if (values.AreaName == "") {
      errors.AreaName = "Select area name!";
      setErrAN(true);
    }
    if (values.StateID !== "") {
      setErrAN(false);
    }

    return errors;
  };

  const validClassCountryName =
    errCN && isSubmit ? "form-control is-invalid" : "form-control";
  // const validClassCityCode =
  //   errCC && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassAreaName =
    errAN && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassStateName =
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
    fetchAreaLoc();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchAreaLoc = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(`${process.env.REACT_APP_API_URL_BPC}/api/auth/location/Areas`, {
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
          setAreas(res.data);
          //console.log("response", res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setAreas([]);
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
      name: "Country",
      selector: (row) => row.countryname,
      sortable: true,
      sortField: "countryname",
    },
    {
      name: "State",
      selector: (row) => row.statename,
      sortable: true,
      sortField: "statename",
    },
    {
      name: "City",
      selector: (row) => row.CityFields.CityName,
      sortable: true,
      sortField: "CityName",
      minWidth: "180px",
    },
    {
      name: "AreaName",
      selector: (row) => row.AreaName,
      sortable: true,
      sortField: "AreaName",
      minWidth: "180px",
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

  document.title = "Area | BPC";
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Location Setup"
            title="Area"
            pageTitle="Location SetUp"
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2"> </h2>
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
                        data={Areas}
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
          Add Area
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating  mb-3">
              <select
                name="CountryID"
                className={validClassCountryName}
                onChange={handleChange}
              >
                <option>Please Select</option>
                {countries.map((c) => {
                  return (
                    <React.Fragment key={c._id}>
                      {c.isActive && (
                        <option value={c._id}>{c.CountryName}</option>
                      )}
                    </React.Fragment>
                  );
                })}
              </select>
              <Label>
                {" "}
                Country<span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.CountryID}</p>
              )}
            </div>

            <div className="form-floating  mb-3">
              <select
                name="StateID"
                className={validClassStateName}
                onChange={handleChange}
              >
                <option>Please Select</option>
                {states.map((s) => {
                  return (
                    <React.Fragment key={s._id}>
                      {s.isActive && CountryID === s.CountryID && (
                        <option value={s._id}>{s.StateName}</option>
                      )}
                    </React.Fragment>
                  );
                })}
              </select>
              <Label>
                {" "}
                State <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.StateID}</p>}
            </div>
            <div className="form-floating  mb-3">
              <select
                name="CityID"
                className={validClassStateName}
                onChange={handleChange}
              >
                <option>Please Select</option>
                {Cities.map((s) => {
                  return (
                    <React.Fragment key={s._id}>
                      {s.isActive && StateID === s.StateID && (
                        <option value={s._id}>{s.CityName}</option>
                      )}
                    </React.Fragment>
                  );
                })}
              </select>
              <Label>
                {" "}
                Cities <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.CityID}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassAreaName}
                placeholder="Enter Area Name"
                id="AreaName"
                name="AreaName"
                value={AreaName}
                onChange={handleChange}
              />
              <Label>
                Area <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.AreaName}</p>}
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
          }}
        >
          Edit Country
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating  mb-3">
              <select
                name="CountryID"
                className={validClassCountryName}
                onChange={handleChange}
                value={CountryID}
              >
                <option>Please Select</option>
                {countries.map((c) => {
                  return (
                    <React.Fragment key={c._id}>
                      {c.isActive && (
                        <option value={c._id}>{c.CountryName}</option>
                      )}
                    </React.Fragment>
                  );
                })}
              </select>
              <Label>
                {" "}
                Country <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.CountryID}</p>
              )}
            </div>

            <div className="form-floating  mb-3">
              <select
                name="StateID"
                className={validClassStateName}
                onChange={handleChange}
                value={StateID}
              >
                <option>Please Select</option>
                {states.map((s) => {
                  return (
                    <React.Fragment key={s._id}>
                      {s.isActive && CountryID === s.CountryID && (
                        <option value={s._id}>{s.StateName}</option>
                      )}
                    </React.Fragment>
                  );
                })}
              </select>
              <Label>
                {" "}
                State <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.StateID}</p>}
            </div>
            <div className="form-floating  mb-3">
              <select
                name="CityID"
                className={validClassStateName}
                onChange={handleChange}
              >
                <option>Please Select</option>
                {Cities.map((s) => {
                  return (
                    <React.Fragment key={s._id}>
                      {s.isActive && StateID === s.StateID && (
                        <option value={s._id}>{s.CityName}</option>
                      )}
                    </React.Fragment>
                  );
                })}
              </select>
              <Label>
                {" "}
                Cities <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.CityID}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassAreaName}
                placeholder="Enter Area Name"
                id="AreaName"
                name="AreaName"
                value={AreaName}
                onChange={handleChange}
              />
              <Label>
                Area <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.AreaName}</p>}
            </div>
           

            <div className=" mb-3">
              <Input
                type="checkbox"
                className="form-check-input"
                name="isActive"
                value={isActive}
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
          Remove City
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

export default Area;
