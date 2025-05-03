import { keyframes, styled } from "@/styles/stitches.config";

const entranceAnimation = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const Container = styled("form", {
  position: "relative",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  padding: "$6",
  marginBottom: "$3",
  borderRadius: "$md",

  background: "$gray700",

  animation: `${entranceAnimation} 0.5s`,
});

export const FormErrors = styled("div", {
  display: "flex",
  flexDirection: "column",

  gap: "$2",
  marginRight: "auto",

  fontSize: "$sm",
  color: "red",
});

export const Loading = styled("div", {
  position: "absolute",
  top: "0px",
  left: "0px",
  zIndex: 999,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  width: "100%",
  height: "100%",

  borderRadius: "$md",

  backgroundColor: "rgba(0, 0, 0, 0.6)",
});

export const Header = styled("header", {
  display: "flex",
  justifyContent: "space-between",

  marginBottom: "$6",

  "@media (max-width: 550px)": {
    svg: {
      width: 20,
      height: 20,
    },
  },
});

export const User = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  gap: "$4",

  img: {
    border: "1px solid $green100",
    borderRadius: "$full",
  },

  h5: {
    fontSize: "$md",
    lineHeight: "$shorter",
  },
});

export const ReviewFormContainer = styled("div", {
  position: "relative",
});

export const ReviewForm = styled("textarea", {
  width: "100%",
  height: "164px",
  minHeight: "80px",

  padding: "$3 $4",

  border: "1px solid $gray500",
  marginBottom: "$3",
  borderRadius: "$sm",

  fontFamily: "$default",
  fontSize: "$sm",
  fontWeight: "regular",
  color: "$gray400",

  resize: "vertical",
  backgroundColor: "$gray800",

  "&::placeholder": {
    color: "$gray400",
  },

  "&:focus": {
    outline: 0,
    borderColor: "$green200",
  },

  "&:placeholder": {
    color: "$gray400",
  },
});

export const CharacterCounter = styled("div", {
  position: "absolute",
  bottom: "$6",
  right: "$4",

  fontSize: "$xs",
  lineHeight: "$short",
  color: "$gray400",
});

export const ButtonsContainer = styled("div", {
  display: "flex",
  justifyContent: "end",

  gap: "$2",
});

export const ActionButton = styled("button", {
  display: "flex",
  alignItems: "center",
  alignSelf: "center",

  width: "40px",
  height: "40px",
  padding: "$2",
  gap: "$5",

  borderRadius: "$sm",
  border: "none",

  fontSize: "$lg",
  fontWeight: "$bold",
  color: "$gray200",

  backgroundColor: "$gray600",

  cursor: "pointer",

  svg: {
    color: "$purple100",
  },

  "&:hover": {
    backgroundColor: "$gray500",
    transition: "all 0.5s ease-in-out",
  },
});
