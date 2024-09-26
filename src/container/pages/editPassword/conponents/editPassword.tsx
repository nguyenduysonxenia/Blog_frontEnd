import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { useFormik,Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
function FormProfile(props: any) {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword:'',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().min(6, 'Minium 6 characters'),
      newPassword: Yup.string().min(6, 'Minium 6 characters'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], "Password's not match"),
    }),
    onSubmit: (values)=>{
      props.handelProps(values)
    },
  });
  return (
    <>
      <div className="row ">
        <div className="col-lg-8 col-xlg-9 col-md-7 m-auto">
          <div className="card">
            <div className="card-body">
              <form className="form-horizontal form-material mx-2" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label className="col-md-12">Current Password</label>
                  <div className="col-md-12">
                    <input
                      type="password"
                      name="currentPassword"
                      value={formik.values.currentPassword}
                      onChange={formik.handleChange}
                      className="form-control form-control-line"
                    />
                  </div>
                  {formik.errors.currentPassword && formik.touched.currentPassword && (
                  <label className="text-muted label-error">
                    <i className="fas fa-exclamation"></i>
                    <span className="error-validator" >{formik.errors.currentPassword}</span>
                  </label>
                  )}
                </div>
                <div className="form-group">
                  <label className="col-md-12">New Password</label>
                  <div className="col-md-12">
                    <input
                      type="password"
                      name="newPassword"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      className="form-control form-control-line"
                    />
                  </div>
                  {formik.errors.newPassword && formik.touched.newPassword && (
                  <label className="text-muted label-error">
                    <i className="fas fa-exclamation"></i>
                    <span className="error-validator" >{formik.errors.newPassword}</span>
                  </label>
                  )}
                </div>
                <div className="form-group">
                  <label className="col-md-12">Confirm Password</label>
                  <div className="col-md-12">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      className="form-control form-control-line"
                    />
                  </div>
                  {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                  <label className="text-muted label-error">
                    <i className="fas fa-exclamation"></i>
                    <span className="error-validator" >{formik.errors.confirmPassword}</span>
                  </label>
                  )}
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <button type="submit"  className="btn  btn-submit_profile">Update Profile</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

FormProfile.propTypes = {
  handelProps: PropTypes.func
};

export default FormProfile;
