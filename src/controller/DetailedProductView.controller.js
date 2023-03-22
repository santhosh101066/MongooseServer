import ProductModel from "../model/Product.model.js";

export default async (req, res) => {
    res.json(
      await ProductModel.findById(req.params.id, {
        id: "$_id",
        title: 1,
        category: 1,
        filesCount: 1,
        more_details: 1,
        price: 1,
        quantity: 1,
        short_title: 1,
      })
    );
  }