import "./updateUserForm.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./updateSlice";
//import { useNavigate } from "react-router-dom";

const UpdateUserForm = () => {
  const { user } = useSelector((state) => state.user);
  const userFirstName = user.firstName;
  const userLaststName = user.lastName;
  const dispatch = useDispatch();
  // let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("This field is required")
      .min(3, "too small")
      .max(50, "too long"),
    lastName: Yup.string()
      .required("This field is required")
      .min(3, "too small")
      .max(50, "too long"),
  });

  const initialvalues = {
    firstName: userFirstName,
    lastName: userLaststName,
  };

  const handleLogin = (formValue) => {
    const { firstName, lastName } = formValue;
    dispatch(updateUser({ firstName, lastName }))
      .then((response) => {
        if (response) {
          window.location.reload();
          // navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Formik
        onSubmit={handleLogin}
        initialValues={initialvalues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form className="input-form">
            <div className="input-input-wrapper">
              <div className="input-firstName-wrapper">
                <label htmlFor="firstName">FirstName</label>
                <Field name="firstName" type="text" id="firstName" />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error-text"
                />
              </div>
              <div className="input-lastName-wrapper">
                <label htmlFor="lastName">LastName</label>
                <Field name="lastName" type="text" id="lastName" />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error-text"
                />
              </div>
            </div>
            <div className="button-wrapper">
              <button type="submit" className="save-button" id="save-button">
                Save
              </button>

              <button
                className="cancel-button"
                id="cancel-button"
                type="reset"
                onClick={() => {
                  formik.resetForm();
                  window.location.reload();
                  // navigate("/");
                }}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateUserForm;
