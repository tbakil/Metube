import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  width: ${(props) => (props.type !== "sm" ? "360px" : "100%")};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "20px")};
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
`;

const Texts = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: ${(props) => (props.type === "sm" ? "14px" : "18px")};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
  line-height: 1.4;
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin-bottom: 4px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({})

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`/users/find/${video.userId}`);
        setChannel(res.data);
      } catch (error) {
        console.error("Error fetching channel details:", error);
      }
    };
    fetchChannel()
  }, [video.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} alt={video.title} />
        <Details >
          <ChannelImage  src={channel?.img} alt={channel?.name} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel?.name}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
