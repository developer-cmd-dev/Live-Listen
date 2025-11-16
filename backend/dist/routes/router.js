import { Router } from "express";
import {} from "express";
const route = Router();
route.get("/", (req, res) => {
    res.json({
        message: "Health is ok"
    });
});
export default route;
//# sourceMappingURL=router.js.map