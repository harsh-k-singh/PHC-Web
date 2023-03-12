import React,{useState,useContext,useEffect} from 'react'
import DoctorContext from '../../context/doctor/DoctorContext'
import PrescriptionContent from './PrescriptionContent';


const PatientsList = () => {
    const doctorContext = useContext(DoctorContext);
    const {getPrescription,allPrescription} = doctorContext;

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
    console.log(allPrescription);
  return (
      <div class='container-xl px-4'>
          <div className="text-center">
            <label for="date">Select Record Date</label><br/>
            <input className="my-2" type="date"  value={date.toLocaleDateString('en-CA')} onChange={onSetDate}/>
          </div>
          {allPrescription?allPrescription.map((item,index) => {
              return(
                <>
                {new Date(item.date).toLocaleDateString('en-CA')===date.toLocaleDateString('en-CA')?
                <PrescriptionContent item={item} index={index}/>:""}
                </>
              )
          }):null}
      </div>
  )
}

export default PatientsList
{/*e-mail Name Age Gender DateOfConsultation Diagnosis Prescription Addition Notes viewPatientMedicalRecord*/}