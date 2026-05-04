const Service = ({ service, toggleImportant, handleDelete }) => {
  return (
    <ul>
      <li>
        {service.content}{" "}
        <button onClick={() => toggleImportant(service.id)}>
          {service.important ? "make not important" : "make important"}
        </button>{" "}
        <button onClick={() => handleDelete(service.id, service.content)}>
          delete
        </button>{" "}
      </li>
    </ul>
  );
};

export default Service;
