import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import WhatsAppButton from '../components/WhatsAppButton'
import { LanguageProvider } from '../lib/i18n'

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
      <ChatWidget />
      <WhatsAppButton />
    </LanguageProvider>
  )
}

export default MyApp
