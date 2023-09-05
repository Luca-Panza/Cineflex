import axios from 'axios';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { RotatingLines } from  'react-loader-spinner'
import { PageContainer, LoadingContainer, TextContainer } from "./SuccessPageSC";

export default function SuccessPage(props) {
    const { cpf, name, Id, selectedIds } = props;
    const [items, setItems] = useState([]);

    useEffect(() => {

        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${Id}/seats`)

        .then(answer => { setItems(answer.data); })
        .catch(error => console.log(error));

    }, []);

    function formatCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
        return cpf;
    }

    if(items.length === 0) {
		return (
                <PageContainer>
                    <LoadingContainer>
                        <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true}/>
                    </LoadingContainer>
                </PageContainer>
        );
	} 

    return (
        <PageContainer>
            <h1>Order placed <br /> successfully!</h1>

            <TextContainer>
                <strong><p>Movie and session</p></strong>
                <p>{items.movie.title}</p>
                <p>{items.day.date} - {items.name}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Tickets</p></strong>
                {selectedIds.map(id => 
                    <p key={id} >Seat {Number(id)+1}</p>
                )}
            </TextContainer>

            <TextContainer>
                <strong><p>Buyer</p></strong>
                <p>Name: {name}</p>
                <p>Cpf: {formatCPF(cpf)}</p>
            </TextContainer>

            <Link to="/">
                <button>Back to Home</button>
            </Link>
        </PageContainer>
    )
}

