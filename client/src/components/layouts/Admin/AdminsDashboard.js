const AdminsDashboard = () => {
    return (
      <div className='text-center'>
        <h3>ADD NEW RECORD</h3>
        <hr className='mx-4' />
        <div style={{ margin: "auto", width: "30%" }}>
          <input
            type='email'
            className='form-control my-4'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            placeholder="Enter Patient's email"
          />
          <div class='d-grid gap-2'>
            <button type='button' class='btn btn-primary my-2'>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminsDashboard;
  