import React,{useState,useEffect,useContext} from 'react'
import PatientContext from '../../context/patient/PatientContext'
import AuthContext from '../../context/auth/AuthContext'
import MembersContent from './MembersContent';

const ViewFamilyMembers = () => {
    const [members, setMembers] = useState(null);
    // const [edit,setEdit]=useState();
    
    // const authContext = useContext(AuthContext);
    const patientContext = useContext(PatientContext);

    // const {loadUser } = authContext;
    const { getRelatives, relatives ,updateRelative,deleteRelative} = patientContext;

    // const onEdit = () => {
    //   setEdit(true);
    // };

    // const onChange = (index) => (e) => {
    //   const newMembers = members.map((item, i) => {
    //     if (index === i) {
    //       return { ...item, [e.target.name]: e.target.value };
    //     } else {
    //       return item;
    //     }
    //   });
    //   setMembers(newMembers);
    // };

    // const onSave = (item) => {
    //   console.log(item);
    //   const updateAndRefetch = async () => {
    //     await updateRelative(item);
    //     await loadUser();
    //   };
    //   updateAndRefetch();
    //   setEdit(false);
    // };

    useEffect(() => {
      const func = async () => {
        await getRelatives();
        // console.log(relatives);
        setMembers(relatives);
      };
      func();
    },[]);

  return (
    <div class='container-xl px-4'>
        {members?members.map((item,index) => {
            return(
                <MembersContent item={item} index={index}/>
            )
        }):null}
  </div>
  )
}

export default ViewFamilyMembers
