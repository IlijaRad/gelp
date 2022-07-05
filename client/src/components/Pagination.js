import { Chevron } from "../assets/icons/Chevron";

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  perPage,
  setPerPage,
}) => {
  const prevPage = () => {
    if (currentPage !== 0) setCurrentPage(Number(currentPage) - 1);
  };

  const nextPage = () => {
    if (currentPage !== totalPages - 1) setCurrentPage(Number(currentPage) + 1);
  };

  return (
    <div className="mt-4 flex items-center justify-end">
      <Chevron
        onClick={() => prevPage()}
        className={
          currentPage !== 0
            ? "stroke-3 mr-4 h-5 w-5 rotate-90 cursor-pointer stroke-gray-900"
            : "stroke-3 mr-4 h-5 w-5 rotate-90 stroke-gray-900/50"
        }
      />
      <span>Page</span>
      <div className="relative">
        <input
          value={currentPage}
          onChange={(e) => {
            if (
              e.target.value !== "" &&
              e.target.value !== "0" &&
              e.target.value <= totalPages
            ) {
              setCurrentPage(Number(e.target.value.replace(/[^0-9]/g, "")) - 1);
            } else {
              setCurrentPage("");
            }
          }}
          type="text"
          maxLength={2}
          className="mx-3 w-10 select-none rounded border border-gray-300 px-2 text-transparent"
        />
        <label className="absolute top-0 left-5 select-none">
          {currentPage !== "" ? currentPage + 1 : ""}
        </label>
      </div>
      <span>of {totalPages}</span>
      <Chevron
        onClick={() => nextPage()}
        className={
          currentPage !== totalPages - 1
            ? "stroke-3 ml-4 h-5 w-5 -rotate-90 cursor-pointer stroke-gray-900"
            : "stroke-3 ml-4 h-5 w-5 -rotate-90 stroke-gray-900/50"
        }
      />
      <input
        value={perPage}
        onChange={(e) => setPerPage(Number(e.target.value))}
        type="text"
        maxLength={2}
        className="mx-3 w-10 rounded border border-gray-300 px-2"
      />
      <span>per page</span>
    </div>
  );
};

export default Pagination;