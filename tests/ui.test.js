const { test, expect } = require('@playwright/test');

const baseURL = "http://localhost:3000";

// Navigation Bar for Guest Users
test('Verify "All Books" link is visible', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "Login" button is visible', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();

    expect(isLoginButtonVisible).toBe(true);
});

test('Verify "Register" button is visible', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();

    expect(isRegisterButtonVisible).toBe(true);
});

// Navigation Bar for Logged-In Users
test('Verify "All Books" link is visible after user login', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');
    await page.click('a[href="/login"]');
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "My Books" link is visible after user login', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');
    await page.click('a[href="/login"]');
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const myBooksLink = await page.$('a[href="/profile"]');
    const isLinkVisible = await myBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "Add Book" link is visible after user login', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');
    await page.click('a[href="/login"]');
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const addBookLink = await page.$('a[href="/create"]');
    const isLinkVisible = await addBookLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "Welcome Email Address" is visible after user login', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');
    await page.click('a[href="/login"]');
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const userEmail = await page.$('#user > span');
    const isEmailVisible = await userEmail.isVisible();

    expect(isEmailVisible).toBe(true);
});

// Login Page





// Check Logout button
// const logoutButton = await page.$('#logoutBtn');
// const isLogoutButtonVisible = await logoutButton.isVisible();
// expect(isLogoutButtonVisible).toBe(true);