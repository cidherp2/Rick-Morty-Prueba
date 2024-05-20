import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Characters from "./Characters";
import NavBar from "./assets/Navbar";
import Banner from "./Banner";
import Locations from "./Locations";


const AppRoutes = () => {


    return (
        <Routes>
            <Route path="/characters" element={<> <NavBar/><Banner/><Characters></Characters></>}></Route>
            <Route path="/locations" element={<> <NavBar/><Banner/><Locations/></>}></Route>
            <Route path="/favorites" element={<> <NavBar/><Banner/><Locations/></>}></Route>
        </Routes>
    )
}

export default AppRoutes

