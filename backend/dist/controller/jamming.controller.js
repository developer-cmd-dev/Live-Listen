let cache = [];
const startJam = async (req, res) => {
    const body = req.body;
    try {
        const roomId = Math.floor(Math.random() * 1000);
        cache.push({ roomId, ...body });
        res.status(200).json({ roomId, ...body });
    }
    catch (error) {
        console.log(error);
    }
};
export { startJam };
//# sourceMappingURL=jamming.controller.js.map