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
import { ToastContainer, toast } from "react-toastify";

import { listLEDActiveCategory } from "../../functions/TestCat/TestCat";
import { getLegacyTestCategory } from "../../functions/LegacyTestCategory/LegacyTestCategory";
import { createTestCatMasterDetails, getTestCatMasterDetails, listTestCatMasterDetails, removeTestCatMasterDetails, updateTestCatMasterDetails } from "../../functions/TextCategoryMaster/TextCatMaster";
import { useNavigate } from "react-router-dom";
import { listIndustry } from "../../functions/Industry/Industry";
import { excelResultData } from "../../functions/ResultPage/ResultPage";
import { saveAs } from "file-saver"; 
const LegacyResult = () => {
  const navigate = useNavigate();
   const [testCategories, setTestCategories] = useState([]);
  const [testCategory, setTestCategory] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [industries, setIndustries] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [_id, set_Id] = useState("");
  const [hetid, sethetid] = useState("");
const handleChangeIndustry = (e) => {
  setSelectedIndustry(e.target.value);
};
const handleChangeTest = (e) => {
  setTestCategory(e.target.value);
};
const handleStartDate = (e) => {
  setStartDate(e.target.value);
};
const handleEndDate = (e) => {
  setEndDate(e.target.value);
};

 const loadIndustry = () => {
   listIndustry().then((res) => setIndustries(res));
 };
 const loadTestCategory = () => {
   listTestCatMasterDetails().then((res) => setTestCategories(res));
 };
const ExportExcel = async () => {
  const requestData = {
    testCategory: testCategory, // Assumes testCategory is defined
    industry: selectedIndustry, // Assumes selectedIndustry is defined
    startDate: startDate, // Assumes startDate is defined
    endDate: endDate, // Assumes endDate is defined
  };

  try {
    // Make POST request with responseType 'blob' to handle binary data
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/ResultExcel`,
      requestData,
      {
        headers: { "Content-Type": "application/json" },
        responseType: "blob", // Important for downloading the file
      }
    );
const blob = new Blob([response], {
  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
});

// Create a link element for download
const link = document.createElement("a");
link.href = window.URL.createObjectURL(blob);
link.download = "ResultData.xlsx"; // Name of the file

// Append the link to the body (necessary for Firefox)
document.body.appendChild(link);
link.click(); // Trigger download

// Remove the link after the download
document.body.removeChild(link);
window.URL.revokeObjectURL(link.href);
    // Check if the response is valid
  
  } catch (error) {
    console.error(
      "Error exporting Excel data:",
      error.response?.data || error.message || error
    );
  }
};

 useEffect(() => {
   loadIndustry();
   loadTestCategory();
 }, []);



  const [remove_id, setRemove_id] = useState("");

  //search and pagination state
  const [query, setQuery] = useState("");
  const [counter, setCounter] = useState(0);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);



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
    // {
    //   name: "Test Category",
    //   selector: (row) => row.category.categoryName,
    //   sortable: true,
    //   sortField: "TestCatgeory",
    //   minWidth: "150px",
    // },
    {
      name: "Test Name",
      selector: (row) => row.TestCategoryName, // Directly access the TestCategoryName property
      sortable: true,
      sortField: "TestName",
      minWidth: "150px",
    },
    {
      name: "Total Question",
      selector: (row) => row.TotalQuestion, // Directly access the TestCategoryName property
      sortable: true,
      sortField: "TotalQuestion",
      minWidth: "150px",
    },

    {
      name: "Action",
      selector: (row) => {
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
              <div className="edit">
                <button
                  className="btn btn-sm btn-info edit-item-btn "
                  data-bs-toggle="modal"
                  data-bs-target="#showModal"
                  onClick={() => handleTog_edit(row.TestCategoryId)}
                >
                  View
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
      .post(`${process.env.REACT_APP_API_URL_BPC}/api/legacy-test-categories`, {
        skip: skip,
        per_page: perPage,
        sorton: column,
        sortdir: sortDirection,
        match: query,
        IsActive: filter,
      })
      .then((response) => {
        if (response.success && response.data.length > 0) {
          let res = response.data;
          setLoading(false);
          setData(res); // Set the array of data directly
          setTotalRows(res.length); // Set total rows based on the length of the data array
          console.log("WDDAW", res); // Log the received data
        } else if (response.success && response.data.length === 0) {
          setData([]); // If data is an empty array
        }
      });

    setLoading(false);
  };


 



 const [errCN, setErrCN] = useState(false);
const [errTN, setErrTN] = useState(false);
const [errTQ, setErrTQ] = useState(false);
const [errTT, setErrTT] = useState(false);
const [errPI, setErrPI] = useState(false);
const [errDesc, setErrDesc] = useState(false);
const [errHDesc, setErrHDesc] = useState(false);
const [errGDesc, setErrGDesc] = useState(false);
const [errEDesc, setErrEDesc] = useState(false);




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



  const [ledCategories, setLEDCategories] = useState([]);

  useEffect(() => {
    loadLEDCategories();
  }, []);

  const loadLEDCategories = () => {
    listLEDActiveCategory().then((res) => setLEDCategories(res));
  };



  const handleDelete = (e) => {
    e.preventDefault();
    removeTestCatMasterDetails(remove_id)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchProducts();
        toast.success("Data deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };




 

 
  const handleTog_edit = (_id) => {
     navigate(`/LegacyResult/${_id}`);  
    
  };
  
  
  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
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

      image.onload = () => {
        const width = image.width;
        const height = image.height;

        // Now, you have the image width and height available.
        // You can use this information when sending the image to the backend.
      };

      setPhotoAdd(imageurl);
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
  document.title = " Legacy Result | BPC India";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Result"
            title="Test Category(Result) "
            pageTitle="CMS"
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Test Category Master
                      </h2>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div
                        style={{
                          display: showForm || updateForm ? "none" : "",
                        }}
                      >
                        {/* <div className="text-end mt-1">
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
                        </div> */}
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
                          <div className="d-flex justify-content-sm-end">
                            <div>
                              <Button
                                color="primary"
                                className="add-btn me-1"
                                onClick={() => {
                                  setShowForm(!showForm);
                                }}
                              >
                                Export to Excel
                              </Button>
                            </div>
                          </div>
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

                {/* Excel FORM  */}
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
                              <Row>
                                <Col lg={6}>
                                  <div className="form-floating mb-3">
                                    <Input
                                      type="date"
                                      className="form-control"
                                      placeholder="Enter Point Name"
                                      id="PointMasterName"
                                      name="PointMasterName"
                                      value={startDate}
                                      onChange={handleStartDate}
                                    />
                                    <Label>
                                      Start Date{" "}
                                      <span className="text-danger">*</span>
                                    </Label>
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.PointMasterName}
                                      </p>
                                    )}
                                  </div>
                                </Col>
                                <Col lg={6}>
                                  <div className="form-floating mb-3">
                                    <Input
                                      type="date"
                                      className="form-control"
                                      placeholder="Enter Point Name"
                                      id="PointMasterName"
                                      name="PointMasterName"
                                      value={endDate}
                                      onChange={handleEndDate}
                                    />
                                    <Label>
                                      End Date{" "}
                                      <span className="text-danger">*</span>
                                    </Label>
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.PointMasterName}
                                      </p>
                                    )}
                                  </div>
                                </Col>
                                <Col lg={6}>
                                  <div className="form-floating mb-3">
                                    <select
                                      name="IndustryCategory"
                                      className="form-control"
                                      onChange={handleChangeIndustry}
                                      value={selectedIndustry} // Ensure this matches the state variable
                                    >
                                      <option value="">Select Industry</option>
                                      {industries.map((c) => {
                                        return (
                                          <React.Fragment key={c._id}>
                                            {c.IsActive && (
                                              <option value={c._id}>
                                                {c.Name}
                                              </option>
                                            )}
                                          </React.Fragment>
                                        );
                                      })}
                                    </select>
                                    <Label>
                                      Industries{" "}
                                      <span className="text-danger">*</span>
                                    </Label>
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.IndustryCategory}
                                      </p>
                                    )}
                                  </div>
                                </Col>
                                <Col lg={6}>
                                  <div className="form-floating mb-3">
                                    <select
                                      name="IndustryCategory"
                                      className="form-control"
                                      onChange={handleChangeTest}
                                      value={testCategory} // Ensure this matches the state variable
                                    >
                                      <option value="">Select Category</option>
                                      {testCategories.map((c) => {
                                        return (
                                          <React.Fragment key={c._id}>
                                            {c.IsActive && (
                                              <option value={c._id}>
                                                {c.TestName}
                                              </option>
                                            )}
                                          </React.Fragment>
                                        );
                                      })}
                                    </select>
                                    <Label>
                                      Test Name{" "}
                                      <span className="text-danger">*</span>
                                    </Label>
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.IndustryCategory}
                                      </p>
                                    )}
                                  </div>
                                </Col>
                                <Col lg={12}>
                                  <div className="text-end">
                                    <button
                                      className=" btn btn-primary m-1"
                                      id="add-btn"
                                      onClick={ExportExcel}
                                    >
                                      Export to Excel
                                    </button>
                                    
                                  </div>
                                </Col>
                              </Row>
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
                          <CardBody></CardBody>
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

export default LegacyResult;
