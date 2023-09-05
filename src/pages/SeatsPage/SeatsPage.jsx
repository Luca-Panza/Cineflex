import axios from 'axios';
import { Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { RotatingLines } from  'react-loader-spinner'
import { PageContainer, LoadingContainer, SeatsContainer, SeatItem, CaptionContainer, CaptionItem, CaptionCircle, FormContainer, FooterContainer } from "./SeatsPageSC";

export default function SeatsPage(props) {
    const [items, setItems] = useState([]);
    const [available, setAvailable] = useState({});
    const { cpf, setCpf, name, setName, setId, setSelectedIds } = props;
    const { idSession } = useParams();
    const navigate = useNavigate();

	useEffect(() => {

        setName("");
        setCpf("");

        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSession}/seats`)

		.then(answer => {setItems(answer.data);})
        .catch(error => console.log(error));
        
	}, []);

	function confirmSeat (event) {
		event.preventDefault();

        setSelectedIds (Object.keys(available).map((key, i) => available[key] == "selected" ? i : null).filter(v => v != null));

        if(Object.keys(available).some(key => available[key] == "selected")) {

        setId(idSession);

		axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", {ids: Object.keys(available).filter(key => available[key] == "selected"), name: name, cpf: cpf})

        .then(() => navigate("/success/")) 
        .catch(error => console.log(error));

    }
    }

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
            <p>Choose your seat(s)</p>

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
                        <SeatItem onClick= {toggleSelect} key={seat.id} isAvailable={available[seat.id]} >{seat.name}</SeatItem>
                    </Fragment>
                );
            })}

            </SeatsContainer>
					
            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle isAvailable={'selected'}/>
                    Selected
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle isAvailable={true}/>
                    Available
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle isAvailable={false}/>
                    Unavailable
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={confirmSeat}>

                <label htmlFor='name'>Buyer's Name:</label>
                <input type="text" id='name' placeholder="Enter your name..." value={name} required onChange={e => setName(e.target.value)}/>

                <label htmlFor='cpf'>Buyer's CPF:</label>
                <input type="text" id='cpf' placeholder="Enter your CPF..." value={formatCPF(cpf)} required minLength={14} maxLength={14} onChange={e => setCpf(e.target.value)}/>

                <button type="submit">Reserve Seat(s):</button>

            </FormContainer>

            <FooterContainer>
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


