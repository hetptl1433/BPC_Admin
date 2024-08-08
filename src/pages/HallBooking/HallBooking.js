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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  createBannerImages,
  getBannerImages,
  removeBannerImages,
  updateBannerImages,
} from "../../functions/CMS/Banner";
import { createHallBook, getHallBook, removeHallBook, updateHallBook } from "../../functions/HallBooking/HallBooking";
import TextArea from "antd/es/input/TextArea";
const initialState = {
  Name: "",
  Desc: "",
  HalfDayCapacity: 0,
  HalfDayBasicValue: 0,
  HalfDayCentralGST: 0,
  HalfDayStateGST: 0,
  HalfDayTotal: 0,
  FullDayCapacity: 0,
  FullDayBasicValue: 0,
  FullDayCentralGST: 0,
  FullDayStateGST: 0,
  FullDayTotal: 0,
  SortOrder: 0,
  Icon: "",
  IsActive: false,
};


const HallBooking = () => {
  const [values, setValues] = useState(initialState);
 const {
   Name,
   Desc,
   HalfDayCapacity,
   HalfDayBasicValue,
   HalfDayCentralGST,
   HalfDayStateGST,
   HalfDayTotal,
   FullDayCapacity,
   FullDayBasicValue,
   FullDayCentralGST,
   FullDayStateGST,
   FullDayTotal,
   SortOrder,
   Icon,
   IsActive,
 } = values;

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
    getHallBook(_id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          Name: res.Name,
          Desc: res.Desc,
          HalfDayCapacity: res.HalfDayCapacity,
          HalfDayBasicValue: res.HalfDayBasicValue,
          HalfDayCentralGST: res.HalfDayCentralGST,
          HalfDayStateGST: res.HalfDayStateGST,
          HalfDayTotal: res.HalfDayTotal,
          FullDayCapacity: res.FullDayCapacity,
          FullDayBasicValue: res.FullDayBasicValue,
          FullDayCentralGST: res.FullDayCentralGST,
          FullDayStateGST: res.FullDayStateGST,
          FullDayTotal: res.FullDayTotal,
          SortOrder: res.SortOrder,
          Icon: res.Icon,
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
   const handleChange1 = (e) => {
     setValues({ ...values, [e.target.name]: e.target.value });
   };
   const handleCKEditorChange = (event, editor) => {
     const data = editor.getData();
     setValues({
       ...values,
       Desc: data,
     });
   };

  const handleCheck = (e) => {
    setValues({ ...values, IsActive: e.target.checked });
  };

   const [errName, setErrName] = useState(false);
   const [errDesc, setErrDesc] = useState(false);
   const [errHalfDayCapacity, setErrHalfDayCapacity] = useState(false);
   const [errHalfDayBasicValue, setErrHalfDayBasicValue] = useState(false);
   const [errHalfDayCentralGST, setErrHalfDayCentralGST] = useState(false);
   const [errHalfDayStateGST, setErrHalfDayStateGST] = useState(false);
   const [errHalfDayTotal, setErrHalfDayTotal] = useState(false);
   const [errFullDayCapacity, setErrFullDayCapacity] = useState(false);
   const [errFullDayBasicValue, setErrFullDayBasicValue] = useState(false);
   const [errFullDayCentralGST, setErrFullDayCentralGST] = useState(false);
   const [errFullDayStateGST, setErrFullDayStateGST] = useState(false);
   const [errFullDayTotal, setErrFullDayTotal] = useState(false);
   const [errSortOrder, setErrSortOrder] = useState(false);
   const [errIcon, setErrIcon] = useState(false);
   const [errIsActive, setErrIsActive] = useState(false);

  const validate = (values) => {
    const errors = {};
if (values.Name === "") {
  errors.Name = "Name is required!";
  setErrName(true);
} else {
  setErrName(false);
}

if (values.Desc === "") {
  errors.Desc = "Description is required!";
  setErrDesc(true);
} else {
  setErrDesc(false);
}

if (values.HalfDayCapacity === "") {
  errors.HalfDayCapacity = "Half Day Capacity is required!";
  setErrHalfDayCapacity(true);
} else {
  setErrHalfDayCapacity(false);
}

if (values.HalfDayBasicValue === "") {
  errors.HalfDayBasicValue = "Half Day Basic Value is required!";
  setErrHalfDayBasicValue(true);
} else {
  setErrHalfDayBasicValue(false);
}

if (values.HalfDayCentralGST === "") {
  errors.HalfDayCentralGST = "Half Day Central GST is required!";
  setErrHalfDayCentralGST(true);
} else {
  setErrHalfDayCentralGST(false);
}

if (values.HalfDayStateGST === "") {
  errors.HalfDayStateGST = "Half Day State GST is required!";
  setErrHalfDayStateGST(true);
} else {
  setErrHalfDayStateGST(false);
}

if (values.HalfDayTotal === "") {
  errors.HalfDayTotal = "Half Day Total is required!";
  setErrHalfDayTotal(true);
} else {
  setErrHalfDayTotal(false);
}

if (values.FullDayCapacity === "") {
  errors.FullDayCapacity = "Full Day Capacity is required!";
  setErrFullDayCapacity(true);
} else {
  setErrFullDayCapacity(false);
}

if (values.FullDayBasicValue === "") {
  errors.FullDayBasicValue = "Full Day Basic Value is required!";
  setErrFullDayBasicValue(true);
} else {
  setErrFullDayBasicValue(false);
}

if (values.FullDayCentralGST === "") {
  errors.FullDayCentralGST = "Full Day Central GST is required!";
  setErrFullDayCentralGST(true);
} else {
  setErrFullDayCentralGST(false);
}

if (values.FullDayStateGST === "") {
  errors.FullDayStateGST = "Full Day State GST is required!";
  setErrFullDayStateGST(true);
} else {
  setErrFullDayStateGST(false);
}

if (values.FullDayTotal === "") {
  errors.FullDayTotal = "Full Day Total is required!";
  setErrFullDayTotal(true);
} else {
  setErrFullDayTotal(false);
}

if (values.SortOrder === "") {
  errors.SortOrder = "Sort Order is required!";
  setErrSortOrder(true);
} else {
  setErrSortOrder(false);
}

if (values.Icon === "") {
  errors.Icon = "Icon is required!";
  setErrIcon(true);
} else {
  setErrIcon(false);
}

if (values.IsActive === "") {
  errors.IsActive = "IsActive is required!";
  setErrIsActive(true);
} else {
  setErrIsActive(false);
}

    return errors;
  };

 // Assuming you have error states and isSubmit flag defined elsewhere

const validClassName =
  errName && isSubmit ? "form-control is-invalid" : "form-control";

const validClassDesc =
  errDesc && isSubmit ? "form-control is-invalid" : "form-control";

const validClassHalfDayCapacity =
  errHalfDayCapacity && isSubmit ? "form-control is-invalid" : "form-control";

const validClassHalfDayBasicValue =
  errHalfDayBasicValue && isSubmit ? "form-control is-invalid" : "form-control";

const validClassHalfDayCentralGST =
  errHalfDayCentralGST && isSubmit ? "form-control is-invalid" : "form-control";

const validClassHalfDayStateGST =
  errHalfDayStateGST && isSubmit ? "form-control is-invalid" : "form-control";

const validClassHalfDayTotal =
  errHalfDayTotal && isSubmit ? "form-control is-invalid" : "form-control";

const validClassFullDayCapacity =
  errFullDayCapacity && isSubmit ? "form-control is-invalid" : "form-control";

const validClassFullDayBasicValue =
  errFullDayBasicValue && isSubmit ? "form-control is-invalid" : "form-control";

const validClassFullDayCentralGST =
  errFullDayCentralGST && isSubmit ? "form-control is-invalid" : "form-control";

const validClassFullDayStateGST =
  errFullDayStateGST && isSubmit ? "form-control is-invalid" : "form-control";

const validClassFullDayTotal =
  errFullDayTotal && isSubmit ? "form-control is-invalid" : "form-control";

const validClassSortOrder =
  errSortOrder && isSubmit ? "form-control is-invalid" : "form-control";

const validClassIcon =
  errIcon && isSubmit ? "form-control is-invalid" : "form-control";

// For boolean fields, assuming no specific styling for errors


  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      const formdata = new FormData();
formdata.append("Name", values.Name);
formdata.append("Desc", values.Desc);
formdata.append("HalfDayCapacity", values.HalfDayCapacity);
formdata.append("HalfDayBasicValue", values.HalfDayBasicValue);
formdata.append("HalfDayCentralGST", values.HalfDayCentralGST);
formdata.append("HalfDayStateGST", values.HalfDayStateGST);
formdata.append("HalfDayTotal", values.HalfDayTotal);
formdata.append("FullDayCapacity", values.FullDayCapacity);
formdata.append("FullDayBasicValue", values.FullDayBasicValue);
formdata.append("FullDayCentralGST", values.FullDayCentralGST);
formdata.append("FullDayStateGST", values.FullDayStateGST);
formdata.append("FullDayTotal", values.FullDayTotal);
formdata.append("SortOrder", values.SortOrder);
formdata.append("Icon", values.Icon);
formdata.append("IsActive", values.IsActive);

      createHallBook(formdata)
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
    removeHallBook(remove_id)
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

  formdata.append("Name", values.Name);
  formdata.append("Desc", values.Desc);
  formdata.append("HalfDayCapacity", values.HalfDayCapacity);
  formdata.append("HalfDayBasicValue", values.HalfDayBasicValue);
  formdata.append("HalfDayCentralGST", values.HalfDayCentralGST);
  formdata.append("HalfDayStateGST", values.HalfDayStateGST);
  formdata.append("HalfDayTotal", values.HalfDayTotal);
  formdata.append("FullDayCapacity", values.FullDayCapacity);
  formdata.append("FullDayBasicValue", values.FullDayBasicValue);
  formdata.append("FullDayCentralGST", values.FullDayCentralGST);
  formdata.append("FullDayStateGST", values.FullDayStateGST);
  formdata.append("FullDayTotal", values.FullDayTotal);
  formdata.append("SortOrder", values.SortOrder);
  formdata.append("Icon", values.Icon);
  formdata.append("IsActive", values.IsActive);
      updateHallBook(_id, formdata)
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
        `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list-by-params/HallBook`,
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
      
      setValues({ ...values, Icon: e.target.files[0] });
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
    const imageUrl = `${process.env.REACT_APP_API_URL_COFFEE}/${uploadimage}`;

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
      selector: (row) => row.Name,
      sortable: true,
      sortField: "Name",
      maxWidth: "150px",
    },
    {
      name: "SortOrder",
      selector: (row) => row.SortOrder,
      sortable: false,
      sortField: "box1",
      maxWidth: "150px",
    },
    {
      name:"Icon",
      selector: (row) => renderImage(row.Icon),
      sortable: false,
      sortField: "Icon",
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

  document.title = "Hall Booking | Neon11";

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
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Hall Booking{" "}
                      </h2>
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
        size="lg"
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_list(false);
            setIsSubmit(false);
          }}
        >
          Add Hall Booking
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="row">
              <div className="form-floating mb-3">
                <Input
                  type="text"
                  className={validClassName}
                  placeholder="Enter Name "
                  required
                  name="Name"
                  value={Name}
                  onChange={handleChange1}
                />
                <Label>
                  Name<span className="text-danger">*</span>{" "}
                </Label>
                {isSubmit && <p className="text-danger">{formErrors.Name}</p>}
              </div>
              <div className="mb-3">
                <Label>
                  Description<span className="text-danger">*</span>{" "}
                </Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={values.Desc}
                  onChange={handleCKEditorChange}
                />

                {isSubmit && <p className="text-danger">{formErrors.Name}</p>}
                {isSubmit && formErrors.Desc && (
                  <p className="text-danger">{formErrors.Desc}</p>
                )}
              </div>

              <div className="form-floating mb-3 col-md-6">
                <input
                  type="number"
                  className={validClassHalfDayCapacity}
                  placeholder="Enter HalfDay Capacity"
                  required
                  name="HalfDayCapacity"
                  value={values.HalfDayCapacity}
                  onChange={handleChange}
                />
                <label>
                  Half day capacity <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.HalfDayCapacity && (
                  <p className="text-danger">{formErrors.HalfDayCapacity}</p>
                )}
              </div>

              <div className="form-floating mb-3 col-md-6">
                <input
                  type="number"
                  className={validClassHalfDayBasicValue}
                  placeholder="Enter HalfDay Basic Value"
                  required
                  name="HalfDayBasicValue"
                  value={values.HalfDayBasicValue}
                  onChange={handleChange}
                />
                <label>
                  Half day basic value <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.HalfDayBasicValue && (
                  <p className="text-danger">{formErrors.HalfDayBasicValue}</p>
                )}
              </div>

              <div className="form-floating mb-3 col-md-6">
                <input
                  type="number"
                  className={validClassHalfDayCentralGST}
                  placeholder="Enter HalfDay Central GST"
                  required
                  name="HalfDayCentralGST"
                  value={values.HalfDayCentralGST}
                  onChange={handleChange}
                />
                <label>
                  Half day central GST <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.HalfDayCentralGST && (
                  <p className="text-danger">{formErrors.HalfDayCentralGST}</p>
                )}
              </div>

              <div className="form-floating mb-3 col-md-6">
                <input
                  type="number"
                  className={validClassHalfDayStateGST}
                  placeholder="Enter HalfDay State GST"
                  required
                  name="HalfDayStateGST"
                  value={values.HalfDayStateGST}
                  onChange={handleChange}
                />
                <label>
                  Half day state GST <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.HalfDayStateGST && (
                  <p className="text-danger">{formErrors.HalfDayStateGST}</p>
                )}
              </div>

              <div className="form-floating mb-3  col-md-6">
                <input
                  type="number"
                  className={validClassHalfDayTotal}
                  placeholder="Enter HalfDay Total"
                  required
                  name="HalfDayTotal"
                  value={values.HalfDayTotal}
                  onChange={handleChange}
                />
                <label>
                  Half day total <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.HalfDayTotal && (
                  <p className="text-danger">{formErrors.HalfDayTotal}</p>
                )}
              </div>

              <div className="form-floating mb-3  col-md-6">
                <input
                  type="number"
                  className={validClassFullDayCapacity}
                  placeholder="Enter FullDay Capacity"
                  required
                  name="FullDayCapacity"
                  value={values.FullDayCapacity}
                  onChange={handleChange}
                />
                <label>
                  Full day capacity <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.FullDayCapacity && (
                  <p className="text-danger">{formErrors.FullDayCapacity}</p>
                )}
              </div>

              <div className="form-floating mb-3  col-md-6">
                <input
                  type="number"
                  className={validClassFullDayBasicValue}
                  placeholder="Enter FullDay Basic Value"
                  required
                  name="FullDayBasicValue"
                  value={values.FullDayBasicValue}
                  onChange={handleChange}
                />
                <label>
                  Full day basic value <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.FullDayBasicValue && (
                  <p className="text-danger">{formErrors.FullDayBasicValue}</p>
                )}
              </div>

              <div className="form-floating mb-3  col-md-6">
                <input
                  type="number"
                  className={validClassFullDayCentralGST}
                  placeholder="Enter FullDay Central GST"
                  required
                  name="FullDayCentralGST"
                  value={values.FullDayCentralGST}
                  onChange={handleChange}
                />
                <label>
                  Full day central GST <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.FullDayCentralGST && (
                  <p className="text-danger">{formErrors.FullDayCentralGST}</p>
                )}
              </div>

              <div className="form-floating mb-3  col-md-6">
                <input
                  type="number"
                  className={validClassFullDayStateGST}
                  placeholder="Enter FullDay State GST"
                  required
                  name="FullDayStateGST"
                  value={values.FullDayStateGST}
                  onChange={handleChange}
                />
                <label>
                  Full day state GST <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.FullDayStateGST && (
                  <p className="text-danger">{formErrors.FullDayStateGST}</p>
                )}
              </div>

              <div className="form-floating mb-3  col-md-6">
                <input
                  type="number"
                  className={validClassFullDayTotal}
                  placeholder="Enter FullDay Total"
                  required
                  name="FullDayTotal"
                  value={values.FullDayTotal}
                  onChange={handleChange}
                />
                <label>
                  Full day total <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.FullDayTotal && (
                  <p className="text-danger">{formErrors.FullDayTotal}</p>
                )}
              </div>

              <div className="form-floating mb-3  col-md-6">
                <input
                  type="number"
                  className={validClassSortOrder}
                  placeholder="Enter Sort Order"
                  required
                  name="SortOrder"
                  value={values.SortOrder}
                  onChange={handleChange}
                />
                <label>
                  Sort Order <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.SortOrder && (
                  <p className="text-danger">{formErrors.SortOrder}</p>
                )}
              </div>

              <Col lg={6}>
                <label>
                  Icon <span className="text-danger">*</span>
                </label>

                <input
                  type="file"
                  name="Icon"
                  className={validClassIcon}
                  // accept="images/*"
                  accept=".jpg, .jpeg, .png"
                  onChange={PhotoUpload}
                />
                {isSubmit && <p className="text-danger">{formErrors.Icon}</p>}
                {checkImagePhoto ? (
                  <img
                    //   src={image ?? myImage}
                    className="m-2"
                    src={photoAdd}
                    alt="Icon"
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
            <div className="row">
              <div className="form-floating mb-3">
                <Input
                  type="text"
                  className={validClassName}
                  placeholder="Enter Name "
                  required
                  name="Name"
                  value={Name}
                  onChange={handleChange1}
                />
                <Label>
                  Name<span className="text-danger">*</span>{" "}
                </Label>
                {isSubmit && <p className="text-danger">{formErrors.Name}</p>}
              </div>
              <div className="mb-3">
                <Label>
                  Description<span className="text-danger">*</span>{" "}
                </Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={values.Desc}
                  onChange={handleCKEditorChange}
                />
                {isSubmit && <p className="text-danger">{formErrors.Name}</p>}
                {isSubmit && formErrors.Desc && (
                  <p className="text-danger">{formErrors.Desc}</p>
                )}
              </div>

              <div className="form-floating mb-3 col-md-6">
                <input
                  type="number"
                  className={validClassHalfDayCapacity}
                  placeholder="Enter HalfDay Capacity"
                  required
                  name="HalfDayCapacity"
                  value={values.HalfDayCapacity}
                  onChange={handleChange}
                />
                <label>
                  Half day capacity <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.HalfDayCapacity && (
                  <p className="text-danger">{formErrors.HalfDayCapacity}</p>
                )}
              </div>

              <div className="form-floating mb-3 col-md-6">
                <input
                  type="number"
                  className={validClassHalfDayBasicValue}
                  placeholder="Enter HalfDay Basic Value"
                  required
                  name="HalfDayBasicValue"
                  value={values.HalfDayBasicValue}
                  onChange={handleChange}
                />
                <label>
                  Half day basic value <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.HalfDayBasicValue && (
                  <p className="text-danger">{formErrors.HalfDayBasicValue}</p>
                )}
              </div>

              <div className="form-floating mb-3 col-md-6">
                <input
                  type="number"
                  className={validClassHalfDayCentralGST}
                  placeholder="Enter HalfDay Central GST"
                  required
                  name="HalfDayCentralGST"
                  value={values.HalfDayCentralGST}
                  onChange={handleChange}
                />
                <label>
                  Half day central GST <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.HalfDayCentralGST && (
                  <p className="text-danger">{formErrors.HalfDayCentralGST}</p>
                )}
              </div>

              <div className="form-floating mb-3 col-md-6">
                <input
                  type="number"
                  className={validClassHalfDayStateGST}
                  placeholder="Enter HalfDay State GST"
                  required
                  name="HalfDayStateGST"
                  value={values.HalfDayStateGST}
                  onChange={handleChange}
                />
                <label>
                  Half day state GST <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.HalfDayStateGST && (
                  <p className="text-danger">{formErrors.HalfDayStateGST}</p>
                )}
              </div>

              <div className="form-floating mb-3  col-md-6">
                <input
                  type="number"
                  className={validClassHalfDayTotal}
                  placeholder="Enter HalfDay Total"
                  required
                  name="HalfDayTotal"
                  value={values.HalfDayTotal}
                  onChange={handleChange}
                />
                <label>
                  Half day total <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.HalfDayTotal && (
                  <p className="text-danger">{formErrors.HalfDayTotal}</p>
                )}
              </div>

              <div className="form-floating mb-3  col-md-6">
                <input
                  type="number"
                  className={validClassFullDayCapacity}
                  placeholder="Enter FullDay Capacity"
                  required
                  name="FullDayCapacity"
                  value={values.FullDayCapacity}
                  onChange={handleChange}
                />
                <label>
                  Full day capacity <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.FullDayCapacity && (
                  <p className="text-danger">{formErrors.FullDayCapacity}</p>
                )}
              </div>

              <div className="form-floating mb-3  col-md-6">
                <input
                  type="number"
                  className={validClassFullDayBasicValue}
                  placeholder="Enter FullDay Basic Value"
                  required
                  name="FullDayBasicValue"
                  value={values.FullDayBasicValue}
                  onChange={handleChange}
                />
                <label>
                  Full day basic value <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.FullDayBasicValue && (
                  <p className="text-danger">{formErrors.FullDayBasicValue}</p>
                )}
              </div>

              <div className="form-floating mb-3  col-md-6">
                <input
                  type="number"
                  className={validClassFullDayCentralGST}
                  placeholder="Enter FullDay Central GST"
                  required
                  name="FullDayCentralGST"
                  value={values.FullDayCentralGST}
                  onChange={handleChange}
                />
                <label>
                  Full day central GST <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.FullDayCentralGST && (
                  <p className="text-danger">{formErrors.FullDayCentralGST}</p>
                )}
              </div>

              <div className="form-floating mb-3  col-md-6">
                <input
                  type="number"
                  className={validClassFullDayStateGST}
                  placeholder="Enter FullDay State GST"
                  required
                  name="FullDayStateGST"
                  value={values.FullDayStateGST}
                  onChange={handleChange}
                />
                <label>
                  Full day state GST <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.FullDayStateGST && (
                  <p className="text-danger">{formErrors.FullDayStateGST}</p>
                )}
              </div>

              <div className="form-floating mb-3  col-md-6">
                <input
                  type="number"
                  className={validClassFullDayTotal}
                  placeholder="Enter FullDay Total"
                  required
                  name="FullDayTotal"
                  value={values.FullDayTotal}
                  onChange={handleChange}
                />
                <label>
                  Full day total <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.FullDayTotal && (
                  <p className="text-danger">{formErrors.FullDayTotal}</p>
                )}
              </div>

              <div className="form-floating mb-3  col-md-6">
                <input
                  type="number"
                  className={validClassSortOrder}
                  placeholder="Enter Sort Order"
                  required
                  name="SortOrder"
                  value={values.SortOrder}
                  onChange={handleChange}
                />
                <label>
                  Sort Order <span className="text-danger">*</span>
                </label>
                {isSubmit && formErrors.SortOrder && (
                  <p className="text-danger">{formErrors.SortOrder}</p>
                )}
              </div>

              <Col lg={6}>
                <label>
                  Icon <span className="text-danger">*</span>
                </label>

                <input
                  type="file"
                  name="Icon"
                  className={validClassIcon}
                  // accept="images/*"
                  accept=".jpg, .jpeg, .png"
                  onChange={PhotoUpload}
                />
                {isSubmit && <p className="text-danger">{formErrors.Icon}</p>}
                {checkImagePhoto ? (
                  <img
                    //   src={image ?? myImage}
                    className="m-2"
                    src={photoAdd}
                    alt="Icon"
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

export default HallBooking;
