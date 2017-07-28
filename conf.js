// conf.js

// debugging and screenshots:
// http://www.protractortest.org/#/debugging


exports.config = {
    framework: 'jasmine',

    /*
    directConnect: true - Your test script communicates directly Chrome Driver or Firefox Driver, 
    bypassing any Selenium Server. If this is true, settings for seleniumAddress and seleniumServerJar will be ignored. 
    If you attempt to use a browser other than Chrome or Firefox an error will be thrown.

    The advantage of directly connecting to browser drivers is that your test scripts may start up and run faster
    */

    // seleniumAddress: 'http://localhost:4444/wd/hub',
    retartBrowserBetweenTests: true,

    directConnect: true,

    //   ,
    //   multiCapabilities: [{
    //       browserName: 'firefox'
    //   },{
    //       browserName: 'chrome'
    //   }]
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {

            'args': ['show-fps-counter=true']  // for dev tools: 'auto-open-devtools-for-tabs'
            // To Run in Headless Mode
            //args: ["--headless", "--disable-gpu", "--window-size=800x600"]
        }
    },

    // run single spec: terminal command: protractor conf.js
    specs: ['tests/homepage/angularSiteTests.js'],

    // run suites: protractor protractor.conf.js --suite homepage
    // or run certain suites: protractor protractor.conf.js --suite homepage, search
    // or run all suites: protractor conf.js
    // suites: {
    //     homepage: './tests/homepage/*.js',
    //     starters: './tests/starters/*.js'
    // },

    onPrepare: function () {
        browser.driver.manage().window().maximize();

        var customReporter = require('./helpers/custom-reporter.js');
        jasmine.getEnv().addReporter(new customReporter());

        var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }));

    },

    jasmineNodeOptions: {
        showColors: true,
        isVerbose: true,
        realtimeFailure: true,
        includeStackTrace: true,
    }
}