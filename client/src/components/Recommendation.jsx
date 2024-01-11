import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     const res = await axios.get(`/videos/tags?tags=${tags}`);
  //     setVideos(res.data);
  //   };
  //   fetchVideos();
  // }, [tags]);

  useEffect(() => {
    const fetchRandomVideos = async () => {
      try {
        // Replace with the YouTube Data API request for random videos
        const res = await axios.get("https://www.googleapis.com/youtube/v3/", {
          params: {
            part: "snippet,contentDetails,statistics",
            type: "video",
            myRating: "like",
            regionCode: "US", // You can change the region code if needed
            videoEmbeddable: true,
            maxResults: 100, // adjust the number of videos you want
            key: "AIzaSyBW7rKhDaOpks-OsQVY3OTqSp-MYYMi_fU", // replace with your YouTube Data API key
          },
        });
        setVideos(res.data);
        // setChannel(response.data.items);
      } catch (error) {
        console.error("Error fetching random videos:", error);
      }
    };

    // Call the function to fetch random videos
    fetchRandomVideos();
  }, [tags]); // Empty dependency array means this effect runs once on component mount

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
