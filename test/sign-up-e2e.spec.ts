import { expect, test } from '@playwright/test'

test('sign up sucessfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.locator('input[name="restaurantName"]').fill('Pizza Shop')
  await page.locator('input[name="managerName"]').fill('John Doe')
  await page.locator('input[name="email"]').fill('johndoe@example.com')
  await page.locator('input[name="phone"]').fill('999999999')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso!')

  expect(toast).toBeVisible()
})

test('sign up with wrong credentials', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.locator('input[name="restaurantName"]').fill('Teste')
  await page.locator('input[name="managerName"]').fill('John Doe')
  await page.locator('input[name="email"]').fill('johndoe@example.com')
  await page.locator('input[name="phone"]').fill('999999999')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  expect(toast).toBeVisible()
})

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})
