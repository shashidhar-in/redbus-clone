import React, { useEffect, useRef } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"


const Login = () => {

    const username = useRef();
    const password = useRef();
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/")
        }
    }, [])

    function login() {
        if (!username.current.value || !password.current.value) {
            toast.error('Both the fields are required');
        }
        else {
            localStorage.setItem("token", "userToken");
            navigate("/")
        }
    }

    return (
        <>
            <Toaster />
            <Container
                className="d-flex flex-column justify-content-center align-items-center bg-light m-0 mw-100"
                style={{ height: "100vh",margin:"10rem" }}
            >
                <Container className="logincontainer d-flex flex-column justify-content-center align-items-center bg-dark  h-75"
                style={{padding:"40px",width:"35vw"}}
                >
                           <Image src="https://www.redbus.in/i/59538b35953097248522a65b4b79650e.png" className="mb-5 "/>
                    <h2 className="text-light mb-5">Login</h2>
                    <Form.Control
                        ref={username}
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        className="mt-4 w-100"
                    />
                    <Form.Control
                        ref={password}
                        type="password"
                        className="mt-4 w-100"
                        placeholder="Password"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                    <Button variant="danger" className="mt-5 w-75" onClick={login}>
Login                    </Button>
                        <h6 className="text-light mt-3">Forget Password?</h6>
                </Container>

            </Container>

        </>
    );
};

export default Login;