import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import fs from "node:fs/promises"
import SearchBox from "inquirer-search-checkbox";
import { type } from "node:os";

export async function askTitle(model, defaultTitle) {
    const answer = await inquirer.prompt({
        name: "readme_title",
        type: "input",
        message: "What is the project name?",
        default() {
            return `${defaultTitle}`
        }
    })
    
    model.title = answer.readme_title
}

export async function askSubtitle(model, defaultDescription) {
    const answer = await inquirer.prompt({
        name: "readme_subtitle",
        type: "input",
        message: "What about an short description ?",
        default() {
            return `${defaultDescription}`
        }
    })

    model.subtitle = answer.readme_subtitle
}

export async function askDescription(model, defaultAbout) {
    const choices = await inquirer.prompt({
        name: "about_choices",
        type: "list",
        message: "What about the about ?",
        choices: [
            "Default", "Let's write this down."
        ]
    })
    
    if(choices.about_choices === "Default") {
        return model.about = defaultAbout
    }
    const write = await inquirer.prompt({
        name: "write_about",
        type: "input",
        message: "Just start typewriting..."
    })
    model.about = write.write_about
}

export async function askLicense(model, defaultLicense) {
    const answer = await inquirer.prompt({
        name: "readme_license",
        type: "input",
        message: "To Finish what is the license ?",
        default() {
            return `${defaultLicense}`
        }
    })

    if(answer.readme_license === defaultLicense) {
        model.license = await (async ()=>{
            const license = await fs.readFile("./LICENSE.txt", "utf8")
            return license.slice(0, 59)
        })()
        return
    }

    model.license = answer.readme_license
}

export async function askTechnologies(model) {
    inquirer.registerPrompt("search-checkbox", SearchBox)
    const choices = await fs.readFile("./listOfTechs.json", "utf-8");
    const obj = JSON.parse(choices)
    
    const answer = await inquirer.prompt({
        name: "readme_technologies",
        type: "search-checkbox",
        message: "Select this Project Technologies.",
        choices: obj.options
    })

    model.techs = (function(arr) {
        const formatArr = arr.map((tech, index) => {
            return `| ${tech} |`
        })
        const title = `| Technologies |\r\n|:---:|\r\n`
        return (title + formatArr.join('\r\n'))
    })(answer.readme_technologies)
}

export async function askInstructions(model) {
    const choice = await inquirer.prompt({
        name: "readme_instructions",
        type: "confirm",
        message: "Would lick to go with the Default's instructions ?",
        default: true
    })

    if(choice.readme_instructions){
        model.instructions = await fs.readFile("./pattern/BasicInstructions.txt", "utf-8")
    } else {
        model.instructions = await(async () => {
            let isFinished = false
            const instructions = []

            let howManySteps = parseInt((await inquirer.prompt({
                name: "quantity",
                type: "input",
                message: "How much steps would like to have ?, Don't worry you will be asked if you want to make more steps",
                default: 2
            })).quantity)
            
            for (let i = 1; i <= howManySteps && !isFinished; i++) {
                const step = await writeStep(i)
                if(await isCodeLine()) instructions.push(step.concat("\r\n", await writeCodeLine()))
                // console.log(`i: ${i}, howManySteps: ${howManySteps}`)
                // console.log(typeof i, typeof howManySteps, i === howManySteps)
                if(i === howManySteps) {
                    isFinished = (await inquirer.prompt({
                        name:"isFinished",
                        type:"confirm",
                        message: "Are you satisfied ?",
                        default: true
                    })).isFinished

                    if(!isFinished) {
                        i = 0
                        howManySteps = (await inquirer.prompt({
                            name: "newSteps",
                            type: "input",
                            message: "How many steps would you like to add ?",
                            default: 1
                        })).newSteps
                    }
                }
            }

            return instructions
        })()
    }
}

async function isCodeLine () {
    const answer = await inquirer.prompt({
        name: "answer_codeLine",
        type: "confirm",
        message: "Does this description have code line?",
        default: true
    })

    return answer.answer_codeLine
}
async function writeStep(step) {
    const answer = await inquirer.prompt({
        name: "answer_step",
        type: "input",
        message: `Write the ${step}° step description`,
    })
    return `\r\n<h3>${answer.answer_step}<h3>\r\n`
}
async function writeCodeLine() {
    const answer = await inquirer.prompt({
        name:"codeLine",
        type:"input",
        message: "Write the code line"
    })
    return `\`\`\`\r\n${answer.codeLine}\r\n\`\`\``
}