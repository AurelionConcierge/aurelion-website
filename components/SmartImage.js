import { useState } from 'react'

/**
 * 带后备效果的图片：图片加载失败时显示金色渐变背景，而不是破图标。
 */
export default function SmartImage({ src, alt = '', className = '', imgClassName = '', eager = false }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#1a2b45] via-[#0F1D32] to-[#2a2416] ${className}`}>
      {!failed && src && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  )
}
