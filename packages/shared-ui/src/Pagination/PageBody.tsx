import { usePaginate } from "./context";
import PageItem from "./PageItem";
import { PageDot } from "./PageNavigator";

export default function PageBody() {
  const { current, totalPage, maxPageDisplay } = usePaginate()

  if (current <= maxPageDisplay - 2) {
    return null
  }

  if (current > totalPage - (maxPageDisplay - 2)) return null

  const pages = [current - 1, current, current + 1]


  return (
    <>
      <PageItem index={1} />
      <PageDot index={2} />
      {pages.map(p => {
        return <PageItem key={p} index={p} active={current === p} />
      })}
      <PageDot index={totalPage - 1} />
      <PageItem index={totalPage} />
    </>
  );
}
