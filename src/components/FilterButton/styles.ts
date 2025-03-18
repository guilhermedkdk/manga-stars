import { styled } from "@/styles/stitches.config";

export const ButtonContainer = styled("button", {
  height: "34px",
  padding: "$1 $4",

  border: "1px solid $purple100",
  borderRadius: "$full",

  background: "transparent",

  fontWeight: "400",
  fontSize: "$md",
  color: "$purple100",

  cursor: "pointer",

  transition: "0.4s",

  "&:hover": {
    border: "1px solid $purple100",
    backgroundColor: "$purple200",
    color: "$gray100",
  },

  variants: {
    selected: {
      true: {
        backgroundColor: "$purple200",
        border: "1px solid $purple200",
        color: "$gray100",
      },
    },
  },
});
