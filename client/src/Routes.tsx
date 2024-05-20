import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Characters from "./Characters";
import NavBar from "./assets/Navbar";


const AppRoutes = () => {


    return (
        <Routes>
            <Route path="/" element={<> <NavBar/><Characters></Characters></>}>  </Route>
        </Routes>
    )
}

export default AppRoutes

