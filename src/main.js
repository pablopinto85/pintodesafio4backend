import express from "express";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import * as path from "path";
import mongoose from "mongoose"
import cartsRouter from "./router/carts.routes.js"
import messagesRouter from "./router/messages.routes.js"
import productsRouter from "./router/product.routes.js"
import uploadRouter from "./router/upload.routes.js"


const app = express()



const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor Express Puerto ${PORT}`);
});

mongoose.connect("mongodb+srv://pablopinto1985:ppn742617@cluster0.xgl3mhk.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Conectado a la base de datos exitosamente"))
    .catch(error => console.error("Error al conectarse a la base de datos, error" + error));

app.use("/api/carts", cartsRouter)
app.use("/api/msg", messagesRouter)
app.use("/api/prod", productsRouter)

app.use("/", uploadRouter) 

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

app.use("/", express.static(__dirname + "/public"))


app.get("/chat", async (req, res) => {
    res.render("chat", {
        title: "Chat con Mongoose",
    })
})

app.get("/multer", async (req, res) => {
    res.render("upload", {
        title: "Multer",
    })


})