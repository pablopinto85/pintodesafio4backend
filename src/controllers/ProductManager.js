import { promises as fs } from "fs";
import { nanoid } from "nanoid";

class ProductManager {
  constructor() {
    this.path = "./src/models/productos.json";
  }
  readProducts = async () => {
    let allProducts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(allProducts);
  };
  writeProducts = async (productos) => {
    await fs.writeFile(this.path, JSON.stringify(productos), (error) => {
      if (error) throw error;
    });
  };
  exist = async (id) => {
    let productsAll = await this.readProducts(this.path);
    return productsAll.find((product) => product.id === id);
  };
  objectKeys(object) {
    console.log(object)
    if (
      !object.title ||
      !object.description ||
      !object.price ||
      !object.status ||
      !object.code ||
      !object.stock
    )
      return 400;
  }
  getProducts = async (limit) => {
    let allProducts = await this.readProducts();
    if (!limit) return allProducts;
    let productFilter = allProducts.slice(0, parseInt(limit));
    return productFilter;
  };
  getProductsById = async (id) => {
    let productById = await this.exist(id);
    if (!productById) return "Producto no Encontrado";
    return productById;
  };
  addProduct = async (newProduct) => {
    
    if (this.objectKeys(newProduct) === 400) return "JSON incompleto. Faltan 1 o mas Datos";
    let productsOld = await this.readProducts();
    newProduct.id = nanoid();
    let productsAll = [newProduct, ...productsOld];
    await this.writeProducts(productsAll);
    return "Producto Agregado Correctamente";
  };
  updateProduct = async (id, product) => {
    
    let productById = await this.exist(id);
    if (!productById) return "Producto a modificar no Existe";
    
    if (this.objectKeys(product) === 400) return "JSON incompleto. Faltan 1 o mas Datos";
    
    await this.deleteProducts(id);
    
    let prod = await this.readProducts();
    let modifiedProducts = [
      {
        ...product,
        id: id,
      },
      ...prod,
    ];
    await this.writeProducts(modifiedProducts);
    return `Producto ${product.title} Modificado con Exito`;
  };
  deleteProducts = async (id) => {
    
    let productById = await this.exist(id);
    if (!productById) return "Producto No Encontrado";
    let products = await this.readProducts();
    let filterProducts = products.filter((prod) => prod.id != id);
    await this.writeProducts(filterProducts);
    return "Producto Eliminado Exitosamente";
  };
}

export default ProductManager;
