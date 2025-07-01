import { useSkin } from "@hooks/useSkin";
import { Link } from "react-router-dom";
import {Row,Col,CardTitle,CardText,Label,Input,Button} from "reactstrap";
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";
import "@styles/react/pages/page-authentication.scss";
import logo from '../assets/images/logo/home_logo.png';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axiosInstance from  '../helper/axiosInstance'; 
import { login } from '../services/actions/LoginAction';
import toast from 'react-hot-toast'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { skin } = useSkin();
    const source = skin === "dark" ? illustrationsDark : illustrationsLight;

    const initialValues = {
        email: '',
        password: ''
    }
    
    const validationSchema = Yup.object({
        email: Yup.string()
            .required()
            .email()
            .max(50)
            .label('Email'),
        password: Yup.string()
            .required()
            .min(8)
            .max(10)
            .label('Password')
    })

    const onSubmit = async (values) => {
        try{
            // const response = await axiosInstance.post('login', values);

            const response = {
                data: {
                    success: true,
                    message: "Loggedin Successfully",
                    token: "mocked-jwt-token-123456",
                    user: {
                        id: 1,
                        name: "John Doe",
                        email: "john@example.com",
                        role: "admin"
                    }
                }
            };

            if(response.data.success){
                dispatch(login(response.data.user));
                toast.success(response.data.message);
                navigate('/home');
            }
        }catch (error) {
            let errorMessage = import.meta.env.VITE_ERROR_MSG;

            if(error.response){
                errorMessage = error.response.data?.message || JSON.stringify(error.response.data); // Case 1: API responded with an error
            }else if (error.request){
                errorMessage = import.meta.env.VITE_NO_RESPONSE; // Case 2: Network error
            }
    
            console.error(error.message);
            toast.error(errorMessage);
        }
    }

    return (
        <div className="auth-wrapper auth-cover">
            <Row className="auth-inner m-0">
                <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
                    <img src={logo} height="60" style={{ width: "auto" }} alt="logo" />
                </Link>
                
                <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
                    <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
                        <img className="img-fluid" src={source} alt="Login Cover" />
                    </div>
                </Col>

                <Col
                    className="d-flex align-items-center auth-bg px-2 p-lg-5"
                    lg="4"
                    sm="12"
                >
                    <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
                        <CardTitle tag="h2" className="fw-bold mb-1">
                            Welcome to Spectrum One Hair Extensions! 👋
                        </CardTitle>
                        
                        <CardText className="mb-2">
                            Please sign-in to your account
                        </CardText>
                        
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form
                                    className="auth-login-form mt-2"
                                >
                                    <div className="mb-1">
                                        <Label className="form-label" for="email">Email</Label>
                                        
                                        <Field
                                            type="text"
                                            name="email"
                                            id="email"
                                            placeholder="john@example.com"
                                            maxLength={50}
                                            autoFocus
                                            className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                        />

                                        <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                    </div>
                            
                                    <div className="mb-1">
                                        <div className="d-flex justify-content-between">
                                            <Label className="form-label" for="password">Password</Label>
                                            <Link to="/forgot_password">
                                                <small>Forgot Password?</small>
                                            </Link>
                                        </div>
                                        
                                        <Field
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="············"
                                            maxLength={10}
                                            className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                                        />

                                        <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                                    </div>
                                
                                    <div className="form-check mb-1">
                                        <Input type="checkbox" id="remember-me" />
                                        <Label className="form-check-label" for="remember-me">Remember Me</Label>
                                    </div>
                            
                                    <Button type='submit' color="primary" block>
                                        Sign in
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Col>
            </Row>
        </div>
    );
};

export default Login;


