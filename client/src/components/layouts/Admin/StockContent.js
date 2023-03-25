import React,{useState,useContext, useEffect} from 'react'
import AdminContext from '../../../context/admin/AdminContext';
import AuthContext from '../../../context/auth/AuthContext';

const StockContent = (props) => {
    const adminContext = useContext(AdminContext);
    const {updateStock,deleteStock,getStock,getMedicines,stocks} = adminContext;

    const authContext = useContext(AuthContext);
    const {loadUser } = authContext;

    const {item,index}=props;
    const [edit,setEdit]=useState(false);
    const [data,setData]=useState(item);

    // console.log(item);

    const onEdit = () => {
        setEdit(true);
    }

    const onSave = () => {
        const updateAndRefetch = async () => {
          await updateStock(data);
          await getStock();
          await getMedicines();
          // await loadUser();
        };
        updateAndRefetch();
        setData(item)
        setEdit(false);
    }

    const onDelete=()=>{
      const updateAndRefetch = async () => {
          await deleteStock(data._id);
          await loadUser();
          // getStock();
          // getMedicines();
      };
      updateAndRefetch();
  };

  const onChange = (index) => (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //    setData(item)
  // }, [stocks]);
  
  return (
    <div class='row'>
      <div class='col-xl-6' style={{ margin: "auto" }}>
        <div class="card mb-4">
          <div class="card-header text-center">
              <span class="badge text-bg-success m-2" style={{fontSize:"1rem"}}>{item.name}</span>

              <span class="badge text-bg-danger m-2" style={{fontSize:"1rem"}}>
                Remaining Quantity : {item.quantity}
                </span>

              <div className="ms-auto" style={{float:"right"}}> {edit ? <i class="fa-solid fa-lg fa-square-check mx-3" style={{color:"green"}}  onClick={onSave}></i>
                  :  <i class="fa-sharp fa-solid fa-pen mx-3" onClick={onEdit} style={{color:"blue"}}></i>
              }
               <i class="fa-sharp fa-solid fa-trash" style={{color:"red"}} onClick={onDelete.bind(this,data)}></i>
              </div>
          </div>
          <div class="card-body">
              <ul class="list-group list-group-horizontal">
                <li class="list-group-item">Expiry date : {item.expiry.slice(0, 10)}</li>
                <li class="list-group-item">Adding date : {item.date.slice(0, 10)}</li>
              </ul>
              <ul class="list-group list-group-horizontal-sm">
                {item.seller?<li class="list-group-item">Seller name : {item.seller}</li>:null}
                {item.price?<li class="list-group-item">Price : {item.price}</li>:null}
                <li class="list-group-item">Initial Quantity: {item.initialQuantity}</li>
              </ul>
              {edit?
               <div class="mb-3 row my-4">
                 <label for="inputQuantity" class="col-sm-3 col-form-label">Quantity</label>
                 <div class="col-sm-8">
                   <input 
                    type="number"  
                    max={item.initialQuantity}
                    min={0}
                    class="form-control" 
                    id="inputQuantity" 
                    value={data.quantity}
                    onChange={onChange(index)}
                    name="quantity"
                    placeholder='Change remaining quantity'
                    disabled={!edit}
                   />
                 </div>
               </div>
              //  <form className='form-inline'>
              //    {/* <div className="form-group">
              //       <label for='inputQuantity'>
              //         Quantity
              //       </label>
              //       <input 
              //       className='form-control'
              //       type="number"
              //       name="quantity"
              //       value={data.quantity}
              //       onChange={onChange(index)}
              //       style={{width:"6rem",margin:"auto"}}
              //       disabled={!edit}
              //       />
              //       </div> */}
              //  </form>
               :null
              }
              </div>
        </div>
      </div>
    </div>
  )
}

export default StockContent
