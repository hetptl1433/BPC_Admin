import React, { useState, useEffect } from "react";
import UiContent from "../../Components/Common/UiContent";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


import { Link } from "react-router-dom";
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
  Row,
  Label,
  Input,
} from "reactstrap";

// import {
//   listCity,
//   createCity,
//   removeAndUpdateCity,
//   removeCity,
//   listState,
//   listCountry,
//   getCity,
//   updateCity,
// } from "../../../functions/TestQuestionMaster/";

import { getTestQuestionMaster, updateTestQuestionMaster,listTestQuestionMaster,createTestQuestionMaster, removeAndUpdateTestQuestionMaster,removeTestQuestionMaster, } from "../../functions/TestQuestionMaster/TestQuestionMaster";
import { getpoint, listpoint } from "../../functions/Points/Point";
import { getpointMaster, listPointMaster } from "../../functions/PointMaster/PointMaster";
import {
  getTestCatMasterDetails,
  listTestCatMasterDetails,
} from "../../functions/TextCategoryMaster/TextCatMaster";

import { getTestCategory, listTestCategory } from "../../functions/TestCat/TestCat";
import axios from "axios";
import DataTable from "react-data-table-component";
import { use } from "i18next";

const initialState = {
  TestCategoryID: "",
  TestMasterID: "",
  QuesType: "",
  AnsType: "",

  PointCatIDA: "",
  PointSelIDA: "",
  PointCatIDB: "",
  PointSelIDB: "",
  PointCatIDC: "",
  PointSelIDC: "",
  PointCatIDD: "",
  PointSelIDD: "",
  PointCatIDE: "",
  PointSelIDE: "",
  SortOrder: 0,
  isActive: false,
};


