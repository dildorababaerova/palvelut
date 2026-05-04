# palvelut

- Luodaan Vite frontend project `npm create vite@latest`
- Luodaan backend `npm init` komennolla
  Luodaan index.js tiedosto
- Lisätään package.json scripts:

```js
{
  // ...
  "scripts": {

    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
}
```

- Asennetaan express `npm install express`
- Päivätään `npm upgrade`, `npm update`
- Lisätään app.use(express.json()) middleware, että backend voisi parseroida JSON => JS objekiiin

- middleware varten asennetaan "morgan":
  `npm install morgan`

Voidaan luoda customtoken Morgan:

```js
morgan.token("body", (request) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  }
  return "";
});

app.use(morgan(":method :url :status :response-time ms :body"));
```
