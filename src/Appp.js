import { useEffect, useRef, useState } from "react";
import App from "./App";
import Inicio from "./components/Inicio";
import { Route,Routes,BrowserRouter as Router,} from "react-router-dom";


function Appp(){
    return (
        <div>
          <h1>Private Room</h1>
          <Router>
          <Routes>
            <Route path="/:room" element={<App />} />
            <Route path="*" element={<Inicio />} />
          </Routes>
          </Router>

        </div>
      );
    }
export default Appp;