/**
 * A proposal is a user who is calculated to
 * be a suggested match for another user
 */
export default interface Proposal {
  user: number;
  candidate: number;
  liked: boolean;
}