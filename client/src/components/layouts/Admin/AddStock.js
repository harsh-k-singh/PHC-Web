import React,{useContext,useEffect,useState} from 'react'
import AdminContext from '../../../context/admin/AdminContext';

const AddStock = () => {
  const adminContext = useContext(AdminContext);
    const {stocks,getStock,addStock } = adminContext;
    
    const [form, setForm] = useState({
        name: "",
        price: "",
        quantity: "",
        seller: "",
        expiry: "",
    });
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        addStock(form);
        console.log(stocks)
    };
    useEffect(() => {
      const func = async () => {
        await getStock();
        // console.log(relatives);
      };
      func();
    },[]);
  return (
    <div class='row'>
    <div class='col-xl-8' style={{ margin: "auto" }}>
    <div class='card mb-4'>
        <div class='card-header'>Fill Stock Details</div>
        <div class='card-body'>
        <form>
            <div class='row gx-3 mb-3'>
            <div class='col-md-6'>
                <label class='small mb-1' for='inputSeller'>
                Seller*
                </label>
                <input
                class='form-control'
                id='inputSeller'
                type='text'
                placeholder='Enter Seller'
                name='seller'
                onChange={onChange}
                />
            </div>
            <div class='col-md-6'>
                <label class='small mb-1' for='inputName'>
                Name*
                </label>
                <input
                class='form-control'
                id='inputName'
                type='text'
                placeholder='Enter your full name'
                name='name'
                onChange={onChange}
                />
            </div>
            </div>
            <div class='row gx-3 mb-3'>
            
            <div class='col-md-4'>
                <label class='small mb-1' for='inputExpiry'>
                Expiry*
                </label>
                <input
                class='form-control'
                id='inputExpiry'
                type='date'
                placeholder='Enter Expiry Date'
                name='expiry'
                onChange={onChange}
                />
            </div>
            <div class='col-md-4'>
                <label class='small mb-1' for='input  Quantity'>
                Quantity*
                </label>
                <input
                class='form-control'
                id='inputQuantity'
                type='integer'
                placeholder='Enter Quantity'
                name='quantity'
                onChange={onChange}
                />
            </div>
            <div class='col-md-4'>
                <label class='small mb-1' for='inputPrice'>
                Price*
                </label>
                <input
                class='form-control'
                id='inputPrice'
                type='integer'
                placeholder='Enter Total Price in Rs.'
                name='price'
                onChange={onChange}
                />
            </div>
            </div>
            <button
                class='btn btn-primary'
                type='button'
                onClick={onSubmit}
            >
                Add Stock
            </button>
        </form>
        </div>
    </div>
    </div>
</div>
  )
}

export default AddStock
