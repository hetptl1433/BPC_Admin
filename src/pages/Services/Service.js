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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import axios from "axios";
import DataTable from "react-data-table-component";

import { createImages, getImages, removeImages, updateImages } from "../../functions/Services/Service";
const initialState = {
  name: "",
  shortdesc:"",
    desc:"",
    image:"",   
  sortOrder:"",
  IsActive: false,
};

const Service = () => {
  const [values, setValues] = useState(initialState);
  const { name, shortdesc, desc, image, sortOrder, IsActive } = values;
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [data, setData] = useState([]);



useEffect(() => {
  fetchCategories();
}, []);
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
    getImages(_id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          name: res.name,
          shortdesc: res.shortdesc,
            desc: res.desc,
            image: res.image,
          sortOrder: res.sortOrder,
          IsActive: res.IsActive,
        });
        console.log("res", values.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, name: e.target.value });
  };
const HandleShortDesc = (e) => {
  setValues({ ...values, shortdesc: e.target.value });

};
 
 const handleSortnum = (e) => {
  setValues({ ...values, sortOrder: e.target.value });
  };
  const handleCheck = (e) => {
    setValues({ ...values, IsActive: e.target.checked });
  };

  const [errSR, setErrSR] = useState(false);
  const [errBI, setErrBI] = useState(false);
  const [errName, setErrName] = useState(false);
  const [errDesc, setErrDesc] = useState(false);
  const [errShortDesc, setErrShortDesc] = useState(false);
  const [errSortOrder, setErrSortOrder] = useState(false);
  const [errImage, setErrImage] = useState(false);
