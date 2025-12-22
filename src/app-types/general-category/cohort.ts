export interface Cohort {
  id: number;
  code: string;
  name: string;
  start_year: number;
  end_year: number;
  created_by?: number;
  modified_by?: number;
  created_at: string;
  modified_at: string;
}

export interface CreateCohortRequest {
  code: string;
  name: string;
  start_year: number;
  end_year: number;
  created_by: number;
  [key: string]: unknown;
}

export interface UpdateCohortRequest {
  code: string;
  name: string;
  start_year: number;
  end_year: number;
  modified_by: number;
  [key: string]: unknown;
}

export interface CohortSelectOption {
  id: number;
  code: string;
  name: string;
}

export interface DeleteCohortsRequest {
  ids: number[];
}
