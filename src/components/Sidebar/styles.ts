import Link from "next/link";

import { styled } from "@/styles/stitches.config";

export const SidebarContainer = styled("aside", {
  position: "relative",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",

  width: "232px",
  padding: "$10 $13 $6",
  borderRadius: "$lg",

  marginTop: "$5",
  marginBottom: "$5",

  boxShadow: "0 0 3px 1px $gray500",

  "@media (max-width: 768px)": {
    display: "none",
  },
});

export const TopContainer = styled("div", {
  display: "flex",
  flexDirection: "column",

  gap: "$16",
});

export const NavigationWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginInline: "auto",

  gap: "$4",
});

export const NavButton = styled(Link, {
  display: "flex",
  alignItems: "center",

  height: "42px",
  gap: "$3",

  color: "$gray400",

  transition: ".2s",

  "&:hover": {
    color: "$gray100",
  },

  variants: {
    active: {
      true: {
        position: "relative",

        fontWeight: "$bold",
        color: "$gray100",

        "&::before": {
          content: "",
          position: "absolute",
          top: "calc(50% - 24px/2)",
          left: "-20px",

          height: "24px",
          width: "4px",
          borderRadius: "$full",

          background: "$gradient-vertical",
        },
      },
    },
  },
});

export const LoginButton = styled(Link, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  gap: "$3",

  img: {
    borderRadius: "$full",
  },
});

export const ImageWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "34px",
  height: "34px",
  borderRadius: "$full",

  background: "$gradient-vertical",
});
