'use strict';

const chai = require('chai');
const expect = chai.expect;
const { Checker, InputType } = require('../lib/checker');
const checker = new Checker();

describe('Pre-defined SEO rules', function () {
    it('Detect if any <img/> tag without alt attribute', function () {
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img/>")
            .check(function (result) {
                expect(result).to.be.equal(false);
            });
    });
    it('Detect if any <img/> tag without alt attribute', function () {
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img alt='value'/>")
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
    });
    it('Detect if any <a/> tag without rel attribute', function () {
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><a/>")
            .check(function (result) {
                expect(result).to.be.equal(false);
            });
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><a rel='value'/>")
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
    });
    it('Detect if header doesn’t have <title> tag', function () {
        checker
            .input(InputType.Text, "<head><meta name='descriptions'/><meta name='keywords'/></head>")
            .check(function (result) {
                expect(result).to.be.equal(false);
            });
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head>")
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
    });
    it('Detect if header doesn’t have <meta name=”descriptions” ... /> tag', function () {

        checker
            .input(InputType.Text, "<head><title></title><meta name='keywords'/></head>")
            .check(function (result) {
                expect(result).to.be.equal(false);
            });
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head>")
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
    });
    it('Detect if header doesn’t have <meta name=“keywords” ... />', function () {

        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/></head>")
            .check(function (result) {
                expect(result).to.be.equal(false);
            });
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head>")
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
    });
    it('Detect if there’re more than 15 <strong> tag in HTML (15 is a value should be configurable by user)', function () {
        checker.registeredRules.MoreThanNStrongTagRule.params.maxStrongTagCount = 15;

        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong>")
            .check(function (result) {
                expect(result).to.be.equal(false);
            });
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong><strong></strong>")
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head>")
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
    });
    it('Detect if a HTML have more than one <H1> tag', function () {

        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><H1></H1><H1></H1>")
            .check(function (result) {
                expect(result).to.be.equal(false);
            });
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><H1></H1>")
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
        checker
            .input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head>")
            .check(function (result) {
                expect(result).to.be.equal(true);
            });
    });
});