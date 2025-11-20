import { prisma } from "../utility/PrismaClient.js";
const searchController = async (req, res) => {
    const query = req.params.name;
    if (query) {
        const searchResult = await prisma.songs.findMany({
            where: {
                name: query
            }
        });
        console.log(searchResult);
    }
    res.status(200).json(query);
};
export { searchController };
//# sourceMappingURL=search.controller.js.map