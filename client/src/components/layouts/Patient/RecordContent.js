import React, { useState, useEffect } from "react";

const RecordContent = (props) => {
  const { item, index } = props;
  const [data, setData] = useState(item);
  const [age, setAge] = useState("Age here");

  // console.log(data, 'data');
  // console.log('item', item);

  const d = new Date(data.date);
  const date = d.toLocaleDateString();
  const time = d.toLocaleTimeString();

  useEffect(() => {
    setData(item);
  }, [item]);

  useEffect(() => {
    const getAge = (dateString) => {
      var today = new Date();
      var birthDate = new Date(dateString);
      var curr = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        curr--;
      }
      return curr;
    };
    setAge(getAge(data.patient_birth));
  }, []);

  const Print = () => {
    let printContents = document.getElementById(`printDiv${index}`).innerHTML;
    let originalContents = document.body.innerHTML;
    let printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>table {border-collapse: collapse;} th, td {border: 1px solid black;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.addEventListener('afterprint', () => {
      document.body.innerHTML = originalContents;
    });
  };

  return (
    <div class='row my-4'>
      <div class='col-xl-8' style={{ margin: "auto" }}>
        <div class='card'  id={`printDiv${index}`}>
          <div class='card-header text-center'>
            Prescription
            <div style={{ float: "right" }}>
              <i class="fa-solid fa-file-pdf fa-lg mx-2 px-2" onClick={Print}></i>
            </div>
            </div>
          <div class='card-body'>
            {data.doctor_name ? (
              <p class='card-text'>Doctor : {data.doctor_name}</p>
            ) : (
              <p class='card-text'>Compounder : {data.compounder_name}</p>
            )}
            <p class='card-text'>Date of Diagonsis: {date}</p>
            <p class='card-text'>Time of Diagonsis: {time}</p>
            <a
              class='btn btn-success btn-sm'
              data-bs-toggle='collapse'
              href={`#collapseExample-${index}`}
              role='button'
              aria-expanded='false'
              aria-controls='collapseExample'
            >
              View Details
            </a>
            <div class='collapse my-3' id={`collapseExample-${index}`}>
              <div class='card card-body'>
              {data.diagnosis?<p>
                  <strong>Diagnosis</strong>
                  <br />
                  {data.diagnosis}
                </p>:null}
                <p>
                  <strong>Medicines</strong>
                  <br />
                  <table class="table text-center table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">S.no</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Frequency</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Dosage Time</th>
                      </tr>
                    </thead>
                    <tbody>
                        {data.medicines.map((item, index) => {
                        return (
                          <tr>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.quantity}</td>
                            <td>{item.frequency?item.frequency:'-'}</td>
                            <td>{item.amount?item.amount:'-'}</td>
                            <td>{item.dosage_time?item.dosage_time:'-'}</td>
                            {/* {index + 1})&emsp;{item.name}&emsp;quantity :{" "}
                            {item.quantity}&emsp; dosage : {item.frequency}{" "} */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </p>
                {data.test?<p>
                  <strong>Tests</strong>
                  <br />
                  {data.test}
                </p>:null}
                {data.symptoms?<p>
                  <strong>Symptoms</strong>
                  <br />
                  {data.symptoms}
                </p>:null}
                {data.remarks?<p>
                  <strong>Remarks</strong>
                  <br />
                  {data.remarks}
                </p>:null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordContent;
