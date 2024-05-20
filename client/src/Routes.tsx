import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Characters from "./Characters";
import NavBar from "./assets/Navbar";
import Banner from "./Banner";
import Locations from "./Locations";
import Favorites from "./Favorites";
import Login from "./Login";
import { useEffect } from "react";


const AppRoutes = () => {
   

    function parseJwt (token:any) {
        if(!token){
            return false
        }
        var base64Url = token?.split('.')[1];
        var base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64)?.split('')?.map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
    const navigate = useNavigate()
 let tokenValidation: boolean= parseJwt(localStorage.getItem("token")).exp * 1000 > Date.now()


 useEffect(()=>{
if(tokenValidation && window.location.pathname ==="/login"){
    navigate("/characters")
}
else if (!tokenValidation){
    navigate("/login")
    localStorage.clear()
}
 },[tokenValidation])

    return (
        <Routes>
            <Route path="/characters" element={<> <NavBar/><Banner/><Characters></Characters></>}></Route>
            <Route path="/locations" element={<> <NavBar/><Banner/><Locations/></>}></Route>
            <Route path="/favorites" element={<> <NavBar/><Banner/><Favorites></Favorites></>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
    )
}

export default AppRoutes

