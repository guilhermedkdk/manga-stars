import { styled } from "@/styles/stitches.config";

export const Container = styled("article", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  padding: "$6 $8",
  marginBottom: "$10",
  gap: "$10",

  borderRadius: "$md",

  backgroundColor: "$gray700",

  transition: "0.2s",

  "&>img": {
    borderRadius: "$sm",
  },

  p: {
    color: "$gray400",
    fontSize: "$sm",
  },
});

export const MangaContainer = styled("div", {
  display: "flex",

  gap: "$8",
  marginBottom: "$3",
});

export const Info = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  h3: {
    fontSize: "$lg",
    lineHeight: "$short",
  },

  h4: {
    fontSize: "$md",
    fontWeight: "$regular",
    lineHeight: "$base",
    color: "$gray300",

    marginBottom: "$5",
  },
});

export const Number = styled("p", {
  marginTop: "$1",

  fontSize: "$sm",
  color: "$gray400",
});

export const Footer = styled("footer", {
  display: "flex",

  padding: "$6 0",
  gap: "$16",

  borderTop: "1px solid $gray600",
});

export const MangaNumber = styled("div", {
  display: "flex",
  alignItems: "center",

  gap: "$5",

  svg: {
    color: "$green100",
  },

  h5: {
    fontSize: "$sm",
    fontWeight: "$regular",
    lineHeight: "$base",
    color: "$gray300",
  },

  span: {
    fontSize: "$md",
    fontWeight: "$bold",
    color: "$gray200",
  },
});
