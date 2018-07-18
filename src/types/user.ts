/**
 * User Model
 */
export default interface User {
  first_name?: string;
  last_name?: string;
  email?: string;
  birthdate?: Date;
  location?: string;
  occupation?: string;
  school?: string;
  gender?: 'male' | 'female';
  about?: string;
  distance_of_interest_min?: number;
  distance_of_interest_max?: number;
  age_of_interest_min?: number;
  age_of_interest_max?: number;
  male_interest?: boolean;
  female_interest?: boolean;
  available?: boolean;
  show_flakers?: boolean;
  show_ghosters?: boolean;
  show_fibbers?: boolean;
  show_location?: boolean;
  military_time?: boolean;
  distance_unit?: 'km' | 'mi';
  apn_new_matches?: boolean;
  apn_new_messages?: boolean;
  apn_message_likes?: boolean;
  apn_message_super_likes?: boolean;
  ghosts_cache?: number;
  flakes_cache?: number;
  fibs_cache?: number;
  location_cache?: number;
  geocoding_requested?: boolean;
  latitude?: number;
  longitude?: number;
}