import React, { useEffect, useState } from "react";
import axios from "axios";

const YouTubeComponent = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Make a sample request to get popular videos
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const API_ENDPOINT = "https://www.googleapis.com/youtube/v3/videos";

    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT, {
          params: {
            key: API_KEY,
            part: "snippet",
            chart: "mostPopular",
            regionCode: "US",
            videoCategoryId: "10", // Music category, you can change this
            maxResults: 5,
          },
        });

        setVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Popular YouTube Videos</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
            />
            <p>{video.snippet.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubeComponent;
