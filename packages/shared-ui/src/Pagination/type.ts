export interface IPaginationProps {
  current: number;
  total: number;
  maxPageDisplay?: number;
  onChange?: (page: number) => void;
  limit?: number;
  className?: string;
}

export interface IPageContext {
  current: number;
  setCurrent: (page: number) => void;
  limit: number;
  total: number;
  totalPage: number;
  maxPageDisplay: number;
  onChange: (page: number) => void;
}
