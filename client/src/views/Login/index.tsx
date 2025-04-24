// React Imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// Formik Imports
import { Form, Formik, FormikProps } from "formik";
// MUI Imports
import { Button, Box } from "@mui/material";
// Custom Imports
import { Heading, SubHeading } from "../../components/Heading";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
// React Icons Imports
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// Validation Schema Imports
import { loginSchema } from "./components/validationSchema";
// Utils Imports
import { onKeyDown } from "../../utils";
// Images Imports
// Redux API
import { useLoginMutation } from "../../redux/api/authApiSlice";
import { setUser } from "../../redux/auth/authSlice";




interface ISLoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // states
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<ISLoginForm>({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const hideShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  // Login Api Bind
  const [loginUser, { isLoading }] = useLoginMutation();

  const LoginHandler = async (data: ISLoginForm) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      const user: any = await loginUser(payload);
      if (user?.data?.status) {
        dispatch(setUser(user?.data));
        localStorage.setItem("user", JSON.stringify(user?.data));
        navigate("/");
      }
      if (user?.error) {
        setToast({
          ...toast,
          message: user?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            bottom: "0",
            right: "-175px",
            "@media (max-width: 576px)": {
              display: "none",
            },
          }}
        >
          <img
          // src={BottomLogo}
          // alt="bottom logo"
          // style={{ transform: "rotate(-6deg)", height: "200px" }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            "@media (max-width: 768px)": {
              flexDirection: "column-reverse",
            },
          }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
                padding: "0 100px",
                "@media (min-width: 1500px)": {
                  padding: "0 50px",
                  width: "550px",
                },
                "@media (min-width: 768px) and (max-width: 991px)": {
                  padding: "0 45px",
                },
                "@media (min-width: 576px) and (max-width: 767px)": {
                  padding: "0 50px",
                  width: "550px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >

                <Heading
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "black"
                  }}
                >
                  Welcome Back
                </Heading>
                <SubHeading sx={{
                  color: "#4b5563",
                  display: "flex",
                  justifyContent: " center",
                  alignItems: "center",
                  fontSize: "13px"
                }}>
                  Please Enter Your Details
                </SubHeading>
                <Formik
                  initialValues={formValues}
                  onSubmit={(values: ISLoginForm) => {
                    LoginHandler(values);
                  }}
                  validationSchema={loginSchema}
                >
                  {(props: FormikProps<ISLoginForm>) => {
                    const {
                      values,
                      touched,
                      errors,
                      handleBlur,
                      handleChange,
                    } = props;

                    return (
                      <Form onKeyDown={onKeyDown}>

                        <Box
                          sx={{
                            height: "95px",
                            marginTop: "20px",
                          }}
                        >
                          <SubHeading sx={{ marginBottom: "5px" }}>
                            Email
                          </SubHeading>
                          <PrimaryInput
                            type="text"
                            label=""
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            helperText={
                              errors.email && touched.email ? errors.email : ""
                            }
                            error={errors.email && touched.email ? true : false}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Box>
                        <Box sx={{ height: "95px" }}>
                          <SubHeading sx={{ marginBottom: "5px" }}>
                            Password
                          </SubHeading>
                          <PrimaryInput
                            type={showPassword ? "text" : "password"}
                            label=""
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            helperText={
                              errors.password && touched.password
                                ? errors.password
                                : ""
                            }
                            error={
                              errors.password && touched.password ? true : false
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onClick={hideShowPassword}
                            endAdornment={
                              showPassword ? (
                                <AiOutlineEye color="disabled" />
                              ) : (
                                <AiOutlineEyeInvisible color="disabled" />
                              )
                            }
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                            marginTop: "10px",
                          }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isLoading}
                            sx={{
                              padding: "5px 30px",
                              textTransform: "capitalize",
                              margin: "20px 0",
                            }}
                          >
                            {isLoading ? "Login..." : "Login"}
                          </Button>
                        </Box>
                      </Form>
                    );
                  }}
                </Formik>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              background: "linear-gradient(to bottom right, rgba(37, 99, 235, 0.5), rgba(30, 64, 175, 0.5), rgba(107, 33, 168, 0.5)), url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              backgroundSize: "cover", // Ensures the image covers the area without stretching
              backgroundPosition: "center", // Centers the background image
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "0px 0px 0px 1000px",
            }}
          >
            <Box sx={{ position: "relative", margin: "0 auto" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                <Heading sx={{ fontSize: "45px", color: "#fff" }}>
                  Welcome to Smart Doc
                </Heading>
                <SubHeading
                  sx={{
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    fontSize: "17px",
                  }}
                >
                  New here?
                  <Box>
                    <Link
                      to="/signup"
                      style={{
                        fontWeight: "bold",
                        color: "#fff",
                        textDecoration: "none",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.textDecoration = "underline")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.textDecoration = "none")
                      }
                    >
                      Create a new account
                    </Link>
                  </Box>
                </SubHeading>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box >
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default Login;
