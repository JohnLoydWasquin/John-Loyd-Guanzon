import { readFile, writeFile } from 'node:fs/promises'

const siteUrl = (process.env.URL || process.env.SITE_URL)?.replace(/\/+$/, '')
if (!siteUrl) {
  console.warn('SITE_URL and URL are not set; sitemap and absolute SEO URLs were skipped.')
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
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'John Loyd W. Guanzon',
      url: `${siteUrl}/`,
      image: socialImage,
      jobTitle: 'Aspiring Full-Stack Developer',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lipa City',
        addressRegion: 'Batangas',
        addressCountry: 'PH',
      },
    },
    {
      '@type': 'WebSite',
      name: 'John Loyd Guanzon | Full-Stack Developer Portfolio',
      url: `${siteUrl}/`,
      inLanguage: 'en-PH',
    },
  ],
}
const absoluteSeo = `<link rel="canonical" href="${siteUrl}/">\n    <meta property="og:url" content="${siteUrl}/">\n    <meta property="og:image" content="${socialImage}">\n    <meta property="og:image:alt" content="John Loyd Guanzon — Full-Stack Developer">\n    <meta name="twitter:image" content="${socialImage}">\n    <script type="application/ld+json">${JSON.stringify(structuredData)}</script>`
await writeFile('dist/index.html', html.replace('</head>', `${absoluteSeo}\n  </head>`), 'utf8')
