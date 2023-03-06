import React,{useState,useEffect,useContext} from 'react'
import PatientContext from '../../context/patient/PatientContext'
import MembersContent from './MembersContent';

const ViewFamilyMembers = () => {
    const patientContext = useContext(PatientContext);
    const { getRelatives, relatives} = patientContext;
    
    useEffect(() => {
      const func = async () => {
        await getRelatives();
      };
      func();
    },[]);
  return (
    <div class='container-xl px-4'>
        {relatives?relatives.map((item,index) => {
            return(
                <MembersContent item={item} index={index}/>
            )
        }):null}
  </div>
  )
}

export default ViewFamilyMembers
