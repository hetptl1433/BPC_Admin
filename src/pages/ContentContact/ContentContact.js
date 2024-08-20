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
import axios from "axios";
import DataTable from "react-data-table-component";


import { createContentContact, getContentContact, removeContentContact, updateContentContact } from "../../functions/ContentContact/ContentContact";

const initialState = {
  Name: "",
  Email: "",
  Designation: "",
  SortOrder: 0,
  IsActive: false,
};

const ContentContact = () => {
  const [values, setValues] = useState(initialState);
  const { Name, Email, Designation, SortOrder, IsActive } = values;
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [errVI, setErrVI] = useState(false);
  const [errMI, setErrMI] = useState(false);
  const [errVA, setErrVA] = useState(false);
  const [errGM, setErrGM] = useState(false);
  const [errSO, setErrSO]= useState(false);

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
    getContentContact(_id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          Name: res.Name,
          Email:res.Email,
          Designation:res.Designation,
          SortOrder: res.SortOrder,
          IsActive: res.IsActive,
        });
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
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    console.log("Contact", values);
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
        createContentContact(values)
        .then((res) => {
          setmodal_list(!modal_list);
          setValues(initialState);
          fetchCategories();
        })
        .catch((error) => {
          console.log(error);
        });
    }


   
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
      
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeContentContact(remove_id)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);

    if (Object.keys(erros).length === 0) {
      updateContentContact(_id, values)
        .then((res) => {
          setmodal_edit(!modal_edit);
          fetchCategories();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const validate = (values) => {
    const errors = {};

    if (values.Name === "") {
      errors.Name = "Name content is required!";
      setErrVI(true);
    }
    if (values.Name !== "") {
        setErrVI(false);
    }
    if (values.Email === "") {
      errors.Email = "Email content is required!";
      setErrMI(true);
    }
    if (values.Email !== "") {
        setErrMI(false);
    }
    if (values.Designation === "") {
      errors.Designation = "Designation content is required!";
      setErrVA(true);
    }
    if (values.value !== "") {
        setErrVA(false);
    }
    

    return errors;
  };

  const validClassName =
    errVI && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassEmail =
    errMI && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassValue =
    errVA && isSubmit ? "form-control is-invalid" : "form-control";

  

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
        `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-by-params/ContentContact`,
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
        name: "Designation",
        selector: (row) => row.Designation,
        sortable: true,
        sortField: "Designation",
        minWidth: "150px",
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

  document.title = "Contact | Neon11";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="Contact" title="Contact" pageTitle="CMS " />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" sm={6} lg={4} md={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Contact</h2>
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
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_list(false);
            setIsSubmit(false);
          }}
        >
          Add Contact
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassName}
                placeholder="Enter Name Content"
                required
                name="Name"
                value={Name}
                onChange={handleChange}
              />
              <Label>
                Name <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Name}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassEmail}
                placeholder="Enter Email Content"
                required
                name="Email"
                value={Email}
                onChange={handleChange}
              />
              <Label>
                {" "}
                Email <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Email}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassValue}
                placeholder="Enter Designation Content"
                required
                name="Designation"
                value={Designation}
                onChange={handleChange}
              />
              <Label>
                Designation <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.Designation}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="number"
                className={validClassValue}
                placeholder="Enter SortOrder"
                required
                name="SortOrder"
                value={SortOrder}
                onChange={handleChange}
              />
              <Label>
                SortOrder <span className="text-danger">*</span>
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
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_edit(false);
            setIsSubmit(false);
          }}
        >
          Edit Category
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassName}
                placeholder="Enter Name Content"
                required
                name="Name"
                value={Name}
                onChange={handleChange}
              />
              <Label>
                Name <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Name}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassEmail}
                placeholder="Enter Email Content"
                required
                name="Email"
                value={Email}
                onChange={handleChange}
              />
              <Label>
                {" "}
                Email <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Email}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassValue}
                placeholder="Enter Designation Content"
                required
                name="Designation"
                value={Designation}
                onChange={handleChange}
              />
              <Label>
                Designation <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.Designation}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="number"
                className={validClassValue}
                placeholder="Enter SortOrder Content"
                required
                name="SortOrder"
                value={SortOrder}
                onChange={handleChange}
              />
              <Label>
                SortOrder <span className="text-danger">*</span>
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

export default ContentContact;