const TestQuestionMaster = () => {
  const [extra, setExtra] = useState("");
  const [values, setValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [remove_id, setRemove_id] = useState("");
  const [_id, set_Id] = useState("");
  //validation check
  const [errCiN, setErrCiN] = useState(false);
  const [errCC, setErrCC] = useState(false);
  const [errSN, setErrSN] = useState(false);
  const [errCN, setErrCN] = useState(false);
  const [errPN, setErrPN] = useState(false);
  const [errPNN, setErrPNN] = useState(false);
  const [errPMN, setErrPMN] = useState(false);
  const [errPT, setErrPT] = useState(false);
  const [errors, setErrors] = useState({});
  const [errQuesType, setErrQuesType] = useState(false);
  const [errAnsType, setErrAnsType] = useState(false);
  const [errEngQues, setErrEngQues] = useState(false);
  const [errHinQues, setErrHinQues] = useState(false);
  const [errGujQues, setErrGujQues] = useState(false);
  const [errEngAnsA, setErrEngAnsA] = useState(false);
  const [errHinAnsA, setErrHinAnsA] = useState(false);
  const [errGujAnsA, setErrGujAnsA] = useState(false);
  const [errEngAnsB, setErrEngAnsB] = useState(false);
  const [errHinAnsB, setErrHinAnsB] = useState(false);
  const [errGujAnsB, setErrGujAnsB] = useState(false);
  const [errEngAnsC, setErrEngAnsC] = useState(false);
  const [errHinAnsC, setErrHinAnsC] = useState(false);
  const [errGujAnsC, setErrGujAnsC] = useState(false);
  const [errEngAnsD, setErrEngAnsD] = useState(false);
  const [errHinAnsD, setErrHinAnsD] = useState(false);
  const [errGujAnsD, setErrGujAnsD] = useState(false);
  const [errEngAnsE, setErrEngAnsE] = useState(false);
  const [errHinAnsE, setErrHinAnsE] = useState(false);
  const [errGujAnsE, setErrGujAnsE] = useState(false);
  const [errPointCatIDA, setErrPointCatIDA] = useState(false);
  const [errPointSelIDA, setErrPointSelIDA] = useState(false);
  const [errPointCatIDB, setErrPointCatIDB] = useState(false);
  const [errPointSelIDB, setErrPointSelIDB] = useState(false);
  const [errPointCatIDC, setErrPointCatIDC] = useState(false);
  const [errPointSelIDC, setErrPointSelIDC] = useState(false);
  const [errPointCatIDD, setErrPointCatIDD] = useState(false);
  const [errPointSelIDD, setErrPointSelIDD] = useState(false);
  const [errPointCatIDE, setErrPointCatIDE] = useState(false);
  const [EngQues, setEngQues] = useState("");
  const [HinQues, setHinQues] = useState("");
  const [GujQues, setGujQues] = useState("");

  const [EngAnsA, setEngAnsA] = useState("");
  const [HinAnsA, setHinAnsA] = useState("");
  const [GujAnsA, setGujAnsA] = useState("");

  const [EngAnsB, setEngAnsB] = useState("");
  const [HinAnsB, setHinAnsB] = useState("");
  const [GujAnsB, setGujAnsB] = useState("");

  const [EngAnsC, setEngAnsC] = useState("");
  const [HinAnsC, setHinAnsC] = useState("");
  const [GujAnsC, setGujAnsC] = useState("");

  const [EngAnsD, setEngAnsD] = useState("");
  const [HinAnsD, setHinAnsD] = useState("");
  const [GujAnsD, setGujAnsD] = useState("");

  const [EngAnsE, setEngAnsE] = useState("");
  const [HinAnsE, setHinAnsE] = useState("");
  const [GujAnsE, setGujAnsE] = useState("");

  
  const [errPointSelIDE, setErrPointSelIDE] = useState(false);
  const [errPointSortOrder, setErrPointSortOrder] =useState(false);

  const [query, setQuery] = useState("");

  const {
    TestCategoryID,
    TestMasterID,
    QuesType,
    AnsType,
    PointCatIDA,
    PointSelIDA,
    PointCatIDB,
    PointSelIDB,
    PointCatIDC,
    PointSelIDC,
    PointCatIDD,
    PointSelIDD,
    PointCatIDE,
    PointSelIDE,
    SortOrder,
    isActive,
  } = values;

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const [modal_list, setmodal_list] = useState(false);
  const tog_list = () => {
    setmodal_list(!modal_list);
    setIsSubmit(false);
  };

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);
  const handleTog_edit = (_id) => {
    console.log(`Toggle Edit Called with ID: ${_id}`);
    setmodal_edit((prev) => !prev);
    setIsSubmit(false);
    set_Id(_id);

    getTestQuestionMaster(_id)
      .then((res) => {
        console.log("API Response:", res);
        setValues({
          ...values,
          TestCategoryID: res.TestCategoryID,
          TestMasterID: res.TestMasterID,
          QuesType: res.QuesType,
          AnsType: res.AnsType,
          
          PointCatIDA: res.PointCatIDA,
          PointSelIDA: res.PointSelIDA,
          PointCatIDB: res.PointCatIDB,
          PointSelIDB: res.PointSelIDB,
          PointCatIDC: res.PointCatIDC,
          PointSelIDC: res.PointSelIDC,
          PointCatIDD: res.PointCatIDD,
          PointSelIDD: res.PointSelIDD,
          PointCatIDE: res.PointCatIDE,
          PointSelIDE: res.PointSelIDE,
          SortOrder: res.SortOrder,
          isActive: res.isActive,
        });
        setEngQues(res.EngQues);
        setHinQues(res.HinQues);
        setGujQues(res.GujQues);

        setEngAnsA(res.EngAnsA);
        setHinAnsA(res.HinAnsA);
        setGujAnsA(res.GujAnsA);

        setEngAnsB(res.EngAnsB);
        setHinAnsB(res.HinAnsB);
        setGujAnsB(res.GujAnsB);

        setEngAnsC(res.EngAnsC);
        setHinAnsC(res.HinAnsC);
        setGujAnsC(res.GujAnsC);

        setEngAnsD(res.EngAnsD);
        setHinAnsD(res.HinAnsD);
        setGujAnsD(res.GujAnsD);

        setEngAnsE(res.EngAnsE);
        setHinAnsE(res.HinAnsE);
        setGujAnsE(res.GujAnsE);

      })
      .catch((err) => {
        console.log("API Error:", err);
      });
  };


  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("TestQuestionMaster update", values);
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);

    if (Object.keys(erros).length === 0) {
      updateTestQuestionMaster(_id, values)
        .then((res) => {
          console.log("updated TestQuestionMaster form", res);
          setmodal_edit(!modal_edit);
          fetchTestQuestionMaster();
          setValues(initialState);
          setEngQues("");
          setHinQues("");
          setGujQues("");

          setEngAnsA("");
          setHinAnsA("");
          setGujAnsA("");

          setEngAnsB("");
          setHinAnsB("");
          setGujAnsB("");

          setEngAnsC("");
          setHinAnsC("");
          setGujAnsC("");

          setEngAnsD("");
          setHinAnsD("");
          setGujAnsD("");

          setEngAnsE("");
          setHinAnsE("");
          setGujAnsE("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [TestQuestionMasters, setTestQuestionMasters] = useState([]);
  const [TestCategories, setTestCategories] = useState([]);
  const [Pointss, setPointss] = useState([]);
  const [TestMasters, setTestMasters] = useState([]);
  const [PointMasters, setPointMasters] = useState([]);

  useEffect(() => {
    loadTestCategories();
    // loadTestQuestionMaster();
    loadTestMasters();
    loadPoints();
    loadPointMasters();
  }, []);

  const loadPoint = () => {
    listTestQuestionMaster().then((res) => {
      setPointss(res);
      console.log(res);
    });
  };
  const loadTestCategories = () => {
    setLoading(true);
    listTestCategory()
      .then((res) => {
        // console.log("Response from backend:", res);
        setTestCategories(res);
        //  console.log("Updated testCategories:", TestCategories);
      })
      .catch((err) => {
        // console.error("locha ai che", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadPoints = () => {
    listpoint()
      .then((res) => {
        console.log("Points fetched:", res);
        setPointss(res);
      })
      .catch((error) => {
        console.error("Error loading points:", error);
      });
  };
  const loadTestMasters = () => {
    listTestCatMasterDetails()
      .then((res) => {
        setTestMasters(res);
        console.log("Test Masters:", res);
      })
      .catch((err) => {
        console.error("Error loading test masters:", err);
      });
  };

  // Function to load Test Question Masters
  const loadPointMasters = () => {
    // Call the API to list Test Question Masters
    listPointMaster()
      .then((res) => {
        // On successful response, update the state with the data
        setPointMasters(res);
        console.log("Test Question Masters:", res); // Log the response for debugging
      })
      .catch((err) => {
        // On error, log the error for debugging
        console.error("Error loading Test Question Masters:", err);
      });
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
const handleCKEditorChange = (name, data) => {
  console.log(name, data);
  setValues({ ...values, [name]: data });
};

  const handleCheck = (e) => {
    console.log(e.target.checked);
    setValues({ ...values, isActive: e.target.checked });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("value",values);
    // Combine useState values with the values object
    const combinedValues = {
      ...values, // Existing values object
      EngQues,
      HinQues,
      GujQues,
      ...(EngAnsA && { EngAnsA }),
      ...(HinAnsA && { HinAnsA }),
      ...(GujAnsA && { GujAnsA }),
      ...(EngAnsB && { EngAnsB }),
      ...(HinAnsB && { HinAnsB }),
      ...(GujAnsB && { GujAnsB }),
      ...(EngAnsC && { EngAnsC }),
      ...(HinAnsC && { HinAnsC }),
      ...(GujAnsC && { GujAnsC }),
      ...(EngAnsD && { EngAnsD }),
      ...(HinAnsD && { HinAnsD }),
      ...(GujAnsD && { GujAnsD }),
      ...(EngAnsE && { EngAnsE }),
      ...(HinAnsE && { HinAnsE }),
      ...(GujAnsE && { GujAnsE }),
    };

    console.log(combinedValues);

    let errors = validate(combinedValues);
    setFormErrors(errors);
    setIsSubmit(true);

    console.log(Object.keys(errors).length);

    if (Object.keys(errors).length === 0) {
      createTestQuestionMaster(combinedValues)
        .then((res) => {
          if (res.isOk) {
            console.log(res);
            setmodal_list(!modal_list);
            setValues(initialState);
            setEngQues("");
            setHinQues("");
            setGujQues("");

            setEngAnsA("");
            setHinAnsA("");
            setGujAnsA("");

            setEngAnsB("");
            setHinAnsB("");
            setGujAnsB("");

            setEngAnsC("");
            setHinAnsC("");
            setGujAnsC("");

            setEngAnsD("");
            setHinAnsD("");
            setGujAnsD("");

            setEngAnsE("");
            setHinAnsE("");
            setGujAnsE("");
            setIsSubmit(false);
            setFormErrors({});
            fetchTestQuestionMaster();
            
          } else {
            if (res.field === 1) {
              setErrCiN(true);
              setFormErrors({
                SortOrder:
                  "Test Question Master with this name already exists!",
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  const handleDelete = (e) => {
    e.preventDefault();
    console.log("Test Question Master Removed", remove_id);
    removeTestQuestionMaster(remove_id)
      .then((res) => {
        console.log("deleted", res);
        setmodal_delete(false);
        fetchTestQuestionMaster();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validate = (values) => {
    const errors = {};
    if (values.TestCategoryID === "") {
      errors.TestCategoryID = "Select Test Category!";
      setErrCN(true);
    } else {
      setErrCN(false);
    }

    if (values.TestMasterID === "") {
      errors.TestMasterID = "Select Test Master!";
      setErrSN(true);
    } else {
      setErrSN(false);
    }

    if (values.QuesType === "") {
      errors.QuesType = "Question Type is required!";
      setErrQuesType(true);
    } else {
      setErrQuesType(false);
    }

    if (values.AnsType === "") {
      errors.AnsType = "Answer Type is required!";
      setErrAnsType(true);
    } else {
      setErrAnsType(false);
    }

    if (values.EngQues === "") {
      errors.EngQues = "English Question is required!";
      setErrEngQues(true);
    } else {
      setErrEngQues(false);
    }

    if (values.HinQues === "") {
      errors.HinQues = "Hindi Question is required!";
      setErrHinQues(true);
    } else {
      setErrHinQues(false);
    }

    if (values.GujQues === "") {
      errors.GujQues = "Gujarati Question is required!";
      setErrGujQues(true);
    } else {
      setErrGujQues(false);
    }


    if (values.setErrPointSortOrder === "") {
      errors.SortOrder = "Select Sort Order!";
      setErrPointSortOrder(true);
    } else {
      setErrPointSortOrder(false);
    }

    return errors;
  };

  const validClassTestCategoryID =
    errCN && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassTestMasterID =
    errSN && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassQuesType =
    errQuesType && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassAnsType =
    errAnsType && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassEngQues =
    errEngQues && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassHinQues =
    errHinQues && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassGujQues =
    errGujQues && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassEngAnsA =
    errEngAnsA && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassHinAnsA =
    errHinAnsA && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassGujAnsA =
    errGujAnsA && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassEngAnsB =
    errEngAnsB && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassHinAnsB =
    errHinAnsB && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassGujAnsB =
    errGujAnsB && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassEngAnsC =
    errEngAnsC && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassHinAnsC =
    errHinAnsC && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassGujAnsC =
    errGujAnsC && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassEngAnsD =
    errEngAnsD && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassHinAnsD =
    errHinAnsD && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassGujAnsD =
    errGujAnsD && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassEngAnsE =
    errEngAnsE && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassHinAnsE =
    errHinAnsE && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassGujAnsE =
    errGujAnsE && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPointCatIDA =
    errPointCatIDA && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPointSelIDA =
    errPointSelIDA && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPointCatIDB =
    errPointCatIDB && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPointSelIDB =
    errPointSelIDB && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPointCatIDC =
    errPointCatIDC && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPointSelIDC =
    errPointSelIDC && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPointCatIDD =
    errPointCatIDD && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPointSelIDD =
    errPointSelIDD && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPointCatIDE =
    errPointCatIDE && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPointSelIDE =
    errPointSelIDE && isSubmit ? "form-control is-invalid" : "form-control";

      const validClassSortOrder =
        errPointSortOrder && isSubmit ? "form-control is-invalid" : "form-control";

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
    fetchTestQuestionMaster();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchTestQuestionMaster = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/TestQuestionParam`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: query,
          isActive: filter,
        }
      )
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          setLoading(false);
          setTestQuestionMasters(res.data);
          //console.log("response", res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setTestQuestionMasters([]);
        }
        // console.log(res);
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
      name: "Test Category",
      selector: (row) => row.TestCategoryDetails.categoryName || "N/A",
      sortable: true,
      sortField: "TestCategory",
    },
    {
      name: "Test Master",
      selector: (row) => row.TestMasterDetails.TestName || "N/A",
      sortable: true,
      sortField: "TestMaster",
    },
 
    {
      name: "SortOrder",
      selector: (row) => row.SortOrder || "N/A",
      sortable: true,
      sortField: "SortOrder",
    },
    {
      name: "Status",
      selector: (row) => <p>{row.isActive ? "Active" : "InActive"}</p>,
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

  document.title = "Test Question Master | BPC India";
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Location Setup"
            title="City"
            pageTitle="Location SetUp"
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Test Question Master
                      </h2>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
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
                    <Col className="col-sm-auto" lg={4} md={6} sm={6}>
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
                        data={TestQuestionMasters}
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
            setValues(initialState);
          }}
        >
          Add Test Question Master
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating  mb-3">
              <select
                name="TestCategoryID"
                className={validClassTestCategoryID}
                onChange={handleChange}
              >
                <option>Please Select</option>
                {TestCategories.map((c) => (
                  <React.Fragment key={c._id}>
                    {c.IsActive && (
                      <option value={c._id}>{c.categoryName}</option>
                    )}
                  </React.Fragment>
                ))}
              </select>
              <Label>
                {" "}
                Test Category<span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.TestCategoryID}</p>
              )}
            </div>

            <div className="form-floating  mb-3">
              <select
                name="TestMasterID"
                className={validClassTestMasterID}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                {TestMasters.map((s) => {
                  console.log("Processing TestMaster:", s);
                  return (
                    s.IsActive &&
                    TestCategoryID === s.category && (
                      <option key={s._id} value={s._id}>
                        {s.TestName}
                      </option>
                    )
                  );
                })}
              </select>

              <Label>
                {" "}
                Test Master <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.TestMasterID}</p>
              )}
            </div>
            {/* <div className="form-floating  mb-3">
              <select
                name="PointCatIDA"
                className={validClassPointCatIDA}
                onChange={handleChange}
              >
                <option>Please Select</option>
                {Pointss.map((c) => {
                  return (
                    <React.Fragment key={c._id}>
                      {c.IsActive && (
                        <option value={c._id}>{c.PointName}</option>
                      )}
                    </React.Fragment>
                  );
                })}
              </select>
              <Label>
                {" "}
                Point Name<span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.PointCatIDA}</p>
              )}
            </div>
            <div className="form-floating  mb-3">
              <select
                name="PointSelIDA"
                className={validClassPointSelIDA}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                {PointMasters.map((s) => {
                  console.log("Processing TestMaster:", s);
                  return (
                    s.isActive &&
                    PointCatIDA === s.PointID && (
                      <option key={s._id} value={s._id}>
                        {s.PointMasterName}
                      </option>
                    )
                  );
                })}
              </select>

              <Label>
                {" "}
                Test Question Master <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.PointSelIDA}</p>
              )}
            </div> */}
            <div className="row">
              <div className="form-floating  mb-3 col-md-6">
                <select
                  name="QuesType"
                  className={validClassQuesType}
                  onChange={handleChange}
                >
                  <option value="">Please Select</option>
                  <option value="Text">Text</option>

                  <option value="Image">Image</option>
                </select>

                <Label>
                  {" "}
                  Question Type <span className="text-danger">*</span>
                </Label>
                {isSubmit && (
                  <p className="text-danger">{formErrors.QuesType}</p>
                )}
              </div>
              <div className="form-floating  mb-3 col-md-6">
                <select
                  name="AnsType"
                  className={validClassAnsType}
                  onChange={handleChange}
                >
                  <option value="">Please Select</option>
                  <option value="Text">Text</option>

                  <option value="Image">Image</option>
                </select>

                <Label>
                  {" "}
                  Answer Type <span className="text-danger">*</span>
                </Label>
                {isSubmit && (
                  <p className="text-danger">{formErrors.AnsType}</p>
                )}
              </div>
            </div>
            <div className="mb-3">
              <Label>
                English Question <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={EngQues}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEngQues(data);
                  }}
                  config={{ placeholder: "Enter English Question" }}
                />
              </div>
              {isSubmit && formErrors.EngQues && (
                <p className="text-danger">{formErrors.EngQues}</p>
              )}
            </div>

            {/* Hindi Question */}
            <div className="mb-3">
              <Label>
                Hindi Question <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={HinQues}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setHinQues(data);
                  }}
                  config={{ placeholder: "Enter Hindi Question" }}
                />
              </div>
              {isSubmit && formErrors.HinQues && (
                <p className="text-danger">{formErrors.HinQues}</p>
              )}
            </div>

            {/* Gujarati Question */}
            <div className="mb-3">
              <Label>
                Gujarati Question <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={GujQues}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setGujQues(data);
                  }}
                  config={{ placeholder: "Enter Gujarati Question" }}
                />
              </div>
              {isSubmit && formErrors.GujQues && (
                <p className="text-danger">{formErrors.GujQues}</p>
              )}
            </div>

            {/* English Answer A */}
            <div className="mb-3">
              <Label>English Answer A</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={EngAnsA}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEngAnsA(data);
                  }}
                  config={{ placeholder: "Enter English Answer A" }}
                />
              </div>
              {isSubmit && formErrors.EngAnsA && (
                <p className="text-danger">{formErrors.EngAnsA}</p>
              )}
            </div>

            {/* Hindi Answer A */}
            <div className="mb-3">
              <Label>Hindi Answer A</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={HinAnsA}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setHinAnsA(data);
                  }}
                  config={{ placeholder: "Enter Hindi Answer A" }}
                />
              </div>
              {isSubmit && formErrors.HinAnsA && (
                <p className="text-danger">{formErrors.HinAnsA}</p>
              )}
            </div>

            {/* Gujarati Answer A */}
            <div className="mb-3">
              <Label>Gujarati Answer A</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={GujAnsA}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setGujAnsA(data);
                  }}
                  config={{ placeholder: "Enter Gujarati Answer A" }}
                />
              </div>
              {isSubmit && formErrors.GujAnsA && (
                <p className="text-danger">{formErrors.GujAnsA}</p>
              )}
            </div>

            {/* English Answer B */}
            <div className="mb-3">
              <Label>English Answer B</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={EngAnsB}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEngAnsB(data);
                  }}
                  config={{ placeholder: "Enter English Answer B" }}
                />
              </div>
              {isSubmit && formErrors.EngAnsB && (
                <p className="text-danger">{formErrors.EngAnsB}</p>
              )}
            </div>

            {/* Hindi Answer B */}
            <div className="mb-3">
              <Label>Hindi Answer B</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={HinAnsB}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setHinAnsB(data);
                  }}
                  config={{ placeholder: "Enter Hindi Answer B" }}
                />
              </div>
              {isSubmit && formErrors.HinAnsB && (
                <p className="text-danger">{formErrors.HinAnsB}</p>
              )}
            </div>

            {/* Gujarati Answer B */}
            <div className="mb-3">
              <Label>Gujarati Answer B</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={GujAnsB}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setGujAnsB(data);
                  }}
                  config={{ placeholder: "Enter Gujarati Answer B" }}
                />
              </div>
              {isSubmit && formErrors.GujAnsB && (
                <p className="text-danger">{formErrors.GujAnsB}</p>
              )}
            </div>

            {/* English Answer C */}
            <div className="mb-3">
              <Label>English Answer C</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={EngAnsC}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEngAnsC(data);
                  }}
                  config={{ placeholder: "Enter English Answer C" }}
                />
              </div>
              {isSubmit && formErrors.EngAnsC && (
                <p className="text-danger">{formErrors.EngAnsC}</p>
              )}
            </div>

            {/* Hindi Answer C */}
            <div className="mb-3">
              <Label>Hindi Answer C</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={HinAnsC}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setHinAnsC(data);
                  }}
                  config={{ placeholder: "Enter Hindi Answer C" }}
                />
              </div>
              {isSubmit && formErrors.HinAnsC && (
                <p className="text-danger">{formErrors.HinAnsC}</p>
              )}
            </div>

            {/* Gujarati Answer C */}
            <div className="mb-3">
              <Label>Gujarati Answer C</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={GujAnsC}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setGujAnsC(data);
                  }}
                  config={{ placeholder: "Enter Gujarati Answer C" }}
                />
              </div>
              {isSubmit && formErrors.GujAnsC && (
                <p className="text-danger">{formErrors.GujAnsC}</p>
              )}
            </div>

            {/* English Answer D */}
            <div className="mb-3">
              <Label>English Answer D</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={EngAnsD}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEngAnsD(data);
                  }}
                  config={{ placeholder: "Enter English Answer D" }}
                />
              </div>
              {isSubmit && formErrors.EngAnsD && (
                <p className="text-danger">{formErrors.EngAnsD}</p>
              )}
            </div>

            {/* Hindi Answer D */}
            <div className="mb-3">
              <Label>Hindi Answer D</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={HinAnsD}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setHinAnsD(data);
                  }}
                  config={{ placeholder: "Enter Hindi Answer D" }}
                />
              </div>
              {isSubmit && formErrors.HinAnsD && (
                <p className="text-danger">{formErrors.HinAnsD}</p>
              )}
            </div>

            {/* Gujarati Answer D */}
            <div className="mb-3">
              <Label>Gujarati Answer D</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={GujAnsD}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setGujAnsD(data);
                  }}
                  config={{ placeholder: "Enter Gujarati Answer D" }}
                />
              </div>
              {isSubmit && formErrors.GujAnsD && (
                <p className="text-danger">{formErrors.GujAnsD}</p>
              )}
            </div>

            {/* English Answer E */}
            <div className="mb-3">
              <Label>English Answer E</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={EngAnsE}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEngAnsE(data);
                  }}
                  config={{ placeholder: "Enter English Answer E" }}
                />
              </div>
              {isSubmit && formErrors.EngAnsE && (
                <p className="text-danger">{formErrors.EngAnsE}</p>
              )}
            </div>

            {/* Hindi Answer E */}
            <div className="mb-3">
              <Label>Hindi Answer E</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={HinAnsE}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setHinAnsE(data);
                  }}
                  config={{ placeholder: "Enter Hindi Answer E" }}
                />
              </div>
              {isSubmit && formErrors.HinAnsE && (
                <p className="text-danger">{formErrors.HinAnsE}</p>
              )}
            </div>

            {/* Gujarati Answer E */}
            <div className="mb-3">
              <Label>Gujarati Answer E</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={GujAnsE}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setGujAnsE(data);
                  }}
                  config={{ placeholder: "Enter Gujarati Answer E" }}
                />
              </div>
              {isSubmit && formErrors.GujAnsE && (
                <p className="text-danger">{formErrors.GujAnsE}</p>
              )}
            </div>

            <div className="row">
              <div className="col-md-6">
                <Label> Option A</Label>
                <div className="form-floating mb-3">
                  <select
                    name="PointCatIDA"
                    className={validClassPointCatIDA}
                    onChange={handleChange}
                  >
                    <option>Please Select</option>
                    {Pointss.map((c) => {
                      return (
                        <React.Fragment key={c._id}>
                          {c.IsActive && (
                            <option value={c._id}>{c.PointName}</option>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </select>
                  <Label> Point Name</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointCatIDA}</p>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <select
                    name="PointSelIDA"
                    className={validClassPointSelIDA}
                    onChange={handleChange}
                  >
                    <option value="">Please Select</option>
                    {PointMasters.map((s) => {
                      console.log("Processing sela:", s);
                      return (
                        s.isActive &&
                        PointCatIDA === s.PointID && (
                          <option key={s._id} value={s._id}>
                            {s.PointMasterName} {s.PointMasterPoints}
                          </option>
                        )
                      );
                    })}
                  </select>

                  <Label> Test Question Master</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointSelIDA}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <Label> Option B</Label>
                <div className="form-floating mb-3">
                  <select
                    name="PointCatIDB"
                    className={validClassPointCatIDB}
                    onChange={handleChange}
                  >
                    <option>Please Select</option>
                    {Pointss.map((c) => {
                      return (
                        <React.Fragment key={c._id}>
                          {c.IsActive && (
                            <option value={c._id}>{c.PointName}</option>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </select>
                  <Label> Point Name</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointCatIDB}</p>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <select
                    name="PointSelIDB"
                    className={validClassPointSelIDB}
                    onChange={handleChange}
                  >
                    <option value="">Please Select</option>
                    {PointMasters.map((s) => {
                      console.log("Processing TestMaster:", s);
                      return (
                        s.isActive &&
                        PointCatIDB === s.PointID && (
                          <option key={s._id} value={s._id}>
                            {s.PointMasterName}
                          </option>
                        )
                      );
                    })}
                  </select>

                  <Label> Test Question Master</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointSelIDB}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <Label> Option C</Label>
                <div className="form-floating mb-3">
                  <select
                    name="PointCatIDC"
                    className={validClassPointCatIDC}
                    onChange={handleChange}
                  >
                    <option>Please Select</option>
                    {Pointss.map((c) => {
                      return (
                        <React.Fragment key={c._id}>
                          {c.IsActive && (
                            <option value={c._id}>{c.PointName}</option>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </select>
                  <Label> Point Name</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointCatIDC}</p>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <select
                    name="PointSelIDC"
                    className={validClassPointSelIDC}
                    onChange={handleChange}
                  >
                    <option value="">Please Select</option>
                    {PointMasters.map((s) => {
                      console.log("Processing selc:", s);
                      return (
                        s.isActive &&
                        PointCatIDC === s.PointID && (
                          <option key={s._id} value={s._id}>
                            {s.PointMasterName}
                          </option>
                        )
                      );
                    })}
                  </select>

                  <Label> Test Question Master</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointSelIDC}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <Label> Option D</Label>
                <div className="form-floating mb-3">
                  <select
                    name="PointCatIDD"
                    className={validClassPointCatIDD}
                    onChange={handleChange}
                  >
                    <option>Please Select</option>
                    {Pointss.map((c) => {
                      return (
                        <React.Fragment key={c._id}>
                          {c.IsActive && (
                            <option value={c._id}>{c.PointName}</option>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </select>
                  <Label> Point Name</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointCatIDD}</p>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <select
                    name="PointSelIDD"
                    className={validClassPointSelIDD}
                    onChange={handleChange}
                  >
                    <option value="">Please Select</option>
                    {PointMasters.map((s) => {
                      console.log("Processing seld:", s);
                      return (
                        s.isActive &&
                        PointCatIDD === s.PointID && (
                          <option key={s._id} value={s._id}>
                            {s.PointMasterName}
                          </option>
                        )
                      );
                    })}
                  </select>

                  <Label> Test Question Master</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointSelIDD}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <Label> Option E</Label>
                <div className="form-floating mb-3">
                  <select
                    name="PointCatIDE"
                    className={validClassPointCatIDE}
                    onChange={handleChange}
                  >
                    <option>Please Select</option>
                    {Pointss.map((c) => {
                      return (
                        <React.Fragment key={c._id}>
                          {c.IsActive && (
                            <option value={c._id}>{c.PointName}</option>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </select>
                  <Label> Point Name</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointCatIDE}</p>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <select
                    name="PointSelIDE"
                    className={validClassPointSelIDE}
                    onChange={handleChange}
                  >
                    <option value="">Please Select</option>
                    {PointMasters.map((s) => {
                      console.log("Processing  pointsele:", s);
                      return (
                        s.isActive &&
                        PointCatIDE === s.PointID && (
                          <option key={s._id} value={s._id}>
                            {s.PointMasterName}
                          </option>
                        )
                      );
                    })}
                  </select>

                  <Label> Test Question Master</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointSelIDE}</p>
                  )}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-floating mb-3 mt-4">
                  <Input
                    type="text"
                    className={validClassSortOrder}
                    placeholder="Enter Sort Order"
                    id="SortOrder"
                    name="SortOrder"
                    value={SortOrder}
                    onChange={handleChange}
                  />
                  <Label>
                    Sort Order <span className="text-danger">*</span>
                  </Label>
                  {isSubmit && formErrors.SortOrder && (
                    <p className="text-danger">{formErrors.SortOrder}</p>
                  )}
                </div>
              </div>
            </div>

            <div className=" mb-3">
              <Input
                type="checkbox"
                className="form-check-input"
                name="isActive"
                value={isActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label ms-1">Is Active</Label>
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
                  setFormErrors({});
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
            setValues(initialState); // Reset form values if needed
          }}
        >
          Edit Test Question Master
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating  mb-3">
              <select
                name="TestCategoryID"
                className={validClassTestCategoryID}
                onChange={handleChange}
                value={values.TestCategoryID}
                data-choices
                data-choices-sorting="true"
              >
                {TestCategories.map((c) => (
                  <React.Fragment key={c._id}>
                    {c.IsActive && (
                      <option value={c._id}>{c.categoryName}</option>
                    )}
                  </React.Fragment>
                ))}
              </select>
              <Label>
                {" "}
                Test Category<span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.TestCategoryID}</p>
              )}
            </div>

            <div className="form-floating  mb-3">
              <select
                name="TestMasterID"
                className={validClassTestMasterID}
                onChange={handleChange}
                value={values.TestMasterID}
                data-choices
              >
                <option value="">Please Select</option>
                {TestMasters.map((s) => {
                  console.log("Processing TestMaster:", s);
                  return (
                    s.IsActive &&
                    TestCategoryID === s.category && (
                      <option key={s._id} value={s._id}>
                        {s.TestName}
                      </option>
                    )
                  );
                })}
              </select>

              <Label>
                {" "}
                Test Master <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.TestMasterID}</p>
              )}
            </div>
            {/* <div className="form-floating  mb-3">
              <select
                name="PointCatIDA"
                className={validClassPointCatIDA}
                onChange={handleChange}
              >
                <option>Please Select</option>
                {Pointss.map((c) => {
                  return (
                    <React.Fragment key={c._id}>
                      {c.IsActive && (
                        <option value={c._id}>{c.PointName}</option>
                      )}
                    </React.Fragment>
                  );
                })}
              </select>
              <Label>
                {" "}
                Point Name<span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.PointCatIDA}</p>
              )}
            </div>
            <div className="form-floating  mb-3">
              <select
                name="PointSelIDA"
                className={validClassPointSelIDA}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                {PointMasters.map((s) => {
                  console.log("Processing TestMaster:", s);
                  return (
                    s.isActive &&
                    PointCatIDA === s.PointID && (
                      <option key={s._id} value={s._id}>
                        {s.PointMasterName}
                      </option>
                    )
                  );
                })}
              </select>

              <Label>
                {" "}
                Test Question Master <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.PointSelIDA}</p>
              )}
            </div> */}
            <div className="row">
              <div className="form-floating  mb-3 col-md-6">
                <select
                  name="QuesType"
                  className={validClassQuesType}
                  onChange={handleChange}
                  value={values.QuesType}
                  data-choices
                >
                  <option value="">Please Select</option>
                  <option value="Text">Text</option>

                  <option value="Image">Image</option>
                </select>

                <Label>
                  {" "}
                  Question Type <span className="text-danger">*</span>
                </Label>
                {isSubmit && (
                  <p className="text-danger">{formErrors.QuesType}</p>
                )}
              </div>
              <div className="form-floating  mb-3 col-md-6">
                <select
                  name="AnsType"
                  className={validClassAnsType}
                  onChange={handleChange}
                  value={values.AnsType}
                  data-choices
                >
                  <option value="">Please Select</option>
                  <option value="Text">Text</option>

                  <option value="Image">Image</option>
                </select>

                <Label>
                  {" "}
                  Answer Type <span className="text-danger">*</span>
                </Label>
                {isSubmit && (
                  <p className="text-danger">{formErrors.AnsType}</p>
                )}
              </div>
            </div>
            <div className="mb-3">
              <Label>
                English Question <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={EngQues || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEngQues(data);
                  }}
                  config={{ placeholder: "Enter English Question" }}
                />
              </div>
              {isSubmit && formErrors.EngQues && (
                <p className="text-danger">{formErrors.EngQues}</p>
              )}
            </div>

            {/* Hindi Question */}
            <div className="mb-3">
              <Label>
                Hindi Question <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={HinQues || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setHinQues(data);
                  }}
                  config={{ placeholder: "Enter Hindi Question" }}
                />
              </div>
              {isSubmit && formErrors.HinQues && (
                <p className="text-danger">{formErrors.HinQues}</p>
              )}
            </div>

            {/* Gujarati Question */}
            <div className="mb-3">
              <Label>
                Gujarati Question <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={GujQues || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setGujQues(data);
                  }}
                  config={{ placeholder: "Enter Gujarati Question" }}
                />
              </div>
              {isSubmit && formErrors.GujQues && (
                <p className="text-danger">{formErrors.GujQues}</p>
              )}
            </div>

            {/* English Answer A */}
            <div className="mb-3">
              <Label>English Answer A</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={EngAnsA || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEngAnsA(data);
                  }}
                  config={{ placeholder: "Enter English Answer A" }}
                />
              </div>
              {isSubmit && formErrors.EngAnsA && (
                <p className="text-danger">{formErrors.EngAnsA}</p>
              )}
            </div>

            {/* Hindi Answer A */}
            <div className="mb-3">
              <Label>Hindi Answer A</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={HinAnsA || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setHinAnsA(data);
                  }}
                  config={{ placeholder: "Enter Hindi Answer A" }}
                />
              </div>
              {isSubmit && formErrors.HinAnsA && (
                <p className="text-danger">{formErrors.HinAnsA}</p>
              )}
            </div>

            {/* Gujarati Answer A */}
            <div className="mb-3">
              <Label>Gujarati Answer A</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={GujAnsA || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setGujAnsA(data);
                  }}
                  config={{ placeholder: "Enter Gujarati Answer A" }}
                />
              </div>
              {isSubmit && formErrors.GujAnsA && (
                <p className="text-danger">{formErrors.GujAnsA}</p>
              )}
            </div>

            {/* English Answer B */}
            <div className="mb-3">
              <Label>English Answer B</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={EngAnsB || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEngAnsB(data);
                  }}
                  config={{ placeholder: "Enter English Answer B" }}
                />
              </div>
              {isSubmit && formErrors.EngAnsB && (
                <p className="text-danger">{formErrors.EngAnsB}</p>
              )}
            </div>

            {/* Hindi Answer B */}
            <div className="mb-3">
              <Label>Hindi Answer B</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={HinAnsB || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setHinAnsB(data);
                  }}
                  config={{ placeholder: "Enter Hindi Answer B" }}
                />
              </div>
              {isSubmit && formErrors.HinAnsB && (
                <p className="text-danger">{formErrors.HinAnsB}</p>
              )}
            </div>

            {/* Gujarati Answer B */}
            <div className="mb-3">
              <Label>Gujarati Answer B</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={GujAnsB || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setGujAnsB(data);
                  }}
                  config={{ placeholder: "Enter Gujarati Answer B" }}
                />
              </div>
              {isSubmit && formErrors.GujAnsB && (
                <p className="text-danger">{formErrors.GujAnsB}</p>
              )}
            </div>

            {/* English Answer C */}
            <div className="mb-3">
              <Label>English Answer C</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={EngAnsC || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEngAnsC(data);
                  }}
                  config={{ placeholder: "Enter English Answer C" }}
                />
              </div>
              {isSubmit && formErrors.EngAnsC && (
                <p className="text-danger">{formErrors.EngAnsC}</p>
              )}
            </div>

            {/* Hindi Answer C */}
            <div className="mb-3">
              <Label>Hindi Answer C</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={HinAnsC || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setHinAnsC(data);
                  }}
                  config={{ placeholder: "Enter Hindi Answer C" }}
                />
              </div>
              {isSubmit && formErrors.HinAnsC && (
                <p className="text-danger">{formErrors.HinAnsC}</p>
              )}
            </div>

            {/* Gujarati Answer C */}
            <div className="mb-3">
              <Label>Gujarati Answer C</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={GujAnsC || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setGujAnsC(data);
                  }}
                  config={{ placeholder: "Enter Gujarati Answer C" }}
                />
              </div>
              {isSubmit && formErrors.GujAnsC && (
                <p className="text-danger">{formErrors.GujAnsC}</p>
              )}
            </div>

            {/* English Answer D */}
            <div className="mb-3">
              <Label>English Answer D</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={EngAnsD || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEngAnsD(data);
                  }}
                  config={{ placeholder: "Enter English Answer D" }}
                />
              </div>
              {isSubmit && formErrors.EngAnsD && (
                <p className="text-danger">{formErrors.EngAnsD}</p>
              )}
            </div>

            {/* Hindi Answer D */}
            <div className="mb-3">
              <Label>Hindi Answer D</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={HinAnsD || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setHinAnsD(data);
                  }}
                  config={{ placeholder: "Enter Hindi Answer D" }}
                />
              </div>
              {isSubmit && formErrors.HinAnsD && (
                <p className="text-danger">{formErrors.HinAnsD}</p>
              )}
            </div>

            {/* Gujarati Answer D */}
            <div className="mb-3">
              <Label>Gujarati Answer D</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={GujAnsD || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setGujAnsD(data);
                  }}
                  config={{ placeholder: "Enter Gujarati Answer D" }}
                />
              </div>
              {isSubmit && formErrors.GujAnsD && (
                <p className="text-danger">{formErrors.GujAnsD}</p>
              )}
            </div>

            {/* English Answer E */}
            <div className="mb-3">
              <Label>English Answer E</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={EngAnsE || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEngAnsE(data);
                  }}
                  config={{ placeholder: "Enter English Answer E" }}
                />
              </div>
              {isSubmit && formErrors.EngAnsE && (
                <p className="text-danger">{formErrors.EngAnsE}</p>
              )}
            </div>

            {/* Hindi Answer E */}
            <div className="mb-3">
              <Label>Hindi Answer E</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={HinAnsE || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setHinAnsE(data);
                  }}
                  config={{ placeholder: "Enter Hindi Answer E" }}
                />
              </div>
              {isSubmit && formErrors.HinAnsE && (
                <p className="text-danger">{formErrors.HinAnsE}</p>
              )}
            </div>

            {/* Gujarati Answer E */}
            <div className="mb-3">
              <Label>Gujarati Answer E</Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={GujAnsE || extra}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setGujAnsE(data);
                  }}
                  config={{ placeholder: "Enter Gujarati Answer E" }}
                />
              </div>
              {isSubmit && formErrors.GujAnsE && (
                <p className="text-danger">{formErrors.GujAnsE}</p>
              )}
            </div>

            <div className="row">
              <div className="col-md-6">
                <Label> Option A</Label>
                <div className="form-floating mb-3">
                  <select
                    name="PointCatIDA"
                    className={validClassPointCatIDA}
                    onChange={handleChange}
                    value={values.PointCatIDA}
                    data-choices
                  >
                    <option>Please Select</option>
                    {Pointss.map((c) => {
                      return (
                        <React.Fragment key={c._id}>
                          {c.IsActive && (
                            <option value={c._id}>{c.PointName}</option>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </select>
                  <Label> Point Name</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointCatIDA}</p>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <select
                    name="PointSelIDA"
                    className={validClassPointSelIDA}
                    onChange={handleChange}
                    value={values.PointSelIDA}
                    data-choices
                  >
                    <option value="">Please Select</option>
                    {PointMasters.map((s) => {
                      console.log("Processing  pointsela:", s);
                      return (
                        s.isActive &&
                        PointCatIDA === s.PointID && (
                          <option key={s._id} value={s._id}>
                            {s.PointMasterName} {s.PointMasterPoints}
                          </option>
                        )
                      );
                    })}
                  </select>

                  <Label> Test Question Master</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointSelIDA}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <Label> Option B</Label>
                <div className="form-floating mb-3">
                  <select
                    name="PointCatIDB"
                    className={validClassPointCatIDB}
                    onChange={handleChange}
                    value={values.PointCatIDB}
                    data-choices
                  >
                    <option>Please Select</option>
                    {Pointss.map((c) => {
                      return (
                        <React.Fragment key={c._id}>
                          {c.IsActive && (
                            <option value={c._id}>
                              {c.PointName} {c.PointMasterPoints}
                            </option>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </select>
                  <Label> Point Name</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointCatIDB}</p>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <select
                    name="PointSelIDB"
                    className={validClassPointSelIDB}
                    onChange={handleChange}
                    value={values.PointSelIDB}
                    data-choices
                  >
                    <option value="">Please Select</option>
                    {PointMasters.map((s) => {
                      console.log("Processing  pointseb:", s);
                      return (
                        s.isActive &&
                        PointCatIDB === s.PointID && (
                          <option key={s._id} value={s._id}>
                            {s.PointMasterName}
                            {s.PointMasterPoints}
                          </option>
                        )
                      );
                    })}
                  </select>

                  <Label> Test Question Master</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointSelIDB}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <Label> Option C</Label>
                <div className="form-floating mb-3">
                  <select
                    name="PointCatIDC"
                    className={validClassPointCatIDC}
                    onChange={handleChange}
                    value={values.PointCatIDC}
                    data-choices
                  >
                    <option>Please Select</option>
                    {Pointss.map((c) => {
                      return (
                        <React.Fragment key={c._id}>
                          {c.IsActive && (
                            <option value={c._id}>{c.PointName}</option>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </select>
                  <Label> Point Name</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointCatIDC}</p>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <select
                    name="PointSelIDC"
                    className={validClassPointSelIDC}
                    onChange={handleChange}
                    value={values.PointSelIDC}
                    data-choices
                  >
                    <option value="">Please Select</option>
                    {PointMasters.map((s) => {
                      console.log("Processing  pointsec:", s);
                      return (
                        s.isActive &&
                        PointCatIDC === s.PointID && (
                          <option key={s._id} value={s._id}>
                            {s.PointMasterName} {s.PointMasterPoints}
                          </option>
                        )
                      );
                    })}
                  </select>

                  <Label> Test Question Master</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointSelIDC}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <Label> Option D</Label>
                <div className="form-floating mb-3">
                  <select
                    name="PointCatIDD"
                    className={validClassPointCatIDD}
                    onChange={handleChange}
                    value={values.PointCatIDD}
                    data-choices
                  >
                    <option>Please Select</option>
                    {Pointss.map((c) => {
                      return (
                        <React.Fragment key={c._id}>
                          {c.IsActive && (
                            <option value={c._id}>{c.PointName}</option>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </select>
                  <Label> Point Name</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointCatIDD}</p>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <select
                    name="PointSelIDD"
                    className={validClassPointSelIDD}
                    onChange={handleChange}
                    value={values.PointSelIDD}
                    data-choices
                  >
                    <option value="">Please Select</option>
                    {PointMasters.map((s) => {
                      console.log("Processing  pointsed:", s);
                      return (
                        s.isActive &&
                        PointCatIDD === s.PointID && (
                          <option key={s._id} value={s._id}>
                            {s.PointMasterName} {s.PointMasterPoints}
                          </option>
                        )
                      );
                    })}
                  </select>

                  <Label> Test Question Master</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointSelIDD}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <Label> Option E</Label>
                <div className="form-floating mb-3">
                  <select
                    name="PointCatIDE"
                    className={validClassPointCatIDE}
                    onChange={handleChange}
                    value={values.PointCatIDE}
                    data-choices
                  >
                    <option>Please Select</option>
                    {Pointss.map((c) => {
                      return (
                        <React.Fragment key={c._id}>
                          {c.IsActive && (
                            <option value={c._id}>{c.PointName}</option>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </select>
                  <Label> Point Name</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointCatIDE}</p>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <select
                    name="PointSelIDE"
                    className={validClassPointSelIDE}
                    onChange={handleChange}
                    value={values.PointSelIDE}
                    data-choices
                  >
                    <option value="">Please Select</option>
                    {PointMasters.map((s) => {
                      console.log("Processing  pointsee:", s);
                      return (
                        s.isActive &&
                        PointCatIDE === s.PointID && (
                          <option key={s._id} value={s._id}>
                            {s.PointMasterName} {s.PointMasterPoints}
                          </option>
                        )
                      );
                    })}
                  </select>

                  <Label> Test Question Master</Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointSelIDE}</p>
                  )}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-floating mb-3 mt-4">
                  <Input
                    type="text"
                    className={validClassSortOrder}
                    placeholder="Enter Sort Order"
                    id="SortOrder"
                    name="SortOrder"
                    value={SortOrder}
                    onChange={handleChange}
                  />
                  <Label>
                    Sort Order <span className="text-danger">*</span>
                  </Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.SortOrder}</p>
                  )}
                </div>
              </div>
            </div>

            <div className=" mb-3">
              <Input
                type="checkbox"
                className="form-check-input"
                name="isActive"
                value={isActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label ms-1">Is Active</Label>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                id="update-btn"
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
          setmodal_delete(!modal_delete);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(false);
          }}
        >
          Remove City
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

export default TestQuestionMaster;
