import { helpers } from "@vuelidate/validators";

export const lengthIs = (length: number) => (value: string | number) => {
  if (typeof value === "number") value = value.toString();
  return !helpers.req(value) || value.length === length;
};
