/**
 * 网站所有图片集中在这里管理。
 *
 * 目前使用 Pexels 的免费商用图库照片（https://www.pexels.com/license/）。
 * 以后要换成你们自己的真实照片：
 *   1. 把照片放进项目的 public/images/ 文件夹，例如 public/images/hero.jpg
 *   2. 把下面对应的网址改成 '/images/hero.jpg'
 * 页面会自动使用新照片，不需要改其他代码。
 *
 * 注意：图库照片里的人不是你们的员工或客户，
 * 不要在旁边写「我们的护理员」之类的说明。
 */

const pexels = (id, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

export const IMAGES = {
  // 首页大图：护理员握着长者的手（居家）
  hero: pexels(29372724, 1920),
  // 首页「如何开始」旁边的配图：护理员在家中协助长者
  howItWorks: pexels(29372722, 1200),
  // 优惠弹窗：护理员在家中扶着使用拐杖的长者
  promo: pexels(29372730, 1000),

  services: {
    stayIn24: pexels(29372693, 800),        // 长者在家接受专人照护
    postHospital: pexels(7551681, 800),     // 在明亮卧室里照顾卧床长者
    dementia: pexels(7545426, 800),         // 长者翻看旧照片（记忆主题）
    stroke: pexels(7551611, 800),           // 护理员在家协助长者做运动
    bedridden: pexels(8088598, 800),        // 床边陪伴卧床长者
    companion: pexels(29372713, 800),       // 护理员与长者喝咖啡聊天
    dayNight: pexels(18429571, 800),        // 护理员在床边为长者准备热饮
    hourly: pexels(7345443, 800),           // 护理员帮长者送来日用品
    medication: pexels(7446778, 800),       // 协助坐轮椅的长者服药
    physio: pexels(20860588, 800),          // 物理治疗师协助腿部运动
    escort: pexels(6129107, 800),           // 护士推着轮椅上的病人
    hospital: pexels(34328480, 800),        // 护士在医院走廊扶着用助行器的长者
  },
}
