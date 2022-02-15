import memoize from "./memoize";
import Webpack from "./webpack";

const DiscordModules = memoize({
    get Moment() {return Webpack.findByProps("momentProperties");}
});

export default DiscordModules;