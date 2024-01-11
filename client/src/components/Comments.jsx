import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from "axios";
// import { CommentContainer, CommentAvatar } from "./SharedCommentComponents";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  flex: 1;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 8px;
`;

const Button = styled.button`
  background-color: #1877f2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1558d6;
  }
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [Comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); //added

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [videoId]);

  //added
  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") {
      // Handle empty comment submission

      return;
    }

    try {
      // Send a request to your backend to save the new comment
      await axios.post("/comments", {
        videoId,
        userId: currentUser._id,
        content: newComment,
      });

      // Refetch comments to update the UI
      const res = await axios.get(`/comments/${videoId}`);
      setComments(res.data);

      // Clear the input field
      setNewComment("");
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={handleCommentSubmit}>Comment</Button>
      </NewComment>
      {Comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
