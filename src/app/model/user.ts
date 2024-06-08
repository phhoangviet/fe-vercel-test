export interface ListUsers {
  total: number;
  users: User[];
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
  days: number;
  created_at: Date;
  total_day_meeting?: number;
  meetings: Meeting[];
}

export interface Meeting {
  id: number;
  start_day: number;
  end_day: number;
  room_id: number;
  created_at: Date;
  user_id: number;
}
