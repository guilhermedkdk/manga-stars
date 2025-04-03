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

  gap: "$3",
  marginBottom: "$10",

  h2: {
    marginRight: "auto",
  },

  svg: {
    color: "$green100",
  },

  "@media(max-width: 768px)": {
    marginTop: "$16",
  },
});

export const MainContainer = styled("div", {
  display: "flex",

  gap: "$16",

  "@media(max-width: 1300px)": {
    flexDirection: "column",
    overflow: "overlay",
  },

  "@media(min-width: 768px)": {
    maxHeight: "calc(100% - 30px)",
  },
});

export const CenterContainer = styled("div", {
  display: "flex",
  flexDirection: "column",

  width: "100%",
  maxHeight: "calc(100% - 30px)",

  animation: `${entranceAnimationVertical} 0.5s`,
});

export const CardsContainer = styled("div", {
  overflow: "overlay",
});

export const RightContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignSelf: "start",
  alignItems: "center",

  maxHeight: "calc(100% - 30px)",
  borderLeft: "1px solid $gray700",

  p: {
    fontSize: "$xl",
    fontWeight: "$bold",
    lineHeight: "$short",
  },

  time: {
    fontSize: "$sm",
    lineHeight: "$short",
    color: "$gray400",
  },

  animation: `${entranceAnimation} 0.5s`,

  "@media(max-width: 1300px)": {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    border: "none",
  },
});

export const Line = styled("div", {
  width: "32px",
  height: "4px",

  margin: "$8 auto",
  borderRadius: "$full",

  background: "$gradient-horizontal",
});

export const CardWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",

  marginBottom: "$3",

  span: {
    marginBottom: "$2",

    fontSize: "$sm",
    color: "$gray300",
  },
});

export const ImageWrapper = styled("div", {
  position: "relative",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "72px",
  height: "72px",
  padding: "2px",

  marginBottom: "$5",
  borderRadius: "$full",

  background: "$gradient-vertical",
});

export const UserStats = styled("div", {
  display: "flex",
  flexDirection: "column",

  width: "308px",
  padding: "$5 $14",

  gap: "$10",
});

export const UserNumber = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$5",

  svg: {
    color: "$green100",
  },

  h5: {
    fontSize: "$md",
    lineHeight: "$base",
    color: "$gray200",
  },

  span: {
    fontSize: "$sm",
    color: "$gray300",
  },
});
