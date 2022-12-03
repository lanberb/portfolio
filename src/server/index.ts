import express from "express";
import path from "path";

const port = 3000;

const app = express();
const __dirname = path.resolve(path.dirname(""));

app.listen(process.env.PORT || port, function () {
  console.log("express app is started.");
});

app.use("/", express.static("dist"));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.get("/firm", (_req: express.Request, res: express.Response) =>
  res.send("ooooooooooooooookkkkkkkkkkkkkkkk")
);
