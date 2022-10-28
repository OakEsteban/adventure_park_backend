//console.log("Hola mundo desde NodeJs")
//const { Router } = require("serviConex");
const bodyParser = require("body-parser");

const serviConex = require("express");
const mongoose = require("mongoose");
const TareaSchema = require("./modelos/Tarea.js"); //inicia la importacion del esquema
const app = serviConex();
const router = serviConex.Router();
app.use(serviConex.urlencoded({ extended: true }));
app.use(serviConex.json());
mongoose.connect("mongodb+srv://Prog_Web:Prog_Web@clusterprogweb.lmgveog.mongodb.net/ActividadesBD?retryWrites=true&w=majority"
); //Creación de constante / cadena de conexion / "Conexion atlas"
//Conexion a bases de datos

// Operaciones CRUD
router.get("/", (req, res) => {
  res.send("El inicio de mi API");
});


//CONSULTAR POR ID en consola
const cosultaId = async () => {
  const conlst = await TareaSchema.findById("6344d12faa7199cd4313625c");
  console.log("El resultado de la consulta es ====> ", conlst);
};
//Eliminar por seleccion de dato con Postman
router.post("/tarea/remove", (req, res) => {
  TareaSchema.remove({ idTarea: req.body.valirId }, (err, doc) => {
    res.json(doc);
  });
});
router.get("/tarea", (req, res) => {
  TareaSchema.find(function (err, datos) {
    if (err) {
      console.log("Error leyendo las tareas");
    } else {
      res.send(datos);
    }
  });
});
//ELIMINAR TODO
const eliiminarTodo = async () => {
  const resultado = await TareaSchema.deleteMany({
    title: "Iniciando",
  });
  console.log("********* RESULTADO / TODO ELIMINADO *******", resultado);
};
//FIN DE ELIMINAR TODO
//registrar datos
const RegistrosVarios = () => {
  const DatosNuevos = [
      {
        idTarea: "34",
        nombreTarea: "Registro en consola",
        detalleTarea:"Pruebas de consola",
      },
      {
        idTarea: "388",
        nombreTarea: "Registro en consola 388",
        detalleTarea:"Pruebas de consola 387",
      }
  ]
  TareaSchema.insertMany(DatosNuevos)
}
//FIN DEL PROCESO DE REGISTRO
router.post("/tarea", (req, res) => {
  let nuevaTarea = new TareaSchema({
    idTarea: req.body.id,
    nombreTarea: req.body.nombre,
    detalleTarea: req.body.detalle,
  });
  nuevaTarea.save(function (err, datos) {
    if (err) {
      console.log(err);
    }
    res.send("Tarea almacenada correctamente");
  });
});
app.use(router);
//FIN DEL PROCESO CRUD
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
//eliiminarTodo();
//cosultaId();
//RegistrosVarios();