import React,{useEffect,useState,useContext} from 'react'
import DoctorContext from '../../context/doctor/DoctorContext';
import Select from 'react-select';

const ViewDocMedicine = () => {
  const doctorContext = useContext(DoctorContext);
  const {getAllMedicines,allMedicines} = doctorContext;
  const [data,setData]=useState(allMedicines);

  const [action,setAction]=useState("viewAll");

  const [sortQuantity,setSortQuantity]=useState(false);

  const medOptions=allMedicines?allMedicines.map(opt => ({ label: opt.name, value: opt.name })):null;

  const [selectedOption, setSelectedOption] = useState(null);
  const onChange = (e) => {
    setAction("search");
    setSelectedOption(e);
  };
  console.log("allMedicines",allMedicines)
  useEffect(() => {
    const func = async () => {
      await getAllMedicines();
    };
    func();
  },[]);
  useEffect(() => {
      if(action==="viewAll"){
        setData(allMedicines);
      }
      else if(action==="search"){
        setData(allMedicines.filter(item => item.name===selectedOption.value));
      }
    },[action,selectedOption]);
    
  useEffect(() => {
      if(action==="viewAll"&&sortQuantity===false){
        setData(allMedicines);
      }
      else if(action==="viewAll"&&sortQuantity===true){
        setData(allMedicines.sort((q1, q2) => (q1.totalQuantity < q2.totalQuantity) ? 1 : (q1.totalQuantity > q2.totalQuantity) ? -1 : 0).reverse());
      }
      else if(action==="search" && sortQuantity===false){
        setData(allMedicines.filter(item => item.name===selectedOption.value));
      }
      else if(action==="search" && sortQuantity===true){
        setData(allMedicines.filter(item => item.name===selectedOption.value).sort((q1, q2) => (q1.totalQuantity < q2.totalQuantity) ? 1 : (q1.totalQuantity > q2.totalQuantity) ? -1 : 0).reverse());
      }
    const func = async () => {
      await getAllMedicines();
    };
    func();
  },[action,sortQuantity,selectedOption]);
return (
  <div class='container-xl px-4'>
    
      <div style={{width:"40%",margin:"auto"}}>
        <Select options={medOptions} 
        placeholder="Search stock..." 
        value={action==="search"?selectedOption:""}
        onChange={onChange}/>
      </div>
       <div className="m-4 text-center">
          <button class={`btn ${action === "viewAll" ? "btn-info" : "btn-outline-info"} mx-2 my-2`} onClick={() => setAction("viewAll")}>
            All Medicines
          </button>
          <button
            class={`btn ${sortQuantity === true ? "btn-info" : "btn-outline-info"} mx-2 my-2`}
            onClick={() => setSortQuantity(true)}
            >
            Sort By Quantity
          </button> 
          <button
            class={`btn ${sortQuantity === false ? "btn-info" : "btn-outline-info"} mx-2 my-2`}
            onClick={() => setSortQuantity(false)}
            >
            Sort By Date
          </button> 
        </div>

        <table class="table my-3 text-center" style={{width:"80%",margin:"auto"}}>
          <thead class="table-dark">
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Medicine</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
        {data?data.map((item,index) => {
            return(
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{item.name}</td>
                    <td>{item.totalQuantity}</td>
                  </tr>
            )
          }):null}
          </tbody>
      </table>
  </div>
)
}

export default ViewDocMedicine
