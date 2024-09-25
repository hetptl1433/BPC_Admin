import React, { useState, useEffect, useRef } from "react";
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

import { getPointMaster, getResultAns, getResultData , removeResultData} from "../../functions/ResultPage/ResultPage";
import { Route, useParams } from "react-router-dom";
import { Select } from "antd";
import { listIndustry } from "../../functions/Industry/Industry";
import { getTestCategory, listTestCategory } from "../../functions/TestCat/TestCat";
import { listTestCatMasterDetails } from "../../functions/TextCategoryMaster/TextCatMaster";
import { toast, ToastContainer } from "react-toastify";


const ResultPage = () => {
   const [values, setValues]= useState("");
   const {tid}= useParams();

 
   


  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [_id, set_Id] = useState("");
  const [PointData, setPointData] = useState([]);
  const [allPoint, setAllPoint] = useState([]);
  const [resultPoint, setResultPoint] = useState(0);

  const initialState = {
    UserRegCode: "",
    ExamName: "",
    ExamDate:"",
    TotalTime: "",
    TotalQues: "",
    Name: "",
    Email: "",
    Mobile:"",
    UserName:"",
    TotalPoints:"",

  
  };

  

  const [remove_id, setRemove_id] = useState("");

  //search and pagination state
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [IndustryCategory, setIndustryCategories] = useState([]);
  

    const { category, productName, productImage, IsActive } = values;


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
      name: "TestName",
      selector: (row) => row.testDetails.TestName,
      sortable: true,
      sortField: "TestName",
      minWidth: "150px",
    },

    {
      name: "ExamDate",
      selector: (row) => new Date(row.ExamDate).toLocaleDateString(), // Formats the date
      sortable: true,
      sortField: "ExamDate",
      minWidth: "70px",
    },

    {
      name: "ExamUniqueID",
      selector: (row) => row._id,
      sortable: true,
      sortField: "_id",
      minWidth: "150px",
    },
 {
  name: "Name/Email/Mobile/UserName/Password",
  selector: (row) =>
    `${row.userDetails.Name} / ${row.userDetails.Email} / ${row.userDetails.Mobile} / ${row.userDetails.UserName} / ${row.userDetails.Password}`,
  sortable: true,
  sortField: "UserName",
  minWidth: "200px",
  cell: (row) => (
    <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
      {`${row.userDetails.Name} / ${row.userDetails.Email} / ${row.userDetails.Mobile} / ${row.userDetails.UserName} / ${row.userDetails.Password}`}
    </div>
  ),
}
,

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
 const aggregatePoints = (data) => {
   const aggregated = {};

   data.forEach((item) => {

    if(item.pointMasterId?.PointID){
     const id = item.pointMasterId.PointID;
     if (!aggregated[id]) {
       aggregated[id] = {
         name: item.pointMasterId.PointMasterName,
         totalPoints: 0,
       };
     }
     aggregated[id].totalPoints += parseInt(
       item.pointMasterId.PointMasterPoints,
       10
     );
    }
    else{
      console.log("yee");
    }
   });

   return Object.values(aggregated);
 };
  const aggregatedData = aggregatePoints(PointData);

   useEffect(() => {
     // Calculate the total points
     const totalPoints = aggregatedData.reduce(
       (acc, item) => acc + item.totalPoints,
       0
     );
     // Update the resultPoint state
     setResultPoint(totalPoints);
   }, [aggregatedData]);

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
        `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-by-params/ResultData/${tid}`,
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

  const [errPN, setErrPN] = useState(false);
  const [errCN, setErrCN] = useState(false);
  const [errPI, setErrPI] = useState(false);
  const [errwt, setErrwt] = useState(false);
  const [errut, setErrut] = useState(false);

  const [errPr, setErrPr] = useState(false);

 

  const validClassCategory =
    errCN && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassUnit =
    errCN && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassPN =
    errPN && isSubmit ? "form-control is-invalid" : "form-control";
  const validClasswt =
    errwt && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassPr =
    errPr && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassPI =
    errPI && isSubmit ? "form-control is-invalid" : "form-control";

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
    removeResultData(remove_id)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchProducts();
        toast.success("Data deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleUpdate = (e) => {
  //   e.preventDefault();

  //   setIsSubmit(true);
   
  //   const formdata = new FormData();

  //   formdata.append("myFile", values.productImage);
  //     formdata.append("category", values.category);
  //     formdata.append("productName", values.productName);
  //     formdata.append("IsActive", values.IsActive);
  //   updateresultdata(_id, formdata)
  //     .then((res) => {
  //       // setmodal_edit(!modal_edit);
  //       setPhotoAdd("");
  //       setUpdateForm(false);

  //       fetchProducts();
  //       setCheckImagePhoto(false);
  //       setValues(initialState);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
    
  // };



  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setPhotoAdd("");
    setUpdateForm(false);
    setShowForm(false);

    setCheckImagePhoto(false);
    setValues(initialState);
  };

 const handleTog_edit = async (_id) => {
   try {
     // setmodal_edit(!modal_edit); // Uncomment if needed
     setIsSubmit(false);
     setUpdateForm(true);
     set_Id(_id);
     setFormErrors(false);

     // First API call to get initial data
     const res = await getResultData(_id);

     // Set the initial form values
   
     
     const examDate = new Date(res.ExamDate);

     const day = examDate.getDate().toString().padStart(2, "0");
     const month = (examDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
     const year = examDate.getFullYear();

     const formattedDate = `${day}-${month}-${year}`;
       setValues({
         ...values,
         UserRegCode: res.userId._id,
         ExamName: res.id.TestName,
         TotalTime: res.id.TotalTime,
         TotalQues: res.id.TotalQues,
         ExamDate: formattedDate,
         Name: res.userId.Name,
         Email: res.userId.Email,
         Mobile: res.userId.Mobile,
         UserName: res.userId.UserName,
       });
     // Second API call with additional parameters (if needed)
     const detailedRes = await getResultAns(res.userId._id, res.id._id);
     setPointData(detailedRes);


     const TotalpointCategory= await getPointMaster(res.id._id);
     setAllPoint(TotalpointCategory);


   } catch (err) {
     console.log(err);
   }
 };

 
 

  useEffect(()=>{
    console.log(values)
  },[values])

  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const [photoAdd, setPhotoAdd] = useState();
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);

 

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };

  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };
  document.title = "Result | BPC india";

  return (
    <React.Fragment>
      <ToastContainer/>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Result"
            title="Result data"
            pageTitle="Result data"
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Result data</h2>
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
                        >
                          <Row>
                            <Col lg={12}>
                            
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
                                  className="btn bg-success text-light mb-3 no-print"
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

                {/* Excel FORM  */}
               
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
                                  <Col xxl={8}>
                                    <Row>
                                      <Col lg={6}>
                                        <div className="form-floating mb-3">
                                          <input
                                            type="text"
                                            className={validClassPN}
                                            required
                                            readOnly
                                            value={values.ExamName}
                                          />
                                          <label
                                            htmlFor="role-field"
                                            className="form-label"
                                          >
                                            Test Category
                                          </label>
                                        </div>
                                      </Col>
                                      <Col lg={6}>
                                        <div className="form-floating mb-3">
                                          <input
                                            type="text"
                                            className={validClassPN}
                                            required
                                            readOnly
                                            value={values.UserRegCode}
                                          />
                                          <label
                                            htmlFor="role-field"
                                            className="form-label"
                                          >
                                            UserRegisteration
                                          </label>
                                        </div>
                                      </Col>
                                      <Col lg={6}>
                                        <div className="form-floating mb-3">
                                          <input
                                            type="text"
                                            className={validClassPN}
                                            required
                                            readOnly
                                            value={values.ExamDate}
                                          />
                                          <label
                                            htmlFor="role-field"
                                            className="form-label"
                                          >
                                            Exam Date
                                          </label>
                                        </div>
                                      </Col>
                                      <Col lg={6}>
                                        <div className="form-floating mb-3">
                                          <input
                                            type="text"
                                            className={validClassPN}
                                            required
                                            readOnly
                                            value={values.UserName}
                                          />
                                          <label
                                            htmlFor="role-field"
                                            className="form-label"
                                          >
                                            User Name
                                          </label>
                                        </div>
                                      </Col>
                                      <Col lg={6}>
                                        <div className="form-floating mb-3">
                                          <input
                                            type="text"
                                            className={validClassPN}
                                            required
                                            readOnly
                                            value={values.TotalTime}
                                          />
                                          <label
                                            htmlFor="role-field"
                                            className="form-label"
                                          >
                                            Total Time(seconds)
                                          </label>
                                        </div>
                                      </Col>
                                      <Col lg={6}>
                                        <div className="form-floating mb-3">
                                          <input
                                            type="text"
                                            className={validClassPN}
                                            required
                                            readOnly
                                            value={values.Email}
                                          />
                                          <label
                                            htmlFor="role-field"
                                            className="form-label"
                                          >
                                            Email
                                          </label>
                                        </div>
                                      </Col>{" "}
                                      <Col lg={6}>
                                        <div className="form-floating mb-3">
                                          <input
                                            type="text"
                                            className={validClassPN}
                                            required
                                            readOnly
                                            value={resultPoint}
                                          />
                                          <label
                                            htmlFor="role-field"
                                            className="form-label"
                                          >
                                            Total Point
                                          </label>
                                        </div>
                                      </Col>{" "}
                                      <Col lg={6}>
                                        <div className="form-floating mb-3">
                                          <input
                                            type="text"
                                            className={validClassPN}
                                            required
                                            readOnly
                                            value={values.Mobile}
                                          />
                                          <label
                                            htmlFor="role-field"
                                            className="form-label"
                                          >
                                            Mobile
                                          </label>
                                        </div>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col xxl={4}>
                                    <div className="text-end">
                                      <button
                                        type="button"
                                        className="btn btn-outline-success m-1 no-print"
                                        onClick={() => {
                                          window.print();
                                        }}
                                      >
                                        Print
                                      </button>
                                    </div>
                                  </Col>

                                  <Row className="mt-5">
                                    <Col lg={6}>
                                      <div className="result-page">
                                        <table>
                                          <thead>
                                            <tr>
                                              <th>Answer Selected</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {PointData.map((entry, index) => (
                                              <div
                                                className="table-row pp"
                                                key={index}
                                              >
                                                <div className="answer-selected m-1">
                                                  {index + 1}
                                                  <label>
                                                    <input
                                                      type="radio"
                                                      value="A"
                                                      checked={
                                                        entry.selectedOption ===
                                                        "A"
                                                      }
                                                      readOnly
                                                    />{" "}
                                                    A
                                                  </label>
                                                  <label>
                                                    <input
                                                      type="radio"
                                                      value="B"
                                                      checked={
                                                        entry.selectedOption ===
                                                        "B"
                                                      }
                                                      readOnly
                                                    />{" "}
                                                    B
                                                  </label>
                                                  <label>
                                                    <input
                                                      type="radio"
                                                      value="C"
                                                      checked={
                                                        entry.selectedOption ===
                                                        "C"
                                                      }
                                                      readOnly
                                                    />{" "}
                                                    C
                                                  </label>
                                                  <label>
                                                    <input
                                                      type="radio"
                                                      value="D"
                                                      checked={
                                                        entry.selectedOption ===
                                                        "D"
                                                      }
                                                      readOnly
                                                    />{" "}
                                                    D
                                                  </label>
                                                </div>
                                                <div className="points-table">
                                                  {/* This represents any other data that relates to points */}
                                                  {/* {
                                                    entry.pointMasterId
                                                      .PointMasterTitle
                                                  } */}
                                                </div>
                                                <div className="points-gain">
                                                  {/* Displaying the points */}
                                                  {/* {
                                                    entry.pointMasterId
                                                      .PointMasterName
                                                  }
                                                  :{" "}
                                                  {
                                                    entry.pointMasterId
                                                      .PointMasterPoints
                                                  } */}
                                                </div>
                                              </div>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </Col>
                                    <Col lg={6}>
                                      <div className="result-page">
                                        <Row>
                                          <Col lg={6}>
                                            <div>
                                              <h2>Points Table</h2>
                                              <table
                                                border="1"
                                                cellPadding="10"
                                                cellSpacing="0"
                                              >
                                                <tbody>
                                                  {allPoint
                                                    .slice() // Create a shallow copy of the array to avoid mutating the original array
                                                    .sort(
                                                      (a, b) =>
                                                        b.PointMasterPoints -
                                                        a.PointMasterPoints
                                                    ) // Sort in descending order
                                                    .map((item) => (
                                                      <tr key={item._id}>
                                                        <td>
                                                          {
                                                            item.PointMasterTitle
                                                          }
                                                        </td>
                                                        <td>
                                                          {
                                                            item.PointMasterPoints
                                                          }
                                                        </td>
                                                      </tr>
                                                    ))}
                                                </tbody>
                                              </table>
                                            </div>
                                          </Col>
                                          <Col lg={6}>
                                            <div>
                                              <h2>Points Gain</h2>
                                              <table
                                                border="1"
                                                cellPadding="10"
                                              >
                                                <thead>
                                                  <tr>
                                                    <th>Points Gain</th>
                                                    <th>Score</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {aggregatedData.map(
                                                    (item, index) => (
                                                      <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>
                                                          {item.totalPoints}
                                                        </td>
                                                      </tr>
                                                    )
                                                  )}
                                                </tbody>
                                              </table>
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Col lg={12}>
                                    <div className="text-end">
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger m-1 no-print"
                                        onClick={handleUpdateCancel}
                                      >
                                        close
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

export default ResultPage;
