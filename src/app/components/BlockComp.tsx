import { ReactNode } from "react";

interface HomeBlockProps {
  children: ReactNode;
  className?: string;
}

const HomeBlock = ({ children, className }: HomeBlockProps) => {
  return (
    <section
      className={`max-w-3xl flex justify-center mx-auto py-20 ${className}`}
    >
      {children}
    </section>
  );
};

const HomeBlockTitle = ({ children, className }: Partial<HomeBlockProps>) => {
  return (
    <h1
      className={`md:text-[2.5rem] text-3xl font-semibold flex justify-center mx-auto fade-in font-["bogue-black"] ${className}`}
    >
      {children}
    </h1>
  );
};

export { HomeBlock, HomeBlockTitle };
