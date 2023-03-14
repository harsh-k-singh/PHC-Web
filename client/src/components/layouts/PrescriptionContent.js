import React,{useState} from 'react'

const PrescriptionContent = (props) => {
  const {item,index}=props;
  const [data,setData]=useState(item);
  return (
    <div class='row my-4'>
    <div class='col-xl-8' style={{ margin: "auto" }}>
        <div class="card">
            <div class="card-body">
            <h5 class="card-title">Patient's ID: {data.patient_id}</h5>
                <p class="card-text text-muted">e-mail: 20bec005@iiitdmj.ac.in<br/>Age: 21&emsp;Gender: M <br/> Relation : {data.relation}</p>
                <p class="card-text">Date of Diagonsis: {data.date}</p>
                  <a class="btn btn-success btn-sm" data-bs-toggle="collapse" href={`#collapseExample-${index}`} role="button" aria-expanded="false" aria-controls="collapseExample">
                    View Details
                  </a>
                <div class="collapse my-3" id={`collapseExample-${index}`}>
                  <div class="card card-body">
                    <p><strong>Daignosis</strong><br/>{data.diagnosis}</p>
                    <p><strong>Medicines</strong><br/>
                    {data.medicines.map((item,index)=>{
                      return(
                        <div>
                          <p>{item.medicine_id} : {item.quantity} : {item.dosage}</p>
                        </div>
                      )
                    })}
                    </p>
                    <p><strong>Tests</strong><br/>
                    {data.tests.map((item,index)=>{
                      return(
                        <div>
                          <p>{item.test}</p>
                        </div>
                      )
                    })}
                    </p>
                    <p><strong>Symptoms</strong><br/>{data.symptoms}</p>
                    <p><strong>Remarks</strong><br/>{data.remarks}</p>
                      <div class="d-grid gap-2">
                      <a class="btn btn-outline-success btn-sm" href="/patientsHistory" role="button">
                        Check Past Records
                      </a>
                      </div>
                  </div>
                </div>
            </div>
         </div>
    </div>
    </div>
  )
}

export default PrescriptionContent

