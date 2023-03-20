import React,{useContext,useState,useEffect} from 'react'
import CompounderContext from "../../../context/compounder/CompounderContext";
import { useParams,useNavigate } from "react-router-dom";
import PrescriptionContent from '../Doctor/PrescriptionContent';

const CheckRecord = () => {
    const compounderContext = useContext(CompounderContext);
    const navigate = useNavigate();
    const {getPrescriptionByID,prescription} = compounderContext;
    const { check_roll_number, relation } = useParams();
    console.log(check_roll_number, relation,"relation and roll number");
    const [back, setBack] = useState(false);

    useEffect(() => {
      if (back === true) {
        navigate(`/compounder`);
      }
    }, [back]);

    useEffect(() => {
      const func=async ()=>{
        await getPrescriptionByID(relation);
      }
      func();
  },[prescription])
  console.log("pres",prescription);
  return (
    <div class='container-xl px-4'>
           <div style={{position:"relative", textAlign:"center"}}>
              <button class={`btn ${back === true ? "btn-danger" : "btn-outline-danger"} mx-2 my-1`} onClick={() => setBack(true)}>
                    Back to Dashboard
              </button> 
            </div>
          {prescription?prescription.map((item,index) => {
              return(
                <PrescriptionContent item={item} index={index}/>
              )
          }):null}
      </div>
  )
}

export default CheckRecord