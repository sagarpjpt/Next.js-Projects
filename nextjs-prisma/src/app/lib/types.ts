export type SumState = {
  result: number | null;
  error: string | null;
  attempts: number;
};

// pagination-related props
export type PaginationProps = {
  page: number;
};

// page.tsx search params
export type PageProps = {
  searchParams: {
    page?: string;
  };
};