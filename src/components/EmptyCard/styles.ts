import { styled } from "@/styles/stitches.config";

export const Container = styled("div", {
  display: "flex",
  height: "192px",

  marginBottom: "$10",
});

export const CardWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",

  width: "100%",
  padding: "$8",

  border: "2px solid $gray600",
  borderRadius: "$md",

  backgroundColor: "$gray600",

  "&:hover": {
    border: "2px solid $gray500",
  },
});

export const Description = styled("div", {
  display: "flex",
  flexDirection: "column",

  fontSize: "$md",
  color: "$gray300",

  span: {
    fontSize: "$2xl",
  },
});
