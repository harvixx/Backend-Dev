const express = require("express");
const app = express();
app.use(express.json());
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});


const upload = multer({ storage });



const productModel = require("../models/product.model");
app.post(
  "/api/products",
  upload.single("productImg"),
  async (req, res) => {
    try {
      const { productName, productDesc, productImgUrl } = req.body;

      let productImg = null; // ✅ MUST

      // ✅ CASE 1: FILE UPLOAD
      if (req.file) {
        productImg = `/uploads/${req.file.filename}`;
      }

      // ✅ CASE 2: IMAGE URL
      if (!req.file && productImgUrl) {
        productImg = productImgUrl;
      }

      // ❌ Neither file nor URL
      if (!productImg) {
        return res.status(400).json({
          message: "Image file or image URL required",
        });
      }

      const product = await productModel.create({
        productName,
        productDesc,
        productImg,
      });

      res.status(201).json({
        message: "Product Created",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error" });
    }
  }
);



app.get("/api/products", async (req, res) => {
    try {
        const Products = await productModel.find();
        res.status(200).json({
            Products
        })
    }
    catch (error) {
        console.log("Not found");
    }
})

app.delete("/api/products/:id", async (req, res) => {
    try {
        const itemId = req.params.id;
        await productModel.findByIdAndDelete(itemId);
        res.status(200).json({
            messag: "Item Deleted"
        })
    }
    catch (error) {
        console.log("Not found");
    }
})

app.patch("/api/products/:id", async (req, res) => {
    try {
        const allowUpdates = ["productName", "productImg", "productDesc"];
        const Update = {};

        allowUpdates.forEach((prodet) => {
            if (req.body[prodet] !== undefined) {
                Update[prodet] = req.body[prodet];
            }
        })

        const updatedItem = await productModel.findByIdAndUpdate(
            req.params.id,
            { $set: Update },
            { new: true, runValidators: true }
        )

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({
            messag: "Item Updated"
        })
    }
    catch (error) {
        console.log("Server Error");
    }
})

module.exports = app;