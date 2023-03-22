import { renameSync, unlinkSync } from "fs";
import ProductModel from "../model/Product.model.js";

export default  async (req, res) => {
    const main_image = req.files["main_image"][0];
    const other_image = req.files["other_image"];
    const objectCreated = await ProductModel.create({
      ...req.body,
      filesCount: other_image.length,
    });
    try {
      renameSync(
        main_image.path,
        "./ProductImages/" + objectCreated.id + ".png"
      );
      other_image.forEach((value, index) => {
        renameSync(
          value.path,
          "./ProductImages/" + objectCreated.id + "_" + index + "_" + ".png"
        );
      });
      res.statusCode = 201;
      res.send("ok");
    } catch (err) {
      try {
        unlinkSync("./ProductImages/" + objectCreated.id + ".png");
      } catch (err) {
        console.log("Rolling back main_image : " + err);
      }
      other_image.forEach((value, index) => {
        try {
          unlinkSync(
            "./ProductImages/" + objectCreated.id + "_" + index + "_" + ".png"
          );
        } catch (err) {
          console.log("Rolling back Other_images : " + err);
        }
      });
      console.log(err); 
      console.log(await ProductModel.deleteOne(req.body));
      res.statusCode = 500;
      res.statusMessage = err;
      res.end();
    }
  }