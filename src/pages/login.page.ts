import { Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * LoginPage encapsulates interactions with the login form.
 *
 * Covers test steps:
 * 1) Fill Email
 * 2) Fill Password
 * 3) Click Login
 */
export class LoginPage extends BasePage {
    private readonly loginEmailField: Locator;
    private readonly loginPasswordField: Locator;
    private readonly loginButton: Locator;

    /**
     * Creates an instance of LoginPage.
     * @param page Playwright Page instance provided by the test/fixture.
     */
    constructor(page: Page) {
        super(page);

        // Locators (provided by planner output; do not modify selectors)
        this.loginEmailField = this.page.getByRole('textbox', { name: 'Email' });
        this.loginPasswordField = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByText('Login');
    }

    /**
     * Fill the login Email field.
     * @param email Login email (should be sourced from env/config by the caller).
     */
    async fillLoginEmail(email: string): Promise<void> {
        this.logStep('Fill login email');
        await ActionUtils.fill(this.loginEmailField, email, { page: this.page });
    }

    /**
     * Fill the login Password field.
     * Note: password value is intentionally not logged.
     * @param password Login password (should be sourced from env/config by the caller).
     */
    async fillLoginPassword(password: string): Promise<void> {
        this.logStep('Fill login password (redacted)');
        await ActionUtils.fill(this.loginPasswordField, password, { page: this.page });
    }

    /**
     * Click the Login button to authenticate.
     */
    async clickLogin(): Promise<void> {
        this.logStep('Click Login');
        await ActionUtils.click(this.loginButton, { page: this.page });
    }
}
