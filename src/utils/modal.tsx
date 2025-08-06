interface ModalProps {
  data: {
    title: string;
    name: string;
    src: string;
    description: string;
  };
}

export const openModal = ({ data }: ModalProps) => {
  return (
    <div className="flex flex-col justify-center mx-auto">
      <h3>{data.title}</h3>
      <picture>
        <img width="100%" height="auto" src={data.src} alt={data.name} />
        <small>{data.description}</small>
      </picture>
    </div>
  );
};
