import React from "react";
import styled from "styled-components";
import Metube from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 240px;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: fixed;
  top: 30px;
  overflow-y: auto;
  overflow-x: auto;
  border-right: 1px solid ${({ theme }) => theme.soft};
  z-index: -999; /* higher z-index to overlay Navbar */
`;
const Wrapper = styled.div`
  padding: 50px 16px;
  
`;

const Item = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  padding: 10px 16px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
    border-radius: 15px;
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
  padding: 10px 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #3ea6ff;
  border-radius: 40px;
  font-weight: 500;
  text-decoration: none;
  padding: 7px 12px;
  transition: background-color 0.3s;
  cursor: pointer;
  margin-left: 15;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
    border-radius: 30px;
  }
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 15px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        {/* <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={Metube} alt="Metube Logo" />
            Metube
          </Logo>
        </Link> */}
        <Item to="/">
          <HomeIcon />
          Home
        </Item>

        {/* <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}> */}
        <Item to="/trends">
          <ExploreOutlinedIcon />
          Explore
        </Item>
        {/* </Link> */}
        {/* <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        > */}
        <Item to="/subscriptions">
          <SubscriptionsOutlinedIcon />
          Subscriptions
        </Item>
        {/* </Link> */}
        <Hr />
        <Item to="/library">
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item to="/history">
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />

        {!currentUser && (
          <Login>
            Sign in to like videos, comment, and subscribe.
            <Link to="signin" style={{ textDecoration: "none" }}></Link>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Login>
        )}
        <Hr />
        <Title>BEST OF METUBE</Title>
        <Item to="/music">
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item to="/sports">
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item to="/gaming">
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item to="/movies">
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item to="/news">
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item to="/live">
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item to="/settings">
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item to="/report">
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item to="/help">
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
