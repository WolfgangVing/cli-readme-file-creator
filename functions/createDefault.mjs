import fs from "node:fs/promises"
import Path from "path"
async function readPackage () {
    const pkgJson = await fs.readFile("./package.json", "utf-8")
    const obj = await JSON.parse(pkgJson)
    return obj
}

export const createDefault = async() => {
    const config = {}

    const loremIpsum = await fs.readFile(Path.resolve("node_modules", "cli-readme-file-creator", "pattern", "LoremIpsum.txt"), "utf-8")
    const license = await fs.readFile(Path.resolve("node_modules", "cli-readme-file-creator", "LICENSE.txt"),"utf-8")
    const pkgJson = await fs.readFile("./package.json", "utf-8")

    const obj = await JSON.parse(pkgJson)
    config.license = obj.license
    config.about = loremIpsum
    config.name = obj.name
    config.version = obj.version
    return config
}