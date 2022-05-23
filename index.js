#!/usr/bin/env node

import chalkAnimation from "chalk-animation";
import { createReadme } from "./functions/createREADME.mjs";
import {askTitle, askDescription, askLicense, askTechnologies, askInstructions} from "./functions/questions.mjs"
import { ReadmeModel } from "./class/ReadmeModel.mjs";
import { DefaultConfig } from "./class/DefaultConfig.mjs";
import { createDefault } from "./functions/createDefault.mjs";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        `Let's create this README file shall we ?\n`
    )

    await sleep()
    rainbowTitle.stop();
}



const readmeModel = new ReadmeModel("title", "about", "technologies", "license")
const defaultConfig = new DefaultConfig(await createDefault())
await welcome();
await askTitle(readmeModel, defaultConfig.title);
// await askSubtitle(readmeModel, defaultConfig.subtitle);
await askDescription(readmeModel, defaultConfig.about);
await askTechnologies(readmeModel);
await askInstructions(readmeModel);
await askLicense(readmeModel, defaultConfig.license);
await createReadme(readmeModel);
