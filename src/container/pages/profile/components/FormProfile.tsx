import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { useFormik,Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
function FormProfile(props: any) {
  const currentUser = useSelector((state: any)=> state.CurrentUser);
  const [image,setImage] = useState(null);
  const handleFile = (e: any)=>{
    let file = e.target.files[0];
    setImage(file)
  }
  const formik = useFormik({
    initialValues: {
      username: currentUser.username,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Minium 3 characters')
        .max(15, 'Maximum 15 characters'),

    }),
    onSubmit: (values)=>{
      props.handelProps({...values,avatar:image})
    },
  });
  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-xlg-3 col-md-5">
          <div className="card card-wrap-info">
            <div className="card-body">
              <div className="mt-4">
                <div className="wrap_image_user">
                <img
                  src={ image ? URL.createObjectURL(image) : currentUser.avatar ? currentUser.avatar.url_image :  'images/imgDefault.jpg'}
                  className="img-circle"
                  height="150"
                  width="150"
                />
                </div>
                <h4 className="card-title mt-2 title_username">{currentUser.username}</h4>
                <div className="row text-center justify-content-md-center">
                <div className="form-group">
                  <input className="form-control select_file_image_user" type="file"
                  name="image"
                  onChange={handleFile}
                  />
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-xlg-9 col-md-7">
          <div className="card">
            <div className="card-body">
              <form className="form-horizontal form-material mx-2" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label className="col-md-12">Full Name</label>
                  <div className="col-md-12">
                    <input
                      type="text"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      placeholder="Johnathan Doe"
                      className="form-control form-control-line"
                    />
                  </div>
                  {formik.errors.username && formik.touched.username && (
                  <label className="text-muted label-error">
                    <i className="fas fa-exclamation"></i>
                    <span className="error-validator" >{formik.errors.username}</span>
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
  handelProps: PropTypes.func,
  data: PropTypes.object
};

export default FormProfile;
