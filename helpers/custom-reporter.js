"use strict";

//var rally_1 = require("./rally");

var SpecReporter = (function () {
    function SpecReporter() {
        this.failedSpecs = 0;
    }

    SpecReporter.prototype.specDone = function (result) {
        this.failedSpecs = this.failedSpecs + result.failedExpectations.length;
        //this.logResult(result, result.description.slice(0, result.description.indexOf("-")));
    };

    SpecReporter.prototype.suiteDone = function (result) {
        //this.logResult(result, result.fullName.slice(0, result.fullName.indexOf("-")));
        this.failedSpecs = 0;
    };

    // SpecReporter.prototype.logResult = function (result, testCase) {
    //     if (testCase) {
    //         rally_1.RallyApi.logResult(testCase, this.failedSpecs);
    //     }
    // };

    return SpecReporter;

}());

module.exports = SpecReporter;