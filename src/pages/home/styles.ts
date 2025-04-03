import { keyframes, styled } from "@/styles/stitches.config";

const entranceAnimation = keyframes({
  from: {
    opacity: 0,
    translate: "100%",
  },
  to: {
    opacity: 1,
    translate: "0%",
  },
});

const entranceAnimationVertical = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(100%)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0%)",
  },
});

export const Title = styled("div", {
  display: "flex",
  alignSelf: "normal",

  maxWidth: "100%",
  maxHeight: "100vh",

  marginBottom: "$10",
  gap: "$3",

  svg: {
    color: "$green100",
  },

  "@media (max-width: 768px)": {
    marginTop: "$16",
  },
});

export const HomeContainer = styled("div", {
  maxWidth: "100%",
  maxHeight: "calc(100% - 20px)",

  gap: "$16",

  "@media (min-width: 1300px)": {
    display: "flex",
  },

  "@media (min-width: 768px)": {
    overflow: "overlay",
  },
});

export const CenterContainer = styled("div", {
  display: "flex",
  flexDirection: "column",

  minWidth: "440px",
  padding: "0 $5 0 0",

  overflowY: "overlay",

  animation: `${entranceAnimationVertical} 0.5s`,

  "@media (max-width: 1300px)": {
    marginBottom: "$16",
  },
});

export const Subtitle = styled("div", {
  display: "flex",
  alignSelf: "normal",
  justifyContent: "space-between",

  maxWidth: "100%",
  maxHeight: "100vh",
  marginBottom: "$4",

  a: {
    display: "flex",
    alignItems: "center",

    gap: "$2",

    fontWeight: "$bold",
    color: "$purple100",

    "&:hover": {
      opacity: 0.85,
      transition: "0.2s",
    },
  },
});

export const RightContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  maxWidth: "100%",
  maxHeight: "100vh",

  animation: `${entranceAnimation} 0.5s`,
});
