import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { RotatingLines } from  'react-loader-spinner'
import { PageContainer, LoadingContainer, SessionContainer, ButtonsContainer, FooterContainer } from "./SessionsPageSC";

export default function SessionsPage() {
    const [items, setItems] = useState([]);
    const { idMovie } = useParams();

	useEffect(() => {

        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idMovie}/showtimes`)

		.then(answer => {setItems(answer.data);})
        .catch(error => console.log(error));
        
	}, []);


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
            <p>Schedule Your Movie</p>

            {items.days.map((day, i) =>
            <div key={day.id}>
                <SessionContainer>
                    {day.weekday} - {day.date}
                    <ButtonsContainer>
                    {day.showtimes.map((showtime, i) => (
                        <Link to={`/seats/${showtime.id}`} key={showtime.id}>
                            <button>{showtime.name}</button>
                        </Link>
                    ))}
                    </ButtonsContainer>
                </SessionContainer>
            </div>
            )}

            <FooterContainer>
                <div>
                    <img src={items.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{items.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}