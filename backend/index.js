const http = require("http");
const express = require("express");
const { log } = require("console");
const app = express();
app.use(express.json());
const morgan = require("morgan");
app.use(express.static("dist"));

let services = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

morgan.token("body", (request) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  }
  return "";
});

app.use(morgan(":method :url :status :response-time ms :body"));

app.get("/api/services", (request, response) => {
  response.json(services);
});

app.get("/api/services/:id", (request, response) => {
  const id = request.params.id;
  const service = services.find((s) => s.id === id);
  if (service) {
    response.json(service);
  } else {
    response.status(404).json({ error: "Service not found" });
  }
});
app.delete("/api/services/:id", (request, response) => {
  const id = request.params.id;
  services = services.filter((s) => s.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const randomId = Math.floor(Math.random() * 10000000);
  return String(randomId);
};

app.post("/api/services", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "Content not exist" });
  }

  const service = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  services = services.concat(service);

  response.status(201).json(service);
});

app.put("/api/services/:id", (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const serviceIndex = services.findIndex((s) => s.id === id);

  services[serviceIndex] = { ...body, id: id };
  response.status(200).json(services[serviceIndex]);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
