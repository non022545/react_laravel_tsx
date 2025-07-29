
import AppAPI from "../AppAPI";

const Home = {
    getall: () => AppAPI.get("/showvalo"),
}

export default Home;
