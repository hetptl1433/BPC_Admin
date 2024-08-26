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
import {
  createBannerImages,
  getBannerImages,
  removeBannerImages,
  updateBannerImages,
} from "../../functions/CMS/Banner";
import { createHomeAbout, getHomeAbout, removeHomeAbout, updateHomeAbout } from "../../functions/HomeAbout/HomeAbout";
import { createAboutUs, getAboutUs, removeAboutUs, updateAboutUs } from "../../functions/AboutUs/AboutUs";
import TextArea from "antd/es/input/TextArea";
const initialState = {
  Tagline: "",
  box1: "",
  box2: "",
  box3:"",
  box4:"",
  abtImage: "",
  description:"",
  IsActive: false,
};

const AboutUs = () => {
  const [values, setValues] = useState(initialState);
  const { Tagline, box1, box2, box3, box4, abtImage, description, IsActive } = values;
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
    getAboutUs(_id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          Tagline: res.Tagline,
          box1: res.box1,
          box2: res.box2,
          box3: res.box3,
          box4: res.box4,
          abtImage: res.abtImage,
          description: res.description,
          IsActive: res.IsActive,
        });
        console.log("res", values.Tagline);
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

  const [errTG, setErrTG] = useState(false);
  const [errB1, setErrB1] = useState(false);
  const [errB2, setErrB2] = useState(false);
  const [errB3, setErrB3] = useState(false);
  const [errB4, setErrB4] = useState(false);
  const [errBI, setErrBI] = useState(false);
  const [errDS, setErrDS] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (values.Tagline === "") {
      errors.Tagline = "Tagline is required!";
      setErrTG(true);
    }
    if (values.Tagline !== "") {
      setErrTG(false);
    }

    if (values.box1 === "") {
      errors.box1 = "Content for box1 is required!";
      setErrB1(true);
    }
    if (values.box1 !== "") {
        setErrB1(false);
    }
    if (values.box2 === "") {
        errors.box2 = "Content for box2 is required!";
        setErrB2(true);
      }
      if (values.box2 !== "") {
          setErrB2(false);
      }
      if (values.box3 === "") {
          errors.box3 = "Content for box3 is required!";
          setErrB3(true);
        }
        if (values.box3 !== "") {
            setErrB3(false);
        }

        if (values.box4 === "") {
            errors.box4 = "Content for box4 is required!";
            setErrB4(true);
          }
          if (values.box4 !== "") {
              setErrB4(false);
          }
          if (values.description === "") {
            errors.description = "Content for box4 is required!";
            setErrDS(true);
          }
          if (values.description !== "") {
              setErrDS(false);
          }
    if (values.abtImage === "") {
      errors.abtImage = "Image is required!";
      setErrBI(true);
    }
    if (values.abtImage !== "") {
      setErrBI(false);
    }

    return errors;
  };

  const validClassTG =
    errTG && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassB1 =
    errB1 && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassB2 =
    errB2 && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassB3 =
    errB3 && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassB4 =
    errB4 && isSubmit ? "form-control is-invalid" : "form-control";  
    const validClassDS =
    errDS && isSubmit ? "form-control is-invalid" : "form-control";  

  const validClassBI =
    errBI && isSubmit ? "form-control is-invalid" : "form-control";

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      const formdata = new FormData();

      formdata.append("myFile", values.abtImage);
      formdata.append("Tagline", values.Tagline);
      formdata.append("box1", values.box1);
      formdata.append("box2", values.box2);
      formdata.append("box3", values.box3);
      formdata.append("box4", values.box4);
      formdata.append("description", values.description);
      formdata.append("IsActive", values.IsActive);

      createAboutUs(formdata)
        .then((res) => {
          setmodal_list(!modal_list);
          setValues(initialState);
          setCheckImagePhoto(false);
          setIsSubmit(false);
          setFormErrors({});
          setPhotoAdd("");

          fetchCategories();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeAboutUs(remove_id)
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
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      const formdata = new FormData();

      formdata.append("myFile", values.abtImage);
      formdata.append("Tagline", values.Tagline);
      formdata.append("box1", values.box1);
      formdata.append("box2", values.box2);
      formdata.append("box3", values.box3);
      formdata.append("box4", values.box4);
      formdata.append("description", values.description);
      formdata.append("IsActive", values.IsActive);

      updateAboutUs(_id, formdata)
        .then((res) => {
          setmodal_edit(!modal_edit);
          fetchCategories();
          setPhotoAdd("");

          setCheckImagePhoto(false);
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
        `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-by-params/aboutus`,
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
    //   abtImage=imageurl;
      setPhotoAdd(imageurl);
      
      setValues({ ...values, abtImage: e.target.files[0] });
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
      name: "Tagline",
      selector: (row) => row.Tagline,
      sortable: true,
      sortField: "Tagline",
      maxWidth: "150px",
    },
    {
      name: "box1",
      selector: (row) => row.box1,
      sortable: false,
      sortField: "box1",
      maxWidth: "150px",
    },
    {
        name: "box2",
        selector: (row) => row.box2,
        sortable: false,
        sortField: "box2",
        maxWidth: "150px",
      },
      {
        name: "box3",
        selector: (row) => row.box3,
        sortable: false,
        sortField: "box3",
        maxWidth: "150px",
      },
      {
        name: "box4",
        selector: (row) => row.box4,
        sortable: false,
        sortField: "box4",
        maxWidth: "150px",
      },
      {
        name: "description",
        selector: (row) => row.description,
        sortable: false,
        sortField: "description",
        maxWidth: "150px",
      },
    {
      name:"Image",
      selector: (row) => renderImage(row.abtImage),
      sortable: false,
      sortField: "Image",
      minwidth: "150px"
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

  document.title = "About Us | Neon11";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="CMS" title="About Us" pageTitle="CMS" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" sm={6} lg={4} md={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">About Us </h2>
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
          Add Home About Components
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="mb-3">
              <Label>
                Tagline<span className="text-danger">*</span>{" "}
              </Label>
              <TextArea
                type="text"
                className={validClassTG}
                placeholder="Enter Tagline "
                required
                name="Tagline"
                value={Tagline}
                onChange={handleChange}
              />

              {isSubmit && <p className="text-danger">{formErrors.Tagline}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassB1}
                placeholder="Enter content "
                required
                name="box1"
                value={box1}
                onChange={handleChange}
              />
              <Label>
                Box 1<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.box1}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassB2}
                placeholder="Enter content "
                required
                name="box2"
                value={box2}
                onChange={handleChange}
              />
              <Label>
                Box 2<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.box2}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassB3}
                placeholder="Enter content "
                required
                name="box3"
                value={box3}
                onChange={handleChange}
              />
              <Label>
                Box 3<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.box3}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassB4}
                placeholder="Enter content "
                required
                name="box4"
                value={box4}
                onChange={handleChange}
              />
              <Label>
                Box 4<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.box4}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassDS}
                placeholder="Enter description "
                required
                name="description"
                value={description}
                onChange={handleChange}
              />
              <Label>
                Description<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.description}</p>
              )}
            </div>

            <Col lg={6}>
              <label>
                Image <span className="text-danger">*</span>
              </label>

              <input
                type="file"
                name="abtImage"
                className={validClassBI}
                // accept="images/*"
                accept=".jpg, .jpeg, .png"
                onChange={PhotoUpload}
              />
              {isSubmit && <p className="text-danger">{formErrors.abtImage}</p>}
              {checkImagePhoto ? (
                <img
                  //   src={image ?? myImage}
                  className="m-2"
                  src={photoAdd}
                  alt="Profile"
                  width="300"
                  height="200"
                />
              ) : null}
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
          Edit Banner
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="mb-3">
              <Label>
                Tagline<span className="text-danger">*</span>{" "}
              </Label>
              <TextArea
                type="text"
                className={validClassTG}
                placeholder="Enter Tagline "
                required
                name="Tagline"
                value={Tagline}
                onChange={handleChange}
                rows={3}
              />

              {isSubmit && <p className="text-danger">{formErrors.Tagline}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassB1}
                placeholder="Enter content "
                required
                name="box1"
                value={box1}
                onChange={handleChange}
              />
              <Label>
                Box 1<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.box1}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassB2}
                placeholder="Enter content "
                required
                name="box2"
                value={box2}
                onChange={handleChange}
              />
              <Label>
                Box 2<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.box2}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassB3}
                placeholder="Enter content "
                required
                name="box3"
                value={box3}
                onChange={handleChange}
              />
              <Label>
                Box 3<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.box3}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassB4}
                placeholder="Enter content "
                required
                name="box4"
                value={box4}
                onChange={handleChange}
              />
              <Label>
                Box 4<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.box4}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassDS}
                placeholder="Enter description "
                required
                name="description"
                value={description}
                onChange={handleChange}
              />
              <Label>
                Description<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.description}</p>
              )}
            </div>
            {/* <Col lg={6}>
              <label>
                Image <span className="text-danger">*</span>
              </label>

              <input
                type="file"
                name="abtImage"
                className={validClassBI}
                // accept="images/*"
                accept=".jpg, .jpeg, .png"
                onChange={PhotoUpload}
              />
              {isSubmit && (
                <p className="text-danger">{formErrors.abtImage}</p>
              )}
              {checkImagePhoto ? (
                <img
                  //   src={image ?? myImage}
                  className="m-2"
                  src={photoAdd}
                  alt="Profile"
                  width="300"
                  height="200"
                />
              ) : null}
            </Col> */}
            <Col lg={6}>
              <label>
                Image <span className="text-danger">*</span>
              </label>
              <input
                key={"abtImage" + _id}
                type="file"
                name="abtImage"
                className={validClassBI}
                // accept="images/*"
                accept=".jpg, .jpeg, .png"
                onChange={PhotoUpload}
              />
              {isSubmit && <p className="text-danger">{formErrors.abtImage}</p>}

              {values.abtImage || photoAdd ? (
                <img
                  // key={photoAdd}
                  className="m-2"
                  src={
                    checkImagePhoto
                      ? photoAdd
                      : `${process.env.REACT_APP_API_URL_BPC}/${abtImage}`
                  }
                  width="180"
                  height="200"
                />
              ) : null}
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
          Remove Promocode
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

export default AboutUs;
