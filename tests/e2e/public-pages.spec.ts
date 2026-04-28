import { expect, test } from "@playwright/test";

test.describe("Public navigation", () => {
  test("home renders hero, sections and footer", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.getByText(/35 años/i).first()).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("services hub lists 4 categories", async ({ page }) => {
    await page.goto("/servicios");
    await expect(page.getByRole("heading", { name: /Servicios/i }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Masajes" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Medicina Estética" })).toBeVisible();
  });

  test("massage page shows individual treatments with prices", async ({ page }) => {
    await page.goto("/servicios/masajes");
    await expect(page.getByRole("heading", { name: "Aroma Masaje" })).toBeVisible();
    await expect(page.getByText(/60,00 €/).first()).toBeVisible();
  });

  test("blog index lists published posts and post detail renders", async ({ page }) => {
    await page.goto("/blog");
    const firstLink = page.locator('a[href^="/blog/"]').first();
    await expect(firstLink).toBeVisible();
    await firstLink.click();
    await expect(page.locator("article h1").first()).toBeVisible();
  });

  test("login page has back-to-home link", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("link", { name: /volver a la web/i })).toBeVisible();
  });

  test("admin redirects to login when not authenticated", async ({ page }) => {
    const response = await page.goto("/admin");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveURL(/\/login/);
  });
});
