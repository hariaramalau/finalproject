const express = require("express");
const Products = require("../models/products");
const passport = require("passport");

const router = express.Router();

module.exports = function () {

    router.get("/:id", (req, res) => {

        Products.findById(req.params.id, (error, result) => {
            if (error) {
                res.status(500).json(error);
            }
            else {
                res.json(result)
            };
        })
    })

    router.get("/", (req, res) => {

        query = {}
        if (req.query.type) {
            query.type = req.query.type
        }
        if (req.query.type == "all products") {
            query = {}
        }

        Products.find(query, (error, result) => {
            if (error) {
                res.statusCode(500).json(error);
            }
            else {
                res.json(result)
            };
        });
    });

    router.post("/new", (req, res) => {
        if (!req.files.picture) {
            return res.status(400).send("No files were uploaded");
        }

        let image = req.files.picture;
        // let date = new Date();
        let imageName = req.body.name + ".png";

        image.mv("./public/products/" + imageName, (error) => {
            if (error) return res.status(500).send(error);

            let newObj = new Products({
                name: req.body.name,
                type: req.body.type,
                brand: req.body.brand,
                price: req.body.price,
                picture: "http://localhost:3000/products/" + imageName
                //metode apabila memasukan data dari raw json
            })

            newObj.save((error) => {
                if (error) {
                    res.status(500).send(error);
                }
                else {
                    res.json(newObj);
                }
            })
        });
    })

    router.delete("/:id", (req, res) => {

        Products.findByIdAndRemove(req.params.id, (error, result) => {
            if (error) {
                res.statusCode(500).json(error);
            }
            else {
                res.json({ message: "Data Deleted" });
            };
        })
    })

    router.put("/", (req, res) => {

        if (!req.files.picture) {
            return res.status(400).send("No files were uploaded");
        }

        let image = req.files.picture;
        let imageName = req.body.name + ".png";

        image.mv("./public/products/" + imageName, (error) => {
            if (error) return res.status(500).send(error);


            let newObj = {
                name: req.body.name,
                type: req.body.type,
                brand: req.body.brand,
                price: req.body.price,
                picture: "http://localhost:3000/products/" + imageName
                //metode apabila memasukan data dari raw json
            }

            Products.findByIdAndUpdate(req.body._id, newObj, (error, result) => {
                if (error) {
                    res.status(500).json(error);
                }
                else {
                    res.json(result);
                };
            })
        })
    })

    return router;
};