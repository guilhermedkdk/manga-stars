import { styled } from "@/styles/stitches.config";

export const Container = styled("section", {
  display: "flex",
  margin: "0 $5",

  "& > main": {
    justifyContent: "space-between",

    width: "100vw",
    height: "100vh",
    padding: "$18 $24",

    overflow: "hidden",
  },
});
