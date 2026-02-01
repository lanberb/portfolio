import { createRenders } from "./render";
import { createSetters } from "./setter";

export const createFacade = (
  context: CanvasRenderingContext2D,
): ReturnType<typeof createSetters> & ReturnType<typeof createRenders> => {
  const setters = createSetters();
  const renders = createRenders(context);

  return {
    ...setters,
    ...renders,
  };
};
