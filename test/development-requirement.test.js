'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const path = require('path');
const HeadTagShouldHaveMetaTagRule = require('../lib/Rules/HeadTagShouldHaveMetaTagRule');
const { Checker, InputType, OutputType, Rule } = require('../lib/checker');
const checker = new Checker();

describe('Development Requirement', function () {
    it('User is free to chain any rules by themselves', function () {
        checker.registeredRules.ImgTagShouldHaveAltAttributeRule.isActive = false;
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img/>")
            .check(function (result, messages) {
                expect(result).to.be.equal(false);
            });
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img alt='value'/>")
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
        checker.registeredRules.ImgTagShouldHaveAltAttributeRule.isActive = true;

        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img/>")
            .check(function (result) {
                expect(result).to.be.equal(false);
            });
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img alt='value'/>")
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
    });
    it('User can define and use their own rules easily', function () {
        let aTagShouldHaveHrefAttributeRule = new Rule('ATagShouldHaveHrefAttributeRule', 'a:not([href])', function (length) { return 'There are ' + length + ' <a> tag without href attribute.'; });

        checker
            .input(InputType.Text, "<a href=''/>")
            .rules([aTagShouldHaveHrefAttributeRule])
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
        checker
            .input(InputType.Text, "<a/>")
            .rules([aTagShouldHaveHrefAttributeRule])
            .check(function (result) {
                expect(result).to.be.equal(false);
            });
    });
    it('The input can be a HTML file (User is able to config the output destination)', function () {
        let file = path.join(__dirname, 'input', 'input.html');
        checker
            .input(InputType.File, file)
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
    });
    it('The input can be Node Readable Stream', function () {
        let file = path.join(__dirname, 'input', 'input.html');
        let stream = fs.createReadStream(file);
        checker
            .input(InputType.Stream, stream)
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
    });
    it('The output can be a file (User is able to config the output destination)', function () {
        let file = path.join(__dirname, 'output', 'output.txt');
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img/>")
            .output(OutputType.File, file)
            .check();
        expect(fs.existsSync(file)).to.be.equal(true);
    });
    it('The output can be Node Writable Stream', function () {
        let folderPath = path.join(__dirname, 'output');
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        let file = path.join(folderPath, 'output.txt');
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
        let stream = fs.createWriteStream(file);
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img/>")
            .output(OutputType.Stream, stream)
            .check(function () {
                expect(fs.existsSync(file)).to.be.equal(true);
            });
    });
    it('The output can be Console', function () {
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img/>")
            .output(OutputType.Console)
            .check(function (result) {
                expect(result).to.be.equal(false);
            });
    });
    it('When we want to implement additional rules for <meta> tag, The code changes should be small. Ex: Checking <meta name=“robots” /> existing or not?!', function () {
        let headTagShouldHaveMetaTagWithRobotsRule = new HeadTagShouldHaveMetaTagRule('HeadTagShouldHaveMetaTagWithRobotsRule', 'robots', 'This HTML without <meta name="robots" .../> tag.');

        checker
            .input(InputType.Text, "<head><meta name='robots'/></head>")
            .rules([headTagShouldHaveMetaTagWithRobotsRule])
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
        checker
            .input(InputType.Text, "<head></head>")
            .rules([headTagShouldHaveMetaTagWithRobotsRule])
            .check(function (result) {
                expect(result).to.be.equal(false);
            });
    });
});