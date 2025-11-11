export interface Branch {
  id: number;
  code: string;
  name: string;
  course: string;
  secretary: string;
  members: number;
  status: 'active' | 'inactive';
  createdAt?: string;
}
