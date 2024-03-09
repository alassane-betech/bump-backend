import { hash, compare, genSalt } from "bcrypt";

/**
 * @param {string} password - given password to hash
 * @returns {string} the hashed password mean of `password`
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

/**
 * @param {string} password - password to verify
 * @param hash - the hashed stored password
 * @returns {boolean} true if password correspond to the hash. False otherwise
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await compare(password, hash);
};
