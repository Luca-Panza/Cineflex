import axios from 'axios';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { RotatingLines } from  'react-loader-spinner'
import { PageContainer, LoadingContainer, ListContainer, MovieContainer } from "./HomePageSC";

export default function HomePage() {
    const [items, setItems] = useState([]);

	useEffect(() => {

		axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies")

		.then(answer => {setItems(answer.data);})
        .catch(err => console.log(err));

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
            <p>Select the movie</p>
            <ListContainer>
                {items.map(item => 
                    <MovieContainer key={item.id} >
                        <Link to={`/sessions/${item.id}`}>
                        <img src={item.posterURL} alt="poster"/>
                        </Link>
                    </MovieContainer>
                )}
            </ListContainer>
        </PageContainer>
    )
}


