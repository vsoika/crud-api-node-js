import { TUser } from "../../types";

export const validateUserData = (data: Omit<TUser, "id">) => {
  if (!data || Object.keys(data).length !== 3) return false;

  const isValidFields =
    Boolean(data.age) && Boolean(data.hobbies) && Boolean(data.username);
  const isValidValues =
    typeof data.age === "number" &&
    Array.isArray(data.hobbies) &&
    typeof data.username === "string";

  return isValidFields && isValidValues;
};
