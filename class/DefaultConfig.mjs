import fs from "node:fs/promises"

/**
 * This class is only used to create the default config of the readme, it will change fields which would be title to "title" and so on.
 *  It's also used as a reference to show the defaults in every question.
 */
export class DefaultConfig {
    _defaultTitle
    _defaultSubtitle
    _defaultAbout
    _defaultLicense
    _defaultVersion

    constructor({name, license, version, about}) {
        this._defaultTitle = name
        this._defaultLicense = license
        this._defaultVersion = version
        this._defaultAbout = about
    }

    get title() {
        return this._defaultTitle 
    }

    get subtitle() {
        return this._defaultSubtitle
    }

    get license() {
        return this._defaultLicense
    }

    get version(){
        return this._defaultVersion
    }

    get about() {
        return this._defaultAbout
    }
}