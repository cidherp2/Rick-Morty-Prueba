import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Characters from "./Characters";
import NavBar from "./assets/Navbar";
import Banner from "./Banner";


const AppRoutes = () => {


    return (
        <Routes>
            <Route path="/characters" element={<> <NavBar/><Banner/><Characters></Characters></>}>  </Route>
        </Routes>
    )
}

export default AppRoutes