//   const [errB1, setErrB1] = useState(false);
//   const [errB2, setErrB2] = useState(false);
//   const [errB3, setErrB3] = useState(false);
//   const [errB4, setErrB4] = useState(false);
//   const [errDS, setErrDS] = useState(false);

    const validate = (values) => {
      const errors = {};

      // Validate title
       if (values.name === "") {
         errors.name = "Name is required!";
         setErrSR(true);
       }
       if (values.name !== "") {
         setErrSR(false);
       }

      // Validate description
      if (!values.desc || values.desc.trim() === "") {
        errors.desc = "Description is required!";
        setErrDesc(true);
      } else {
        setErrDesc(false);
      }

      // Validate short description
      if (!values.shortdesc ) {
        errors.shortdesc = "Short description is required!";
        setErrShortDesc(true);
      } else {
        setErrShortDesc(false);
      }

      // Validate sort order
      if (!values.sortOrder ) {
        errors.sortOrder = "Sort order is required!";
        setErrSortOrder(true);
      } else {
        setErrSortOrder(false);
      }

      // Validate image
      if (!values.image ) {
        errors.image = "Image is required!";
        setErrImage(true);
      } else {
        setErrImage(false);
      }

      return errors;
    };

     const validClassSR =
       errSR && isSubmit ? "form-control is-invalid" : "form-control";

     const validClassBI =
       errBI && isSubmit ? "form-control is-invalid" : "form-control";

 const validClassName =
   errName && isSubmit ? "form-control is-invalid" : "form-control";

 const validClassDesc =
   errDesc && isSubmit ? "form-control is-invalid" : "form-control";

 const validClassShortDesc =
   errShortDesc && isSubmit ? "form-control is-invalid" : "form-control";

 const validClassSortOrder =
   errSortOrder && isSubmit ? "form-control is-invalid" : "form-control";

 const validClassImage =
   errImage && isSubmit ? "form-control is-invalid" : "form-control";
    

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      const formdata = new FormData();

      formdata.append("myFile", values.image);
      formdata.append("sortOrder", values.sortOrder);
      formdata.append("name", values.name);
      formdata.append("desc", values.desc);
      formdata.append("shortdesc", values.shortdesc);

      formdata.append("IsActive", values.IsActive);

      createImages(formdata)
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
    removeImages(remove_id)
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

   formdata.append("myFile", values.image);
      formdata.append("sortOrder", values.sortOrder);
      formdata.append("name", values.name);
      formdata.append("desc", values.desc);
      formdata.append("shortdesc", values.shortdesc);

      formdata.append("IsActive", values.IsActive);

      updateImages(_id, formdata)
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
        `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-by-params/serviceimage`,
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
      
      setValues({ ...values, image: e.target.files[0] });
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
      name: "name",
      selector: (row) => row.name,
      sortable: true,
      sortField: "name",
      maxWidth: "150px",
    },
      {
      name: "sortOrder",
      selector: (row) => row.sortOrder,
      sortable: true,
      sortField: "sortOrder",
      maxWidth: "150px",
    },
    {
      name: "image",
      selector: (row) => renderImage(row.image),
      sortable: false,
      sortField: "image",
      minWidth: "150px",
    },
    {
        name: "Active",
        selector:(row) => row.IsActive?"Active" : "In Active",
        sortable: false,
        sortField: "Active",
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

  document.title = "Services | BPC";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="CMS" title="Services" pageTitle="CMS" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" sm={6} lg={4} md={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Services </h2>
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
        size="xl"
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_list(false);
            setIsSubmit(false);
          }}
        >
          Add Services
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${validClassName}`}
                required
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Enter Name"
              />
              <label>
                Name<span className="text-danger">*</span>
              </label>
              {isSubmit && <p className="text-danger">{formErrors.name}</p>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${validClassSR}`}
                required
                name="short description"
                value={shortdesc}
                onChange={HandleShortDesc}
                placeholder="Enter short description"
              />
              <label>
                short description<span className="text-danger">*</span>
              </label>
              {isSubmit && (
                <p className="text-danger">{formErrors.shortdesc}</p>
              )}
            </div>
            <Col lg={12}>
              <div className="mb-3">
                <label htmlFor="role-field" className="form-label">
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

                {isSubmit && <p className="text-danger">{formErrors.desc}</p>}
              </div>
            </Col>

            <div className="form-floating mb-3 col-md-6">
              <Input
                type="number"
                className={validClassSR}
                placeholder="Enter sortOrder "
                required
                name="sortOrder"
                value={sortOrder}
                onChange={handleSortnum}
              />
              <Label>
                Sort Order<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.sortOrder}</p>
              )}
            </div>
            <Col lg={6}>
              <label>
                Icon <span className="text-danger">*</span>
              </label>

              <input
                type="file"
                name="image"
                className={validClassBI}
                // accept="images/*"
                accept=".jpg, .jpeg, .png"
                onChange={PhotoUpload}
              />
              {isSubmit && <p className="text-danger">{formErrors.image}</p>}
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
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${validClassSR}`}
                required
                name="Name"
                value={name}
                onChange={handleChange}
              />
              <label>
                Name<span className="text-danger">*</span>
              </label>
              {isSubmit && <p className="text-danger">{formErrors.name}</p>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${validClassSR}`}
                required
                name="short description"
                value={shortdesc}
                onChange={HandleShortDesc}
                placeholder="Enter short description"
              />
              <label>
                short description<span className="text-danger">*</span>
              </label>
              {isSubmit && (
                <p className="text-danger">{formErrors.shortdesc}</p>
              )}
            </div>
            <Col lg={12}>
              <div className="mb-3">
                <label htmlFor="role-field" className="form-label">
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

                {isSubmit && <p className="text-danger">{formErrors.desc}</p>}
              </div>
            </Col>
            <div className="form-floating mb-3 mt-3 col-md-6">
              <Input
                type="number"
                className={validClassSR}
                placeholder="Enter sort Order "
                required
                name="sortOrder"
                value={sortOrder}
                onChange={handleSortnum}
              />
              <Label>
                Sort Order<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.sortOrder}</p>
              )}
            </div>

            {/* <Col lg={6}>
              <label>
                Image <span className="text-danger">*</span>
              </label>

              <input
                type="file"
                name="image"
                className={validClassBI}
                // accept="images/*"
                accept=".jpg, .jpeg, .png"
                onChange={PhotoUpload}
              />
              {isSubmit && <p className="text-danger">{formErrors.image}</p>}
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
                Imagee <span className="text-danger">*</span>
              </label>
              <input
                key={"image" + _id}
                type="file"
                name="image"
                className={validClassBI}
                // accept="images/*"
                accept=".jpg, .jpeg, .png"
                onChange={PhotoUpload}
              />
              {isSubmit && <p className="text-danger">{formErrors.image}</p>}

              {values.image || photoAdd ? (
                <img
                  // key={photoAdd}
                  className="m-2"
                  src={
                    checkImagePhoto
                      ? photoAdd
                      : `${process.env.REACT_APP_API_URL_BPC}/${image}`
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

export default Service;
