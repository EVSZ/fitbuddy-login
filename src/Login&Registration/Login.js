import { Button, Form } from 'react-bootstrap'
import React, { useState } from 'react';
import axios from 'axios';

import './Login.css';

function errorHandler(error) {
    if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
}
function Login() {
    const [state, setState] = useState(true);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [exists, setExists] = useState(false);
    const [existsM, setExistsM] = useState(false);
    const [password, setPassword] = useState("");
    const [check, setCheck] = useState("");

    function LoginOrRegister() {
        return state ?
            axios.post(`http://localhost:8080/user/login`, { username, password })
                .catch(function (error) {
                    errorHandler(error)
                })
                .then(res => {
                    if (res.data) {
                        alert(`Welcome back ${username}`)
                    } else {
                        alert(`I dont know you yet ${username}`)
                    }
                }) :
            axios.post(`http://localhost:8080/user/new`, { email, username, password })
                .then(res => {
                    if (res.data.username === username && res.data.email === email) {
                        setExistsM(true)
                        setExists(true)
                    } else if (res.data.username === username || res.data.email === email) {
                        if (res.data.email === email) {
                            setExistsM(true)
                            setExists(false)
                        } else if (res.data.username === username) {
                            setExists(true)
                            setExistsM(false)
                        }
                    } else {
                        setExistsM(false)
                        setExists(false)
                        alert(`I AM WATCHING YOU ${username}`)
                    }
                })
    }
    function PasswordMatching() {
        return (password === check)
    }
    return (
        <section className="Container">
            <div>
                <h2>
                    {state ? "Login" : "Registration"}
                </h2>
            </div>
            <div className="Form"
                data-testid="mainContainer">
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
                    {exists ? <h6 data-testid="existsError">
                        This username has already been taken </h6> : null}
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
                            {existsM ? <h6 data-testid="existsError">
                                This email adres already has an account </h6> : null}
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
                    </div>
                    {!PasswordMatching() && !state ?
                        <h6 data-testid="passError">password does not match </h6>
                        : null}
                    <div className="ButtonContainer">
                        <div>
                            <Button
                                variant="danger"
                                type="submit"
                                data-testid="formSubmitBtn"
                            >
                                {state ? "Login" : "Sign-Up"}
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="outline-info"
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
            </div>
        </section>
    )
}
export default Login;