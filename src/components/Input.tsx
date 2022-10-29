import { forwardRef } from "react";

export const InputBase = ({ label, name, type, error, ...rest }: any, ref: any) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div>
        <input
          name={name}
          id={name}
          type={type}
          className={`mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            error ? "border-red-500" : ""
          }
        `}
          ref={ref}
          {...rest}
        />
        {error && <span className="text-red-500 text-xs">{error.message}</span>}
      </div>
    </div>
  );
};

export const Input = forwardRef(InputBase);
