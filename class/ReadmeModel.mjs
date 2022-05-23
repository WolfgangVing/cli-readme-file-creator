/**
 * This is class is used to create a object in order of change the template with user inputs
 * It's first instanced, then the obj is passed to to every question, which will change the values of it.
 * later on the object with all the changes is passed to a function which is responsible to generate the readme.md file.
 */

export class ReadmeModel {
    
    title
    get title() {
        return this.title
    }
    set title(value) {
        this.title = value
    }

    subtitle
    get subtitle() {
        return this.subtitle
    }
    set subtitle(value) {
        this.subtitle = value
    }
    
    about
    get about() {
        return this.about
    }
    set about(value) {
        this.about = value
    }

    license
    get license() {
        return this.license
    }
    set license(value) {
        this.license = value
    }

    techs
    get techs(){
        return this.tech
    }
    set techs(value){
        this.tech = value
    }

    instructions
    get instructions(){
        return this.instructions
    }
    set instructions(value){
        this.instructions = value
    }
    
    constructor(title, /*subtitle,*/ about, license) {
        this.title = title
        // this.subtitle = subtitle
        this.about = about
        this.license = license
    }
}