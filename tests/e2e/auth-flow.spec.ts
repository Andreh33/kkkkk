import { expect, test } from "@playwright/test";

test.describe("Auth flow", () => {
  test("login form rejects empty submission", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: /iniciar sesión/i }).click();
    // HTML5 / zod validation surfaces errors — at minimum the form does not navigate away
    await expect(page).toHaveURL(/\/login/);
  });

  test("registro form is reachable from login", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: /regístrate/i }).click();
    await expect(page).toHaveURL(/\/registro/);
    await expect(page.getByRole("heading", { name: /crear cuenta/i })).toBeVisible();
  });

  test("forgot-password page is reachable", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: /olvidaste/i }).click();
    await expect(page).toHaveURL(/\/recuperar-password/);
  });
});
