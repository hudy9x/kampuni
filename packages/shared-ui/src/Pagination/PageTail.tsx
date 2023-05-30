import { usePaginate } from "./context";
import PageItem from "./PageItem";
import { PageDot } from "./PageNavigator";
import { generatePages } from "../utils";

export default function PageTail() {
  const { maxPageDisplay, current, totalPage } = usePaginate()

  if (totalPage <= maxPageDisplay) {
    return null
  }

  if (current < totalPage - 2) {
    return null
  }

  const pages = generatePages(maxPageDisplay - 1, totalPage - (maxPageDisplay - 1));

  return (
    <>
      <PageItem index={1} />
      <PageDot index={2}/>
      {pages.map((p) => {
        return <PageItem key={p.page} index={p.page} active={current === p.page} />;
      })}
    </>
  );
}
