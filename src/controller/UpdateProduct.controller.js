import ProductModel from "../model/Product.model.js";

export default (req, res) => {
    const id = req.body.id;
    delete req.body.id;
    ProductModel.findByIdAndUpdate(id, { $set: { ...req.body } })
      .then(() => {
        res.statusCode = 200;
        res.json({message:'Updated sucessfully'});
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send(err);
      });
  }