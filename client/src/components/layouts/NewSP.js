import React from 'react'
import DoctorSP from './DoctorsSP'
const NewSp = () => {
  return (
    <div>
       <button class="btn btn-primary d-lg-none mt-5" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">Toggle offcanvas</button>
        <div class="offcanvas-lg offcanvas-end" tabindex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasResponsiveLabel">Responsive offcanvas</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <p class="mb-0"><DoctorSP/></p>
        </div>
        </div>
    </div>
  )
}

export default NewSp
