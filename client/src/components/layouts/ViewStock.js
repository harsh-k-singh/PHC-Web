import React,{useContext,useEffect} from 'react'
import AdminContext from '../../context/admin/AdminContext';
import StockContent from './StockContent';
const ViewStock = () => {
    const adminContext = useContext(AdminContext);
    const { getStock,stocks} = adminContext;
    useEffect(() => {
      const func = async () => {
        await getStock();
        console.log("stock",stocks)
      };
      func();
    },[]);
  return (
    <div class='container-xl px-4'>
        {stocks?stocks.map((item,index) => {
            return(
                <StockContent item={item} index={index}/>
            )
        }):null}
  </div>
  )
}

export default ViewStock
