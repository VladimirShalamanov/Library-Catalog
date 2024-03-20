const { test, expect } = require('@playwright/test');

const baseURL = "http://localhost:3000/";
const loginURL = `${baseURL}login`;
const registerURL = `${baseURL}register`;
const catalogURL = `${baseURL}catalog`;
const createURL = `${baseURL}create`;

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
    await page.goto(loginURL);

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "My Books" link is visible after user login', async ({ page }) => {
    await page.goto(loginURL);

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const myBooksLink = await page.$('a[href="/profile"]');
    const isLinkVisible = await myBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "Add Book" link is visible after user login', async ({ page }) => {
    await page.goto(loginURL);

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const addBookLink = await page.$('a[href="/create"]');
    const isLinkVisible = await addBookLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "Welcome Email Address" is visible after user login', async ({ page }) => {
    await page.goto(loginURL);

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const userEmail = await page.$('#user > span');
    const isEmailVisible = await userEmail.isVisible();

    expect(isEmailVisible).toBe(true);
});

// Login Page
test('Login with valid credentials', async ({ page }) => {
    await page.goto(loginURL);

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');
    await page.$('a[href="/catalog"]');

    expect(page.url()).toBe(catalogURL);
});

test('Login with empty credentials', async ({ page }) => {
    await page.goto(loginURL);

    await page.click('#login-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe(loginURL);
});

test('Login with empty email', async ({ page }) => {
    await page.goto(loginURL);

    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe(loginURL);
});

test('Login with empty password', async ({ page }) => {
    await page.goto(loginURL);

    await page.fill('#email', "peter@abv.bg");
    await page.click('#login-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe(loginURL);
});

// Register Page
// test('Register with valid credentials', async ({ page }) => {
//     await page.goto(registerURL);

//     await page.fill('#email', "vladimir.test3@abv.bg");
//     await page.fill('#password', "111222");
//     await page.fill('#repeat-pass', "111222");

//     await page.click('#register-form > fieldset > input');
//     await page.$('a[href="/catalog"]');

//     expect(page.url()).toBe(catalogURL);
// });

test('Register with empty credentials', async ({ page }) => {
    await page.goto(registerURL);

    await page.click('#register-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerURL);
});

test('Register with empty email', async ({ page }) => {
    await page.goto(registerURL);

    await page.fill('#password', "111222");
    await page.fill('#repeat-pass', "111222");
    await page.click('#register-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerURL);
});

test('Register with empty password', async ({ page }) => {
    await page.goto(registerURL);

    await page.fill('#email', "vladimir@abv.bg");
    await page.fill('#repeat-pass', "111222");
    await page.click('#register-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerURL);
});

test('Register with empty repeat-pass', async ({ page }) => {
    await page.goto(registerURL);

    await page.fill('#email', "vladimir@abv.bg");
    await page.fill('#password', "111222");
    await page.click('#register-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerURL);
});

test('Register with Different passwords', async ({ page }) => {
    await page.goto(registerURL);

    await page.fill('#email', "vladimir@abv.bg");
    await page.fill('#password', "111222");
    await page.fill('#repeat-pass', "DIFFpa");
    await page.click('#register-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain("Passwords don't match!");
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerURL);
});

// "Add Book" Page
test('Add Book with Correct Data', async ({ page }) => {
    // login
    await page.goto(loginURL);

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");

    await Promise.all([
        page.click('#login-form > fieldset > input'),
        page.waitForURL(catalogURL)
    ]);

    // create
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#title', "test book");
    await page.fill('#description', "test description book");
    await page.fill('#image', "https://content.api.news/v3/images/bin/8791f511b22d3b0abb8b52c575bff083?width=2048");
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form > fieldset > input');
    await page.waitForURL(catalogURL);

    expect(page.url()).toBe(catalogURL);
});

test('Add Book with empty title', async ({ page }) => {
    // login
    await page.goto(loginURL);

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");

    await Promise.all([
        page.click('#login-form > fieldset > input'),
        page.waitForURL(catalogURL)
    ]);

    // create
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#description', "test description book");
    await page.fill('#image', "https://content.api.news/v3/images/bin/8791f511b22d3b0abb8b52c575bff083?width=2048");
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe(createURL);
});

test('Add Book with empty description', async ({ page }) => {
    // login
    await page.goto(loginURL);

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");

    await Promise.all([
        page.click('#login-form > fieldset > input'),
        page.waitForURL(catalogURL)
    ]);

    // create
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#title', "test book");
    await page.fill('#image', "https://content.api.news/v3/images/bin/8791f511b22d3b0abb8b52c575bff083?width=2048");
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe(createURL);
});

test('Add Book with empty image URL', async ({ page }) => {
    // login
    await page.goto(loginURL);

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");

    await Promise.all([
        page.click('#login-form > fieldset > input'),
        page.waitForURL(catalogURL)
    ]);

    // create
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#title', "test book");
    await page.fill('#description', "test description book");
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe(createURL);
});

// "All Books" Page
test('Verify all books are displayed', async ({ page }) => {
    // login
    await page.goto(loginURL);

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");

    await Promise.all([
        page.click('#login-form > fieldset > input'),
        page.waitForURL(catalogURL)
    ]);

    // catalog
    await page.waitForSelector('.dashboard');
    const bookElements = await page.$$('.other-books-list li');

    expect(bookElements.length).toBeGreaterThan(0);
});

// test('Verify there are no books displayed', async ({ page }) => {
//     // First - STOP the server -> comment all books -> START the server
//     // login
//     await page.goto(loginURL);

//     await page.fill('#email', "peter@abv.bg");
//     await page.fill('#password', "123456");

//     await Promise.all([
//         page.click('#login-form > fieldset > input'),
//         page.waitForURL(catalogURL)
//     ]);

//     // catalog
//     await page.waitForSelector('.dashboard');
//     const noBookMessage = await page.textContent('.no-books');

//     expect(noBookMessage).toBe("No books in database!");
// });

// "Details" Page (some tests)
test('Details page view as Login user', async ({ page }) => {
    // login
    await page.goto(loginURL);

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");

    await Promise.all([
        page.click('#login-form > fieldset > input'),
        page.waitForURL(catalogURL)
    ]);

    // catalog
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');

    await page.click('a[href="/details/f6f54fcd-0469-470b-8ffa-a33ae6c7a524"]');
    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');

    expect(detailsPageTitle).toBe("To Kill a Mockingbird");
});

test('All info is displayed Correctly', async ({ page }) => {
    const descriptionOfFirstBook = 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. "To Kill A Mockingbird" became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.';

    // catalog
    await page.goto(catalogURL);
    await page.waitForSelector('.otherBooks');

    await page.click('a[href="/details/f6f54fcd-0469-470b-8ffa-a33ae6c7a524"]');
    await page.waitForSelector('.book-information');

    const titleBook = await page.textContent('.book-information h3');
    const typeBook = await page.textContent('.book-information .type');
    const descriptionBook = await page.textContent('div.book-description > p');

    expect(titleBook).toBe("To Kill a Mockingbird");
    expect(typeBook).toBe("Type: Classic");
    expect(descriptionBook).toBe(descriptionOfFirstBook);
});

// "Logout" Functionality
test('Verify Logout Button Button Is Visible', async ({ page }) => {
    // login
    await page.goto(loginURL);

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");

    await Promise.all([
        page.click('#login-form > fieldset > input'),
        page.waitForURL(catalogURL)
    ]);

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutButtonVisible = await logoutButton.isVisible();

    expect(isLogoutButtonVisible).toBe(true);
});

test('Verify Logout Button Redirects Correctly', async ({ page }) => {
    // login
    await page.goto(loginURL);

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    page.click('#login-form > fieldset > input');

    // logout
    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    await logoutLink.click();
    await page.waitForURL(baseURL);

    const redirectedURL = page.url();

    expect(redirectedURL).toBe(baseURL);
});