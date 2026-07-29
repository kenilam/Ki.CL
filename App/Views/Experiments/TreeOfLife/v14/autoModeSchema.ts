import * as v from 'valibot';

export const ControlsSchema = v.object({
  autoMode: v.boolean(),
  query: v.string(),
  selectedId: v.string(),
});

export type ControlsValues = v.InferOutput<typeof ControlsSchema>;

/** @deprecated Use ControlsSchema */
export const AutoModeSchema = ControlsSchema;
export type AutoModeValues = ControlsValues;
