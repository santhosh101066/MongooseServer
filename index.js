import { config } from "dotenv";
import express from "express";
import { dbConnect } from "./src/config/database.config.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import UserModel from "./src/model/User.model.js";
import Authentication from "./src/routes/Authenticate.routes.js";
import AdminRoutes from "./src/routes/Admin.routes.js";
import ProductRoutes from "./src/routes/Product.routes.js";
import UserRoutes from "./src/routes/User.routes.js";
config();
const app = express();
const PORT = process.env.PORT || 4001;

dbConnect()
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.log(err);
    process.abort();
  });
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  console.log(UserModel.find({}).projection({id:'$_id'}));
  res.json( []);
});

app.use('/assets/images',express.static('./ProductImages'))
app.use(Authentication);
app.use(AdminRoutes);
app.use(UserRoutes)
app.use('/product',ProductRoutes)
app.use((req, res) => {
  res.statusCode = 404;
  res.send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
