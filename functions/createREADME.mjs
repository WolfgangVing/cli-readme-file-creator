import fs from "node:fs/promises"
import { formaterMap } from "../pattern/formaterMap.mjs"
import { ReadPattern } from "./readPattern.mjs";
import { createSpinner } from "nanospinner";

/**
 * Passed the template object with it will create an text and then generate the README.md
 * @param {{title: String, about: String, license: string, tech: String[]}} template
 */

export const createReadme = async (template) => {

    /**
     *  This variable is initialized with the return of an IIFE/SEAF
     * 
     * @param {{title: String, about: String, license: string, tech: String[]}} changes 
     * @returns {Promise<String>}string
     */
    const templateTreated = await (async (changes) => {
        let replaced = await ReadPattern("BasicPattern");
        // console.log(replaced)
        for (const [pattern, patternKey] of formaterMap) {
            // console.log(`${patternKey}: ${changes[pattern]}`)
            if (!changes[pattern]) continue;

            replaced = await replaced.replace(patternKey, changes[pattern])

        }
        return replaced
    })(template)

    const spinner = createSpinner("Generating Readme File", { color: "blue" }).start()
    setTimeout(async () => {
        fs.writeFile("./README.md", templateTreated).then(() => {
            spinner.success({ text: "File generated successfully" })
        }).catch((err) => {
            spinner.error({ text: "Erro ocurred, please try again." })
        })
    }, 2000)
}