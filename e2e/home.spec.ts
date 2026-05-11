import { test, expect } from '@playwright/test';

test('Home page has correct title and elements', async ({ page }) => {
  await page.goto('/');

  // Check title
  await expect(page).toHaveTitle(/ShopHaoHung/i);

  // Check main heading
  const heading = page.locator('h1').first();
  await expect(heading).toBeVisible();

  // Check if there is a Shop Now link
  const shopLink = page.getByRole('link', { name: /mua sắm ngay/i }).first();
  if (await shopLink.isVisible()) {
    await shopLink.click();
    await expect(page).toHaveURL(/.*\/shop/);
  }
});

test('Navigation works correctly', async ({ page }) => {
  await page.goto('/');
  
  // Go to shop
  await page.getByRole('link', { name: 'Cửa hàng' }).first().click();
  await expect(page).toHaveURL(/.*\/shop/);
});
