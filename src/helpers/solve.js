import * as _ from "lodash";
import { shrink } from "./shrink";

export const solve = (container, shapes) => {
  shapes = _.cloneDeep(shapes);
  container = _.cloneDeep(container);
  container = shrink(container, true);


  
  console.log(container);
  console.log(shapes);
};
