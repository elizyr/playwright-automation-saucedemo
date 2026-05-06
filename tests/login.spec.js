const { test, expect } = require('@playwright/test');

test('login válido', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('login inválido', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'usuario_errado');
  await page.fill('#password', 'senha_errada');
  await page.click('#login-button');
  await expect(page.locator('.error-message-container')).toBeVisible();
});

test('adicionar produto ao carrinho', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  const carrinho = await page.locator('.shopping_cart_badge').textContent();
  await expect(carrinho).toBe('1');
});