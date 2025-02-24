import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "flex h-9 w-full cursor-pointer items-center justify-between gap-2.5 rounded-md px-4 text-sm font-semibold text-white transition-colors opacity-100 duration-300 hover:opacity-80 text-white",
  variants: {
    variant: {
      green: "bg-[#16A34A]",
      red: "bg-red-600",
      gray: "bg-[#4B4B4B]",
    },
  },
  defaultVariants: {
    variant: "green",
  },
});

interface CustomButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export default function CustomButton(props: CustomButtonProps) {
  return (
    <button className={buttonVariants({ variant: props.variant })} {...props} />
  );
}
