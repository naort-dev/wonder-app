export const MockAppointments = [
  {
    id: 0,
    name: "Test",
    phone: "555-555-5555",
    location: "NYC way",
    latitude: 25,
    longitude: 105,
    eventAt: "10-08-2018",
    topic: null,
    owner: {
      id: 1,
      first_name: "John",
      last_name: "Lee",
      location: "12th"
    },
    users: [
      {
        id: 1,
        first_name: "Jane",
        last_name: "Doe",
        location: "12th"
      }
    ],
    state: "confirmed",
    invited_at: "12-12-2018",
    confirmed_at: "12-12-2018"
  },
  {
    id: 0,
    name: "Test 1",
    phone: "444-444-4444",
    location: "NYC way 12",
    latitude: 25,
    longitude: 105,
    eventAt: "10-07-2018",
    topic: null,
    owner: {
      id: 1,
      first_name: "Paul",
      last_name: "Doe",
      location: "12th"
    },
    users: [
      {
        id: 1,
        first_name: "Sarah",
        last_name: "Ericson",
        location: "12th"
      }
    ],
    state: "created",
    invited_at: "12-12-2018",
    confirmed_at: "12-12-2018"
  }
];