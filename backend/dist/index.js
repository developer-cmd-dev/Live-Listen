import express, {} from 'express';
const app = express();
const port = 3000;
app.listen(port, (error) => {
    if (error)
        console.log(error.message);
    console.log("Server is running on " + port);
});
app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Health is ok"
    });
});
//# sourceMappingURL=index.js.map