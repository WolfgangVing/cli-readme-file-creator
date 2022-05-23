import fs from "node:fs/promises";
import Path from "path"

/**
 *  This function read the template of the markdown to further treat with the fields
 *  That will change
 *  @param pattern string
 *  @returns Promise\<String\>
 */

export const ReadPattern = async (pattern) => {
    const template = await fs.readFile(Path.resolve("node_modules", "cli-readme-file-creator", "pattern", `${pattern}.txt`), "utf-8")
    return template
}