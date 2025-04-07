import { styled } from "@/styles/stitches.config";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  padding: "$6",
  gap: "$4",
  marginBottom: "$3",

  borderRadius: "$md",

  background: "$gray700",

  transition: "0.2s",

  p: {
    fontSize: "$sm",
    color: "$gray400",
  },
});

export const Header = styled("header", {
  display: "flex",
  justifyContent: "space-between",
});

export const User = styled("div", {
  display: "flex",
  justifyContent: "space-between",

  gap: "$4",

  img: {
    border: "1px solid $green100",
    borderRadius: "$full",
  },

  h5: {
    fontSize: "$md",
    lineHeight: "$shorter",
  },

  time: {
    fontSize: "$sm",
    color: "$gray400",
  },
});
