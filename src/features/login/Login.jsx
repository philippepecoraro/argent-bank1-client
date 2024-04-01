import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./loginSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Loader from "../../common/Loader/Loader";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, loadingError } = useSelector((state) => state.login);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("This is not a valid email")
      .required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const initialvalues = {
    email: "",
    password: "",
  };

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    dispatch(login({ email, password }))
      .then((response) => {
        if (response.payload.token) {
          navigate("/profile");
        } else {
          navigate("*");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("rememberMe") === "true" ? true : false
  );

  const toggleRememberMe = ({ target }) => {
    let { checked } = target;
    if (checked) {
      localStorage.setItem("rememberMe", checked);
      setIsChecked(checked);
    }
    if (!checked) {
      localStorage.removeItem("rememberMe");
      setIsChecked(checked);
    }
  };

  return (
    <div>
      <main className="main bg-dark login">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faCircleUser} className="sign-in-icon" />
          <h1>Sign In</h1>
          <Formik
            onSubmit={handleLogin}
            initialValues={initialvalues}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="input-wrapper">
                <label htmlFor="email">Username</label>
                <Field name="email" type="text" id="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-text"
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" id="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-text"
                />
              </div>
              <div className="input-remember">
                <input
                  name="rememberMe"
                  type="checkbox"
                  id="rememberMe"
                  onChange={toggleRememberMe}
                  checked={isChecked}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <button type="submit" className="sign-in-button">
                Sign In
              </button>
            </Form>
          </Formik>
        </section>
        {isLoading && !loadingError && <Loader />}
      </main>
    </div>
  );
};

export default Login;
