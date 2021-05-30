import './Login.css';
import { Button, Form } from 'react-bootstrap'
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [state, setState] = useState(true);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [check, setCheck] = useState("");

    function LoginOrRegister() {
        return state ?
            axios.post(`http://localhost:8080/user/login`, { username, password })
                .then(res => {
                    console.log(res);
                }) :
            axios.post(`http://localhost:8080/user/new`, { email, username, password })
                .then(res => {
                    console.log(res);
                })
    }
    function PasswordMatching() {
        return (password === check)
    }
    return (
        <section className="Container">
            <div>
                <h1>SUHHH BRO IM FROM LOCALHOST:3001 </h1>
                <h2>
                    {state ? "Login" : "Registration"}
                </h2>
            </div>
            <div className="Form">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        !PasswordMatching() && !state ? alert("password must match") : LoginOrRegister();
                    }}
                >
                    <div className="element">
                        <label className="formLabel">username
                            <input
                                className=""
                                value={username}
                                type="text"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                data-testid="username"
                                required />
                        </label>
                    </div>
                    {!state ?
                        <>
                            <div className="element">
                                <label className="formLabel">email adres
                                    <input
                                        className=""
                                        value={email}
                                        type="email"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        data-testid="email"
                                        required />
                                </label>
                            </div>
                            <div className="element">
                                <label className="formLabel">password
                                    <input
                                        className=""
                                        value={check}
                                        type="password"
                                        onChange={(e) => {
                                            setCheck(e.target.value);
                                        }}
                                        data-testid="passCheck"
                                        required />
                                </label>
                            </div>
                        </> : null}
                    <div className="element">
                        <label className="formLabel">
                            {!state ? "confirm password" : "password"}
                            <input
                                className=""
                                value={password}
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                data-testid="password"
                                required />
                        </label>
                        <h6
                            data-testid="passError"
                        >
                            {!PasswordMatching() && !state ? "password does not match" : null}
                        </h6>
                    </div>
                    <div className="ButtonContainer">
                        <div>
                            <Button
                                variant="danger"
                                className="submitButton"
                                type="submit"
                                data-testid="formSubmitBtn"
                            >
                                {state ? "Login" : "Sign-Up"}
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="outline-info"
                                className="submitButton"
                                onClick={() => {
                                    setState(!state)
                                    setEmail("")
                                    setPassword("")
                                    setCheck("")
                                }}
                                data-testid="formSwitchBtn"
                            >
                                {state ? "Sign-Up" : "Login"}
                            </Button>
                        </div>
                    </div>
                </Form>
            </div >
        </section>
    )
}
export default Login;