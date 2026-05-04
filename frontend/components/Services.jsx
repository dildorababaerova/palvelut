import Service from "./Service";

const Services = ({ services, toggleImportant, handleDelete }) => {
  return (
    <div>
      {services.map((s) => (
        <Service
          key={s.id}
          service={s}
          toggleImportant={toggleImportant}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Services;
