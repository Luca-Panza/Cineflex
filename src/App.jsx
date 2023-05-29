import styled from "styled-components";
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";

export default function App() {

    axios.defaults.headers.common['Authorization'] = 'Ybxj4ly8x1i9xxTQ5jC1aG2i';

    const [selectedIds, setSelectedIds] = useState([]);
    const [Id, setId] = useState("");
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");

    return (
        <>

            <BrowserRouter>

                <NavContainer>CINEFLEX</NavContainer>

                <Routes>

                    <Route path='/' element={<HomePage />} />
                    <Route path='/sessions/:idMovie' element={<SessionsPage />} />
                    <Route path='/seats/:idSession' element={<SeatsPage cpf={cpf} setCpf={setCpf} name={name} setName={setName} setId={setId} setSelectedIds={setSelectedIds}/>} />
                    <Route path='/success/' element={<SuccessPage cpf={cpf} name={name} Id={Id} selectedIds={selectedIds}/>} />

                </Routes>

            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
