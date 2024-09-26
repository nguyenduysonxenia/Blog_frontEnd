import './Signin.scss';
import { Form, Button, Col, Image, Container } from 'react-bootstrap';
import logo from '../../assets/images/logo.jpg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom'
import userApi from '../../service/api/UserAPI'
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux'
import {setToken,checkToken} from '../../utils/Authen'
import {setCurrentUser} from '../../container/pages/user/UserSlice'
const Signin = () => {
  const history = useHistory();
  if(checkToken()){
    history.push('/')
  }
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required().email('Invalid format email')
        .min(3, 'Minium 3 characters'),
      password: Yup.string().required('Required').min(6, 'Minium 6 characters'),
    }),
    onSubmit: (values) => {
      const signin = async ()=>{
        try{
            let result: any = await userApi.login(values)
            if(result){
              localStorage.setItem('accessToken',JSON.stringify(result))
              let response: any = await userApi.getCurrentUser()
              const action  = setCurrentUser(response);
              dispatch(action);
              setToken(response.admin);
              if(response.admin){
                return history.push('/admin')
              }
              history.push('/')
            }
        }
        catch(err: any){
          toast.warning(` 🦄 ${err.response.data} `,{ position:"top-center" })
        }
      }
      signin();
    },
  });
  return (
    <>
      <Container className="form-container">
        <Form className="form" onSubmit={formik.handleSubmit} >
          <Col xs={6} md={4}>
            <Image src={logo} roundedCircle className="image-logo" />
          </Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Enter Username"
            />
            {formik.errors.email && formik.touched.email && (
              <Form.Text className="text-muted text-danger">
                {formik.errors.email}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
            />
            {formik.errors.password && formik.touched.password && (
              <Form.Text className="text-muted">
                {formik.errors.password}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
          <Link className="btn_forgot" to="/forgot">Forgot Password?</Link>
          </Form.Group>
          <Button variant="primary" type="submit" className="button">
            Sign In
          </Button>
          <div className="link_register">
            <Link to="/signup">No account/Signup ?</Link>
          </div>
        </Form>
      </Container>
    </>
  );
};
export default Signin;
