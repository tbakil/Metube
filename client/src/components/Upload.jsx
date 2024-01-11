import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  border-radius:5px;
`;

const Wrapper = styled.div`
  width: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  border-radius: 7px;
  transition: background-color 0.3s, color 0.3s;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-top: 20px;
  border-radius: 10px;
`;

const ExitButton = styled.button`
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textSoft};
  }
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;

`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
// const Button = styled.button`
//   border-radius: 3px;
//   border: none;
//   padding: 10px 20px;
//   font-weight: 500;
//   cursor: pointer;
//   background-color: ${({ theme }) => theme.soft};
//   color: ${({ theme }) => theme.textSoft};
// `;

const UploadButton = styled.button`
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  border-radius: 3px;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.textSoft};
    color: ${({ theme }) => theme.soft};
  }
`;
const ChooseButton = styled.label`
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.textSoft};
    color: ${({ theme }) => theme.soft};
  }
`;
const Label = styled.label`
  font-size: 14px;
  border-radius: 3px;
`;
const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const [uploadEnabled, setUploadEnabled] = useState(false); //added
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setUploadEnabled(!!e.target.value.trim());//added
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };


  // const handleFileChange = (e, urlType) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     urlType === "imgUrl" ? setImg(file) : setVideo(file);
  //   }
  // };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    //added
    if (!uploadEnabled) {
      // Prevent upload if required fields are not filled
      return;
    }
    const res = await axios.post("/videos", { ...inputs, tags });
    setOpen(false);
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  return (
    <Container>
      <Wrapper>
        <ButtonContainer>
          <ExitButton onClick={() => setOpen(false)}>Exit</ExitButton>
          <UploadButton onClick={handleUpload} disabled={!uploadEnabled}>
            Upload
          </UploadButton>
        </ButtonContainer>
        <Title>Upload video</Title>
        <Label>Video title:</Label>
        <Input
          type="text"
          placeholder="Add a title to your video"
          name="title"
          onChange={handleChange}
          required
        />
        <Label>Video description:</Label>
        <Desc
          placeholder="Tell viewers about your video"
          name="desc"
          rows={5}
          onChange={handleChange}
        />
        <Label>Tags:</Label>
        <Input
          type="text"
          placeholder="Add tags (separate with commas)"
          onChange={handleTags}
        />
        <Label>Video file:</Label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc + "%"
        ) : (
          <ChooseButton>
            Choose Video
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              //onChange={(e) => handleFileChange(e, "videoUrl")}
            />
            {video && <p>Selected video: {video.name}</p>}
          </ChooseButton>
        )}
        <Label>Video cover: (optional):</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <ChooseButton>
            Choose Image
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
            {img && <p>Selected image: {img.name}</p>}
          </ChooseButton>
        )}
      </Wrapper>
    </Container>
  );
};

export default Upload;
