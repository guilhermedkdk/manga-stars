import { keyframes, styled } from "@/styles/stitches.config";

const entranceAnimationVertical = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(100%)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0%)",
  },
});

export const Title = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignSelf: "normal",

  maxWidth: "100%",
  maxHeight: "100vh",

  marginBottom: "$10",
  gap: "$3",

  h2: {
    marginRight: "auto",
  },

  svg: {
    color: "$green100",
  },

  ".title": {
    display: "flex",
    gap: "$3",
  },

  "@media (max-width: 768px)": {
    marginTop: "$16",
    flexDirection: "column",
  },
});

export const CenterContainer = styled("div", {
  display: "flex",
  flexDirection: "column",

  maxHeight: "calc(100% - 30px)",

  animation: `${entranceAnimationVertical} 0.5s`,

  "@media (max-width: 768px)": {
    overflow: "inherit",
  },
});

export const FilterContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",

  maxWidth: "100%",
  marginBottom: "$12",
  gap: "$3",
});

export const CardsContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(318px, 1fr))",

  gap: "0 $5",

  overflow: "overlay",
});
