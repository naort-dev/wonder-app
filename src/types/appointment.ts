import User from "./user";
import { Moment } from 'moment-timezone';

export default interface Appointment {
  attendences: User[];
  users: User[];
  demerits?: string[];

  name: string;
  location: string;
  latitude?: string;
  longitude?: string;
  event_at: Moment;
}