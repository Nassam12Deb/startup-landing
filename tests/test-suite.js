// tests/test-suite.js
// Tests avec Jest + Puppeteer pour E2E

// Installation : npm install --save-dev jest puppeteer

const puppeteer = require('puppeteer');

describe('Landing Page Tests', () => {
    let browser;
    let page;
    
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
    });
    
    afterAll(async () => {
        await browser.close();
    });
    
    test('Page title is correct', async () => {
        const title = await page.title();
        expect(title).toContain('Startup');
    });
    
    test('Navigation works', async () => {
        await page.click('a[href="#features"]');
        await page.waitForSelector('#features');
        const featuresVisible = await page.$eval('#features', el => {
            return el.getBoundingClientRect().top > 0;
        });
        expect(featuresVisible).toBe(true);
    });
    
    test('Contact form validation', async () => {
        await page.click('button[type="submit"]');
        await page.waitForSelector('.notification.error');
        const errorVisible = await page.$('.notification.error') !== null;
        expect(errorVisible).toBe(true);
    });
    
    test('Mobile menu toggles', async () => {
        // Tester en mode mobile
        await page.setViewport({ width: 375, height: 667 });
        await page.click('.menu-hamburger');
        await page.waitForSelector('.nav-links.active');
        const menuVisible = await page.$('.nav-links.active') !== null;
        expect(menuVisible).toBe(true);
    });
});