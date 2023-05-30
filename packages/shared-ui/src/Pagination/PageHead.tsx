import { usePaginate } from "./context";
import PageItem from "./PageItem";
import { PageDot } from "./PageNavigator";
import { generatePages } from "../utils";

export default function PageHead() {
  const { maxPageDisplay, current, totalPage } = usePaginate();

  if (totalPage <= maxPageDisplay) {
    return null;
  }

  const maxLeftPage = maxPageDisplay - 1;

  if (current >= maxLeftPage) {
    return null;
  }

  const pages = generatePages(maxLeftPage);

  return (
    <>
      {pages.map((p) => {
        return (
          <PageItem key={p.page} index={p.page} active={current === p.page} />
        );
      })}
      <PageDot index={totalPage - 1} />
      <PageItem index={totalPage} />
    </>
  );
}
