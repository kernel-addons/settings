import Webpack from "../modules/webpack.js";

export default class Components {
    static #_cache = {};

    static byProps(...props) {
        const name = props.join(":");
        if (this.#_cache[name]) return this.#_cache[name];

        this.#_cache[name] = Webpack.findByProps(...props);

        return this.#_cache[name];
    }

    static get(name) {
        if (this.#_cache[name]) return this.#_cache[name];

        this.#_cache[name] = Webpack.findByDisplayName(name);

        return this.#_cache[name];
    }
}