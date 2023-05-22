const express = require("express");
const app = express();


app.use(express.json())

app.use("/api", require("./routes"))





app.listen(4000, () => {
    console.log("Listening ... on http://localhost:4000");
});