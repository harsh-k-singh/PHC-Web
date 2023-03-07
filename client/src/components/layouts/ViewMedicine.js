import React,{useEffect,useState,useContext} from 'react'
import AdminContext from '../../context/admin/AdminContext';
import StockContent from './StockContent';
import Select from 'react-select';

const ViewMedicine = () => {
  const adminContext = useContext(AdminContext);
  const { getMedicine,stocks,medicines,getStock} = adminContext;
  const [data,setData]=useState(stocks);

  const [action,setAction]=useState("viewAll");

  const [sortQuantity,setSortQuantity]=useState(false);

  const medOptions=stocks?stocks.map(opt => ({ label: opt.name, value: opt.name })):null;

  const [selectedOption, setSelectedOption] = useState(null);
  const onChange = (e) => {
    setAction("search");
    setSelectedOption(e);
  };

  useEffect(() => {
    const func = async () => {
      await getStock();
    };
    func();
  },[]);
  useEffect(() => {
      if(action==="viewAll"){
        setData(stocks);
      }
      else if(action==="search"){
        setData(stocks.filter(item => item.name===selectedOption.value));
      }
    },[action,selectedOption]);
    
  useEffect(() => {
      if(action==="viewAll"&&sortQuantity===false){
        setData(stocks);
      }
      else if(action==="viewAll"&&sortQuantity===true){
        setData(stocks.sort((q1, q2) => (q1.quantity < q2.quantity) ? 1 : (q1.quantity > q2.quantity) ? -1 : 0).reverse());
      }
      else if(action==="search" && sortQuantity===false){
        setData(stocks.filter(item => item.name===selectedOption.value));
      }
      else if(action==="search" && sortQuantity===true){
        setData(stocks.filter(item => item.name===selectedOption.value).sort((q1, q2) => (q1.quantity < q2.quantity) ? 1 : (q1.quantity > q2.quantity) ? -1 : 0).reverse());
      }
    const func = async () => {
      await getStock();
    };
    func();
  },[action,sortQuantity,selectedOption]);
return (
  <div class='container-xl px-4'>
    
      <div style={{width:"40%",margin:"auto"}}>
        <Select options={medOptions} 
        placeholder="Search stock..." 
        value={selectedOption}
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
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
        {data?data.map((item,index) => {
            return(
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>Requested</td>
                  </tr>
            )
          }):null}
          </tbody>
      </table>
  </div>
)
}

export default ViewMedicine
