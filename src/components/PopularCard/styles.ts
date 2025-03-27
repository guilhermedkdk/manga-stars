import { styled } from "@/styles/stitches.config";

export const Container = styled("div", {
  position: "relative",

  display: "flex",
  alignItems: "center",

  width: "324px",
  padding: "$4 $5",
  border: "2px solid $gray700",
  borderRadius: "$md",

  marginBottom: "$3",
  gap: "$5",

  backgroundColor: "$gray700",

  "&:hover": {
    border: "2px solid $gray600",
    cursor: "pointer",
  },
});

export const InfosWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",

  height: "100%",

  justifyContent: "space-between",
});

export const Infos = styled("div", {
  display: "flex",
  flexDirection: "column",

  height: "100%",

  span: {
    fontSize: "$sm",
    lineHeight: "$base",
    color: "$gray400",
  },
});

export const ReadNotification = styled("div", {
  position: "absolute",
  top: "-2px",
  right: "-2px",

  display: "flex",
  padding: "$1 $3",

  borderRadius: "0 $md 0 $md",
  backgroundColor: "$green300",

  fontSize: "$xs",
  color: "$green100",
});
