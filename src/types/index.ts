export interface Task {
  id: number;
  title: string;
  description: string;
  is_complete: true | false;
}

export interface User {
  id: number;
  username: string;
}
