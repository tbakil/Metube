import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);

  color: ${({ theme }) => theme.textSoft};
  transition: background-color 0.3s, color 0.3s;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
  border-radius: 7px;
  transition: background-color 0.3s, color 0.3s;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  &:hover {
    background-color: ${({ theme }) => theme.textSoft};
    color: ${({ theme }) => theme.soft};
  }
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    //added
     if (!name || !password) {
       console.error("Please fill in all required fields.");
       // You might want to show a message to the user indicating the missing fields
       return;
     }
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { name, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      //added
      if (err.response && err.response.status === 401) {
        // Handle wrong password error
        console.error("Wrong password");
      } else {
        // Handle other errors
        console.error("Error during login:", err);
      }
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res);
            dispatch(loginSuccess(res.data));
            navigate("/");
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    //added
     if (!name || !email || !password) {
       console.error("Please fill in all required fields.");
       // You might want to show a message to the user indicating the missing fields
       return;
     }
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to MeTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>

        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>

        <Title>or</Title>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignup}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
