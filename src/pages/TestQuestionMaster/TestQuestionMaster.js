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
  EngQues: "",
  HinQues: "",
  GujQues: "",
  EngAnsA: "",
  HinAnsA: "",
  GujAnsA: "",
  EngAnsB: "",
  HinAnsB: "",
  GujAnsB: "",
  EngAnsC: "",
  HinAnsC: "",
  GujAnsC: "",
  EngAnsD: "",
  HinAnsD: "",
  GujAnsD: "",
  EngAnsE: "",
  HinAnsE: "",
  GujAnsE: "",
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
  
  const [errPointSelIDE, setErrPointSelIDE] = useState(false);
  const [errPointSortOrder, setErrPointSortOrder] =useState(false);

  const [query, setQuery] = useState("");

  const {
    TestCategoryID,
    TestMasterID,
    QuesType,
    AnsType,
    EngQues,
    HinQues,
    GujQues,
    EngAnsA,
    HinAnsA,
    GujAnsA,
    EngAnsB,
    HinAnsB,
    GujAnsB,
    EngAnsC,
    HinAnsC,
    GujAnsC,
    EngAnsD,
    HinAnsD,
    GujAnsD,
    EngAnsE,
    HinAnsE,
    GujAnsE,
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
    setmodal_edit(!modal_edit);
    setIsSubmit(false);
    set_Id(_id);
    getTestQuestionMaster(_id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          TestCategoryID: res.TestCategoryID,
          TestMasterID: res.TestMasterID,
          QuesType: res.QuesType,
          AnsType: res.AnsType,
          EngQues: res.EngQues,
          HinQues: res.HinQues,
          GujQues: res.GujQues,
          EngAnsA: res.EngAnsA,
          HinAnsA: res.HinAnsA,
          GujAnsA: res.GujAnsA,
          EngAnsB: res.EngAnsB,
          HinAnsB: res.HinAnsB,
          GujAnsB: res.GujAnsB,
          EngAnsC: res.EngAnsC,
          HinAnsC: res.HinAnsC,
          GujAnsC: res.GujAnsC,
          EngAnsD: res.EngAnsD,
          HinAnsD: res.HinAnsD,
          GujAnsD: res.GujAnsD,
          EngAnsE: res.EngAnsE,
          HinAnsE: res.HinAnsE,
          GujAnsE: res.GujAnsE,
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
      })
      .catch((err) => {
        console.log(err);
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

  // Function to load point masters
  const loadPointMasters = () => {
    // Call the API to list point masters
    listPointMaster()
      .then((res) => {
        // On successful response, update the state with the data
        setPointMasters(res);
        console.log("Point Masters:", res); // Log the response for debugging
      })
      .catch((err) => {
        // On error, log the error for debugging
        console.error("Error loading point masters:", err);
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
    console.log(values);
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);

    console.log(Object.keys(erros).length);
    if (Object.keys(erros).length === 0) {
      createTestQuestionMaster(values)
        .then((res) => {
          if (res.isOk) {
            console.log(res);
            setmodal_list(!modal_list);
            setValues(initialState);
            setIsSubmit(false);
            setFormErrors({});
            fetchTestQuestionMaster();
          } else {
            if (res.field === 1) {
              setErrCiN(true);
              setFormErrors({
                SortOrder:
                  "Point Master with this name is exists!",
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
    console.log("Point Master Removed", remove_id);
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

    if (values.EngAnsA === "") {
      errors.EngAnsA = "English Answer A is required!";
      setErrEngAnsA(true);
    } else {
      setErrEngAnsA(false);
    }

    if (values.HinAnsA === "") {
      errors.HinAnsA = "Hindi Answer A is required!";
      setErrHinAnsA(true);
    } else {
      setErrHinAnsA(false);
    }

    if (values.GujAnsA === "") {
      errors.GujAnsA = "Gujarati Answer A is required!";
      setErrGujAnsA(true);
    } else {
      setErrGujAnsA(false);
    }

    if (values.EngAnsB === "") {
      errors.EngAnsB = "English Answer B is required!";
      setErrEngAnsB(true);
    } else {
      setErrEngAnsB(false);
    }

    if (values.HinAnsB === "") {
      errors.HinAnsB = "Hindi Answer B is required!";
      setErrHinAnsB(true);
    } else {
      setErrHinAnsB(false);
    }

    if (values.GujAnsB === "") {
      errors.GujAnsB = "Gujarati Answer B is required!";
      setErrGujAnsB(true);
    } else {
      setErrGujAnsB(false);
    }

    if (values.EngAnsC === "") {
      errors.EngAnsC = "English Answer C is required!";
      setErrEngAnsC(true);
    } else {
      setErrEngAnsC(false);
    }

    if (values.HinAnsC === "") {
      errors.HinAnsC = "Hindi Answer C is required!";
      setErrHinAnsC(true);
    } else {
      setErrHinAnsC(false);
    }

    if (values.GujAnsC === "") {
      errors.GujAnsC = "Gujarati Answer C is required!";
      setErrGujAnsC(true);
    } else {
      setErrGujAnsC(false);
    }

    if (values.EngAnsD === "") {
      errors.EngAnsD = "English Answer D is required!";
      setErrEngAnsD(true);
    } else {
      setErrEngAnsD(false);
    }

    if (values.HinAnsD === "") {
      errors.HinAnsD = "Hindi Answer D is required!";
      setErrHinAnsD(true);
    } else {
      setErrHinAnsD(false);
    }

    if (values.GujAnsD === "") {
      errors.GujAnsD = "Gujarati Answer D is required!";
      setErrGujAnsD(true);
    } else {
      setErrGujAnsD(false);
    }

    if (values.EngAnsE === "") {
      errors.EngAnsE = "English Answer E is required!";
      setErrEngAnsE(true);
    } else {
      setErrEngAnsE(false);
    }

    if (values.HinAnsE === "") {
      errors.HinAnsE = "Hindi Answer E is required!";
      setErrHinAnsE(true);
    } else {
      setErrHinAnsE(false);
    }

    if (values.GujAnsE === "") {
      errors.GujAnsE = "Gujarati Answer E is required!";
      setErrGujAnsE(true);
    } else {
      setErrGujAnsE(false);
    }

    if (values.PointCatIDA === "") {
      errors.PointCatIDA = "Select Point Category A!";
      setErrPointCatIDA(true);
    } else {
      setErrPointCatIDA(false);
    }

    if (values.PointSelIDA === "") {
      errors.PointSelIDA = "Select Point Selection A!";
      setErrPointSelIDA(true);
    } else {
      setErrPointSelIDA(false);
    }

    if (values.PointCatIDB === "") {
      errors.PointCatIDB = "Select Point Category B!";
      setErrPointCatIDB(true);
    } else {
      setErrPointCatIDB(false);
    }

    if (values.PointSelIDB === "") {
      errors.PointSelIDB = "Select Point Selection B!";
      setErrPointSelIDB(true);
    } else {
      setErrPointSelIDB(false);
    }

    if (values.PointCatIDC === "") {
      errors.PointCatIDC = "Select Point Category C!";
      setErrPointCatIDC(true);
    } else {
      setErrPointCatIDC(false);
    }

    if (values.PointSelIDC === "") {
      errors.PointSelIDC = "Select Point Selection C!";
      setErrPointSelIDC(true);
    } else {
      setErrPointSelIDC(false);
    }

    if (values.PointCatIDD === "") {
      errors.PointCatIDD = "Select Point Category D!";
      setErrPointCatIDD(true);
    } else {
      setErrPointCatIDD(false);
    }

    if (values.PointSelIDD === "") {
      errors.PointSelIDD = "Select Point Selection D!";
      setErrPointSelIDD(true);
    } else {
      setErrPointSelIDD(false);
    }

    if (values.PointCatIDE === "") {
      errors.PointCatIDE = "Select Point Category E!";
      setErrPointCatIDE(true);
    } else {
      setErrPointCatIDE(false);
    }

    if (values.PointSelIDE === "") {
      errors.PointSelIDE = "Select Point Selection E!";
      setErrPointSelIDE(true);
    } else {
      setErrPointSelIDE(false);
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
    // fetchUsers(1); // fetch page 1 of users
  }, []);

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
        `${process.env.REACT_APP_API_URL_COFFEE}/auth/location/TestQuestionParam`,
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
      selector: (row) => row.TestCategoryID?.categoryName || "N/A",
      sortable: true,
      sortField: "TestCategory",
    },
    {
      name: "Test Master",
      selector: (row) => row.TestMasterID?.TestName || "N/A",
      sortable: true,
      sortField: "TestMaster",
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

  document.title = "Point Master | BPC India";
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
                        Point Master
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
          Add Point Master
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
                Point Master <span className="text-danger">*</span>
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
                  data={values.EngQues}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("EngQues", data);
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
                  data={values.HinQues}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("HinQues", data);
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
                  data={values.GujQues}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("GujQues", data);
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
              <Label>
                English Answer A <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.EngAnsA}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("EngAnsA", data);
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
              <Label>
                Hindi Answer A <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.HinAnsA}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("HinAnsA", data);
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
              <Label>
                Gujarati Answer A <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.GujAnsA}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("GujAnsA", data);
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
              <Label>
                English Answer B <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.EngAnsB}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("EngAnsB", data);
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
              <Label>
                Hindi Answer B <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.HinAnsB}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("HinAnsB", data);
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
              <Label>
                Gujarati Answer B <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.GujAnsB}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("GujAnsB", data);
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
              <Label>
                English Answer C <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.EngAnsC}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("EngAnsC", data);
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
              <Label>
                Hindi Answer C <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.HinAnsC}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("HinAnsC", data);
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
              <Label>
                Gujarati Answer C <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.GujAnsC}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("GujAnsC", data);
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
              <Label>
                English Answer D <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.EngAnsD}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("EngAnsD", data);
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
              <Label>
                Hindi Answer D <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.HinAnsD}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("HinAnsD", data);
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
              <Label>
                Gujarati Answer D <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.GujAnsD}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("GujAnsD", data);
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
              <Label>
                English Answer E <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.EngAnsE}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("EngAnsE", data);
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
              <Label>
                Hindi Answer E <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.HinAnsE}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("HinAnsE", data);
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
              <Label>
                Gujarati Answer E <span className="text-danger">*</span>
              </Label>
              <div className="form-floating">
                <CKEditor
                  editor={ClassicEditor}
                  data={values.GujAnsE}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleCKEditorChange("GujAnsE", data);
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
                <Label>
                  {" "}
                  Option A <span className="text-danger">*</span>
                </Label>
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
                  <Label>
                    {" "}
                    Point Name<span className="text-danger">*</span>
                  </Label>
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
                    Point Master <span className="text-danger">*</span>
                  </Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointSelIDA}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <Label>
                  {" "}
                  Option B <span className="text-danger">*</span>
                </Label>
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
                  <Label>
                    {" "}
                    Point Name<span className="text-danger">*</span>
                  </Label>
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

                  <Label>
                    {" "}
                    Point Master <span className="text-danger">*</span>
                  </Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointSelIDB}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <Label>
                  {" "}
                  Option C <span className="text-danger">*</span>
                </Label>
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
                  <Label>
                    {" "}
                    Point Name<span className="text-danger">*</span>
                  </Label>
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
                      console.log("Processing TestMaster:", s);
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

                  <Label>
                    {" "}
                    Point Master <span className="text-danger">*</span>
                  </Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointSelIDC}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <Label>
                  {" "}
                  Option D <span className="text-danger">*</span>
                </Label>
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
                  <Label>
                    {" "}
                    Point Name<span className="text-danger">*</span>
                  </Label>
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
                      console.log("Processing TestMaster:", s);
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

                  <Label>
                    {" "}
                    Point Master <span className="text-danger">*</span>
                  </Label>
                  {isSubmit && (
                    <p className="text-danger">{formErrors.PointSelIDD}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <Label>
                  {" "}
                  Option E <span className="text-danger">*</span>
                </Label>
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
                  <Label>
                    {" "}
                    Point Name<span className="text-danger">*</span>
                  </Label>
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
                      console.log("Processing TestMaster:", s);
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

                  <Label>
                    {" "}
                    Point Master <span className="text-danger">*</span>
                  </Label>
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
                    <p className="text-danger">
                      {formErrors.SortOrder}
                    </p>
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
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_edit(false);
            setIsSubmit(false);
            setValues(initialState); // Reset form values if needed
          }}
        >
          Edit Point Master
        </ModalHeader>
        <form>
          {/* <ModalBody>
            <div className="form-floating mb-3">
              <select
                name="TestCategoryID"
                className={validClassTestCategoryName}
                onChange={handleChange}
                value={TestCategoryID}
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
                Test Category <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.TestCategoryID}</p>
              )}
            </div>

            <div className="form-floating mb-3">
              <select
                name="TestMasterID"
                className={validClassTestMasterName}
                onChange={handleChange}
                value={TestMasterID}
              >
                <option value="">Please Select</option>
                {TestMasters.map((s) => (
                  <React.Fragment key={s._id}>
                    {s.IsActive && TestCategoryID === s.category && (
                      <option value={s._id}>{s.TestName}</option>
                    )}
                  </React.Fragment>
                ))}
              </select>
              <Label>
                Test Master <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.TestMasterID}</p>
              )}
            </div>

            <div className="form-floating mb-3">
              <select
                name="PointID"
                className={validClassPointName}
                onChange={handleChange}
                value={PointID}
              >
                <option>Please Select</option>
                {Pointss.map((p) => (
                  <React.Fragment key={p._id}>
                    {p.IsActive && <option value={p._id}>{p.PointName}</option>}
                  </React.Fragment>
                ))}
              </select>
              <Label>
                Point Name <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.PointID}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassPointName}
                placeholder="Enter Point Name"
                id="SortOrder"
                name="SortOrder"
                value={SortOrder}
                onChange={handleChange}
              />
              <Label>
                Name <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">
                  {formErrors.SortOrder}
                </p>
              )}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassTestQuestionMasterTitle}
                placeholder="Enter Point Title"
                id="TestQuestionMasterTitle"
                name="TestQuestionMasterTitle"
                value={TestQuestionMasterTitle}
                onChange={handleChange}
              />
              <Label>
                Title <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">
                  {formErrors.TestQuestionMasterTitle}
                </p>
              )}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassTestQuestionMasterPointName}
                placeholder="Enter Points"
                id="TestQuestionMasterPoints"
                name="TestQuestionMasterPoints"
                value={TestQuestionMasterPoints}
                onChange={handleChange}
              />
              <Label>
                Points <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">
                  {formErrors.TestQuestionMasterPoints}
                </p>
              )}
            </div>

            <div className="mb-3">
              <Input
                type="checkbox"
                className="form-check-input"
                name="isActive"
                checked={isActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label ms-1">Is Active</Label>
            </div>
          </ModalBody> */}
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
