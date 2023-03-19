import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DoctorContext from "../../../context/doctor/DoctorContext";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { display } from "@mui/system";

const PrescriptionForm = () => {
  const doctorContext = useContext(DoctorContext);
  const navigate = useNavigate();
  const [back, setBack] = useState(false);

  useEffect(() => {
    if (back === true) {
      navigate(`/doctor`);
    }
  }, [back]);

  const {
    getAllMedicines,
    allMedicines,
    getRelative,
    relative,
    addPrescription,
  } = doctorContext;
  // const medOptions = allMedicines
  //   ? allMedicines.map((opt) => ({ label: opt.name, value: opt.name }))
  //   : null;
  // const [selectedOption, setSelectedOption] = useState([null]);

  const [medicineList, setMedicineList] = useState(
    allMedicines.map((med) => {
      return med.name;
    })
  );
  // const editSearchTerm = (e) => {
  //   const { value } = e.target;
  //   const medicineList = allMedicines.map((med) => {
  //     return med.name.toLowerCase();
  //   });
  //   setMedicineList(medicineList);
  // };

  const { roll_number } = useParams();
  const [form, setForm] = useState({
    patient: roll_number,
    id: null,
    medicines: [],
    symptoms: "",
    diagnosis: "",
    remarks: "",
    tests: [],
  });

  const [inputMedicine, setInputMedicine] = useState([
    { name: "", quantity: "", dosage: "" },
  ]);
  const [inputTests, setInputTests] = useState([{ test: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name ,value} = e.target;
    const list = [...inputMedicine];
    list[index][name] = value;
    setInputMedicine(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputMedicine];
    list.splice(index, 1);
    setInputMedicine(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputMedicine([
      ...inputMedicine,
      { name: "", quantity: "", duration: "" },
    ]);
  };

  //handling Tests
  const handleTestsChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputTests];
    list[index][name] = value;
    setInputTests(list);
  };

  //tests remove click
  const handleRemoveTests = (index) => {
    const list = [...inputTests];
    list.splice(index, 1);
    setInputTests(list);
  };

  // tests add click
  const handleAddTests = () => {
    setInputTests([...inputTests, { test: "" }]);
  };

  const onChange = (e) => {
    console.log(form);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setForm({ ...form, medicines: inputMedicine, tests: inputTests });
    console.log(form);
    addPrescription(form);
  };

  useEffect(
    () => {
      setForm({ ...form, medicines: inputMedicine, tests: inputTests });
    },
    [inputMedicine],
    [inputTests]
  );

  useEffect(() => {
    const func = async () => {
      await getRelative(roll_number);
      await getAllMedicines();
    };
    func();
  }, []);

  return (
    <div class='container-xl px-4'>
      <div class='row mt-3'>
        <div class='col-xl-8' style={{ margin: "auto" }}>
          <div class='card mb-4'>
            <div class='card-header' style={{position:"relative", textAlign:"center" , padding:"1rem"}}>
              <div style={{position:"absolute", left:"0",  top:"0.4rem"}}>
              <button class={`btn ${back === true ? "btn-danger" : "btn-outline-danger"} mx-2 my-2`} onClick={() => setBack(true)}>
                    Back
              </button> 
              </div> 
             <div style={{display:"inline-block"}}><h5>Prescription Form</h5></div> </div>
            <div class='card-body'>
              <form>
                {/* row-1 */}
                <div class='row gx-6 mb-4'>
                  <div class='col-md-6'>
                    <label class='small mb-1' for='inputrollno'>
                      Roll No./PF No.
                    </label>
                    <input
                      name='roll_number'
                      class='form-control'
                      id='inputrollno'
                      type='Text'
                      value={roll_number}
                      disabled
                    />
                  </div>
                  <div class='col-md-6'>
                    <label class='small mb-1' for='inputrelation'>
                      Relation
                    </label>
                    <select
                      class='form-select'
                      aria-label='Select Relation'
                      onChange={onChange}
                      name='id'
                    >
                      <option selected value={''}>Select family member</option>
                      {relative.map((rel) => (
                        <option value={rel.relative_id}>
                          {rel.name}--{rel.relation}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* row-2 */}
                <label class='small mb-1' for='inputMedicine'>
                  Medicine
                </label>
                {inputMedicine.map((x, i) => {
                  return (
                    <div class='row gx-6 my-2'>
                      <div class='col-md-4'>
                        <Autocomplete
                          autoComplete
                          autoHighlight
                          freeSolo
                          name='name'
                          onChange={(e, value) => {
                            const list = [...inputMedicine];
                            list[i].name = value;
                            setInputMedicine(list);
                            console.log(inputMedicine);
                          }}
                          options={medicineList}
                          renderInput={(data) => (
                            <TextField
                              {...data}
                              variant='outlined'
                              label='Medicine Name'
                              size="small"
                              fullWidth
                            />
                          )}
                        />
                      </div>
                      <div class='col-md-2'>
                        <TextField
                          type='number'
                          InputProps={{ inputProps: { min: 1} }}
                          variant='outlined'
                          label='Quantity'
                          size="small"
                          fullWidth
                          name='quantity'
                          value={x.quantity}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </div>
                      <div class='col-md-5'>
                        <TextField
                          type='text'
                          variant='outlined'
                          label='Dosage'
                          size="small"
                          fullWidth
                          name='dosage'
                          value={x.dosage}
                          onChange={(e) => handleInputChange(e, i)}
                        />  
                      </div>

                      <div className='col-md-1'>
                        {inputMedicine.length !== 1 && (
                          <i
                            class='fa-solid fa-lg fa-circle-minus mx-1 my-1'
                            style={{ color: "#DC4C64" }}
                            onClick={() => handleRemoveClick(i)}
                          ></i>
                        )}
                        {inputMedicine.length - 1 === i && (
                          <i
                            class='fa-solid fa-lg fa-circle-plus mx-1 my-1'
                            style={{ color: "green" }}
                            onClick={handleAddClick}
                          ></i>
                        )}
                      </div>
                    </div>
                  );
                })}
                {/* row-2-end */}

                {/* row-3 -start*/}
                <div class='row gx-3 my-3'>
                  <div class='col-md-12'>
                    <label class='small mb-2' for='inputDiagnosis'>
                      Diagnosis
                    </label>
                    <TextField
                      onChange={onChange}
                      name='diagnosis'
                      id='inputDiagnosis'
                      type='text'
                      size="small"
                      fullWidth
                      label='Diagnosis'
                      variant='outlined'
                    />
                  </div>
                </div>
                {/* row-3-end */}

                {/* row-4 start*/}
                <div class='row gx-3 my-3'>
                  <div class='col-md-12'>
                    <label class='small mb-2' for='inputSymptoms'>
                      Symptoms
                    </label>
                    <TextField
                      onChange={onChange}
                      name='symptoms'
                      id='inputSymptoms'
                      type='text'
                      size="small"
                      fullWidth
                      label='Symptoms'
                      variant='outlined'
                    />
                  </div>
                </div>
                {/* row-4-end */}

                {/* row-5-start */}
                <label class='small mb-2' for='inputTests'>
                  Tests
                </label>
                {inputTests.map((x, i) => {
                  return (
                    <div class='row gx-6 my-2'>
                      <div class='col-md-11'>
                        <TextField
                          onChange={(e) => handleTestsChange(e, i)}
                          name='test'
                          // defaultValue={"None"}
                          value={x.test}
                          id='inputTest'
                          type='text'
                          label='Test'
                          variant='outlined'
                          size="small"
                          fullWidth
                        />
                      </div>
                      <div className='col-md-1'>
                        {inputTests.length !== 1 && (
                          <i
                            class='fa-solid fa-lg fa-circle-minus mx-1 my-1'
                            style={{ color: "#DC4C64" }}
                            onClick={() => handleRemoveTests(i)}
                          ></i>
                        )}
                        {inputTests.length - 1 === i && (
                          <i
                            class='fa-solid fa-lg fa-circle-plus mx-1 my-1'
                            style={{ color: "green" }}
                            onClick={handleAddTests}
                          ></i>
                        )}
                      </div>
                    </div>
                  );
                })}
                {/* row-5 -end*/}
                {/* row 6 -start*/}

                <div class='row gx-3 my-3'>
                  <div class='col-md-12'>
                    <label class='small mb-2' for='inputRemarks'>
                      Remarks
                    </label>
                    <TextField
                      onChange={onChange}
                      name='remarks'
                      id='inputRemarks'
                      type='text'
                      size="small"
                      fullWidth
                      label='Remarks'
                      variant='outlined'
                    />
                  </div>
                </div>

                {/* row 6 -end*/}
                <div class='d-grid gap-2 mt-4'>
                  <button
                    onClick={onSubmit}
                    class='btn btn-primary'
                    type='button'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionForm;
