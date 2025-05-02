import Link from "next/link";

import { styled } from "@/styles/stitches.config";

export const Container = styled("div", {
  position: "relative",

  display: "flex",
  flexDirection: "column",

  width: "100%",
  height: "280px",
  padding: "$6",

  border: "2px solid $gray700",
  borderRadius: "$md",

  marginBottom: "$3",
  gap: "$8",

  backgroundColor: "$gray700",

  "&:hover": {
    border: "2px solid $gray600",
  },
});

export const CardHeader = styled("div", {
  display: "flex",

  height: "100%",

  gap: "$5",

  "div:nth-child(3)": {
    marginLeft: "auto",
  },
});

export const UserImageWrapper = styled(Link, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "42px",
  height: "42px",

  borderRadius: "$full",
  background: "$gradient-vertical",
});

export const Infos = styled("div", {
  display: "flex",
  flexDirection: "column",

  height: "100%",

  time: {
    fontSize: "$sm",
    lineHeight: "$base",
    color: "$gray400",
  },

  p: {
    maxHeight: "88px",

    marginTop: "$4",

    overflow: "overlay",

    fontSize: "$sm",
    lineHeight: "$base",
    color: "$gray300",
  },
});

export const InfosWrapper = styled("div", {
  display: "flex",

  height: "100%",
  gap: "$5",
});

export const ReadNotice = styled("div", {
  position: "absolute",
  top: "-2px",
  right: "-2px",

  display: "flex",
  padding: "$1 $3",

  borderRadius: "0 $md 0 $sm",

  fontSize: "$xs",
  color: "$green100",

  backgroundColor: "$green300",
});
