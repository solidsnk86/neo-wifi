import { ReactNode } from "react";

export const HeroSection = ({ children }: { children: ReactNode }) => {
  return (
    <section className="mx-auto w-full 2xl:max-w-[1152px] px-6 min-[1260px]:max-2xl:px-[168px] pb-10 pt-[46px] lg:pt-[54px] xl:pt-[74px] flex flex-col gap-12 pt-8">
      {children}
    </section>
  );
};
