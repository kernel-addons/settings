import memoize from "../modules/memoize";
import Webpack, { Filters } from "../modules/webpack";

const DiscordComponents = memoize({
    get Button() {return Webpack.findByProps("BorderColors");},
    get Switch() {return Webpack.findModule(m => typeof m === 'function' && Filters.byCode('helpdeskArticleId')(m));},
    get Markdown() {return Webpack.findModule(m => m?.prototype?.render && m.rules);},
    get Text() {return Webpack.findModule(m => m.Sizes?.SIZE_24 && m.Colors?.LINK);},
    get Spinner() {return Webpack.findModule(m => m.Type?.SPINNING_CIRCLE);},
    get Flex() {return Webpack.findByProps("Child", "Align");},
    get Link() {return Webpack.findModule(m => typeof m === 'function' && Filters.byCode('href', 'anchor')(m));},
    get FormTitle() {return Webpack.findModule(m => m.Tags && Filters.byCode('errorSeparator')(m));},
    get FormNotice() {return Webpack.findModule(m => m.Types && Filters.byCode('formNoticeTitle', 'formNoticeBody')(m));},
    get FormDivider() {return Webpack.findModule(m => typeof m === 'function' && (m = m.toString()) && m.length < 200 && m.includes('divider'));},
    get FormItem() {return Webpack.findModule(m => m.Tags && Filters.byCode('children', 'createElement', 'disabled', 'tag', 'title')(m));},
    get Tooltips() {return Webpack.findByProps("Positions", "Colors");}
});

export default DiscordComponents;
