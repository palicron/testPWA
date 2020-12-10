var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var materiasRouter = require("./routes/materias");
var cursosRouter = require("./routes/cursos");
var actividadesRouter = require("./routes/Actividades");
var entregasRouter = require("./routes/Entregas");
var profesoresRouter = require("./routes/profesores");
var estadisticasRouter = require("./routes/statistics");
var estudiantesRouter = require("./routes/estudiantes");
var usuariosRouter = require("./routes/users");
var botRouter = require("./routes/bot");
var app = express();
var cors = require("cors");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/omicron/materias", materiasRouter);
app.use("/omicron/cursos", cursosRouter);
app.use("/omicron/actividad", actividadesRouter);
app.use("/omicron/entrega", entregasRouter);
app.use("/omicron/profesores", profesoresRouter);
app.use("/omicron/estadisticas", estadisticasRouter);
app.use("/omicron/estudiantes", estudiantesRouter);
app.use("/omicron/usuarios", usuariosRouter);
app.use("/omicron/bot", botRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  cors();
  next(createError(404));
  app.options("*", (req, res) => {
    // allowed XHR methods
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS",
    );
    res.send();
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
