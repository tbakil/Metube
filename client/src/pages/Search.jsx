import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  // const query = useLocation().search;
  //added
  const apiKey = "AIzaSyBW7rKhDaOpks-OsQVY3OTqSp-MYYMi_fU";
  
  useEffect(() => {
    
    const fetchRandomVideos = async () => {
     try {
       const res = await axios.get(
         "https://www.googleapis.com/youtube/v3/videos",
         {
           params: {
             part: "snippet,contentDetails,statistics",
             chart: "mostPopular",
             filter: "rating",
             order: "date",
             regionCode: "US", // You can change the region code if needed
             videoEmbeddable: true,
             maxResults: 100, // adjust the number of videos you want
             key: apiKey, // replace with your YouTube Data API key
           },
         }
       );
       setVideos(res.dataitems);
     } catch (error) {
       console.error("Error fetching random videos:", error);
     }
    };

    // Call the function to fetch random videos
    fetchRandomVideos();
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <Container>
      {videos && videos.map((video) => (<Card key={video._id} video={video} />))}
    </Container>
  );
};

export default Search;
