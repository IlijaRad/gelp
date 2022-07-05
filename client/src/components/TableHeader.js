import { useState } from "react";
import { Chevron as ChevronIcon } from "../assets/icons/Chevron";

const Chevron = ({
  chevron,
  chevronEvent = () => {},
  setSortDirection = () => {},
}) => {
  const [chevronFlipped, setChevronFlipped] = useState(false);

  if (chevron)
    return (
      <span
        onClick={() => {
          if (!chevronFlipped) {
            setSortDirection("desc");
          } else {
            setSortDirection("asc");
          }
          setChevronFlipped(!chevronFlipped);
          chevronEvent();
        }}
        className="absolute top-[calc(50%+1px)] -translate-y-1/2 ml-0.5 cursor-pointer"
      >
        <ChevronIcon className={chevronFlipped ? "rotate-180" : ""} />
      </span>
    );
  return null;
};

const TableHeader = ({
  className,
  chevron,
  chevronEvent,
  setSortDirection,
  children,
}) => {
  return (
    <th className={"font-normal text-left relative " + className}>
      {children}
      <Chevron
        chevron={chevron}
        chevronEvent={chevronEvent}
        setSortDirection={setSortDirection}
      />
    </th>
  );
};

export default TableHeader;
