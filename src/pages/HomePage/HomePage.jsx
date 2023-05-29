import styled from "styled-components";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function HomePage() {

    const [items, setItems] = useState([]);

	useEffect(() => {

		const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");

		promise.then(answer => {setItems(answer.data);})
        promise.catch(error => console.log(error));
        
	}, []);

	if(items.length === 0) {
		return (
            <PageContainer>
                    <LoadingContainer>
                        <img src="/src/assets/loading.gif" alt="Loading" />
                    </LoadingContainer>
            </PageContainer>
        );
	}

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>

            {items.map(item => 
                <MovieContainer data-test="movie" key={item.id} >
                    <Link to={`/sessions/${item.id}`}>
                    <img src={item.posterURL} alt="poster"/>
                    </Link>
                </MovieContainer>)}

            </ListContainer>

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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`
const LoadingContainer = styled.div`
    width:441px;
    height:291px;
    padding-top:125px;

    display: flex;
    justify-content:center;
    align-items:center
`