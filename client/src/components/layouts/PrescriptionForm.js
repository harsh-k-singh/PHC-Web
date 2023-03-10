import React, { useEffect, useState, useContext } from "react";
import DoctorContext from "../../context/doctor/DoctorContext";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const PrescriptionForm = () => {
  const doctorContext = useContext(DoctorContext);
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
    relation: "self",
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
    const { name, value } = e.target;
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
      <h3 className='text-center'>Prescription Form</h3>
      <div class='row mt-3'>
        <div class='col-xl-8' style={{ margin: "auto" }}>
          <div class='card mb-4'>
            <div class='card-header'>Prescription details</div>
            <div class='card-body'>
              <form>
                {/* row-1 */}
                <div class='row gx-6 mb-3'>
                  <div class='col-md-6'>
                    <label class='small mb-1' for='inputrollnn'>
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
                      name='relation'
                      style={{ height: "32px" }}
                    >
                      <option value='self'>Self</option>
                      {relative.map((rel) => (
                        <option value={rel.relation}>
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
                    <div class='row gx-6 mb-3'>
                      <div class='col-md-4'>
                        <Autocomplete
                          Style={{ width: 400 }}
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
                            />
                          )}
                        />
                      </div>
                      <div class='col-md-2'>
                        <input
                          type='number'
                          placeholder='Quantity'
                          name='quantity'
                          class='form-control'
                          value={x.quantity}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </div>
                      <div class='col-md-5'>
                        <input
                          type='text'
                          name='dosage'
                          class='form-control'
                          placeholder='Dosage'
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
                <div class='row gx-3 mt-3 mb-3'>
                  <div class='col-md-12'>
                    <label class='small mb-1' for='inputDiagnosis'>
                      Diagnosis
                    </label>
                    <input
                      onChange={onChange}
                      // required={true}
                      name='diagnosis'
                      class='form-control'
                      id='inputDiagnosis'
                      type='text'
                      placeholder='Enter Diagnosis'
                    />
                  </div>
                </div>
                {/* row-3-end */}

                {/* row-4 start*/}
                <div class='row gx-3 mt-3 mb-3'>
                  <div class='col-md-12'>
                    <label class='small mb-1' for='inputSymptoms'>
                      Symptoms
                    </label>
                    <input
                      onChange={onChange}
                      // required={true}
                      name='symptoms'
                      class='form-control'
                      id='inputSymptoms'
                      type='text'
                      placeholder='Enter Symptoms'
                    />
                  </div>
                </div>
                {/* row-4-end */}

                {/* row-5-start */}
                <label class='small mb-1' for='inputTests'>
                  Tests
                </label>
                {inputTests.map((x, i) => {
                  return (
                    <div class='row gx-6 mb-3'>
                      <div class='col-md-11'>
                        <input
                          // onChange={onChange}
                          onChange={(e) => handleTestsChange(e, i)}
                          required={true}
                          name='test'
                          value={x.test}
                          class='form-control'
                          id='inputTest'
                          type='text'
                          placeholder='Enter test name'
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

                <div class='row gx-3 mt-3 mb-3'>
                  <div class='col-md-12'>
                    <label class='small mb-1' for='inputRemarks'>
                      Remarks
                    </label>
                    <input
                      onChange={onChange}
                      // required={true}
                      name='remarks'
                      class='form-control'
                      id='inputRemarks'
                      type='text'
                      placeholder='Enter Remarks'
                    />
                  </div>
                </div>

                {/* row 6 -end*/}
                <div class='d-grid gap-2 mt-5'>
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
