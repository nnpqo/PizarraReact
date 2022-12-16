//import { Router } from "express";
import React from "react";
import { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom/client';
import './inicio.css';
import App from '../App';
import { BrowserRouter, Route,Routes, Link } from 'react-router-dom';
function Inicio  () {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${ window.location.pathname}`);

  }
    return (
            <div id="login-box">
                <h1>Login</h1>
                <div className="formu">
                    <form onSubmit={handleSubmit}>
                        <label>Ingresa tu nombre:
                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label>Ingresa codigo de sala:
                        <i className="fa fa-key" aria-hidden="true"></i>
                            <input
                                type="text"
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                            />
                        </label>
                        <input type="submit" />
                    </form>

                </div>

                <button type="submit">Login</button> 
            </div>
    )
}
export default Inicio

