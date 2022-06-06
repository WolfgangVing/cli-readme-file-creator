/**
 *  This function read the template of the markdown to further treat with the fields
 *  That will change
 *  @param pattern string
 *  @returns Promise\<String\>
 */

export const ReadPattern = async (pattern) => {
    const template = (await import("../pattern/mdPatterns.mjs"))[pattern]
    return template
}