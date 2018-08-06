import User from "./user";
import Topic from "./topic";

export interface AppoinmentUser extends Partial<User> {
  first_name: string;
  last_name: string;
  location?: string;
}

export default interface Appointment {
  name: string; // Activity name
  location: string;
  latitude?: number;
  longitude?: number;
  event_at: Date;
  topic: Topic;
  owner: AppoinmentUser;
  users: AppoinmentUser[];
  demerits?: string[];

  state: 'created' | 'negotiating' | 'confirmed' | 'cancelled';
  invited_at: Date;
  confirmed_at: Date;
}

export interface DecoratedAppointment extends Appointment {
  me: AppoinmentUser;
  match: AppoinmentUser;
}
