import type { ComponentProps } from "react";

interface InputRootProps extends ComponentProps<"div"> {
  error?: boolean;
}

export function InputRoot({ error = false, ...props }: InputRootProps) {
  return (
    <div
      data-error={error}
      className="data-[error=true]:border-danger group flex h-12 max-w-[358px] flex-1 items-center gap-2 rounded-xl border border-[#27272A] bg-[#09090B] px-4 focus-within:border-[#27272A]"
      {...props}
    />
  );
}

type InputIconProps = ComponentProps<"span">;

export function InputIcon(props: InputIconProps) {
  return (
    <span
      className="group-data-[error=true]:text-danger text-gray-400 group-focus-within:text-gray-100 group-[&:not(:has(input:placeholder-shown))]:text-gray-100"
      {...props}
    />
  );
}

type InputFieldProps = ComponentProps<"input">;

export function InputField(props: InputFieldProps) {
  return (
    <input
      className="flex-1 bg-transparent text-white outline-0 placeholder:text-gray-400"
      {...props}
    />
  );
}
