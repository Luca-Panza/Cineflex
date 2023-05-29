import styled from "styled-components";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function SuccessPage(props) {

    const { cpf, name, Id, selectedIds } = props;
    const [items, setItems] = useState([]);

    useEffect(() => {

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${Id}/seats`;

        const promise = axios.get(url);

        promise.then(answer => { setItems(answer.data); })
        promise.catch(error => console.log(error));

    }, []);

    if(items.length === 0) {
		return (
                <PageContainer>
                    <LoadingContainer>
                        <img src="/src/assets/loading.gif" alt="Loading"/>
                    </LoadingContainer>
                </PageContainer>
        );
	} 

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info" >
                <strong><p>Filme e sessão</p></strong>
                <p>{items.movie.title}</p>
                <p>{items.day.date} - {items.name}</p>
            </TextContainer>

            <TextContainer data-test="seats-info" >
                <strong><p>Ingressos</p></strong>
                {selectedIds.map(id => 
                    <p key={id} >Assento {Number(id)+1}</p>
                )}
            </TextContainer>

            <TextContainer data-test="client-info" >
                <strong><p>Comprador</p></strong>
                <p>{name}</p>
                <p>{cpf}</p>
            </TextContainer>

            <Link to="/" data-test="go-home-btn">
                <button>Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`
const LoadingContainer = styled.div`
    width:441px;
    height:291px;
    padding-top:125px;

    display: flex;
    justify-content:center;
    align-items:center
`;

