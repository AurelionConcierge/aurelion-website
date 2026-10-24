import { useState } from 'react'

/**
 * 带后备效果的图片：图片加载失败时显示金色渐变背景，而不是破图标。
 *
 * contain = true 时：完整显示整张照片（不裁切），
 * 照片比框扁或窄的部分，用同一张照片的虚化版本补满，看起来自然。
 */
export default function SmartImage({ src, alt = '', className = '', imgClassName = '', eager = false, contain = false }) {
  const [failed, setFailed] = useState(false)
  const show = !failed && src

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#1a2b45] via-[#0F1D32] to-[#2a2416] ${className}`}>
      {show && contain && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-70"
        />
      )}
      {show && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 w-full h-full ${contain ? 'object-contain' : 'object-cover'} ${imgClassName}`}
        />
      )}
    </div>
  )
}
