import { styled } from "@/styles/stitches.config";

export const TextInputContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",

  width: "100%",
  height: "48px",
  padding: "14px $5",

  border: "1px solid $gray500",
  borderRadius: "$sm",

  backgroundColor: "transparent",

  variants: {
    size: {
      sm: {
        maxWidth: "515px",
      },
      md: {
        maxWidth: "100%",
      },
    },
  },

  defaultVariants: {
    size: "sm",
  },

  svg: {
    color: "$gray500",
  },

  "&:has(input:focus)": {
    borderColor: "$green200",

    svg: {
      color: "$green200",
    },
  },
});

export const Input = styled("input", {
  width: "100%",

  fontFamily: "$default",
  fontSize: "$sm",
  fontWeight: "regular",
  color: "$white",

  border: 0,
  background: "transparent",

  "&:focus": {
    outline: 0,
  },

  "&:disabled": {
    cursor: "not-allowed",
  },

  "&::placeholder": {
    color: "$gray400",
  },
});
