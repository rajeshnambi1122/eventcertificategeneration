export interface Event {
  id: string;
  name: string;
  description: string;
  image: string;
  date: string;
  status: 'active' | 'inactive';
}

export interface Registration {
  id: string;
  eventId: string;
  studentName: string;
  eventName: string;
  college: string;
  department: string;
  year: number;
  email: string;
  dob: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
}
