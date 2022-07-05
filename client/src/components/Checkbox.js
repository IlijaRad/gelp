const Checkbox = ({ checked, setChecked, setUncheckedBySingle = false }) => {
  return (
    <div className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm bg-gray-200">
      <input
        type="checkbox"
        className="checkbox absolute h-full w-full cursor-pointer opacity-0"
        value={checked}
        onChange={() => {
          setChecked((checked) => !checked);
          if (setUncheckedBySingle) setUncheckedBySingle(true);
        }}
      />
      <div className="rounded-sm bg-blue-700 text-white">
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M5 12l5 5l10 -10" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
