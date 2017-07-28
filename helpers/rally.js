"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var envConfig = require("../../../../config/" + process.env.APP_ENV + ".config.json");
var rally = require('rally');
var enums_1 = require("./enums");

var RallyApi = (function () {
    function RallyApi() {
    }

    RallyApi.setup = function () {
        if (RallyApi.restApi)
            return;
        RallyApi.restApi = rally({
            apiKey: '_xbwhF0mrRWChRFWN07kP08NDhU6kwxo95STfRKg'
        });
        RallyApi.queryUtils = rally.util.query;
    };

    RallyApi.logResult = function (testCase, failedSpecs) {
        var _this = this;
        this.setup();
        this.restApi.query({
            type: 'testcase',
            start: 1,
            pageSize: 1,
            limit: 1,
            fetch: ['FormattedID', 'Ref', '_ref'],
            query: this.queryUtils.where('FormattedID', '=', testCase)
        }).then(function (obj) {
            _this.createTestCaseResult(testCase, failedSpecs, obj);
        });
    };

    RallyApi.createTestCaseResult = function (testCase, failedSpecs, obj) {
        if (!(obj.Results && obj.Results[0]))
            return;
        var refSplit = obj.Results[0]._ref.split('/'), ref = refSplit.pop();
        var date = new Date();
        var verdict = enums_1.enums.Verdict.Pass.toString();
        if (failedSpecs && failedSpecs > 0)
            verdict = enums_1.enums.Verdict.Fail.toString();

        var result = this.restApi.create({
            type: 'TestCaseResult',
            ref: '/create',
            data: {
                Build: envConfig.browserName + ' ' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + ((date.getMinutes() < 10 ? '0' : '') + date.getMinutes()),
                Date: new Date(),
                Verdict: verdict,
                TestCase: ref,
                Tester: 2301320727
            }
        }).then(function (successObj) {
            console.log(testCase + ' result successfully created');
        });

    };
    return RallyApi;

}());

exports.RallyApi = RallyApi;