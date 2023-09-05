import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Header from "/src/components/Header";
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
                <Header />
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