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
import {
  createPopUpFile,
  getPopUpFile,
  removePopUpFile,
  updatePopUpFile,
} from "../../functions/PopUp/PopUp";
const initialState = {
  Title: "",
 
  PopUpFile: "",
  SortOrder: "",
  IsActive: false,
};

const PopUpFile = () => {
  const [values, setValues] = useState(initialState);
  const { Title, PopUpFile,SortOrder, IsActive } = values;
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [data, setData] = useState([]);

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
    getPopUpFile(_id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          Title: res.Title,
          
          SortOrder: res.SortOrder,
          PopUpFile: res.PopUpFile,
          IsActive: res.IsActive,
        });
        console.log("res", values.Title);
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

  const [errTT, setErrTT] = useState(false);
  const [errKW, setErrKW] = useState(false);
  const [errBI, setErrBI] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (values.Title === "") {
      errors.Title = "Title is required!";
      setErrTT(true);
    }
    if (values.Title !== "") {
      setErrTT(false);
    }

  if (values.SortOrder === "") {
    errors.SortOrder = "Sort Order is required!";
    setErrKW(true);
  }
  if (values.SortOrder !== "") {
    setErrKW(false);
  }

    if (values.PopUpFile === "") {
      errors.PopUpFile = "PopUpFile File is required!";
      setErrBI(true);
    }
    if (values.PopUpFile !== "") {
      setErrBI(false);
    }

    return errors;
  };

  const validClassTT =
    errTT && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassKW =
    errKW && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassBI =
    errBI && isSubmit ? "form-control is-invalid" : "form-control";

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);

    if (Object.keys(erros).length === 0) {
      const formdata = new FormData();

      formdata.append("myFile", values.PopUpFile);
     
      formdata.append("IsActive", values.IsActive);
      formdata.append("Title", values.Title);
      formdata.append("SortOrder", values.SortOrder);

      createPopUpFile(formdata)
        .then((res) => {
          setmodal_list(!modal_list);
          setValues(initialState);
          setCheckImagePhoto(false);
          setIsSubmit(false);
          setFormErrors({});
          setPhotoAdd("");

          fetchCategories();
          toast.success("Data submitted successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removePopUpFile(remove_id)
      .then((res) => {
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
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);

    if (Object.keys(erros).length === 0) {
      const formdata = new FormData();

      formdata.append("myFile", values.PopUpFile);
     
 
      formdata.append("IsActive", values.IsActive);
      formdata.append("Title", values.Title);
      formdata.append("SortOrder", values.SortOrder);

      updatePopUpFile(_id, formdata)
        .then((res) => {
          setmodal_edit(!modal_edit);
          fetchCategories();
          setPhotoAdd("");

          setCheckImagePhoto(false);
          toast.success("Data updated successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
        `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-by-params/PopUpFile`,
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
        // console.log(res);
      });

    setLoading(false);
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
      console.log("img", e.target.files[0]);

      setPhotoAdd(imageurl);
      setValues({ ...values, PopUpFile: e.target.files[0] });
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

  const col = [
    {
      name: "Name",
      selector: (row) => row.Title,
      sortable: true,
      sortField: "Title",
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
      name: "SortOrder",
      selector: (row) => row.SortOrder,
      sortable: false,
      sortField: "SortOrder",
      minwidth: "150px",
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

  document.title = "PopUpFile | BPC";

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="CMS" title="NEWS Popup" pageTitle="CMS" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" sm={6} lg={4} md={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">NEWS Popup</h2>
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
                        data={data}
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
          Add PopUpFile
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassTT}
                placeholder="Enter Title "
                required
                name="Title"
                value={Title}
                onChange={handleChange}
              />
              <Label>
                Name<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Title}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="number"
                className={validClassKW}
                placeholder="Enter SortOrder "
                required
                name="SortOrder"
                value={SortOrder}
                onChange={handleChange}
              />
              <Label>
                Sort Order<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.SortOrder}</p>
              )}
            </div>

            <Col lg={6}>
              <label>
                PopUpFile <span className="text-danger">*</span>
              </label>

              <input
                type="file"
                name="PopUpFile"
                className={validClassBI}
                // accept="images/*"
                accept=".jpg, .jpeg, .png"
                onChange={PhotoUpload}
              />
              {isSubmit && (
                <p className="text-danger">{formErrors.PopUpFile}</p>
              )}
              {(values.PopUpFile || photoAdd) && (
                <div className="m-2">
                  <p>{photoAdd ? "Uploaded File" : values.PopUpFile.name}</p>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent page refresh
                      const fileUrl = checkImagePhoto
                        ? photoAdd
                        : `${process.env.REACT_APP_API_URL_BPC}/${values.PopUpFile.name}`;
                      window.open(fileUrl, "_blank");
                    }}
                  >
                    Preview
                  </button>
                </div>
              )}
            </Col>

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
                  setCheckImagePhoto(false);
                  setPhotoAdd("");
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
          Edit PopUpFile
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassTT}
                placeholder="Enter code "
                required
                name="Title"
                value={Title}
                onChange={handleChange}
              />
              <Label>
                Name<span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Title}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassKW}
                placeholder="Enter SortOrder "
                required
                name="SortOrder"
                value={SortOrder}
                onChange={handleChange}
              />
              <Label>
                Sort Order<span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.SortOrder}</p>
              )}
            </div>

            <Col lg={6}>
              <label>
                PopUpFile <span className="text-danger">*</span>
              </label>
              <input
                key={"PopUpFile" + _id}
                type="file"
                name="PopUpFile"
                className={validClassBI}
                // accept="images/*"
                accept=".jpg, .jpeg, .png"
                onChange={PhotoUpload}
              />
              {isSubmit && (
                <p className="text-danger">{formErrors.PopUpFile}</p>
              )}

              {(values.PopUpFile || photoAdd) && (
                <div className="m-2">
                  <p>
                    {photoAdd
                      ? "Uploaded File"
                      : values.PopUpFile.name
                      ? values.PopUpFile.name
                      : values.PopUpFile}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent page refresh
                      let fileUrl;

                      if (checkImagePhoto) {
                        fileUrl = photoAdd;
                      } else if (values.PopUpFile instanceof File) {
                        // Handle new file upload case
                        fileUrl = URL.createObjectURL(values.PopUpFile);
                      } else {
                        // Handle existing file case (assumed to be a URL string)
                        fileUrl = `${process.env.REACT_APP_API_URL_BPC}/${values.PopUpFile}`;
                      }

                      window.open(fileUrl, "_blank");
                    }}
                  >
                    Preview
                  </button>
                </div>
              )}
            </Col>

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
                  setCheckImagePhoto(false);
                  setFormErrors({});
                  setPhotoAdd("");
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
          Remove Popup file
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

export default PopUpFile;
