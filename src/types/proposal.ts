import User from "./user";

/**
 * A proposal is a user who is calculated to
 * be a suggested match for another user
 */
export default interface Proposal {
  id: number | null;
  liked: boolean | null;
  has_match: boolean;
  candidate: Partial<User>;
}
