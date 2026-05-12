import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import WhatsAppButton from '../components/WhatsAppButton'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ChatWidget />
      <WhatsAppButton />
    </>
  )
}

export default MyApp
