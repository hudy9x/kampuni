import { useState } from "react";
import { IPaginationProps } from "./type";
import "./style.css"
import { PageNext, PagePrev } from "./PageNavigator";
import PageSummary from "./PageSummary";
import PageHead from "./PageHead";
import PageBody from "./PageBody";
import PageTail from "./PageTail";
import { PageProvider } from "./context";
import PageFull from "./PageFull";

export default function PaginationContainer({
  current,
  total,
  maxPageDisplay = 5,
  limit = 10,
  onChange = () => {},
  className
  
}: IPaginationProps) {
  const [currentPage, setCurrentPage] = useState(current)
  const totalPage = Math.ceil(total / limit)

  const onSetCurrent = (page: number) => {
    onChange(page)
    setCurrentPage(page)
  }
  return <PageProvider value={{
    current: currentPage,
    setCurrent: onSetCurrent,
    limit,
    total,
    totalPage,
    maxPageDisplay,
    onChange
  }}>
    <div className={`page-wrapper ${className}`}>
      <PageSummary />
      <div>
        <nav className="page-nav" aria-label="Pagination">
          <PagePrev />
          <PageFull />
          <PageHead />
          <PageBody />
          <PageTail />
          <PageNext />
        </nav>
      </div>
    </div>
  </PageProvider>
}
