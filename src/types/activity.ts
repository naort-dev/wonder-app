export default interface Activity {
  name: string,
  location: string[]; // ['415 Stevens St', 'Geneva, IL 60134']
  latitude: number;
  longitude: number;
  distance: number;
  price_level: number;
}