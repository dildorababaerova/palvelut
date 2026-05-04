import { useState, useEffect } from "react";
import serviceServers from "./servers/service";
import Services from "../components/Services";
import ServiceForm from "../components/ServiceForm";
import Notification from "../components/Notification";

const App = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const initialServices = await serviceServers.getAll();
      setServices(initialServices);
    };
    fetchServices();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const addNewService = async (e) => {
    e.preventDefault();
    const newObject = {
      content: newService,
      important: Math.random() > 0.5,
    };

    const createdService = await serviceServers.createService(newObject);
    setServices((prev) => [...prev, createdService]);
    setNewService("");
    showMessage(`Added ${createdService.content}`);
  };

  const handleNewService = (e) => setNewService(e.target.value);

  const toggleImportant = async (id) => {
    const service = services.find((s) => s.id === id);
    try {
      const updatedService = { ...service, important: !service.important };

      const returnedService = await serviceServers.updateImportant(
        id,
        updatedService,
      );
      setServices(services.map((s) => (s.id === id ? returnedService : s)));
    } catch (error) {
      if (error.response?.status === 404) {
        showMessage(`This content already deleted`, "error");
        setServices((prev) => prev.filter((service) => service.id !== id));
      }
    }
  };

  const handleDelete = async (id, content) => {
    if (!window.confirm(`Do you want really delete ${content}`)) {
      return;
    }
    try {
      await serviceServers.deleteService(id);
      setServices(services.filter((s) => s.id !== id));
      showMessage(`${content} deleted successfully`);
    } catch (error) {
      if (error.response?.status === 404) {
        showMessage(`This content ${content} already deleted`, "error");
        setServices(services.filter((service) => service.id !== id));
      } else {
        showMessage("Something went wrong...", "error");
      }
    }
  };

  const filterImportant = showAll
    ? services
    : services.filter((s) => s.important);

  return (
    <div>
      <h1>Services</h1>
      <Notification message={message} />
      <button onClick={() => setShowAll((prev) => !prev)}>
        {showAll ? "show important" : "show all"}{" "}
      </button>
      <Services
        services={filterImportant}
        toggleImportant={toggleImportant}
        handleDelete={handleDelete}
      />
      <ServiceForm
        newService={newService}
        onChange={handleNewService}
        addNewService={addNewService}
      />
    </div>
  );
};

export default App;
