'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const path = require('path');
const HeadTagShouldHaveMetaTagRule = require('../lib/Rules/HeadTagShouldHaveMetaTagRule');
const Rule = require('../lib/Rule');
const {Checker, InputType, OutputType} = require('../lib/checker');
const checker = new Checker();

describe('Development Requirement', function(){
    it('User is free to chain any rules by themselves', function(){
        checker.registeredRules.ImgTagShouldHaveAltAttributeRule.isActive = false;
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img/>")
            .check()
        ).to.be.equal(true);
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img alt='value'/>")
            .check()
        ).to.be.equal(true);
        checker.registeredRules.ImgTagShouldHaveAltAttributeRule.isActive = true;
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img/>")
            .check()
        ).to.be.equal(false);
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img alt='value'/>")
            .check()
        ).to.be.equal(true);
    });
    it('User can define and use their own rules easily', function(){
        let aTagShouldHaveHrefAttributeRule = new Rule('ATagShouldHaveHrefAttributeRule', 'a:not([href])', function(length) { return 'There are ' + length + ' <a> tag without href attribute.'; });
        expect(
            checker
            .input(InputType.Text, "<a href=''/>")
            .rules([aTagShouldHaveHrefAttributeRule])
            .check()
        ).to.be.equal(true);
        expect(
            checker
            .input(InputType.Text, "<a/>")
            .rules([aTagShouldHaveHrefAttributeRule])
            .check()
        ).to.be.equal(false);
    });
    it('The input can be a HTML file (User is able to config the output destination)', function(){
        let file = path.join(__dirname, 'input', 'input.html');
        expect(
            checker
            .input(InputType.File, file)
            .check()
        ).to.be.equal(true);
    });
    it('The input can be Node Readable Stream');
    it('The output can be a file (User is able to config the output destination)', function(){
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
    it('The output can be Node Writable Stream', function(){
        let folderPath = path.join(__dirname, 'output');
        if (!fs.existsSync(folderPath)){
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
        .check();
        expect(fs.existsSync(file)).to.be.equal(true);
    });
    it('The output can be Console', function(){
        checker
        .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img/>")
        .output(OutputType.Console)
        .check();
    });
    it('When we want to implement additional rules for <meta> tag, The code changes should be small. Ex: Checking <meta name=“robots” /> existing or not?!', function(){
        let headTagShouldHaveMetaTagWithRobotsRule = new HeadTagShouldHaveMetaTagRule('HeadTagShouldHaveMetaTagWithRobotsRule', 'robots', 'This HTML without <meta name="robots" .../> tag.');
        expect(
            checker
            .input(InputType.Text, "<head><meta name='robots'/></head>")
            .rules([headTagShouldHaveMetaTagWithRobotsRule])
            .check()
        ).to.be.equal(true);
        expect(
            checker
            .input(InputType.Text, "<head></head>")
            .rules([headTagShouldHaveMetaTagWithRobotsRule])
            .check()
        ).to.be.equal(false);
    });
});