/* Lecture des pages générées par le build (dist/) pour les tests SEO. */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { parse, type HTMLElement } from 'node-html-parser'
import site from '../../site.config.json'

export const DIST = join(__dirname, '../../dist')
export { site }

export type Page = { path: string; file: string; root: HTMLElement; html: string }

function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? htmlFiles(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : [],
  )
}

const toPath = (file: string) => {
  const rel = relative(DIST, file).split(sep).join('/').replace(/\.html$/, '')
  return rel === 'index' ? '/' : `/${rel}`
}

export function loadPages(): Page[] {
  if (!existsSync(DIST)) throw new Error('dist/ introuvable : lancez « npm run build » avant les tests SEO.')
  return htmlFiles(DIST).map(file => {
    const html = readFileSync(file, 'utf8')
    return { path: toPath(file), file, html, root: parse(html) }
  })
}

export const meta = (page: Page, key: string) =>
  page.root.querySelector(`meta[name="${key}"], meta[property="${key}"]`)?.getAttribute('content') ?? null

export const text = (el: HTMLElement | null | undefined) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim()
