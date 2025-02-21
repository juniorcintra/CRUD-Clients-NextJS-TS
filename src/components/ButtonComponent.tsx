import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

export default function ButtonComponent(props: ButtonProps) {
  return (
    <button
      className="hover:bg-blue flex h-9 w-full cursor-pointer items-center justify-between gap-2.5 rounded-md bg-red-600 px-4 text-sm font-semibold text-white opacity-80 transition-colors duration-300 hover:opacity-100"
      {...props}
    />
  );
}
