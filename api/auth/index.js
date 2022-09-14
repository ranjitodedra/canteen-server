const { prisma } = require("@prisma/client");
var express = require("express");
var controller = require("./controller");

var router = express.Router();

router.get("/login", controller.login);

// router.post("/register", async (req,res)=>{
//     try {
//         const product = await prisma.product.create({
//             data : req.body,
//         })
//         res.json(product)
//     }catch(error){
//         next(error)
//     }
// })

module.exports = router;