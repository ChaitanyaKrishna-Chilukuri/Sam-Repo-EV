import { Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * ContactsPage encapsulates interactions within the Contacts module.
 *
 * Covers test steps:
 * 4) Open Contacts
 * 5) Click Create
 * 6-24) Fill contact fields and Save
 */
export class ContactsPage extends BasePage {
    private readonly contactsNavLink: Locator;
    private readonly createContactLink: Locator;
    private readonly firstNameField: Locator;
    private readonly middleNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly streetAddressField: Locator;
    private readonly phoneNumberField: Locator;
    private readonly companyCombobox: Locator;
    private readonly saveButton: Locator;
    private readonly textboxNth4: Locator;
    private readonly cityField: Locator;
    private readonly textboxNth5: Locator;
    private readonly stateField: Locator;
    private readonly descriptionTextarea: Locator;
    private readonly section6SearchField: Locator;
    private readonly threeSearchField: Locator;
    private readonly fourSearchField: Locator;
    private readonly postCodeField: Locator;
    private readonly emailAddressField: Locator;
    private readonly positionField: Locator;

    /**
     * Creates an instance of ContactsPage.
     * @param page Playwright Page instance provided by the test/fixture.
     */
    constructor(page: Page) {
        super(page);

        // Locators (provided by planner output; do not modify selectors)
        this.contactsNavLink = this.page.getByRole('link', { name: '\uf0c0 Contacts' });
        this.createContactLink = this.page.getByRole('link', { name: 'Create' });
        this.firstNameField = this.page.locator('input[name="first_name"]');
        this.middleNameField = this.page.locator('input[name="middle_name"]');
        this.lastNameField = this.page.locator('input[name="last_name"]');
        this.streetAddressField = this.page.getByRole('textbox', { name: 'Street Address' });
        this.phoneNumberField = this.page.getByRole('textbox', { name: 'Number' });
        this.companyCombobox = this.page.getByRole('combobox').first();
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.textboxNth4 = this.page.getByRole('textbox').nth(4);
        this.cityField = this.page.getByRole('textbox', { name: 'City' });
        this.textboxNth5 = this.page.getByRole('textbox').nth(5);
        this.stateField = this.page.getByRole('textbox', { name: 'State / County' });
        this.descriptionTextarea = this.page.locator('textarea[name="description"]');
        this.section6SearchField = this.page.locator('div:nth-child(6) > div:nth-child(2) > .ui.field > .ui > .search');
        this.threeSearchField = this.page.locator('.three > .ui > .search');
        this.fourSearchField = this.page.locator('.four > div > .ui > .search');
        this.postCodeField = this.page.getByRole('textbox', { name: 'Post Code' });
        this.emailAddressField = this.page.getByRole('textbox', { name: 'Email address' });
        this.positionField = this.page.locator('input[name="position"]');
    }

    /**
     * Navigate to Contacts module via Contacts link.
     */
    async openContacts(): Promise<void> {
        this.logStep('Open Contacts module');
        await ActionUtils.click(this.contactsNavLink, { page: this.page });
    }

    /**
     * Click Create to open new contact form.
     */
    async clickCreateContact(): Promise<void> {
        this.logStep('Click Create contact');
        await ActionUtils.click(this.createContactLink, { page: this.page });
    }

    /**
     * Fill Name (first_name) with maximum allowed characters string.
     * @param firstNameMax Optional override for max-length first name string.
     */
    async fillFirstNameMax(firstNameMax?: string): Promise<void> {
        const value =
            firstNameMax ??
            'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
        this.logStep('Fill First Name (max length)');
        await ActionUtils.fill(this.firstNameField, value, { page: this.page });
    }

    /**
     * Fill Street Address textbox.
     * Note: recorded data may not match field semantics.
     * @param streetAddress Optional street address value.
     */
    async fillStreetAddress(streetAddress?: string): Promise<void> {
        const value = streetAddress ?? 'testuser@example.com';
        this.logStep('Fill Street Address');
        await ActionUtils.fill(this.streetAddressField, value, { page: this.page });
    }

    /**
     * Fill Number field.
     * @param phoneNumber Optional phone number value.
     */
    async fillPhoneNumber(phoneNumber?: string): Promise<void> {
        const value = phoneNumber ?? '310';
        this.logStep('Fill Phone Number');
        await ActionUtils.fill(this.phoneNumberField, value, { page: this.page });
    }

    /**
     * Click Company combobox (first combobox on page).
     */
    async clickCompanyCombobox(): Promise<void> {
        this.logStep('Click Company combobox');
        await ActionUtils.click(this.companyCombobox, { page: this.page });
    }

    /**
     * Fill last_name field.
     * @param lastName Optional last name value.
     */
    async fillLastName(lastName?: string): Promise<void> {
        const value = lastName ?? 'Manager';
        this.logStep('Fill Last Name');
        await ActionUtils.fill(this.lastNameField, value, { page: this.page });
    }

