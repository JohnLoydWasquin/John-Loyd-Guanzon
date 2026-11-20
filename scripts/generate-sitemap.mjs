import { readFile, writeFile } from 'node:fs/promises'

const siteUrl = process.env.SITE_URL?.replace(/\/$/, '')
if (!siteUrl) {
  console.warn('SITE_URL is not set; sitemap generation skipped. Set SITE_URL to the deployed portfolio URL before building for production.')
  process.exit(0)
}

let parsed
try { parsed = new URL(siteUrl) } catch { throw new Error('SITE_URL must be a valid absolute URL.') }
if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error('SITE_URL must use http or https.')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}/</loc></url></urlset>\n`
await writeFile('dist/sitemap.xml', sitemap, 'utf8')
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8')
const html = await readFile('dist/index.html', 'utf8')
const socialImage = `${siteUrl}/images/john-loyd-portrait.png`
const canonical = `<link rel="canonical" href="${siteUrl}/">\n    <meta property="og:url" content="${siteUrl}/">\n    <meta property="og:image" content="${socialImage}">`
await writeFile('dist/index.html', html.replace('</head>', `${canonical}\n  </head>`), 'utf8')
