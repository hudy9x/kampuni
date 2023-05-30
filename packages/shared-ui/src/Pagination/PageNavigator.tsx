import { usePaginate } from "./context";
import { LeftIcon, RightIcon } from "./PaginationIcons";

export const PagePrev = () => {
  const { current, setCurrent, totalPage } = usePaginate();
  const disabled = current === 1 || totalPage <= 1;
  return (
    <span
      className={`page-prev ${disabled ? "disabled" : ""}`}
      onClick={() => {
        if (disabled) return;
        setCurrent(current - 1);
      }}
    >
      <span className="sr-only">Previous</span>
      <LeftIcon className="h-4 w-4 text-gray-500" />
    </span>
  );
};

export const PageNext = () => {
  const { current, setCurrent, totalPage } = usePaginate();
  const disabled = current === totalPage || totalPage <= 1;
  return (
    <span
      className={`page-next ${disabled ? "disabled" : ""}`}
      onClick={() => {
        if (disabled) {
          return;
        }
        setCurrent(current + 1);
      }}
    >
      <span className="sr-only">Next</span>
      <RightIcon className="h-4 w-4 text-gray-500" />
    </span>
  );
};

export const PageDot = ({ index }: { index: number }) => {
  const { setCurrent } = usePaginate();
  return (
    <span className="page-item" onClick={() => setCurrent(index)}>
      ...
    </span>
  );
};
