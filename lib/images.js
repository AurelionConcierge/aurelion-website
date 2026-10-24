/**
 * 网站所有图片集中在这里管理。
 * 图片文件放在 public/images/ 文件夹里。
 *
 * 要换照片：用同样的文件名覆盖 public/images/ 里的文件即可，
 * 或者把新照片放进去，再改下面对应的路径。
 */

export const IMAGES = {
  // 首页大图：护理员握着长者的手
  hero: '/images/hero.jpg',
  // 首页「如何开始」旁边的配图（选一张首页服务卡片没用到的，避免重复）
  howItWorks: '/images/hourly.jpg',
  // 优惠弹窗：24小时住家看护（床边照护）
  promo: '/images/bedridden.jpg',

  services: {
    stayIn24: '/images/hero.jpg',
    postHospital: '/images/post-hospital.jpg',
    dementia: '/images/dementia.jpg',
    stroke: '/images/stroke.jpg',
    bedridden: '/images/bedridden.jpg',
    companion: '/images/companion.jpg',
    // 如果某项服务设为 null，会在照片位置显示金色图标。
    // 换照片：把新图放进 public/images/，再把路径写在这里。
    dayNight: '/images/day-night.jpg',
    hourly: '/images/hourly.jpg',
    medication: '/images/medication.jpg',
    physio: '/images/physio.jpg',
    escort: '/images/escort.jpg',
    hospital: '/images/hospital.jpg',
  },
}

// 分享到 WhatsApp / Facebook 时显示的预览图（必须是完整网址）
export const OG_IMAGE = 'https://aurelionconcierge.com/images/hero.jpg'
