const ServiceForm = ({ newService, addNewService, onChange }) => {
  return (
    <form onSubmit={addNewService}>
      <input
        value={newService}
        placeholder="add a new service..."
        onChange={onChange}
      />
      <button type="submit">add new service</button>
    </form>
  );
};
export default ServiceForm;
