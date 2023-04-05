import CartModel from "../model/Cart.model.js";

export default (req,res)=>{
    console.log(req.body);
    const {type}=req.body
    if(type==="INC"){
        CartModel.findByIdAndUpdate(req.params.id,{$inc:{quantity:1}}).then(data=>{
          console.log(data);
        })
        res.json({message:'okay'})
    }
    else if(type==="DEC"){
      CartModel.findByIdAndUpdate(req.params.id,{$inc:{quantity:-1}}).then(data=>{
        console.log(data);
      })

      res.json({message:'okay'})

    }
    else {
      res.statusCode=500
      res.statusMessage="Invalid request"
      res.end()
    }
    res.send()
  }