import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/carts.routes.js";
import socketRouter from "./routes/socket.routes.js";
import chatRouter from "./routes/chat.routes.js"
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import * as path from "path";
import cors from "cors";
import { Server } from "socket.io";
import ProductManager from "./controllers/ProductManager.js";


dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`Servidor express escuchando en puerto ${server.address().port}`)
);
export const io = new Server(server);


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));


app.use("/static", express.static(__dirname + "/public"));


const productAll = new ProductManager();
app.get("/static", async (req, res) => {
  let products = await productAll.readProducts();
  res.render("home", {
    title: "Backend | Express",
    products,
  });
});


app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/static/realTimeProducts", socketRouter);
app.use("/static/chatSocket", chatRouter)

