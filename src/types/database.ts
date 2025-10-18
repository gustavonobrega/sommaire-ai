export interface SummaryType {
  id: string;
  user_id: string;
  file_name: string;
  original_file_url: string;
  status: string;
  title: string;
  summary_text: string;
  created_at: Date;
  updated_at: Date;
}

export interface QueryResult<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export interface SummaryByIdType extends SummaryType {
  word_count: number;
}
