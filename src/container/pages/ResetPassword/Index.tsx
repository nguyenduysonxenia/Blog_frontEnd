import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import './components/FormSendEmail.scss';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import userApi from '../../../service/api/UserAPI'
import { toast } from 'react-toastify';
import {checkToken} from '../../../utils/Authen'
function FormReset(props: any) {
  if(checkToken()){
    props.history.push('/');
  }
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required().min(6, 'Minium 6 characters'),
      confirmPassword: Yup.string()
        .required().min(6, 'Minium 6 characters')
        .oneOf([Yup.ref('password')], "Password's not match"),
    }),
    onSubmit: async (values) => {
      try {
        let response = await userApi.resetPassword(values,props.match.params.token);
        if(response){
          toast.success(` 🦄 ${response}`,{ position:"top-center" })
        }
      } catch (error: any) {
        toast.error(` 🦄 ${error.response.data}`,{ position:"top-center" })
      }
    },
  });
  return (
    <>
      <div className="form_forgot_wrap">
        <div className="title_form_reset">
          <h2 className="">Xenia</h2>
          <p>Don't Worry!</p>
        </div>
        <div className="form_send_email">
            <form onSubmit = {formik.handleSubmit}>
              <input className="form_send_email_text" placeholder="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              ></input>
              {formik.errors.password && formik.touched.password && (
                <label><i className="fas fa-exclamation-triangle"></i><span>{formik.errors.password}</span></label>
              )}
              <input className="form_send_email_text" placeholder="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              ></input>
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <label><i className="fas fa-exclamation-triangle"></i><span>{formik.errors.confirmPassword}</span></label>
              )}

              <button type="submit">Submit</button>
            </form>
        </div>
        <div className="footer-form_forgot">
            Did you remember?  <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </>
  )
}

FormReset.propTypes = {

}

export default FormReset

