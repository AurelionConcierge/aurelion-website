import { IMAGES } from './images'

/**
 * 服务内容（三语）
 * short：首页卡片用的短描述；desc：服务页用的完整描述
 * 首页显示前 9 项，服务页显示全部 12 项。
 */
export const SERVICES = [
  {
    key: 'stayIn24',
    image: IMAGES.services.stayIn24,
    name: { en: '24-Hour Stay-In Care', zh: '24小时住家看护', ms: 'Penjagaan Tinggal Bersama 24 Jam' },
    short: {
      en: 'Round-the-clock professional care and companionship for complete peace of mind.',
      zh: '全天候专业照护与陪伴，让您完全放心。',
      ms: 'Penjagaan profesional dan teman sepanjang masa untuk ketenangan fikiran sepenuhnya.',
    },
    desc: {
      en: 'Continuous professional care and companionship around the clock. Perfect for elderly parents, bedridden patients, or anyone needing full-time supervision. Our caregivers live in and become part of the family routine.',
      zh: '全天候不间断的专业照护与陪伴，适合年迈父母、卧床病人或任何需要全天看护的人。护理员住家服务，自然融入家庭的日常生活。',
      ms: 'Penjagaan profesional dan teman tanpa henti sepanjang masa. Sesuai untuk ibu bapa warga emas, pesakit terlantar, atau sesiapa yang memerlukan pengawasan sepenuh masa. Penjaga kami tinggal bersama dan menjadi sebahagian daripada rutin keluarga.',
    },
  },
  {
    key: 'postHospital',
    image: IMAGES.services.postHospital,
    name: { en: 'Post-Hospital Recovery Care', zh: '出院后康复护理', ms: 'Penjagaan Pemulihan Selepas Hospital' },
    short: {
      en: 'Smooth transition from hospital to home with skilled nursing support.',
      zh: '专业护理支援，让您从医院平稳过渡到家中。',
      ms: 'Peralihan lancar dari hospital ke rumah dengan sokongan kejururawatan mahir.',
    },
    desc: {
      en: 'Smooth, safe transition from hospital to home. Our nurses manage wound care, medication schedules, mobility exercises, and monitor for complications.',
      zh: '从医院到家中，安全平稳地过渡。我们的护士负责伤口护理、用药安排、活动训练，并留意任何并发症。',
      ms: 'Peralihan yang lancar dan selamat dari hospital ke rumah. Jururawat kami menguruskan rawatan luka, jadual ubat, senaman pergerakan dan memantau sebarang komplikasi.',
    },
  },
  {
    key: 'dementia',
    image: IMAGES.services.dementia,
    name: { en: 'Dementia & Alzheimer Care', zh: '失智症与阿尔茨海默症护理', ms: 'Penjagaan Demensia & Alzheimer' },
    short: {
      en: 'Specialized, compassionate care for dementia patients and their families.',
      zh: '为失智症患者及其家人提供专业、贴心的照护。',
      ms: 'Penjagaan khusus dan penuh belas kasihan untuk pesakit demensia dan keluarga mereka.',
    },
    desc: {
      en: 'Specialized, compassionate care for loved ones with memory loss. Caregivers trained in dementia communication techniques, safety protocols, and creating calming daily routines.',
      zh: '为记忆衰退的亲人提供专业而贴心的照护。护理员受过失智症沟通技巧、安全守则及安排平稳日常作息的训练。',
      ms: 'Penjagaan khusus dan penuh kasih untuk insan tersayang yang mengalami hilang ingatan. Penjaga terlatih dalam teknik komunikasi demensia, protokol keselamatan dan mewujudkan rutin harian yang menenangkan.',
    },
  },
  {
    key: 'stroke',
    image: IMAGES.services.stroke,
    name: { en: 'Stroke Rehabilitation', zh: '中风康复护理', ms: 'Pemulihan Strok' },
    short: {
      en: 'Dedicated post-stroke recovery focusing on mobility and daily living.',
      zh: '专注于中风后的康复，帮助恢复活动能力与自理生活。',
      ms: 'Pemulihan selepas strok yang memberi tumpuan kepada pergerakan dan kehidupan harian.',
    },
    desc: {
      en: 'Post-stroke recovery program focusing on regaining mobility, speech, and independence. Includes prescribed exercises, medication management, and emotional support.',
      zh: '中风后康复计划，着重恢复活动能力、说话能力与独立生活。包括医嘱运动、用药管理及情绪支持。',
      ms: 'Program pemulihan selepas strok yang memberi tumpuan untuk memulihkan pergerakan, pertuturan dan berdikari. Termasuk senaman yang ditetapkan, pengurusan ubat dan sokongan emosi.',
    },
  },
  {
    key: 'bedridden',
    image: IMAGES.services.bedridden,
    name: { en: 'Bedridden Patient Care', zh: '卧床病人护理', ms: 'Penjagaan Pesakit Terlantar' },
    short: {
      en: 'Full assistance including feeding, hygiene, and pressure sore prevention.',
      zh: '全面协助，包括喂食、个人清洁及预防褥疮。',
      ms: 'Bantuan penuh termasuk pemberian makan, kebersihan diri dan pencegahan kudis tekanan.',
    },
    desc: {
      en: 'Complete assistance for immobile patients. Includes feeding, bathing, diaper changing, pressure sore prevention, and passive range-of-motion exercises.',
      zh: '为行动不便的病人提供全面协助，包括喂食、沐浴、更换尿片、预防褥疮及被动关节活动训练。',
      ms: 'Bantuan lengkap untuk pesakit yang tidak boleh bergerak. Termasuk pemberian makan, mandi, menukar lampin, pencegahan kudis tekanan dan senaman julat pergerakan pasif.',
    },
  },
  {
    key: 'companion',
    image: IMAGES.services.companion,
    name: { en: 'Elderly Companion Care', zh: '长者陪伴护理', ms: 'Penjagaan Teman Warga Emas' },
    short: {
      en: 'Social engagement, medication reminders, and daily activity support.',
      zh: '社交陪伴、提醒服药及日常活动协助。',
      ms: 'Interaksi sosial, peringatan ubat dan sokongan aktiviti harian.',
    },
    desc: {
      en: 'Social engagement and daily living assistance for seniors who prefer not to manage medical care alone. Company, meal preparation, light housekeeping, and medication reminders included.',
      zh: '为不想独自打理生活与健康的长者提供社交陪伴和日常协助，包括陪伴聊天、准备餐食、简单家务及提醒服药。',
      ms: 'Interaksi sosial dan bantuan kehidupan harian untuk warga emas yang tidak mahu menguruskan penjagaan kesihatan seorang diri. Termasuk teman berbual, penyediaan makanan, kerja rumah ringan dan peringatan ubat.',
    },
  },
  {
    key: 'dayNight',
    image: IMAGES.services.dayNight,
    name: { en: '12-Hour Day/Night Care', zh: '12小时日间／夜间护理', ms: 'Penjagaan Siang/Malam 12 Jam' },
    short: {
      en: 'Focused care during daytime or overnight for safety.',
      zh: '在白天或夜间提供专注照护，确保安全。',
      ms: 'Penjagaan khusus pada waktu siang atau malam untuk keselamatan.',
    },
    desc: {
      en: 'Dedicated care during waking hours or overnight supervision. Ideal for families who can manage part of the day but need professional help during specific periods.',
      zh: '在白天提供专人照护，或在夜间看护。适合能自己照顾部分时间、但在特定时段需要专业协助的家庭。',
      ms: 'Penjagaan khusus pada waktu jaga atau pengawasan sepanjang malam. Sesuai untuk keluarga yang boleh menjaga sebahagian hari tetapi memerlukan bantuan profesional pada waktu tertentu.',
    },
  },
  {
    key: 'hourly',
    image: IMAGES.services.hourly,
    name: { en: 'Hourly Flexible Care', zh: '按小时弹性护理', ms: 'Penjagaan Fleksibel Mengikut Jam' },
    short: {
      en: 'As-needed assistance — perfect for occasional support.',
      zh: '按需提供协助，适合偶尔需要帮忙的家庭。',
      ms: 'Bantuan mengikut keperluan — sesuai untuk sokongan sekali-sekala.',
    },
    desc: {
      en: 'As-needed assistance. From a few hours of respite care to accompanying your loved one to medical appointments. No minimum commitment.',
      zh: '按需提供协助，从几个小时的暂托照护，到陪同亲人看医生都可以。没有最低消费要求。',
      ms: 'Bantuan mengikut keperluan. Daripada beberapa jam penjagaan rehat hingga menemani insan tersayang ke temujanji perubatan. Tiada komitmen minimum.',
    },
  },
  {
    key: 'medication',
    image: IMAGES.services.medication,
    name: { en: 'Medication Management', zh: '用药管理', ms: 'Pengurusan Ubat' },
    short: {
      en: 'Timely reminders and professional administration of prescribed medications.',
      zh: '按时提醒并专业协助服用医生处方药物。',
      ms: 'Peringatan tepat pada masanya dan pemberian ubat preskripsi secara profesional.',
    },
    desc: {
      en: 'Professional oversight of complex medication schedules. We ensure the right medicine at the right time, track side effects, and coordinate with your doctor.',
      zh: '专业管理复杂的用药安排，确保在正确时间服用正确药物，留意副作用，并与您的医生保持沟通。',
      ms: 'Pengawasan profesional untuk jadual ubat yang kompleks. Kami memastikan ubat yang betul pada masa yang betul, memantau kesan sampingan dan berhubung dengan doktor anda.',
    },
  },
  {
    key: 'physio',
    image: IMAGES.services.physio,
    name: { en: 'Physiotherapy at Home', zh: '居家物理治疗', ms: 'Fisioterapi di Rumah' },
    short: {
      en: 'Certified physiotherapists for recovery and mobility at home.',
      zh: '合格物理治疗师上门，协助康复与活动能力。',
      ms: 'Ahli fisioterapi bertauliah untuk pemulihan dan pergerakan di rumah.',
    },
    desc: {
      en: 'Certified physiotherapists provide rehabilitation sessions in the comfort of your home. Available as an add-on to any care package.',
      zh: '合格的物理治疗师上门进行康复治疗，让您在舒适的家中接受训练。可作为任何护理配套的附加服务。',
      ms: 'Ahli fisioterapi bertauliah menjalankan sesi pemulihan dalam keselesaan rumah anda. Boleh ditambah kepada mana-mana pakej penjagaan.',
    },
  },
  {
    key: 'escort',
    image: IMAGES.services.escort,
    name: { en: 'Medical Escort Service', zh: '陪同就医服务', ms: 'Perkhidmatan Iringan Perubatan' },
    short: {
      en: 'We accompany your loved one to hospital appointments and check-ups.',
      zh: '陪同您的亲人前往医院复诊和检查。',
      ms: 'Kami menemani insan tersayang ke temujanji hospital dan pemeriksaan.',
    },
    desc: {
      en: 'We accompany your loved one to hospital appointments, dialysis sessions, or check-ups. Transportation can be arranged.',
      zh: '陪同您的亲人前往医院复诊、洗肾或身体检查，也可以安排交通。',
      ms: 'Kami menemani insan tersayang ke temujanji hospital, sesi dialisis atau pemeriksaan kesihatan. Pengangkutan boleh diaturkan.',
    },
  },
  {
    key: 'hospital',
    image: IMAGES.services.hospital,
    name: { en: 'Hospital Admission Coordination', zh: '住院与出院协调', ms: 'Penyelarasan Kemasukan Hospital' },
    short: {
      en: 'Full management of hospital admissions and discharges for the family.',
      zh: '代家属全面处理住院和出院手续。',
      ms: 'Pengurusan penuh kemasukan dan keluar hospital bagi pihak keluarga.',
    },
    desc: {
      en: 'Full management of hospital admissions and discharges on behalf of the family. Paperwork, doctor communication, and bedside support.',
      zh: '代表家属全面处理住院和出院事宜，包括文件手续、与医生沟通及床边陪伴。',
      ms: 'Pengurusan penuh kemasukan dan keluar hospital bagi pihak keluarga. Termasuk urusan dokumen, komunikasi dengan doktor dan sokongan di sisi katil.',
    },
  },
]

export const CITIES = [
  { city: { en: 'Penang', zh: '槟城', ms: 'Pulau Pinang' }, area: { en: 'Island & Mainland', zh: '槟岛与威省', ms: 'Pulau & Seberang Perai' } },
  { city: { en: 'Kuala Lumpur', zh: '吉隆坡', ms: 'Kuala Lumpur' }, area: { en: 'KL & Selangor', zh: '吉隆坡与雪兰莪', ms: 'KL & Selangor' } },
  { city: { en: 'Melaka', zh: '马六甲', ms: 'Melaka' }, area: { en: 'City & Suburbs', zh: '市区与郊区', ms: 'Bandar & Pinggir Bandar' } },
  { city: { en: 'Johor Bahru', zh: '新山', ms: 'Johor Bahru' }, area: { en: 'JB & Iskandar', zh: '新山与依斯干达', ms: 'JB & Iskandar' } },
]

export const WHATSAPP_NUMBER = '60185959688'

/** 当前优惠：24小时住家看护月配套 */
export const PROMO = {
  price: 'RM5,588',
  usual: 'RM6,500',
  serviceEn: '24-Hour Stay-In Care monthly package',
}
