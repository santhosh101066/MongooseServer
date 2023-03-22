import ProductModel from "../model/Product.model.js";

export default async (req, res) => {
  res.json(
    await ProductModel.find({ category: req.params.category }, undefined, {
      projection: { id: "$_id", price: 1, _id: 0, short_title: 1 },
    })
  );
};
