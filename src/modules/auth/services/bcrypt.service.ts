import { Injectable } from "@nestjs/common";
import { hash, compare, genSalt } from "bcrypt";

@Injectable()
export class BcryptService {
  /**
   * @param {string} password - given password to hash
   * @returns {string} the hashed password mean of `password`
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  /**
   * @param {string} password - password to verify
   * @param hash - the hashed stored password
   * @returns {boolean} true if password correspond to the hash. False otherwise
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
