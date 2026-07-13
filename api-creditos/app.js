const express = require("express");

const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const solicitudesRoutes = require("./routes/solicitudes.routes");

const app = express();

app.use(express.json());

app.use(logger);

// ESTA ES LA ÚNICA LÍNEA QUE DEBE EXISTIR
app.use("/api/solicitudes", solicitudesRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("API funcionando");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});