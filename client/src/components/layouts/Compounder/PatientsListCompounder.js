import React,{useState,useContext,useEffect} from 'react'
import CompounderContext from '../../../context/compounder/CompounderContext'
import PrescriptionContent from '../Doctor/PrescriptionContent';


const PatientsListCompounder = () => {
    const compounderContext = useContext(CompounderContext);
    const {getPrescription,allPrescription} = compounderContext;

    let defaultDate = new Date();
    const [date, setDate] = useState(defaultDate);

    const onSetDate = (event) => {
        setDate(new Date(event.target.value))
    }
    useEffect(() => {
        const func=async ()=>{
          await getPrescription();
        }
        func();
    }, [])

    console.log(date.toLocaleDateString('en-CA'));
    console.log(allPrescription,"prescription");
  return (
      <div class='container-xl px-4'>
          <div className="text-center">
            <label for="date"><h5>Select Record Date</h5></label><br/>
            <input className="form-control my-2" type="date"  value={date.toLocaleDateString('en-CA')} onChange={onSetDate} style={{width:"30%" ,margin: "auto", textAlign: "center"}}/>
          </div>
          {allPrescription?allPrescription.map((item,index) => {
              return(
                <>
                {new Date(item.date).toLocaleDateString('en-CA')===date.toLocaleDateString('en-CA')?
                <PrescriptionContent item={item} index={index}/>:""}
                </>
              )
             })
            :<div
              class='alert alert-primary align-items-center text-center'
              role='alert'
              style={{ width: "60%", margin: "auto" }}
            >
              No Records on this Date.
            </div>
          }
      </div>
  )
}

export default PatientsListCompounder
{/*e-mail Name Age Gender DateOfConsultation Diagnosis Prescription Addition Notes viewPatientMedicalRecord*/}