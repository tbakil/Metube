import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setvideos] = useState([]);
  // Fetch videos when the component mounts
  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     const res = await axios.get(`/videos/${type}`);
  //     setvideos(res.data)
  //   };
  //   fetchVideos();
  // }, [type]);

  useEffect(() => {
    const fetchRandomVideos = async () => {
      try {
        // Replace with the YouTube Data API request for random videos
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/",
          {
            params: {
              part: "snippet,contentDetails,statistics",
              type: "video",
              myRating: "like",
              regionCode: "US", // You can change the region code if needed
              videoEmbeddable: true,
              maxResults: 100, // adjust the number of videos you want
              key: "AIzaSyBW7rKhDaOpks-OsQVY3OTqSp-MYYMi_fU", // replace with your YouTube Data API key
            },
          }
        );
        setvideos(response.data);
        // setChannel(response.data.items);
      } catch (error) {
        console.error("Error fetching random videos:", error);
      }
    };

    // Call the function to fetch random videos
    fetchRandomVideos();
  }, []); // Empty dependency array means this effect runs once on component mount
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
