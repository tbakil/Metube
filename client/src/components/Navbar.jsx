import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Upload from "./Upload";
import { logout } from "../redux/userSlice"; // Import the logout action
import Metube from "../img/logo.png";
import MenuIcon from "@mui/icons-material/Menu";

// const Container = styled.div`
//   position: sticky;
//   top: 0;
//   background-color: ${({ theme }) => theme.bgLighter};
//   height: 56px;
//   width: 100%:
//   border-bottom: 1px solid ${({ theme }) => theme.bgLighter};
//   display: flex;
//   align-items: center;
//   padding: 10px 30px 15px 30px;
//   z-index: 1000; /* higher z-index to overlay Navbar */
// `;

const Container = styled.div`
  position: fixed;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 24px;
  z-index: 1000;
`;
const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

// const Logo = styled.img`
//   height: 24px;
//   margin-right: 16px;
//   cursor: pointer;
// `;

// const Logo = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 0px;
//   margin-left: -19px;
//   font-family: Roboto, Arial, sans-serif;
//   postion: sticky;
//   visibility: visible;
//   padding: 18px 14px 18px 16px;
// `;
const Logo = styled.div`
  display: flex;
  align-items: center;
`;

// const Title = styled.h2`
//   font-size: 20px;
//   font-weight: bold;
//   color: #ffff;
//   margin-bottom: 0px;
//   margin-left: -22px;
//   align-items: center;
//   color: ${({ theme }) => theme.text};
//   cursor: pointer;
// `;
const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.text}; /* Your color for the title */
  margin-left: 8px;
  cursor: pointer;
`;
const MenuButton = styled(MenuIcon)`
  cursor: pointer;
  font-size: 32px;
  margin-right: 10px;
  margin-left: 0px;
  padding: 16px 0px 18px 0px;
  color: ${({ theme }) => theme.text};
`;
// const Img = styled.img`
//   display: flex;
//   height: 30px;
//   align-items: center;
//   postion: sticky;
//   visibility: visible;
//   margin-left: -2px;
//   padding: 18px 14px 18px 16px;
// `;
const Img = styled.img`
  height: 24px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

// const Search = styled.div`
//   width: 30%;
//   height: 60%;
//   position: absolute;
//   left: 0px;
//   right: 0px;
//   margin: auto;
//   display: flex;
//   flix-direction: row;
//   flex: 1;
//   align-items: center;
//   justify-content: space-between;
//   padding: 2px 0px 2px 2px;
//   border: 1px solid #606060;
//   border-radius: 40px;
//   color: #606060;
// `;
const Search = styled.div`
  width: 420px;
  margin: auto;
  left: 0px;
  right: 0px;
  position: absolute;
  padding: 0px;
  align-items: center;
  display: flex;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border-radius: 40px;
  border: 1px solid #606060;
  cursor: pointer;
`;

// const SearchInput = styled.input`
//   width: 85%;
//   height: 90%;
//   padding: 0px 4px 0px 16px;
//   border-radius: 40px 0 0 40px;
//   outline: none;
//   left: 0px;
//   right: 0px;
//   top: 0px;
//   bottom: 0px;
//   font-size: 14px;
//   border: 0.1px solid transparent;
//   background-color: transparent;
//   color: ${({ theme }) => theme.text};
// `;
const SearchInput = styled.input`
  width: 82%;
  height: 36px;
  padding: 0px 4px 0px 16px;
  border: 0.5px solid #4b4b4b;
  border-radius: 40px 0 0 40px;
  outline: none;
  font-size: 14px;
  left: 0px;
  right: 0px;
  margin: -1px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
`;

// const SearchIcon = styled(SearchOutlinedIcon)`
//   position: absolute;
//   top: 50%;
//   right: 12px;
//   transform: translateY(-50%);
//   color: ${({ theme }) => theme.text};
//   cursor: pointer;
// `;

const SearchIcon = styled(SearchOutlinedIcon)`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

// const IconWrapper = styled.div`
//   margin-right: 24px;
//   cursor: pointer;
//   color: ${({ theme }) => theme.text};
// `;

const IconWrapper = styled.div`
  margin-right: 16px;
  cursor: pointer;
`;

// const Button = styled.button`
//   padding: 7px 12px;
//   background-color: transparent;
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   color: #3ea6ff;
//   border-radius: 30px;
//   font-weight: 500;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   &:hover {
//     background-color: ${({ theme }) => theme.soft};
//     border-radius: 30px;
//   }
// `;
const Button = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) =>
    theme.soft}; /* Your color for the button background */
  color: #3ea6ff;
  border: none;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 50px;
  &:hover {
    background-color: ${({ theme }) =>
      theme.soft}; /* Your color for the button background on hover *
    border-radius: 30px;
  }
`;

// const User = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   font-weight: 500;
//   color: ${({ theme }) => theme.text};
// `;

// const Avatar = styled.img`
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
//   cursor: pointer;
// `;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
`;

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const dispatch = useDispatch(); // Initialize dispatch function

  // Sign out function
  const handleSignOut = () => {
    dispatch(logout()); // Dispatch the logout action
    // Additional sign-out logic if needed
  };

  const handleMenuToggle = () => {
    console.log("Toggle Menu");
  };

  return (
    <Container>
      <LeftSection>
        <MenuButton onClick={handleMenuToggle} />
        <Link to="/">
          <Logo>
            <Img src={Metube} alt="Metube Logo" />
          </Logo>
        </Link>
        <Title to="/">Metube</Title>
        <Search>
          <SearchInput
            placeholder="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <SearchIcon onClick={() => navigate(`/search?q=${q}`)} />
        </Search>
      </LeftSection>
      <RightSection>
        {currentUser && (
          <>
            <IconWrapper>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
            </IconWrapper>
            <IconWrapper>
              <AppsOutlinedIcon />
            </IconWrapper>
            <IconWrapper>
              <NotificationsOutlinedIcon />
            </IconWrapper>
          </>
        )}
        {currentUser ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Avatar src={currentUser?.img} />
            <Link
              to={`/channel/${currentUser?.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {currentUser?.name}
            </Link>
            <Button onClick={handleSignOut}>SIGN OUT</Button>
          </div>
        ) : (
          <Link to="/signin" style={{ textDecoration: "none" }}>
            {/* <IconWrapper>
              <AccountCircleOutlinedIcon />
            </IconWrapper> */}
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>
        )}
      </RightSection>
      {open && <Upload setOpen={setOpen} />}
    </Container>
  );
};

export default Navbar;
