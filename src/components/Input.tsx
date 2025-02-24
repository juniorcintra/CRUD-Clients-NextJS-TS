import type { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const inputVariants = tv({
  base: "data-[error=true]:border-danger group flex h-12 flex-1 items-center gap-2 rounded-xl border border-[#27272A] bg-[#09090B] px-4 focus-within:border-[#27272A]",
  variants: {
    variant: {
      full: "",
      small: "max-w-[358px]",
    },
  },
  defaultVariants: {
    variant: "small",
  },
});

interface InputRootProps
  extends ComponentProps<"div">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
}

export function InputRoot({ error = false, ...props }: InputRootProps) {
  return (
    <div
      data-error={error}
      className={inputVariants({ variant: props.variant })}
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
