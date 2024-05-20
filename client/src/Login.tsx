import styled from 'styled-components';
import fondo from "./assets/fondo.avif";
import banner from "./assets/banner.png";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css';

export const StyledForm = styled.form /*style*/`
  width: 90%;
  border-radius: 5px;
  position: relative;
  top: -1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export const StyledLabel = styled.label /*style*/`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const StyledInput = styled.input /*style*/`
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  background-color: white;
  font-weight: lighter;
  color: black;
`;

export const StyledButton = styled.button /*style*/`
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  &:disabled {
    opacity: 0.5;
  }
  &:enabled {
    opacity: 1.0;
  }
`;

export const StyledAlert = styled.div /*style*/`
  padding: 10px;
  background-color: #f44336;
  color: white;
  margin-top: 10px;
  border-radius: 5px;
`;

const LoginCard = styled.div /*style*/`
  width: 30%;
  height: 60%;
  margin-right: 5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0px 0px 11px 2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 11px 2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 11px 2px rgba(0, 0, 0, 0.75);
  position: fixed;

  @media (min-width: 300px) and (max-width: 644px) {
    width: auto;
    height: 70%;
    min-height: fit-content;
    margin: 0;
    position: relative;
  }

  @media (min-width: 645px) and (max-width: 768px) {
    width: 100%;
    height: 90%;
    margin: 0;
    position: relative;
  }

  @media (min-width: 769px) and (max-width: 900px) {
    width: auto;
    height: 90%;
    margin: 0;
    position: relative;
  }
`;

const LoginTitle = styled.h1 /*style*/`
  width: 100%;
  height: auto;
  color: black;
  font-weight: lighter;
  font-size: 2rem;
  border-bottom-color: red;
  margin-bottom: 0;

  &.final {
    position: relative;
    top: 2rem;
    font-weight: normal;
    font-size: 1rem;
  }
`;

const LoginLogo = styled.img /*style*/`
  object-fit: fill;
  width: 60%;
  position: relative;
  top: -0.75rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<string>('');
    const [mail, setMail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState(true);

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };

    const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };


    const login = async (username: string, password:string) => {
        try {
            const response = await fetch('https://rick-and-morty-backend-889d8aa11dad.herokuapp.com/exam/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
    
            const authResponse = await response.json();
            if (response.ok) {
                console.log('Login successful:', (authResponse?.user?.token));
                await localStorage.setItem("token",authResponse?.user?.token )
               navigate("/characters")
            } else {
                console.error('Error logging in:', authResponse?.token);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const signUp = async (username: string, email: string, password: string) => {
        try {
            const response = await fetch('https://rick-and-morty-backend-889d8aa11dad.herokuapp.com/exam/api/user/create-user', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
    
            const data = await response.json();
            if (response.ok) {
                console.log('User created and logged in successfully:', data);
                await localStorage.setItem("token", data?.user?.token); 
                navigate("/characters"); 
            } else {
                console.error('Error creating user:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

   

    return (
        <div
            style={{
                color: 'black',
                width: '100vw',
                height: '100vh',
                display: 'inline-flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                background: `url(${fondo}) center/cover`,
            }}
        >
            <LoginCard>
                <LoginTitle>{isLogin ? 'Access your account' : 'Create a new Account'}</LoginTitle>
                <LoginLogo src={banner} />
                <StyledForm>
                    <StyledInput
                        placeholder="User"
                        type="text"
                        value={user}
                        onChange={handleUserChange}
                    />
                    {!isLogin &&(
                    <StyledInput
                        placeholder="Mail"
                        type="text"
                        value={mail}
                        onChange={handleMailChange}
                    />
                )}{isLogin ? "|": ""}
                    <StyledInput
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <StyledButton type="button" 
                     onClick={isLogin ? ()=>{login(user,password)} : ()=>{signUp(user,mail,password)}}
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </StyledButton>
                </StyledForm>
                <div style={{ marginTop: '1rem', cursor: 'pointer', color: 'blue' }} onClick={toggleForm}>
                    {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                </div>
                <LoginTitle className='final'>Rick and Morty©</LoginTitle>
                <LoginTitle className='final'>{isLogin ? 'Infinite Fan Scroller' : ""}</LoginTitle>
            </LoginCard>
        </div>
    );
};

export default Login;
