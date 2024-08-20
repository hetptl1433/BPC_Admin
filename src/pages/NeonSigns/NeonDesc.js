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
import DataTable from "react-data-table-component";
import axios from "axios";
import { listNeonSignsActiveCategory } from "../../functions/Category/NeonSignsCategory";
import { createNeonSignsDetails, getNeonSignsDetails, removeNeonSignsDetails, updateNeonSignsDetails } from "../../functions/NeonSigns/NeonSigns";
import { createNeonDescDetails, getNeonDescDetails, removeNeonDescDetails, updateNeonDescDetails } from "../../functions/NeonSigns/NeonDesc";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const NeonDesc = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [_id, set_Id] = useState("");

  const initialState = {
    category: "",
    desc: "",
    IsActive: false,
  };

  const [remove_id, setRemove_id] = useState("");

  //search and pagination state
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [values, setValues] = useState(initialState);

  const {
    category,
    desc,
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
      name: "Neon Signs Category",
      selector: (row) => row.category.categoryName,
      sortable: true,
      sortField: "category",
      maxWidth: "250px",
    },
    {
      name: "Description",
      selector: (row) => row.desc,
      sortable: false,
      sortField: "desc",
      maxWidth: "700px",
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
        `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-by-params/neondesc-details`,
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

  const [errDS, setErrDS] = useState(false);
  const [errCN, setErrCN] = useState(false);
 


  const validate = (values) => {
    const errors = {};
    if (values.category === "") {
      errors.category = "Category Name is required";
      setErrCN(true);
    }
    if (values.category !== "") {
      setErrCN(false);
    }

    if (values.desc === "") {
      errors.desc = "Description is required";
      setErrDS(true);
    }

    if (values.desc !== "") {
      setErrDS(false);
    }

   
    return errors;
  };

  const validClassCategory =
    errCN && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassDescription =
    errDS && isSubmit ? "form-control is-invalid" : "form-control";

  const [modal_delete, setmodal_delete] = useState(false);

  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);

  const handlecheck = (e) => {
    console.log(e.target.checked);
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

  const [neonsignsCategories, setNeonsignsCategories] = useState([]);

  useEffect(() => {
    loadNeonCategories();
  }, [category]);

  const loadNeonCategories = () => {
    listNeonSignsActiveCategory().then((res) => setNeonsignsCategories(res));
  };

  const handleClick = (e) => {
    e.preventDefault();
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
      const formdata = new FormData();

     
      formdata.append("category", values.category);
      formdata.append("desc", values.desc);
      formdata.append("IsActive", values.IsActive);

      createNeonDescDetails(formdata)
        .then((res) => {
          // setModalList(!modal_list);
          setShowForm(false);
          setValues(initialState);
          setIsSubmit(false);
          setFormErrors({});
          fetchProducts();
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
    removeNeonDescDetails(remove_id)
      .then((res) => {
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

    formdata.append("category", values.category);
    formdata.append("desc", values.desc);
    formdata.append("IsActive", values.IsActive);
    updateNeonDescDetails(_id, formdata)
      .then((res) => {
        // setmodal_edit(!modal_edit);
        // setPhotoAdd("");
        setUpdateForm(false);

        fetchProducts();
        // setCheckImagePhoto(false);
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
    setShowForm(false);
    setUpdateForm(false);
    setValues(initialState);
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setUpdateForm(false);
    setShowForm(false);
    setValues(initialState);
  };

  const handleTog_edit = (_id) => {
    // setmodal_edit(!modal_edit);
    setIsSubmit(false);
    setUpdateForm(true);

    set_Id(_id);
    console.log(_id);
    setFormErrors(false);
    getNeonDescDetails(_id)
      .then((res) => {
        setValues({
          ...values,
          category: res.category,
          desc: res.desc,
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


  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };

  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };
  document.title = "Neon Signs Details | Neon11";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Neon Signs Details"
            title="Neon Signs Details"
            pageTitle="CMS"
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
                      Neon Signs-Description Details
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
                                  
                                    <Col lg={6}>
                                      <div className="form-floating  mb-3">
                                        <select
                                          name="category"
                                          className={validClassCategory}
                                          onChange={handleChange}
                                          value={category}
                                          data-choices
                                          data-choices-sorting="true"
                                        >
                                          <option>Select Category</option>
                                          {neonsignsCategories.map((c) => {
                                            return (
                                              <React.Fragment key={c._id}>
                                                {c.IsActive && (
                                                  <option value={c._id}>
                                                    {c.categoryName}
                                                  </option>
                                                )}
                                              </React.Fragment>
                                            );
                                          })}
                                        </select>
                                        <Label>
                                          Neon Signs Category{" "}
                                          <span className="text-danger">*</span>
                                        </Label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.category}
                                          </p>
                                        )}
                                      </div>
                                    </Col>
                                    <Col lg={12}>
                                      <div className="mb-3">
                                      <label
                                          htmlFor="role-field"
                                          className="form-label"
                                        >
                                          Description
                                          <span className="text-danger">*</span>
                                        </label>
                                         <CKEditor
                                          key={"desc_" + _id}
                                          editor={ClassicEditor}
                                          data={values.desc}
                                          
                                          onChange={(event, editor) => {
                                            const data = editor.getData();

                                            values.desc = data;
                                          }}
                                        />
                                       
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.desc}
                                          </p>
                                        )}
                                      </div>
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
                                  
                                    <Col lg={6}>
                                      <div className="form-floating  mb-3">
                                        <select
                                          name="category"
                                          className={validClassCategory}
                                          onChange={handleChange}
                                          value={category}
                                          data-choices
                                          data-choices-sorting="true"
                                        >
                                          <option>Select Category</option>
                                          {neonsignsCategories.map((c) => {
                                            return (
                                              <React.Fragment key={c._id}>
                                                {c.IsActive && (
                                                  <option value={c._id}>
                                                    {c.categoryName}
                                                  </option>
                                                )}
                                              </React.Fragment>
                                            );
                                          })}
                                        </select>
                                        <Label>
                                          Neon Signs Category{" "}
                                          <span className="text-danger">*</span>
                                        </Label>
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.category}
                                          </p>
                                        )}
                                      </div>
                                    </Col>
                                    <Col lg={12}>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="role-field"
                                          className="form-label"
                                        >
                                          Description
                                          <span className="text-danger">*</span>
                                        </label>
                                      <CKEditor
                                          key={"desc_" + _id}
                                          editor={ClassicEditor}
                                          data={values.desc}
                                          
                                          onChange={(event, editor) => {
                                            const data = editor.getData();

                                            values.desc = data;
                                          }}
                                        />
                                        
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.desc}
                                          </p>
                                        )}
                                      </div>
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
          <span style={{ marginRight: "210px" }}>Remove Product</span>
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

export default NeonDesc;
