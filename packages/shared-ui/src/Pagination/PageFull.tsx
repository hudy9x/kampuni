import { usePaginate } from "./context";
import PageItem from "./PageItem";
import { generatePages } from "../utils";

export default function PageFull() {
  const { maxPageDisplay, current, totalPage } = usePaginate();
  const pages = generatePages(
    totalPage < maxPageDisplay ? totalPage : maxPageDisplay
  );
  if (totalPage > maxPageDisplay) {
    return null;
  }

  return (
    <>
      {pages.map((p) => {
        return (
          <PageItem key={p.page} index={p.page} active={current === p.page} />
        );
      })}
    </>
  );
}
