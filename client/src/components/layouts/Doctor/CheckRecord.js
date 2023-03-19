import React from 'react'
import { useParams } from "react-router-dom";

const CheckRecord = () => {
    const { check_roll_number, relation } = useParams();
    console.log(check_roll_number, relation);
  return (
    <div>CheckRecord</div>
  )
}

export default CheckRecord