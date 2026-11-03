import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('category URLs restore state, back navigation works, and empty state recovers', async ({
  page,
}) => {
  await page.goto('projects/');
  await expect(page.locator('.project-card:visible')).toHaveCount(4);
  await page.getByRole('link', { name: 'Hospitality', exact: true }).click();
  await expect(page).toHaveURL(/category=hospitality/);
  await expect(page.locator('.project-card:visible')).toHaveCount(1);
  await expect(
    page.getByRole('heading', { name: 'The Listening Room' }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator('.project-card:visible')).toHaveCount(1);
  await page.getByRole('link', { name: 'All', exact: true }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(4);
  await page.goBack();
  await expect(page.locator('.project-card:visible')).toHaveCount(1);
  await page.goto('projects/?category=unknown');
  await expect(
    page.getByRole('heading', { name: 'No spaces in this collection.' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'View all projects' }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(4);
});

test('prerendered study gallery wraps with keyboard, traps focus and restores opener', async ({
  page,
}) => {
  await page.goto('projects/courtyard-house/');
  const opener = page.getByRole('link', {
    name: 'Enlarge image 1:',
    exact: false,
  });
  await opener.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('[data-count]')).toHaveText('1 / 3');
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.locator('[data-count]')).toHaveText('3 / 3');
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('[data-count]')).toHaveText('1 / 3');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(
    dialog.getByRole('button', { name: 'Close image gallery' }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await page
    .getByRole('heading', { name: 'Tidal Pavilion' })
    .getByRole('link')
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Tidal Pavilion',
  );
});

test('contact rejects invalid values and produces a local-only preview without requests', async ({
  page,
}) => {
  await page.goto('contact/');
  await page.getByRole('button', { name: 'Preview enquiry' }).click();
  await expect(page.getByLabel('Your name')).toBeFocused();
  await expect(page.getByRole('alert')).toHaveText(
    'Please check the highlighted fields.',
  );
  await page.getByLabel('Your name').fill('Alex Morgan');
  await page.getByLabel('Email address').fill('alex@example.com');
  await page.getByLabel('What kind of space?').selectOption('Residential');
  await page
    .getByLabel('A little about your idea')
    .fill('A warm reading room overlooking a quiet garden.');
  const requests: string[] = [];
  page.on('request', (r) => {
    if (r.method() !== 'GET') requests.push(r.url());
  });
  await page.getByRole('button', { name: 'Preview enquiry' }).click();
  await expect(
    page.getByRole('heading', { name: 'Your idea has room to grow.' }),
  ).toBeVisible();
  await expect(page.locator('#contact-success')).toBeFocused();
  await expect(
    page.getByText('Nothing was sent or stored, and no one will contact you.', {
      exact: false,
    }),
  ).toBeVisible();
  expect(requests).toEqual([]);
  await page.getByRole('button', { name: 'Try another enquiry' }).click();
  await expect(page.getByLabel('Your name')).toHaveValue('');
  await expect(page.getByLabel('Your name')).toBeFocused();
});

test('mobile menu supports keyboard opening, navigation and Escape', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('');
  const menu = page.getByRole('button', { name: 'Menu' });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('navigation', { name: 'Mobile navigation' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Studio' })
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Less noise.More feeling.',
  );
});

test('every route loads without broken assets, reflows and passes an axe scan', async ({
  page,
}) => {
  const paths = [
    '',
    'projects/',
    'projects/courtyard-house/',
    'projects/listening-room/',
    'projects/clay-atelier/',
    'projects/tidal-pavilion/',
    'studio/',
    'contact/',
    '404.html',
  ];
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  for (const path of paths) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 960 });
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(
        dimensions.scrollWidth,
        `${path || 'home'} at ${width}px`,
      ).toBeLessThanOrEqual(dimensions.clientWidth);
    }
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test('static navigation, all studies and image links remain useful without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(
    new URL(
      'projects/',
      test.info().project.use.baseURL ?? 'http://127.0.0.1:4184/forma-astro/',
    ).href,
  );
  await expect(page.locator('.project-card')).toHaveCount(4);
  await page
    .getByRole('heading', { name: 'Clay Atelier' })
    .getByRole('link')
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Clay Atelier',
  );
  await expect(
    page.getByRole('link', { name: 'Enlarge image 1:', exact: false }),
  ).toHaveAttribute('href', /clay-atelier-1600.webp/);
  await page.goto(
    new URL(
      'contact/',
      test.info().project.use.baseURL ?? 'http://127.0.0.1:4184/forma-astro/',
    ).href,
  );
  await expect(
    page.getByRole('button', { name: 'Preview enquiry' }),
  ).toBeDisabled();
  await context.close();
});

test('approved editorial layout keeps its desktop and mobile hierarchy', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto('');
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() =>
      [...document.fonts]
        .filter((font) => font.status === 'loaded')
        .map((font) => font.family),
    ),
  ).toEqual(expect.arrayContaining(['Archivo', 'IBM Plex Sans']));
  const heading = page.getByRole('heading', { level: 1 });
  const hero = page.locator('.featured-image');
  const desktopHeading = await heading.boundingBox();
  const desktopHero = await hero.boundingBox();
  expect(desktopHeading).not.toBeNull();
  expect(desktopHero).not.toBeNull();
  expect(desktopHeading!.height).toBeLessThan(130);
  expect(desktopHero!.x).toBeCloseTo(60, 0);
  expect(desktopHero!.width).toBeCloseTo(1320, 0);
  expect(desktopHero!.y).toBeGreaterThan(
    desktopHeading!.y + desktopHeading!.height,
  );
  await page.setViewportSize({ width: 390, height: 844 });
  const mobileHeading = await heading.boundingBox();
  const mobileHero = await hero.boundingBox();
  expect(mobileHeading).not.toBeNull();
  expect(mobileHero).not.toBeNull();
  expect(mobileHeading!.height).toBeGreaterThan(100);
  expect(mobileHero!.x).toBe(0);
  expect(mobileHero!.width).toBe(390);
  expect(mobileHero!.height).toBeGreaterThan(340);
  await expect(
    page.locator('.featured-caption').getByRole('heading'),
  ).toBeVisible();
});

test('maximum-length contact details reflow in the local preview on narrow screens', async ({
  page,
}) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 960 });
    await page.goto('contact/');
    await page.evaluate(() => document.fonts.ready);
    await page.getByLabel('Your name').fill('Alexandria'.repeat(10));
    await page
      .getByLabel('Email address')
      .fill(`${'a'.repeat(60)}@example.com`);
    await page.getByLabel('What kind of space?').selectOption('Residential');
    await page
      .getByLabel('A little about your idea')
      .fill(
        'A calm room with plenty of natural light. '.repeat(60).slice(0, 2000),
      );
    await page.getByRole('button', { name: 'Preview enquiry' }).click();
    await expect(
      page.getByRole('heading', { name: 'Your idea has room to grow.' }),
    ).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(
      dimensions.scrollWidth,
      `long enquiry preview at ${width}px`,
    ).toBeLessThanOrEqual(dimensions.clientWidth);
    const reset = page.getByRole('button', { name: 'Try another enquiry' });
    await reset.scrollIntoViewIfNeeded();
    await expect(reset).toBeInViewport();
    await reset.click();
    await expect(page.getByLabel('Your name')).toHaveValue('');
  }
});
