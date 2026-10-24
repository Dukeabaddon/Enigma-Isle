import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

function saveScreenshot(sourcePath: string, destName: string) {
  const targetDir = path.resolve('shots/e2e-archive');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.copyFileSync(sourcePath, path.join(targetDir, destName));
}

test.describe('Enigma Isle E2E and Visual Verification', () => {
  test('Desktop cipher flow and screenshot captures', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'chromium') return;

    await page.goto('/');

    // 1. Hero white fade screenshot
    await expect(page.locator('h1')).toHaveText('ENIGMA ISLE');
    await expect(page.locator('#message-input')).toBeEmpty();
    
    const shot1 = 'shots/01-hero-white-fade.png';
    await page.screenshot({ path: shot1, fullPage: false });
    saveScreenshot(shot1, '01-hero-white-fade.png');

    // 2. Encrypt interaction and dirt expand
    await page.fill('#message-input', 'DISCOVERY VOYAGE');
    await page.click('button[aria-label="Encrypt"]');

    // Wait for expand
    await expect(page.locator('text=Ciphertext Result')).toBeVisible();
    await page.waitForTimeout(600); // allow expand animation to complete

    const shot2 = 'shots/02-hero-encrypt-expand.png';
    await page.screenshot({ path: shot2 });
    saveScreenshot(shot2, '02-hero-encrypt-expand.png');

    // Get the ciphertext
    const ciphertext = await page.getByTestId('cipher-output').innerText();
    expect(ciphertext.length).toBeGreaterThan(0);

    // 3. Decrypt interaction and scroll skin
    // ⇅ toggle switches mode (no hover dropdown)
    await page.locator('#workbench').scrollIntoViewIfNeeded();
    await page.click('button[data-testid="cipher-toggle"]');
    await expect(page.locator('button[aria-label="Decrypt"]')).toBeVisible();
    await page.fill('#message-input', ciphertext);
    await page.click('button[aria-label="Decrypt"]');

    await expect(page.locator('text=Decrypted Plaintext')).toBeVisible();
    await expect(page.getByTestId('cipher-output')).toHaveText('DISCOVERY VOYAGE');
    await page.waitForTimeout(600);

    const shot3 = 'shots/03-hero-decrypt.png';
    await page.screenshot({ path: shot3 });
    saveScreenshot(shot3, '03-hero-decrypt.png');

    // 4. Parchment ABCD Table
    const tableSection = page.locator('#table');
    await tableSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const shot4 = 'shots/04-about-abcd.png';
    await tableSection.screenshot({ path: shot4 });
    saveScreenshot(shot4, '04-about-abcd.png');

    // 5. Encrypt cards (S3)
    const encryptSection = page.locator('#encrypt-journey');
    await encryptSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const shot5 = 'shots/05-encrypt-cards.png';
    await encryptSection.screenshot({ path: shot5 });
    saveScreenshot(shot5, '05-encrypt-cards.png');

    // 6. Decrypt cards (S4)
    const decryptSection = page.locator('#decrypt-journey');
    await decryptSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const shot6 = 'shots/06-decrypt-cards.png';
    await decryptSection.screenshot({ path: shot6 });
    saveScreenshot(shot6, '06-decrypt-cards.png');

    // 7. 50dvh Island-themed Footer
    const footerSection = page.locator('footer');
    await footerSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const shot8 = 'shots/08-island-footer.png';
    await footerSection.screenshot({ path: shot8 });
    saveScreenshot(shot8, '08-island-footer.png');
  });

  test('Mixed letters and digits round-trip', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'chromium') return;

    await page.goto('/');
    const plain = 'ROOM 42';
    await page.fill('#message-input', plain);
    await page.click('button[aria-label="Encrypt"]');
    await expect(page.getByTestId('cipher-output')).toBeVisible();
    const cipher = await page.getByTestId('cipher-output').innerText();

    await page.click('button[data-testid="cipher-toggle"]');
    await page.fill('#message-input', cipher);
    await page.click('button[aria-label="Decrypt"]');
    await expect(page.getByTestId('cipher-output')).toHaveText('ROOM 42');
  });

  test('Mobile hero viewport (390px)', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile') return;

    await page.goto('/');
    await expect(page.locator('h1')).toHaveText('ENIGMA ISLE');

    // Verify touch targets and no horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(windowWidth);

    const shot7 = 'shots/07-mobile-hero.png';
    await page.screenshot({ path: shot7, fullPage: false });
    saveScreenshot(shot7, '07-mobile-hero.png');
  });
});
