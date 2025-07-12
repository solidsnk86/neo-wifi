import Image from "next/image";
import { Donation } from "./DonationCard/Donation";
import NewsletterForm from "./NewsLetterForm";

export const NewsletterSection = () => {
  return (
    <>
      <h2 className="flex justify-center mx-auto text-2xl font-semibold px-3 text-pretty text-center z-50 font-['bogue-black']">
        Recibe las últimas novedades sobre Neo WiFi App 🚀
      </h2>

      <div className="px-3">
        <NewsletterForm />
        <Donation content="Y contribuye con el desarrollador." />
        <Image
          src="/squirrel.svg"
          width={300}
          height={300}
          alt="Imagen de ardilla"
          className="flex justify-center mx-auto z-50 relative"
        />
      </div>
    </>
  );
};
