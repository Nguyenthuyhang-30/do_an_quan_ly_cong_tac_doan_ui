export interface Branch {
  id: number;
  code: string;
  name: string;
  course: string; // Not in API, keeping for UI compatibility
  secretary: string;
  viceSecretary?: string;
  description?: string;
  establishedDate?: string;
  members: number;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}
