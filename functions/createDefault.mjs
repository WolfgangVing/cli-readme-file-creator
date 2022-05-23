import fs from "node:fs/promises"

async function readPackage () {
    const pkgJson = await fs.readFile("./package.json", "utf-8")
    const obj = await JSON.parse(pkgJson)
    return obj
}

export const createDefault = async() => {
    const config = {}

    const loremIpsum = await fs.readFile("./pattern/LoremIpsum.txt", "utf-8")
    const license = await fs.readFile("./LICENSE.txt","utf-8")
    const pkgJson = await fs.readFile("./package.json", "utf-8")

    const obj = await JSON.parse(pkgJson)
    config.license = obj.license
    config.about = loremIpsum
    config.name = obj.name
    config.version = obj.version
    return config
}