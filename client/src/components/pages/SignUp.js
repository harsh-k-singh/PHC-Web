// import React, { Fragment, useContext, useState, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import image from '../../images/plus.png'
// import AuthContext from '../../context/auth/AuthContext'


// const SignUp = props => {

//     const authContext = useContext(AuthContext);
//     const { isAuthenicated, error, register, loading } = authContext
//     const navigate = useNavigate();
//     const [form, setForm] = useState({
//         name: '',
//         email: '',
//         roll_number: '',
//         phone: '',
//         gender: ''
//     })
//     const [formLoad, setFormLoad] = useState(loading)
//     const [err, setErr] = useState({
//         type: null,
//         msg: null
//     })

//     const onChange = e => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     }

//     const onSubmit = e => {
//         e.preventDefault();
//         setFormLoad(true);
//         register(form);
//     }

//     useEffect(() => {
//         if (isAuthenicated) navigate('/');
//         setErr({ msg: error });
//         setFormLoad(loading);
//     }, [isAuthenicated, error, loading, navigate])

//     return (
//         <Fragment>

//             <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
//                 <Grid.Column style={{ maxWidth: 500 }}>

//                     <Header as='h1' color='black' textAlign='center'>
//                         <Image src={image} /> <br /> <br />
//                         Register Yourself on<span style={{ color: 'green' }}>PHCApp</span>
//                     </Header>

//                     {err.msg !== null ? <Message warning header={err.msg} /> : null}
//                     <Form loading={formLoad} onSubmit={onSubmit} size='large'>
//                         <Segment padded stacked>


//                             <Form.Input name='name' onChange={onChange} required={true} size='big' fluid icon='user' iconPosition='left' placeholder='Name'
//                             />

//                             <Form.Input name='email' onChange={onChange} required={true} type='email' size='big' fluid icon='mail' iconPosition='left' placeholder='E-mail address' />

//                             <Form.Input name='roll_number' onChange={onChange} required={true} type='number' size='big' fluid icon='id' iconPosition='left' placeholder='roll_number number' />

//                             <Form.Input name='phone' onChange={onChange} required={true} type='number' size='big' fluid icon='phone' iconPosition='left' placeholder='Phone' />

//                             <Form.Input name='gender' onChange={onChange} required={true} size='big' fluid icon='gender' iconPosition='left' placeholder='Gender' />


//                             <Button type='submit' color='green' fluid size='large'>
//                                 Register
//                             </Button>

//                         </Segment>
//                     </Form>

//                     <Message >
//                         Already have an account? <Link to='/'>Login</Link>
//                     </Message>

//                 </Grid.Column>
//             </Grid>

//         </Fragment>
//     )
// }

// export default SignUp
