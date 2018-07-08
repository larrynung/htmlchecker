'use strict';

const expect = require('chai').expect;
const {Checker, InputType} = require('../lib/checker');
const checker = new Checker();

describe('Pre-defined SEO rules', function(){
    it('Detect if any <img/> tag without alt attribute', function(){
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
    it('Detect if any <a/> tag without rel attribute', function(){
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><a/>")
            .check()
        ).to.be.equal(false);
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><a rel='value'/>")
            .check()
        ).to.be.equal(true);
    });
    it('Detect if header doesn’t have <title> tag', function(){
        expect(
            checker
            .input(InputType.Text, "<head><meta name='descriptions'/><meta name='keywords'/></head>")
            .check()
        ).to.be.equal(false);        
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head>")
            .check()
        ).to.be.equal(true);
    });
    it('Detect if header doesn’t have <meta name=”descriptions” ... /> tag', function(){
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='keywords'/></head>")
            .check()
        ).to.be.equal(false);     
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head>")
            .check()
        ).to.be.equal(true);
    });
    it('Detect if header doesn’t have <meta name=“keywords” ... />', function(){
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/></head>")
            .check()
        ).to.be.equal(false);   
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head>")
            .check()
        ).to.be.equal(true);
    });
    it('Detect if there’re more than 15 <strong> tag in HTML (15 is a value should be configurable by user)', function(){
        checker.registeredRules.MoreThanNStrongTagRule.params.maxStrongTagCount = 15;
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong>")
            .check()
        ).to.be.equal(false); 
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong>")
            .check()
        ).to.be.equal(true);             
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head>")
            .check()
        ).to.be.equal(true);        
    });
    it('Detect if a HTML have more than one <H1> tag', function(){
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><H1></H1><H1></H1>")
            .check()
        ).to.be.equal(false);   
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><H1></H1>")
            .check()
        ).to.be.equal(true);
        expect(
            checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head>")
            .check()
        ).to.be.equal(true);        
    });
});