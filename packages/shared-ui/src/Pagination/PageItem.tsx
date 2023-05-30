import { usePaginate } from "./context";

interface IPageItemProps {
  index: number;
  active?: boolean;
}

export default function PageItem({ index, active }: IPageItemProps) {
  const { setCurrent } = usePaginate()

  return (
    <span
      onClick={() => {
        setCurrent(index)
      }}
      aria-current="page"
      className={`page-item ${active ? "active" : null}`}
    >
      {index}
    </span>
  );
}
