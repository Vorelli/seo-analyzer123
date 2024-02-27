export default Analyzer;
declare class Analyzer {
    /**
     * Print formatted result to console
     * @param {Array} - Array of reports
     * @returns {Error} - Stop execution and print error
     */
    result(result: any): Error;
    /**
     * Print error message to console
     * @param {String} - Message
     * @returns {String} - Print formatted message to console
     */
    error(error: any, exit: any): string;
    /**
     * Print success message to console
     * @param {String} - Message
     * @returns {String} - Print formatted message to console
     */
    success(success: any): string;
    /**
     * Print info message to console
     * @param {String} - Message
     * @returns {String} - Print formatted message to console
     */
    info(info: any): string;
    /**
     * Print beautiful message to console
     * @param {String} - Result message
     * @returns {String} - Print CFonts message to console
     */
    printTextToConsole(text: any): string;
    /**
     * @param {Array} - Array of reports
     * @returns {Error} - Stop execution and print error
     * @private
     * @memberof Analyzer
     * @description Print result message to console
     */
    private _logResult;
    /**
     * @param {String} - Error object
     * @returns {String} - Stop execution and print error
     * @private
     * @memberof Analyzer
     * @description Print error message to console
     */
    private _logError;
    /**
     * @param {String} - Error object
     * @returns {String} - Stop execution and print error
     * @private
     * @memberof Analyzer
     * @description Print error message to console
     */
    private _logInfo;
    /**
     * @param {String} - Message
     * @returns {String} - Print formatted message to console
     * @private
     * @memberof Analyzer
     */
    private _logSuccess;
}
