import { error } from "@sveltejs/kit";
import { algorithmsArr } from "$lib/algorithms/algorithmsArr.js";
export function load({ params }) {
  //find algorithm data from slug
  const algorithm = algorithmsArr.find((a) => a.slug === params.algorithm);
  if (!algorithm) throw new Error("Algorithm not found");

  return {
    algorithm,
  };
}
