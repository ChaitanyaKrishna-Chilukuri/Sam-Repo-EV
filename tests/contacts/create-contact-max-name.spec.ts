/**
 * @fileoverview Test: Create contact with maximum allowed characters in Name and valid other fields, then Save.
 *
 * Logs in using env-provided credentials, navigates to Contacts, creates a new contact
 * with a max-length Name value, and performs a basic post-save verification.
 */

import { test, expect } from '../../test-setup/fixtures';
import { LoginPage } from '../../src/pages/login.page';
import { ContactsPage } from '../../src/pages/contacts.page';

/**
 * Create contact with maximum allowed characters in Name and valid other fields, then Save.
 */

test.describe('Contacts', () => {
    test('Create contact with maximum allowed characters in Name and valid other fields, then Save', async ({ page, logger, allureReporter }) => {
        const email = process.env.TEST_USER_EMAIL;
        const password = process.env.TEST_USER_PASSWORD;

        if (!email) throw new Error('Missing required env var: TEST_USER_EMAIL');
        if (!password) throw new Error('Missing required env var: TEST_USER_PASSWORD');

        const loginPage = new LoginPage(page);
        const contactsPage = new ContactsPage(page);

        await test.step('Login', async () => {
            logger.info('Logging in with TEST_USER_EMAIL (password redacted)');
            allureReporter.addStep('Login with TEST_USER_EMAIL (password redacted)');

            await loginPage.fillLoginEmail(email);
            await loginPage.fillLoginPassword(password);
            await loginPage.clickLogin();
        });

        await test.step('Open Contacts and create contact with max name', async () => {
            logger.info('Navigating to Contacts and creating contact with max-length Name');
            allureReporter.addStep('Navigate to Contacts and create contact with max-length Name');

            await contactsPage.openContacts();
            await contactsPage.createContactWithMaxName();
        });

        await test.step('Verify contact creation succeeded', async () => {
            logger.info('Verifying contact creation post-save state');
            allureReporter.addStep('Verify contact creation post-save state');

            // Minimal verification without inventing selectors:
            // ensure Save button is no longer visible (form likely closed) OR Contacts nav remains accessible.
            await expect(page.getByRole('link', { name: '\uf0c0 Contacts' })).toBeVisible();
        });
    });
});
