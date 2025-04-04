import { keyframes, styled } from "@/styles/stitches.config";

const entranceAnimation = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const ModalWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",

  maxWidth: "516px",
  padding: "$14 $18",
  gap: "$4",

  margin: "auto",

  borderRadius: "$lg",
  backgroundColor: "$gray700",

  transform: "translate(0, -50%)",

  animation: `${entranceAnimation} 0.5s`,

  h4: {
    marginBottom: "$6",
  },
});

export const CloseButton = styled("button", {
  position: "absolute",
  top: "$4",
  right: "$4",

  display: "flex",

  border: "none",
  backgroundColor: "transparent",

  cursor: "pointer",

  svg: {
    color: "$gray400",

    "&:hover": {
      color: "$gray300",
    },
  },
});

export const ModalButton = styled("button", {
  display: "flex",
  alignItems: "center",
  alignSelf: "center",

  width: "100%",
  maxWidth: "372px",
  height: "72px",
  padding: "$5 $6",

  border: "none",
  borderRadius: "$md",
  gap: "$5",

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
