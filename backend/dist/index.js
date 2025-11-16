import express, {} from 'express';
const app = express();
const port = 3000;
app.listen(port, (error) => {
    if (error)
        console.log(error.message);
    console.log("Server is running on " + port);
});
//# sourceMappingURL=index.js.map