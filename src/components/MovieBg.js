import styled from "styled-components";
import React from "react";
import movieBg from "../assets/Clip.mp4";

export const Video = styled.video`
  position: fixed;
  z-index: -100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media only screen and (min-aspect-ratio: 16/9) {
    width: 100%;
    height: auto;
  }
  @media only screen and (max-aspect-ratio: 16/9) {
    width: auto;
    height: 100%;
  }
`;
const MovieBg = () => {
  return (
    <Video autoPlay muted loop>
      <source src={movieBg} type="video/mp4" />
    </Video>
  );
};

export default MovieBg;
