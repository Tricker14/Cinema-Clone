'use client';
import { Box, Button, Paper, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import axios from 'axios';

interface Movie {
    id: number;
    name: string;
    description: string;
    // maybe others field for Movie 
    poster_path: string;
    title: string;
    overview: string;
    release_date: string;
}

interface ItemProps {
    item: Movie
}

interface GroupItemsProps {
    group: Movie[];
}


const Item: React.FC<ItemProps> = ({ item }) => {
    // console.log(item);
    const path = 'https://image.tmdb.org/t/p/w300' + item.poster_path;
    return (
        <Stack direction={'row'} spacing={2} justifyContent={'center'}>
            <Paper>
                <img src={path} alt={item.name} />
            </Paper>
        </Stack>
    )
}


const GroupItems: React.FC<GroupItemsProps> = ({ group }) => {
    return (
        <Stack direction={'row'} spacing={2} justifyContent={'center'}>
            {group.map((movie, index) => {
                const path = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
                return (
                    <Paper key={index}>
                        <img src={path} alt={movie.name} />
                    </Paper>
                )
            })}
        </Stack>
    )
}


export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [top15Movies, setTop15Movies] = useState<Movie[]>([]);
    const [groups, setGroups] = useState<Movie[][]>([]);


    const fetchPopularMovies = async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/discover/movie?page=1&sort_by=popularity.desc&api_key=da8d36eaaa26767521c1914960aac4b6');
            // setMovies(response.data.results);
            setTop15Movies(response.data.results.slice(0, 15));


        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchPopularMovies();


    }, [])

    useEffect(() => {
        console.log(top15Movies);
        const chunkSize = 5;
        const tmp_groups: Movie[][] = [];
        for (let i = 0; i < top15Movies.length; i += chunkSize) {
            tmp_groups.push(top15Movies.slice(i, i + chunkSize));
        }
        setGroups(tmp_groups);
    }, [top15Movies]);


    return (
        <Box>
            <Carousel
                navButtonsAlwaysVisible
                animation='slide'
                duration={500}
            >
                {
                    groups.map((group, index) =>
                        <GroupItems key={index} group={group} />
                    )
                }
            </Carousel>

        </Box>
    )
}

