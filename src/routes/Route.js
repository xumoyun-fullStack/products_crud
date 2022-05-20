const { ProductGet, ProductsPost, DeleteProductPost, UpdateNamePost, UpdatePricePost } = require("../controllers/Controlles");

const router = require("express").Router();

router.get("/", ProductGet);
router.post("/", ProductsPost);
router.delete("/", DeleteProductPost)
router.post("/update-name", UpdateNamePost);
router.post("/update-price", UpdatePricePost)

module.exports = {
    path: "/",
    router,
}