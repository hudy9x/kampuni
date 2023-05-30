import { createContext, useContext } from "react";
import { IPageContext } from "./type";

const PageContext = createContext<IPageContext>({
  current: 1,
  setCurrent: (page: number) => { },
  onChange: () => {},
  limit: 10,
  total: 0,
  totalPage: 1,
  maxPageDisplay: 5
});

export const PageProvider = PageContext.Provider
export const usePaginate = () => {
  const context = useContext(PageContext)
  return context;
}

