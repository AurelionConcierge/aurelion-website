import { Html, Head, Main, NextScript } from 'next/document'

/**
 * 全站共用的 <head> 内容：网站图标（Google 搜索结果左边的小图标、浏览器标签图标）
 * 以及告诉 Google 品牌标志和名称的结构化数据。
 */
const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Aurelion Concierge Care',
  url: 'https://aurelionconcierge.com',
  logo: 'https://aurelionconcierge.com/icon-512.png',
  email: 'care@aurelionconcierge.com',
  telephone: '+60185959688',
  areaServed: ['Peninsular Malaysia', 'Singapore'],
}

const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Aurelion Concierge Care',
  url: 'https://aurelionconcierge.com',
}

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* 网站图标：Google 要求是 48 像素倍数的正方形 */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0A1628" />
        <meta property="og:site_name" content="Aurelion Concierge Care" />

        {/* 结构化数据：让 Google 认得品牌名称和标志 */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE) }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
