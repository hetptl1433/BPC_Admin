import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

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



import { getBookingDetails, getExtraBookingDetailsData, removeBookingDetails } from "../../functions/BookingDetails/BookingDetails";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const initialState = {
  HallName: "",
  BookTime: "",
  BookDate: "",
  CompanyName: "",
  ContactPerson: "",
  Email: "",
  Mobile: "",
  Total: "",
  IsActive: true,
};
const BookingDetails = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [submiited, setSubmitted] = useState(false);
  
  const [extraBookData, setExtraBookData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [addedItems, setAddedItems] = useState([]);


  const [_id, set_Id] = useState("");



const [activityList, setActivityList] = useState([]);
const [formData, setFormData] = useState({
  HallName: "",
  BookTime: "",
  BookDate: "",
  CompanyName: "",
  ContactPerson: "",
  Email: "",
  Mobile: "",
  Total: "",
  IsActive: true,
});

  
  const calculateTotal = (id, price,Quantity) => {
    const quantity = Quantity || 1; // Default to 1 if quantity is not set yet
    return quantity * price;
  };


  const [remove_id, setRemove_id] = useState("");

  //search and pagination state
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [values, setValues] = useState(initialState);

const {
 HallName,
  BookTime,
  BookDate,
  CompanyName,
  ContactPerson,
  Email,
  Mobile,
  Total,
  IsActive,
} = formData;


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
      name: "Hall Name",
      selector: (row) => row.HallName,
      sortable: true,
      sortField: "HallName",
      maxWidth: "250px",
    },
    {
      name: "Company Name",
      selector: (row) => row.CompanyName,
      sortable: false,
      sortField: "CompanyName",
      maxWidth: "700px",
    },
    {
      name: "Contact Person ",
      selector: (row) => row.ContactPerson,
      sortable: false,
      sortField: "ContactPerson",
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
                  View
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
        `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-by-params/BookingDetails`,
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
      });

    setLoading(false);
  };

  const [errDS, setErrDS] = useState(false);
  const [errCN, setErrCN] = useState(false);
 



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

  

  const [modal_list, setModalList] = useState(false);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

 






  const tog_list = () => {
    setModalList(!modal_list);
    setIsSubmit(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeBookingDetails(remove_id)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchProducts();
                toast.success("Data deleted Successfully!");

      })
      .catch((err) => {
        console.log(err);
      });
  };




  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setUpdateForm(false);
    setShowForm(false);
    setValues(initialState);
  };

 const handleTog_edit = (_id) => {
   setIsSubmit(false);
   setUpdateForm(true);

   set_Id(_id);
   console.log(_id);
   setFormErrors(false);

   getBookingDetails(_id)
     .then((res) => {
       setFormData((prevFormData) => ({
         ...prevFormData,
         HallName: res.HallName,
         BookTime: res.BookTime,
         BookDate: res.BookDate,
         CompanyName: res.CompanyName,
         ContactPerson: res.ContactPerson,
         Email: res.Email,
         Mobile: res.Mobile,
         Total: res.Total,
        
         IsActive: res.IsActive,
       }));
       // Use res.EmailID directly here
       return getExtraBookingDetailsData(res._id);
     })
     .then((res) => {
      setExtraBookData(res);
      
     })
     .catch((err) => {
       console.log("Error:", err);
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
  document.title = "Booking Details | BPC";

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Booking Details"
            title="Booking Details"
            pageTitle="CMS"
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Booking Details
                      </h2>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div
                        style={{
                          display: showForm || updateForm ? "none" : "",
                        }}
                      >
                        <div className="text-end mt-1">
                          {/* <Input
                            type="checkbox"
                            className="form-check-input"
                            name="filter"
                            value={filter}
                            defaultChecked={true}
                            onChange={handleFilter}
                          />
                          <Label className="form-check-label ms-2">
                            Active
                          </Label> */}
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
                        ></div>

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

                {/* View FORM  */}
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
                            <Row>
                              <Col lg={6}>
                                <div className="form-floating mb-3">
                                  <Input
                                    type="text"
                                    required
                                    readOnly
                                    name="HallName"
                                    value={formData.HallName}
                                  />
                                  <Label>
                                    Hall Name{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </div>
                              </Col>
                              <Col lg={6} />
                              <Col lg={6}>
                                <div className="form-floating mb-3">
                                  <Input
                                    type="text"
                                    required
                                    readOnly
                                    name="CompanyName"
                                    value={formData.CompanyName}
                                  />
                                  <Label>
                                    Company Name{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="form-floating mb-3">
                                  <Input
                                    type="text"
                                    required
                                    readOnly
                                    name="ContactPerson"
                                    value={formData.ContactPerson}
                                  />
                                  <Label>
                                    Company Name{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="form-floating mb-3">
                                  <Input
                                    type="text"
                                    required
                                    name="Email"
                                    readOnly
                                    value={formData.Email}
                                  />
                                  <Label>
                                    Email <span className="text-danger">*</span>
                                  </Label>
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="form-floating mb-3">
                                  <Input
                                    type="text"
                                    required
                                    name="Mobile"
                                    readOnly
                                    value={formData.Mobile}
                                  />
                                  <Label>
                                    Mobile{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </div>
                              </Col>

                              <table className="table table-bordered mt-3">
                                <thead>
                                  <tr>
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col" style={{ width: "155px" }}>
                                      Quantity
                                    </th>
                                    <th scope="col">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {extraBookData.map((item, index) => (
                                    <tr key={item._id}>
                                      <td>{index + 1}</td>
                                      <td>{item.Name}</td>
                                      <td>{item.Price.toFixed(2)}</td>
                                      <td>{item.Quantity || 1}</td>
                                      <td>
                                        <input
                                          type="text"
                                          readOnly
                                          value={calculateTotal(
                                            item._id,
                                            item.Price,
                                            item.Quantity
                                          ).toFixed(2)}
                                          className="form-control"
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <Col lg={6}>
                                <div className="form-floating mb-3">
                                  <Input
                                    type="text"
                                    required
                                    name="Total"
                                    value={formData.Total}
                                    readOnly
                                  />
                                  <Label>
                                    Total <span className="text-danger">*</span>
                                  </Label>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>{" "}
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
          <span style={{ marginRight: "210px" }}>Remove Record</span>
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

export default BookingDetails; 
