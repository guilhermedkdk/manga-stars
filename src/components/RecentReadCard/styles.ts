import { styled } from "@/styles/stitches.config";

export const Container = styled("div", {
  display: "flex",

  width: "100%",
  height: "192px",
  padding: "$5 $6",

  border: "2px solid $gray600",
  borderRadius: "$md",

  marginBottom: "$10",
  gap: "$5",

  backgroundColor: "$gray600",

  "&:hover": {
    border: "2px solid $gray500",
    cursor: "pointer",
  },
});

export const CardInfos = styled("div", {
  display: "flex",
  flexDirection: "column",

  width: "100%",
  height: "100%",
});

export const CardHeader = styled("div", {
  display: "flex",
  justifyContent: "space-between",

  marginBottom: "$3",
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
    maxHeight: 44,
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
