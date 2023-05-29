import styled from "styled-components";
import axios from 'axios';
import { Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function SeatsPage(props) {

    const [items, setItems] = useState([]);
    const [available, setAvailable] = useState({});
    const {cpf, setCpf, name, setName, setId, setSelectedIds} = props;
    const { idSession } = useParams();
    const navigate = useNavigate();

	useEffect(() => {

        setName("");
        setCpf("");

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSession}/seats`;

        const promise = axios.get(url);

		promise.then(answer => {setItems(answer.data);})
        promise.catch(error => console.log(error));
        
	}, []);

	function confirmSeat (event) {
		event.preventDefault();

        setSelectedIds (Object.keys(available).map((key, i) => available[key] == "selected" ? i : null).filter(v => v != null));

        if(Object.keys(available).some(key => available[key] == "selected")) {

        setId(idSession);

		const requisition = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", {ids: Object.keys(available).filter(key => available[key] == "selected"), name: name, cpf: cpf})

        requisition.then(() => navigate("/success/")) 
        requisition.catch(error => console.log(error));

    }
    }

    
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
            Selecione o(s) assento(s)

            <SeatsContainer>

            {items.seats.map(seat => 

            {    
                if (!available.hasOwnProperty(seat.id)) {
                    setAvailable(prevState => ({
                        ...prevState,
                        [seat.id]: seat.isAvailable
                    }));
                }
    
                function toggleSelect() {
                    setAvailable(prevState => ({
                        ...prevState,
                        [seat.id]: prevState[seat.id] === 'selected' ? true : prevState[seat.id] ? 'selected' : false
                    }));
                }
                
                return (
                    <Fragment key={seat.id}>
                        <SeatItem data-test="seat" onClick= {toggleSelect} key={seat.id} isAvailable={available[seat.id]} >{seat.name}</SeatItem>
                    </Fragment>
                );
            })}

            </SeatsContainer>
					
            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle isAvailable={'selected'}/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle isAvailable={true}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle isAvailable={false}/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={confirmSeat}>

            <label htmlFor='name'>Nome do Comprador:</label>
                <input data-test="client-name" type="text" id='name' placeholder="Digite seu nome..." value={name} required onChange={e => setName(e.target.value)}/>

            <label htmlFor='cpf'>CPF do Comprador:</label>
                <input data-test="client-cpf" type="text" id='cpf' placeholder="Digite seu CPF..." value={cpf} required minLength={14} maxLength={14} onChange={e => setCpf(e.target.value)}/>

                <button data-test="book-seat-btn" type="submit" >Reservar Assento(s)</button>

            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={items.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{items.movie.title}</p>
                    <p>{items.day.weekday} - {items.name} </p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${seat => seat.isAvailable === 'selected' ? '#0E7D71' : seat.isAvailable ? '#7B8B99' : '#F7C52B'};
    background-color: ${seat => seat.isAvailable === 'selected' ? '#1AAE9E' : seat.isAvailable ? '#C3CFD9' : '#FBE192'};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${seat => seat.isAvailable === 'selected' ? '#0E7D71' : seat.isAvailable ? '#7B8B99' : '#F7C52B'};
    background-color: ${seat => seat.isAvailable === 'selected' ? '#1AAE9E' : seat.isAvailable ? '#C3CFD9' : '#FBE192'};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
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
