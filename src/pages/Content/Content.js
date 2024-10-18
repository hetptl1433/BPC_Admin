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

import { createContent, getContent, removeContent, updateContent } from "../../functions/Content/Content";
import TextArea from "antd/es/input/TextArea";

const initialState = {
    Title: "",
    subTitle: "",
    Desc: "",
  IsActive: false,
};

const Content = () => {
  const [values, setValues] = useState(initialState);
//   const { Title, subTitle, Desc, ytLink, IsActive } = values;
const [Title, setTitle] = useState("");
const [subTitle, setsubTitle] = useState("");
const [Desc, setDesc] = useState("");
const [IsActive, setIsActive] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [errTI, setErrTI] = useState(false);
  const [errSTI, setErrSTI] = useState(false);
  const [errDS, setErrDS] = useState(false);
  const [errYT, setErrYT] = useState(false);

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
    setTitle("");
    setsubTitle("");
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
    getContent(_id)
      .then((res) => {
        setTitle(res.Title);
        setDesc(res.Desc);
        setsubTitle(res.subTitle);
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
    console.log("country", values);
    let errors = validate(Title, subTitle, Desc);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
        // setLoadingOption(true);
      const formdata = new FormData();

      formdata.append("Title", Title);
      formdata.append("subTitle", subTitle);
      formdata.append("Desc", Desc);
      formdata.append("IsActive", IsActive);
      createContent(formdata)
      .then((res) => {
        setTitle("");
        setsubTitle("");
        setDesc("");
        setIsActive(false);
        fetchCategories();
        setmodal_list(!modal_list);
        toast.success("Data submitted Successfully!");
      })
      .catch((err) => {
        console.log("Error from server:", err);
      });
    }

  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeContent(remove_id)
      .then((res) => {
        setTitle("");
        setsubTitle("");
        setDesc("");
        setIsActive(false);
        setmodal_delete(!modal_delete);
        fetchCategories();
        toast.success("Data deleted Successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let erros = validate(Title, subTitle, Desc);
    setFormErrors(erros);
    setIsSubmit(true);

    if (Object.keys(erros).length === 0) {

        const formdata = new FormData();

        formdata.append("Title", Title);
        formdata.append("subTitle", subTitle);
        formdata.append("Desc", Desc);
        formdata.append("IsActive", IsActive);
      updateContent(_id, formdata)
        .then((res) => {
          setmodal_edit(!modal_edit);
          fetchCategories();
          toast.success("Data updated Successfully!");
        })
        .catch((err) => {
            console.log("Error from server:", err);
        });
    }
  };

  const validate = (Title, subTitle, Desc, ytLink) => {
    const errors = {};

    if (Title === "") {
      errors.Title = "Title is required!";
      setErrTI(true);
    }
    if (Title !== "") {
      setErrTI(false);
    }
    if (subTitle === "") {
      errors.subTitle = "URL is required!";
      setErrSTI(true);
    }
    if (subTitle !== "") {
      setErrSTI(false);
    }
    if (Desc === "") {
      errors.Desc = "Description is required!";
      setErrDS(true);
    }
    if (Desc !== "") {
      setErrDS(false);
    }
  

    return errors;
  };

  const validClassTitle =
    errTI && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassSubTitle =
    errSTI && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassDesc =
    errDS && isSubmit ? "form-control is-invalid" : "form-control";
  

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
        `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-by-params/Content`,
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
      name: "Title",
      selector: (row) => row.Title,
      sortable: true,
      sortField: "Title",
      maxWidth: "150px",
    },
    {
        name: "URL",
        selector: (row) => row.subTitle,
        sortable: true,
        sortField: "URL",
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

  document.title = "Content | BPC india";

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="Content" title="Content" pageTitle="CMS " />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" sm={6} lg={4} md={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">CMS Master</h2>
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
          Add Content
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassTitle}
                placeholder="Enter Name"
                required
                name="Title"
                value={Title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <Label>
                Title <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Title}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassSubTitle}
                placeholder="Enter SubTitle"
                required
                name="subTitle"
                value={subTitle}
                onChange={(e) => {
                  setsubTitle(e.target.value);
                }}
              />
              <Label>
                {" "}
                URL Name<span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.subTitle}</p>}
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
          Edit Content
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassTitle}
                placeholder="Enter Name"
                required
                name="Title"
                value={Title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <Label>
                Title <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Title}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassSubTitle}
                placeholder="Enter URL Name"
                required
                name="subTitle"
                value={subTitle}
                onChange={(e) => {
                  setsubTitle(e.target.value);
                }}
              />
              <Label>
                {" "}
                URL Name <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.subTitle}</p>}
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
          Remove Content
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

export default Content;
