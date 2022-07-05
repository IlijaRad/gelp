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
        className="absolute top-1/2 ml-0.5 -translate-y-1/2 cursor-pointer"
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
    <th className={"relative text-left font-normal " + className}>
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
