import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import './FormSendEmail.scss';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import userApi from '../../../../service/api/UserAPI'
import { toast } from 'react-toastify';
function FormSendEmail(props: any) {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required().email('Invalid format email')
        .min(3, 'Minium 3 characters')
    }),
    onSubmit: async (values) => {
       try {
         let response = await userApi.sendEmail(values)
         toast.success(` 🦄 ${response}`,{ position:"top-center" })

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
              <input className="form_send_email_text" placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              ></input>
              {formik.errors.email && formik.touched.email && (
                <label><i className="fas fa-exclamation-triangle"></i><span>{formik.errors.email}</span></label>
              )}

              <button type="submit">Send Email</button>
            </form>
        </div>
        <div className="footer-form_forgot">
            Did you remember?  <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </>
  )
}

FormSendEmail.propTypes = {

}

export default FormSendEmail

