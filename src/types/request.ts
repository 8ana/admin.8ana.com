export type Options = {
  params?: {
    [key: string]: string | number;
  };
  query?: {
    [key: string]: unknown;
  };
  data?: unknown;
  formData?: FormData;
  [key: string]: unknown;
};

export type RequestRes<T> = {
  status: number;
  message: string | null;
  data: T;
  response: Response;
};

export type ListContent<T> = {
  list: T[];
  total: number;
};
