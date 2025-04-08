import Link from "next/link";

import { keyframes, styled } from "@/styles/stitches.config";

const entranceAnimation = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const Container = styled("section", {
  position: "fixed",
  top: "0",
  left: "0",
  zIndex: 20,

  display: "flex",
  justifyContent: "flex-end",

  width: "100vw",

  "@media (min-width: 768px)": {
    display: "none",
  },
});

export const MobileMenuWrapper = styled("section", {
  width: "100%",
  padding: "$12 $12 0",

  zIndex: 999,

  background: "$gray800",

  animation: `${entranceAnimation} 0.5s`,
});

export const HamburgerWrapper = styled("div", {
  position: "fixed",
  top: "$10",
  right: "$12",

  zIndex: 999,
});

export const NavigationWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  width: "100%",
  padding: "$4",
  gap: "1rem",

  border: "2px solid $gray600",
  borderRadius: "$lg",

  background: "$gray700",

  transition: "0.3s",

  animation: `${entranceAnimation} 0.8s`,
});

export const NavButton = styled(Link, {
  display: "flex",
  alignItems: "center",

  height: "42px",
  marginLeft: "20px",
  gap: "$3",

  color: "$gray400",

  transition: "0.2s",

  "&:hover": {
    color: "$gray100",
  },

  variants: {
    active: {
      true: {
        color: "$gray100",
        fontWeight: "$bold",
        position: "relative",

        "&::before": {
          content: "",
          position: "absolute",
          top: "calc(50% - 24px/2)",
          left: "-20px",

          width: "4px",
          height: "24px",

          borderRadius: "$full",

          background: "$gradient-vertical",
        },
      },
    },
  },
});

export const InfosWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  gap: "$3",

  border: "none",
  background: "none",

  fontSize: "$md",
  color: "$gray200",

  img: {
    borderRadius: "$full",
  },
});

export const LoginButton = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  border: "none",
  background: "none",

  cursor: "pointer",

  strong: {
    marginRight: "$3",

    fontSize: "$md",
    color: "$gray200",
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
