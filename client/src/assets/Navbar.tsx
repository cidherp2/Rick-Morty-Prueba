import styled from "styled-components";
import rick from "./rickHead.png"

const NavBarContainer = styled.div /*style*/ `
width:100vw;
height:5rem;
background:white;
margin-bottom:0 !important;
margin-top:0 !important;
display:flex;
align-items:center;
box-shadow: 0px 4.59475px 4.59475px rgba(0, 0, 0, 0.25);

`

const MenuNav = styled.ul /*style*/ `
padding-right:2rem;
width:50%;
display:flex;
justify-content:flex-end;
gap:2rem;
font-weight:800;
list-style:none ;
.liStyle{
}
`

const ImgCont = styled.div /*style*/ `
width:50%;
height:100%;
overflow: hidden; 
border-radius:2rem;
:hover{
opacity: .9;

}
`
const CharImg = styled.img /*style*/`
    object-fit:cover;
    width: 20%;
    height:auto;
    position: relative;
    object-position:50% 50%;
    bottom:.9rem;
  `;


const NavBar = () => {

    return(
<NavBarContainer>
    <ImgCont>
    <CharImg
    src={rick}
    >

    </CharImg>
    </ImgCont>
<MenuNav>
    <li className="liStyle">Characters</li>
    <li className="liStyle">Locations</li>
    <li className="liStyle">Favorites</li>
</MenuNav>
</NavBarContainer>
    )
}

export default NavBar