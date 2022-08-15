import chroma from "chroma-js";

const getChroma = () => {
  return chroma
    .scale(["17bf72", "fff027", "fe3b20"])
    .domain([0, 0.2, 1.0])
    .mode("lrgb");
};

export default getChroma;
