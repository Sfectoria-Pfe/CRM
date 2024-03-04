const router = require("express").Router()


router.get("/products",fuctionContreller)
router.post("/products",fuctionContreller)
router.get("/products/:id",fuctionContreller)
router.delete("products/:id",fuctionContreller)
router.put("products/:id",fuctionContreller)


module.exports = orderRoute