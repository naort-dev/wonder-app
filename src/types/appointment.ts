import User from "./user";
import Topic from "./topic";

export interface AppoinmentUser extends Partial<User> {
  first_name: string;
  last_name: string;
  location?: string;
}

export default interface Appointment {
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;

  topic: Topic;
  event_at: Date;

  owner: AppoinmentUser;
  users: AppoinmentUser[];
  demerits?: string[];

  aasm_state: 'created' | 'negotiating' | 'confirmed' | 'cancelled';
  invited_at: Date;
  confirmed_at: Date;
}