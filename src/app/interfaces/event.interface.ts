export interface Event {
  id: string;
  eventName: string;
  eventCoordinator: string;
  message: string;
  image: string;
  createdAt: string;
}

export interface Registration {
  id: string;
  eventId: string;
  eventName: string;
  studentName: string;
  collegeName: string;
  department: string;
  email: string;
  dob: string;
  year: string;
  status: 'pending' | 'approved' | 'rejected';
  registrationDate: string;
}
