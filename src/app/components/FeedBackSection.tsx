import Image from "next/image";
import { Donation } from "./DonationCard/Donation";
import FeedBackForm from "./FeedBackForm";

export const FeedBackSection = () => {
  return (
    <>
      <h2 className="flex justify-center mx-auto text-4xl font-semibold px-3 text-pretty text-center z-50 font-bogue-black">
        Feedback
      </h2>

      <div className="px-3">
        <FeedBackForm />
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
