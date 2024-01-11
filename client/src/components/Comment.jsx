import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js"; // Add timeago.js for better date formatting
// import { CommentContainer, CommentAvatar } from "./SharedCommentComponents"; //added


const Container = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Date = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Text = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
     const fetchComment = async () => {
       try {
         const res = await axios.get(`/users/find/${comment.userId}`);
         setChannel(res.data);
       } catch (error) {
         console.error("Error fetching comment user details:", error);
       }
     };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={channel?.img} alt={`${channel?.name}'s avatar`} />
      <Details>
        <Name>
          {channel.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