    /**
     * Click Save button to submit the contact form.
     * Note: does not assert success message/toast (selectors not provided).
     */
    async clickSave(): Promise<void> {
        this.logStep('Click Save contact');
        await ActionUtils.click(this.saveButton, { page: this.page });
        // Minimal post-save stabilization without inventing selectors.
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Fill middle_name field.
     * @param middleName Optional middle name value.
     */
    async fillMiddleName(middleName?: string): Promise<void> {
        const value =
            middleName ??
            'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
        this.logStep('Fill Middle Name');
        await ActionUtils.fill(this.middleNameField, value, { page: this.page });
    }

    /**
     * Fill the 5th textbox (nth(4)).
     * @param value Optional value to fill.
     */
    async fillTextboxNth4(value?: string): Promise<void> {
        const fillValue =
            value ??
            'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
        this.logStep('Fill textbox nth(4)');
        await ActionUtils.fill(this.textboxNth4, fillValue, { page: this.page });
    }

    /**
     * Fill City field.
     * @param city Optional city value.
     */
    async fillCity(city?: string): Promise<void> {
        const value = city ?? 'testuser@example.com';
        this.logStep('Fill City');
        await ActionUtils.fill(this.cityField, value, { page: this.page });
    }

    /**
     * Fill the 6th textbox (nth(5)).
     * @param value Optional value to fill.
     */
    async fillTextboxNth5(value?: string): Promise<void> {
        const fillValue = value ?? 'Sales Executive';
        this.logStep('Fill textbox nth(5)');
        await ActionUtils.fill(this.textboxNth5, fillValue, { page: this.page });
    }

    /**
     * Fill State / County field.
     * @param state Optional state/county value.
     */
    async fillState(state?: string): Promise<void> {
        const value = state ?? 'testuser@example.com';
        this.logStep('Fill State / County');
        await ActionUtils.fill(this.stateField, value, { page: this.page });
    }

    /**
     * Fill Description textarea.
     * @param description Optional description value.
     */
    async fillDescription(description?: string): Promise<void> {
        const value = description ?? 'Sales Executive';
        this.logStep('Fill Description');
        await ActionUtils.fill(this.descriptionTextarea, value, { page: this.page });
    }

    /**
     * Fill search input inside a specific form section.
     * @param value Optional value to fill.
     */
    async fillSection6Search(value?: string): Promise<void> {
        const fillValue = value ?? 'Sales Executive';
        this.logStep('Fill section 6 search');
        await ActionUtils.fill(this.section6SearchField, fillValue, { page: this.page });
    }

    /**
     * Fill '.three > .ui > .search' field.
     * @param value Optional value to fill.
     */
    async fillThreeSearch(value?: string): Promise<void> {
        const fillValue = value ?? 'Sales Manager';
        this.logStep('Fill three-column search');
        await ActionUtils.fill(this.threeSearchField, fillValue, { page: this.page });
    }

    /**
     * Fill Street Address field again.
     * @param streetAddress Optional street address value.
     */
    async fillStreetAddressRepeat(streetAddress?: string): Promise<void> {
        const value = streetAddress ?? '310';
        this.logStep('Fill Street Address (repeat)');
        await ActionUtils.fill(this.streetAddressField, value, { page: this.page });
    }

    /**
     * Fill '.four > div > .ui > .search' field.
     * @param value Optional value to fill.
     */
    async fillFourSearch(value?: string): Promise<void> {
        const fillValue = value ?? 'Sales Manager';
        this.logStep('Fill four-column search');
        await ActionUtils.fill(this.fourSearchField, fillValue, { page: this.page });
    }

    /**
     * Fill Post Code field.
     * @param postCode Optional post code value.
     */
    async fillPostCode(postCode?: string): Promise<void> {
        const value = postCode ?? 'testuser@example.com';
        this.logStep('Fill Post Code');
        await ActionUtils.fill(this.postCodeField, value, { page: this.page });
    }

    /**
     * Fill Email address field.
     * @param email Optional email address value.
     */
    async fillContactEmail(email?: string): Promise<void> {
        const value = email ?? 'testuser@example.com';
        this.logStep('Fill Contact Email');
        await ActionUtils.fill(this.emailAddressField, value, { page: this.page });
    }

    /**
     * Fill Position field.
     * @param position Optional position value.
     */
    async fillPosition(position?: string): Promise<void> {
        const value = position ?? 'Sales Manager';
        this.logStep('Fill Position');
        await ActionUtils.fill(this.positionField, value, { page: this.page });
    }

    /**
     * Composite helper to create a contact using the recorded max-name scenario.
     * All fields are optional to avoid breaking changes when the form evolves.
     */
    async createContactWithMaxName(data?: {
        firstNameMax?: string;
        streetAddress?: string;
        phoneNumber?: string;
        lastName?: string;
        middleName?: string;
        textboxNth4?: string;
        city?: string;
        textboxNth5?: string;
        state?: string;
        description?: string;
        section6Search?: string;
        threeSearch?: string;
        streetAddressRepeat?: string;
        fourSearch?: string;
        postCode?: string;
        email?: string;
        position?: string;
    }): Promise<void> {
        this.logStep('Create contact (max-name scenario)');

        await this.openContacts();
        await this.clickCreateContact();

        await this.fillFirstNameMax(data?.firstNameMax);
        await this.fillStreetAddress(data?.streetAddress);
        await this.fillPhoneNumber(data?.phoneNumber);
        await this.clickCompanyCombobox();
        await this.fillLastName(data?.lastName);
        await this.clickSave();

        // Additional fields captured in the recording (kept in order for traceability)
        await this.fillMiddleName(data?.middleName);
        await this.fillTextboxNth4(data?.textboxNth4);
        await this.fillCity(data?.city);
        await this.fillTextboxNth5(data?.textboxNth5);
        await this.fillState(data?.state);
        await this.fillDescription(data?.description);
        await this.fillSection6Search(data?.section6Search);
        await this.fillThreeSearch(data?.threeSearch);
        await this.fillStreetAddressRepeat(data?.streetAddressRepeat);
        await this.fillFourSearch(data?.fourSearch);
        await this.fillPostCode(data?.postCode);
        await this.fillContactEmail(data?.email);
        await this.fillPosition(data?.position);
    }
}
