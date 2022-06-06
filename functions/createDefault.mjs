import fs from "node:fs/promises"



export const createDefault = async () => {
    const config = {}

    const LoremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus condimentum massa id bibendum. Etiam in lobortis leo. Aenean dignissim rutrum dolor ac ultricies. Donec consectetur, tellus eu dictum ultrices, lorem arcu rhoncus purus, ac auctor justo leo vel est. Morbi pretium nibh et turpis feugiat, et condimentum urna consequat. Donec scelerisque ex quis urna malesuada bibendum. Nulla sagittis leo facilisis justo maximus mattis. Phasellus interdum, dui id euismod hendrerit, justo felis blandit sem, a mollis turpis tellus eu massa. Nullam interdum nulla tristique, vulputate turpis vitae, pulvinar nunc.\n\nSed laoreet massa quis lacus blandit, vel venenatis lorem suscipit. Quisque sodales quam consequat, blandit libero vel, imperdiet eros. Vivamus velit ante, scelerisque in ipsum pharetra, suscipit efficitur tellus. Vivamus nisi arcu, faucibus eu turpis ut, pulvinar mattis magna. Fusce non."
    const pkgJson = await fs.readFile("./package.json", "utf-8")

    const obj = await JSON.parse(pkgJson)
    config.license = obj.license
    config.about = LoremIpsum
    config.name = obj.name
    config.version = obj.version
    return config
}