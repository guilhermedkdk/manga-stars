import { keyframes, styled } from "@/styles/stitches.config";

const entranceAnimation = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const Container = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  maxWidth: "100vw",
  height: "100vh",
  padding: "$5",

  margin: "auto",
  gap: "$10",

  animation: `${entranceAnimation} 2s`,

  "@media(max-width: 768px)": {
    flexDirection: "column",
    justifyContent: "center",
  },
});

export const LogoFull = styled("div", {
  ".image": {
    position: "relative !important",

    width: "100%",
    height: "100%",

    objectFit: "cover",
  },

  "@media(max-width: 768px)": {
    display: "none",
  },
});

export const LogoWrapper = styled("div", {
  display: "none",

  "@media(max-width: 768px)": {
    display: "flex",
    marginBottom: "$5",
  },
});

export const Hero = styled("div", {
  maxWidth: 372,
  width: "100%",

  margin: "auto",

  h2: {
    marginBottom: "2px",

    lineHeight: "$short",
  },

  h4: {
    marginBottom: "$10",

    lineHeight: "$base",
    color: "$gray400",
  },

  "@media(max-width: 768px)": {
    margin: "unset",
  },
});

export const ButtonsWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",

  gap: "$4",
});

export const Button = styled("button", {
  display: "flex",
  alignItems: "center",
  alignSelf: "center",

  maxWidth: "372px",
  width: "100%",
  height: "72px",
  padding: "$5 $6",

  borderRadius: "$md",
  border: "none",
  gap: "$5",

  fontSize: "$lg",
  fontWeight: "$bold",
  color: "$gray200",
  cursor: "pointer",

  backgroundColor: "$gray600",

  svg: {
    color: "$purple100",
  },

  "&:hover": {
    backgroundColor: "$gray500",
    transition: "all 0.5s ease-in-out",
  },
});
