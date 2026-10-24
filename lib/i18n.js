import { createContext, useContext, useEffect, useState, useCallback } from 'react'

/**
 * 三语切换：English / 中文 / Bahasa Melayu
 *
 * 用法：
 *   const { t, lang, setLang } = useLang()
 *   t({ en: 'Hello', zh: '你好', ms: 'Hai' })
 *
 * 没有翻译的语言会自动退回英文。
 * 选择的语言保存在访客浏览器里，下次打开自动沿用。
 */

export const LANGS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'zh', label: '中文', name: '中文' },
  { code: 'ms', label: 'BM', name: 'Bahasa Melayu' },
]

const STORAGE_KEY = 'aurelion-lang'

const LangContext = createContext({ lang: 'en', setLang: () => {} })

export function pick(value, lang) {
  if (value == null) return ''
  if (typeof value === 'string' || typeof value === 'number') return value
  return value[lang] ?? value.en ?? ''
}

export function LanguageProvider({ children }) {
  // 静态导出时先用英文渲染，进入浏览器后再切换成访客的语言
  const [lang, setLangState] = useState('en')

  useEffect(() => {
    let initial = null
    try { initial = localStorage.getItem(STORAGE_KEY) } catch (e) {}
    if (!LANGS.some(l => l.code === initial)) {
      const nav = (typeof navigator !== 'undefined' && navigator.language || '').toLowerCase()
      initial = nav.startsWith('zh') ? 'zh' : nav.startsWith('ms') ? 'ms' : 'en'
    }
    setLangState(initial)
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : lang
    }
  }, [lang])

  const setLang = useCallback((code) => {
    setLangState(code)
    try { localStorage.setItem(STORAGE_KEY, code) } catch (e) {}
  }, [])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  const { lang, setLang } = useContext(LangContext)
  const t = useCallback((value) => pick(value, lang), [lang])
  return { lang, setLang, t }
}
