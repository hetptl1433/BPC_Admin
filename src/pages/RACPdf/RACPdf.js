import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import html2pdf from "html2pdf.js";

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

import {
  createRAC,
  getRAC,
  getRACData,
  removeRAC,
  updateRAC,
} from "../../functions/RAC/RAC";

const RACPdf = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [submiited, setSubmitted] = useState(false);

  const [_id, set_Id] = useState("");

  const initialState = {
    Organization: "",
    EmployeeCode: 0,
    Date: "",
    FullName: "",
    Designation: "",
    Department: "",
    Section: "",
    EmailID: "",
    MobileNo: 0,
    Reporting: "",
    DOB: "",
    DateofJoining: "",
    PreviousExperience: "",
    Educational: "",
    Achievement: "",
    Areaofinterest: "",
    Problem: "",
    Additionalresponsibility: "",
    Information: "",
    IsActive: true, // Assuming the default value is true
  };
  const [activityDetails, setActivityDetails] = useState({
    name: "",
    frequency: "",
    timePerFrequency: "",
    remarks: "",
  });
  const [activityList, setActivityList] = useState([]);
  const [formData, setFormData] = useState({
    Organization: "",
    EmployeeCode: "0",
    Date: "",
    FullName: "",
    Designation: "",
    Department: "",
    Section: "",
    EmailID: "",
    MobileNo: "0",
    Reporting: "",
    DOB: "",
    DateofJoining: "",
    PreviousExperience: "",
    Educational: "",
    Achievement: "",
    Areaofinterest: "",
    Problem: "",
    Additionalresponsibility: "",
    Information: "",
    IsActive: true,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [remove_id, setRemove_id] = useState("");

  //search and pagination state
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [values, setValues] = useState(initialState);

  const {
    Organization,
    EmployeeCode,
    Date,
    FullName,
    Designation,
    Department,
    Section,
    EmailID,
    MobileNo,
    Reporting,
    DOB,
    DateofJoining,
    PreviousExperience,
    Educational,
    Achievement,
    Areaofinterest,
    Problem,
    Additionalresponsibility,
    Information,
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
      name: "Organization Name",
      selector: (row) => row.Organization,
      sortable: true,
      sortField: "Organization",
      maxWidth: "250px",
    },
    {
      name: "Full Name",
      selector: (row) => row.FullName,
      sortable: false,
      sortField: "desc",
      maxWidth: "700px",
    },
    {
      name: "Email ",
      selector: (row) => row.EmailID,
      sortable: false,
      sortField: "EmailID",
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
        `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-by-params/RAS`,
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
    if (values.Organization === "") {
      errors.Organization = "Organization Name is required";
      setErrCN(true);
    }
    if (values.Organization !== "") {
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

  const [modal_list, setModalList] = useState(false);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const handleDelete = (e) => {
    e.preventDefault();
    removeRAC(remove_id)
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
    setIsSubmit(false);
    setUpdateForm(true);

    set_Id(_id);
    console.log(_id);
    setFormErrors(false);

    getRAC(_id)
      .then((res) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          Organization: res.Organization,
          EmployeeCode: res.EmployeeCode,
          Date: res.Date,
          FullName: res.FullName,
          Designation: res.Designation,
          Department: res.Department,
          Section: res.Section,
          EmailID: res.EmailID,
          MobileNo: res.MobileNo,
          Reporting: res.Reporting,
          DOB: res.DOB,
          DateofJoining: res.DateofJoining,
          PreviousExperience: res.PreviousExperience,
          Educational: res.Educational,
          Achievement: res.Achievement,
          Areaofinterest: res.Areaofinterest,
          Problem: res.Problem,
          Additionalresponsibility: res.Additionalresponsibility,
          Information: res.Information,
          IsActive: res.IsActive,
        }));

        // Use res.EmailID directly here
        return getRACData(res.EmailID);
      })
      .then((res) => {
        console.log(res);
        setActivityList(res);
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
  document.title = "RAC Details | BPC";

  return (
    <div>
      <React.Fragment>
        <Col xxl={12}>
          <Card className="">
            <CardBody>
              <form id="AddNewsform">
                <input name="__RequestVerificationToken" type="hidden" />
                {/* Header Start */}
                <Col xxl={4} className="mb-3 no-print">
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-outline-success m-1"
                      onClick={() => {
                        window.print();
                      }}
                    >
                      Print
                    </button>
                  </div>
                </Col>

                <section>
                  <div className="container">
                    <header id="headerMain">
                      <div className="table-responsive">
                        <table className="table table-bordered header_table">
                          <tbody>
                            <tr>
                              <th
                                rowSpan="2"
                                className="header_th"
                                style={{
                                  backgroundColor: "white",
                                  verticalAlign: "middle",
                                  textAlign: "center",
                                  padding: "0px",
                                  fontSize: "22px",
                                }}
                              >
                                ROUTINE ACTIVITY SHEET (ENGLISH)
                              </th>
                              <td style={{ padding: "0px" }}>Revision </td>
                              <td>C</td>
                            </tr>
                            <tr>
                              <td style={{ padding: "0px" }}>Document No.</td>
                              <td style={{ padding: "0px" }}>7.5.1.017(b)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </header>
                  </div>
                </section>
                {/* Header End */}
                {/* Organization Section Start */}
                <section>
                  <div className="container">
                    <div
                      className="company_name"
                      style={{
                        paddingBottom: "5px",
                        paddingTop: "10px",
                      }}
                    >
                      <div className="row">
                        <div className="col-md-4 ">
                          <label className="lbf">
                            <b>Name of the Organization:</b>
                            <small style={{ color: "red" }}>*</small>
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            className="input_control form-control Organization_input"
                            id="txtorganization"
                            name="Organization"
                            placeholder="Enter Organization Name"
                            type="text"
                            readOnly
                            value={formData.Organization}
                            onChange={handleChange}
                          />
                          {formErrors.Organization && (
                            <span className="has-error text-danger pull-right">
                              {formErrors.Organization}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-sm-12 col-md-6">
                        <label style={{ fontWeight: 400 }}>
                          Employee Code:
                        </label>
                        <input
                          autoComplete="off"
                          data-val="true"
                          data-val-number="The field EmployeeCode must be a number."
                          data-val-required="The EmployeeCode field is required."
                          id="txtemployeecode"
                          name="EmployeeCode"
                          placeholder="Enter Employee Code"
                          type="text"
                          readOnly
                          value={formData.EmployeeCode}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 col-md-6 date d-flex justify-end">
                        <label style={{ fontWeight: 400 }}>Date:</label>
                        <input
                          id="txtdate"
                          name="Date"
                          placeholder="Enter Date"
                          type="date"
                          readOnly
                          value={formData.Date}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </section>
                {/* Organization Section End */}
                {/* Detail Information Section Start */}
                <section>
                  <div className="container">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        style={{ marginTop: "10px" }}
                      >
                        <tbody>
                          <tr>
                            <th className="header_bg" scope="row">
                              Full Name{" "}
                              <small style={{ color: "red" }}>*</small>
                            </th>
                            <td>:</td>
                            <td>
                              <input
                                className="form-control input_control detail_input"
                                id="txtfname"
                                name="FullName"
                                placeholder="Enter Full Name"
                                type="text"
                                readOnly
                                value={formData.FullName}
                                onChange={handleChange}
                              />
                              {formErrors.FullName && (
                                <span className="has-error text-danger">
                                  {formErrors.FullName}
                                </span>
                              )}
                            </td>
                            <th className="header_bg" scope="row">
                              Designation
                            </th>
                            <td>:</td>
                            <td>
                              <input
                                className="form-control input_control detail_input"
                                id="txtdesignation"
                                name="Designation"
                                readOnly
                                placeholder="Enter Designation"
                                type="text"
                                value={formData.Designation}
                                onChange={handleChange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th className="header_bg" scope="row">
                              Department
                            </th>
                            <td>:</td>
                            <td>
                              <input
                                className="form-control input_control detail_input"
                                id="txtdepartment"
                                name="Department"
                                readOnly
                                placeholder="Enter Department"
                                type="text"
                                value={formData.Department}
                                onChange={handleChange}
                              />
                            </td>
                            <th className="header_bg" scope="row">
                              Section
                            </th>
                            <td>:</td>
                            <td>
                              <input
                                className="form-control input_control detail_input"
                                id="txtsection"
                                name="Section"
                                readOnly
                                placeholder="Enter Section"
                                type="text"
                                value={formData.Section}
                                onChange={handleChange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th className="header_bg" scope="row">
                              Email ID <small style={{ color: "red" }}>*</small>
                            </th>
                            <td>:</td>
                            <td>
                              <input
                                className="form-control input_control detail_input"
                                id="txtemail"
                                name="EmailID"
                                readOnly
                                placeholder="Enter Email"
                                type="email"
                                value={formData.EmailID}
                                onChange={handleChange}
                              />
                              {formErrors.EmailID && (
                                <span className="has-error text-danger">
                                  {formErrors.EmailID}
                                </span>
                              )}
                            </td>

                            <th className="header_bg" scope="row">
                              Mobile No.{" "}
                              <small style={{ color: "red" }}>*</small>
                            </th>
                            <td>:</td>
                            <td>
                              <input
                                className="form-control input_control detail_input"
                                id="txtmobile"
                                name="MobileNo"
                                readOnly
                                placeholder="Enter Mobile No"
                                type="text"
                                value={formData.MobileNo}
                                onChange={handleChange}
                              />
                              {formErrors.MobileNo && (
                                <span className="has-error text-danger">
                                  {formErrors.MobileNo}
                                </span>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th className="header_bg" scope="row">
                              Reporting to whom:(Name and Designation)
                            </th>
                            <td>:</td>
                            <td colSpan={4}>
                              <input
                                className=" w-97 form-control input_control   "
                                id="txtreporting"
                                name="Reporting"
                                readOnly
                                placeholder="Enter Reporting To"
                                type="text"
                                value={formData.Reporting}
                                onChange={handleChange}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="container">
                    <div className="table-responsive">
                      <div style={{ marginTop: "10px" }}>
                        <label>
                          <b>Personal Data:</b>
                        </label>
                      </div>
                      <table className="table second table-bordered">
                        <tbody>
                          <tr>
                            <th className="header_bg mahiti" scope="row">
                              1
                            </th>
                            <th className="header_bg">
                              Date of Birth &amp; Age in years
                            </th>
                            <td>:</td>
                            <td>
                              <input
                                className="form-control input_control"
                                name="DOB"
                                placeholder="Enter DOB &amp; Age"
                                type="text"
                                readOnly
                                value={formData.DOB}
                                onChange={handleChange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th className="header_bg mahiti" scope="row">
                              2
                            </th>
                            <th className="header_bg">Date of Joining</th>
                            <td>:</td>
                            <td>
                              <input
                                className="form-control input_control "
                                id="txtdateofjoining"
                                name="DateofJoining"
                                readOnly
                                placeholder="Enter Date of Joining"
                                type="text"
                                value={formData.DateofJoining}
                                onChange={handleChange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th className="header_bg mahiti" scope="row">
                              3
                            </th>
                            <th className="header_bg">
                              Previous Experience if any
                            </th>
                            <td>:</td>
                            <td>
                              <input
                                className="form-control input_control "
                                id="txtexperience"
                                name="PreviousExperience"
                                value={formData.PreviousExperience}
                                onChange={handleChange}
                                placeholder="Enter Previous Experience"
                                type="text"
                                readOnly
                              />
                            </td>
                          </tr>
                          <tr>
                            <th className="header_bg mahiti" scope="row">
                              4
                            </th>
                            <th className="header_bg">
                              Educational Qualification
                            </th>
                            <td>:</td>
                            <td>
                              <input
                                className="form-control input_control "
                                name="Educational"
                                placeholder="Enter Educational Qualification"
                                type="text"
                                readOnly
                                value={formData.Educational}
                                onChange={handleChange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th className="header_bg mahiti" scope="row">
                              5
                            </th>
                            <th className="header_bg">
                              Any special Achievement
                            </th>
                            <td>:</td>
                            <td>
                              <input
                                className="form-control input_control "
                                name="Achievement"
                                value={formData.Achievement}
                                onChange={handleChange}
                                readOnly
                                placeholder="Enter Achievement"
                                type="text"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th className="header_bg mahiti" scope="row">
                              6
                            </th>
                            <th className="header_bg">Area of interest</th>
                            <td>:</td>
                            <td>
                              <input
                                className="form-control input_control "
                                id="txtareaofinterest"
                                name="Areaofinterest"
                                readOnly
                                value={formData.Areaofinterest}
                                onChange={handleChange}
                                placeholder="Enter Area of interest"
                                type="text"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th className="header_bg mahiti" scope="row">
                              7
                            </th>
                            <th className="header_bg">
                              Any problem being faced
                            </th>
                            <td>:</td>
                            <td>
                              <input
                                className="form-control input_control "
                                id="txtproblem"
                                name="Problem"
                                readOnly
                                placeholder="Enter problem"
                                value={formData.Problem}
                                onChange={handleChange}
                                type="text"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th className="header_bg mahiti" scope="row">
                              8
                            </th>
                            <th className="header_bg">
                              Any idea or any change suggested / any additional
                              responsibility you want to share?
                            </th>
                            <td>:</td>
                            <td>
                              <input
                                className="form-control  w-500"
                                id="txtresponsibility"
                                readOnly
                                name="Additionalresponsibility"
                                placeholder="Enter additional responsibility"
                                type="text"
                                value={formData.Additionalresponsibility}
                                onChange={handleChange}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="container">
                    <div>
                      <label>
                        <b>Routine Activity Chart:</b>
                      </label>
                    </div>
                    <div className="table-responsive">
                      <div className="chart">
                        <div className="row w-100">
                          <div className="col-md-1">
                            {" "}
                            <label style={{ marginRight: "30px" }}>
                              Frequency:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <div>
                              <table className="routin_header">
                                <thead>
                                  <tr>
                                    <th className="header_bg" scope="col">
                                      D= Daily
                                    </th>
                                    <th className="header_bg" scope="col">
                                      W= Weekly
                                    </th>
                                    <th className="header_bg" scope="col">
                                      F= Fortnightly
                                    </th>
                                    <th className="header_bg" scope="col">
                                      M= Monthly
                                    </th>
                                    <th className="header_bg" scope="col">
                                      Y= Yearly
                                    </th>
                                    <th className="header_bg" scope="col">
                                      O= Occasionally
                                    </th>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p
                      style={{
                        color: "black",
                        margin: "10px 0px",
                      }}
                    >
                      Remark:<b>C</b>=Computer <b>M</b>= Manual
                      <b>COM</b>= Combination &nbsp;of &nbsp;Computer &nbsp; +
                      &nbsp;Manual
                    </p>

                    <div className="table-responsive fgff">
                      <table
                        className="table table-bordered"
                        style={{
                          textAlign: "center",
                          marginTop: "10px",
                        }}
                      >
                        <thead>
                          <tr>
                            <th scope="col" className="header_bg">
                              Sr No.
                            </th>
                            <th scope="col" className="header_bg">
                              Name of activity
                            </th>
                            <th scope="col" className="header_bg">
                              Frequency
                            </th>
                            <th scope="col" className="header_bg">
                              Time per Frequency in minutes
                            </th>
                            <th scope="col" className="header_bg">
                              Remarks
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {activityList.map((activity, index) => (
                            <tr key={activity.id}>
                              <td>{index + 1}</td>
                              <td>{activity.Name}</td>
                              <td>{activity.Frequency}</td>
                              <td>{activity.TimeperFrequency}</td>
                              <td>{activity.Remarks}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="form-group">
                      <label className="add_lable">
                        Additional Information:
                      </label>
                      <textarea
                        className="form-control"
                        cols="20"
                        id="txtinformation"
                        name="Information"
                        value={formData.Information}
                        onChange={handleChange}
                        placeholder="Enter Additional Information"
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </section>

                {/* Buttons End */}
              </form>
            </CardBody>{" "}
          </Card>
        </Col>
      </React.Fragment>
    </div>
  );
};

export default RACPdf
