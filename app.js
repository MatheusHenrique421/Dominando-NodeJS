const express = require("express");
const path = require("path");

const checkListsRouter = require("./src/routes/checklist");
const taskRouter = require("./src/routes/task");

const rootRouter = require("./src/routes/index");
const methodOverride = require("method-override");

//config banco
require("./config/database");

//cria instancia do express para utiliza-lo
const app = express();

//verifica se há algum json sendo passado.
app.use(express.json());

//Requisições via formulário, pega os valores do form e deixa-os disponiveis
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(express.static(path.join(__dirname, "public")));

//views intermediada por EJS
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

//Rotas
app.use("/", rootRouter);
app.use("/checklists", checkListsRouter);
app.use("/checklists", taskRouter.checklistDependent);
app.use("/tasks", taskRouter.simple);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000!");
});
''