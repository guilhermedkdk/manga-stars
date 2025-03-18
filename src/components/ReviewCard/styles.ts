import { styled } from "@/styles/stitches.config";

export const Container = styled("div", {
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
    cursor: "pointer",
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

export const UserImageWrapper = styled("div", {
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

  span: {
    fontSize: "$sm",
    lineHeight: "$base",
    color: "$gray400",
  },

  p: {
    maxHeight: "88px",

    marginTop: "$4",

    overflow: "hidden",

    fontSize: "$sm",
    lineHeight: "$base",
    color: "$gray300",
  },
});

export const Rating = styled("div", {
  display: "flex",

  gap: "$1",

  svg: {
    color: "$purple100",
  },
});

export const InfosWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",

  height: "100%",
  gap: "$5",
});
