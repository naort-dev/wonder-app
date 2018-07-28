import Topic from "./topic";

interface ActivityDetails {
  name: string;
  topic: Topic;
  location: string[]; // ['415 Stevens St', 'Geneva, IL 60134']
  latitude: number;
  longitude: number;
  distance: number;
  price_level: number;
}

export default ActivityDetails;
