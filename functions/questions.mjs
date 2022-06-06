import inquirer from "inquirer";
import fs from "node:fs/promises"
import SearchBox from "inquirer-search-checkbox";
import Path from "path"


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

    if (choices.about_choices === "Default") {
        return model.about = defaultAbout
    }
    const write = await inquirer.prompt({
        name: "write_about",
        type: "input",
        message: "Just start typewriting..."
    })
    model.about = write.write_about
}

// TODO: Create a pattern of license to be like the default of a npm init (ISC), then consume the param defaultLicense.
export async function askLicense(model, defaultLicense) {

    const answer = await inquirer.prompt({
        name: "readme_license",
        type: "input",
        message: "To Finish what is the license ?",
        default() {
            return `MIT`
        }
    })

    if (answer.readme_license === defaultLicense) {
        const name = JSON.parse(await fs.readFile('./package.json', "utf-8")).author
        const year = new Date().getFullYear()


        model.license = (async () => {
            let unformattedLicense = await import("mdPattern.mjs")
            import("../pattern/mdPatterns.mjs").then(({ DefaultLicense }) => {
                unformattedLicense = DefaultLicense
            })
            return unformattedLicense.slice(0, 59)
        })()
    }

    model.license = answer.readme_license
}

export async function askTechnologies(model) {
    inquirer.registerPrompt("search-checkbox", SearchBox)
    // const choices = await fs.readFile(Path.resolve("./", "pattern", "listOfTechs.json"), "utf-8"); //Uncomment only when testing locally
    // //const choices = await fs.readFile(Path.resolve("node_modules", "@yuricss", "cli-readme-file-creator", "pattern", "listOfTechs.json"), "utf-8"); //Comment when testing locally
    // const obj = JSON.parse(choices)

    const answer = await inquirer.prompt({
        name: "readme_technologies",
        type: "search-checkbox",
        message: "Select this Project Technologies.",
        choices: options
    })

    model.techs = (function (arr) {
        const formatArr = arr.map((tech) => {
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

    if (choice.readme_instructions) {
        const { BasicInstructions } = await import("../pattern/BasicInstructions.mjs")
        model.instructions = BasicInstructions
    } else {
        model.instructions = await (async () => {
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
                if (await isCodeLine()) instructions.push(step.concat("\r\n", await writeCodeLine()))
                // console.log(`i: ${i}, howManySteps: ${howManySteps}`)
                // console.log(typeof i, typeof howManySteps, i === howManySteps)
                if (i === howManySteps) {
                    isFinished = (await inquirer.prompt({
                        name: "isFinished",
                        type: "confirm",
                        message: "Are you satisfied ?",
                        default: true
                    })).isFinished

                    if (!isFinished) {
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

async function isCodeLine() {
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
        name: "codeLine",
        type: "input",
        message: "Write the code line"
    })
    return `\`\`\`\r\n${answer.codeLine}\r\n\`\`\``
}

const options = [
    { "name": "Javascript", "value": "Javascript" },
    { "name": "Node.js", "value": "Node.js" },
    { "name": "C#", "value": "C#" },
    { "name": ".NET", "value": ".NET" },
    { "name": "Java", "value": "Java" },
    { "name": "PHP", "value": "PHP" },
    { "name": "Go", "value": "Go" },
    { "name": "C++", "value": "C++" },
    { "name": "C", "value": "C" },
    { "name": "HTML5", "value": "HTML5" },
    { "name": "CSS3", "value": "CSS3" },
    { "name": "SASS/SCSS", "value": "SASS/SCSS" },
    { "name": "React", "value": "React" },
    { "name": "Vue.js", "value": "Vue.js" },
    { "name": "Angular", "value": "Angular" },
    { "name": "Next.js", "value": "Next.js" },
    { "name": "Nuxt.js", "value": "Nuxt.js" },
    { "name": "Tailwind", "value": "Tailwind" },
    { "name": "ReactNative", "value": "ReactNative" },
    { "name": "Deno", "value": "Deno" },
    { "name": "Vite", "value": "Vite" },
    { "name": "Webpack", "value": "Webpack" },
    { "name": "Gulp", "value": "Gulp" },
    { "name": "Jest", "value": "Jest" },
    { "name": "Mocha", "value": "Mocha" },
    { "name": "PostgreSQL", "value": "PostgreSQL" },
    { "name": "MySQL", "value": "MySQL" },
    { "name": "LiteSQL", "value": "LiteSQL" },
    { "name": "SQLServer", "value": "SQLServer" },
    { "name": "MariaDB", "value": "MariaDB" },
    { "name": "MongoDB", "value": "Cassandra" },
    { "name": "Apache Cassandra", "value": "Apache Cassandra" }
]