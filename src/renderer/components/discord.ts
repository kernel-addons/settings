import memoize from "../modules/memoize";
import Webpack from "../modules/webpack";

const DiscordComponents = memoize({
    get Button() {return Webpack.findByProps("BorderColors");},
    get Switch() {return Webpack.findByDisplayName("Switch");},
    get Markdown() {return Webpack.findModule(m => m.displayName === "Markdown" && "rules" in m);},
    get Header() {return Webpack.findModule(m => m.displayName === "Header" && "Tags" in m);},
    get Text() {return Webpack.findByDisplayName("Text");},
    get Forms() {return Webpack.findByProps("FormItem", "FormTitle");},
    get Spinner() {return Webpack.findByDisplayName("Spinner");},
    get Flex() {return Webpack.findByDisplayName("Flex");},
    get Link() {return Webpack.findByDisplayName("Anchor");},
    get Icons() {
        const icons = Webpack.findModules(m => typeof m === "function" && m.displayName && m.toString().indexOf("currentColor") > -1);

        return Object.fromEntries(icons.map(icon => [icon.displayName, icon]));
    },
    get Tooltips() {
        const TooltipModule = Webpack.findByProps("TooltipContainer");

        return {
            Container: TooltipModule.TooltipContainer,
            Tooltip: TooltipModule.default,
            ...TooltipModule
        };
    }
});

export default DiscordComponents;