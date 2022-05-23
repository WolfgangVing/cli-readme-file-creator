import fs from "fs"
import { formaterMap } from "../formaterMap.mjs"
import { ReadPattern } from "./readPattern.mjs";

/**
 * Passed the template object with it will create an text and then generate the README.md
 * @param {{title: String, about: String, license: string, tech: String[]}} template
 */
export async function createReadme(template) {

    /**
     *  This variable is initialized with the return of an IIFE/SEAF
     * 
     * @param {{title: String, about: String, license: string, tech: String[]}} changes 
     * @returns {Promise<String>}string
     */
    const templateTreated = await (async(changes) => {
        let replaced = await ReadPattern("BasicPattern");

        for (const [pattern, patternKey] of formaterMap) {
            // console.log(`${patternKey}: ${changes[pattern]}`)
            if (!changes[pattern]) continue;

            replaced = await replaced.replace(patternKey, changes[pattern])

        }
        return replaced
    })(template)

    fs.writeFile("README.md", templateTreated, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("File created successfully")
        }
    })
}