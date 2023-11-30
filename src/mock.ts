import type { ExhibitionModel } from './models/exhibition'

export const dataMockup: ExhibitionModel[] = [
  {
    id: 1,
    name: 'เจ้าขุนทอง',
    type: 'literature',
    active: true,
    copyright: {
      name: 'กิตติญา เกียรติโกศล',
      phone: '0953042405',
      email: 'kitiya@gmail.com'
    },
    detail: `It is a long established fact that a reader will be distracted by the readable content of a page 
    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, 
    as opposed to using 'Content here, con
    tent here', making it look like readable English.`,
    startDate: '2023-10-14',
    endDate: '2023-12-29',
    images: []
  },
  {
    id: 2,
    name: 'ภาพวาดต้นไม้',
    type: 'art',
    active: true,
    copyright: {
      name: 'กรรณสิกา จิตรจำเริญรุ่ง',
      phone: '0963402304',
      email: 'kansika@gmail.com'
    },
    detail: ``,
    startDate: '2023-11-14',
    endDate: '2023-12-31',
    images: []
  },
  {
    id: 3,
    name: 'การ์ตูนเด็กน้อย',
    type: 'media',
    active: false,
    copyright: {
      name: 'พัฒนพล รัตนเศรษฐา',
      phone: '0961939422',
      email: 'pattanapon@gmail.com'
    },
    detail: `เพียงแค่เปิดอ่านในบทแรกๆ ที่เล่าวิถีชุมชนที่อยู่เหมือนเป็นชนบท อยู่กับป่าเขา อยู่กับหญ้าอยู่กับธรรมชาติ มีการเลี้ยงวัว ควาย มีสายน้ำลำธาร มีแมลงปอ มีความไม่สมบูรณ์ของอะไรบางอย่าง เช่น การส่งลูกเข้าเรียนช้ำ การที่เด็กเรียนซ้ำชั้น การที่เด็กไม่มีชุดนักเรียนที่เพียบพร้อมใส่ได้อย่างสมบูรณ์ บางรายถอดเสื้อมาโรงเรียน แต่ทุกคนในชุมชนที่รู้จักกันต่างอยู่ร่วมกันอย่างมีความสุข เริ่มต้นโดยไม่มีกฎเกณฑ์ของระเบียบวินัยที่เคร่งครัด ไม่มีก็คือไม่มี มีก็แลกเปลี่ยนกันไป ใครสอบเลื่อนชั้นผ่านแล้วมีหนังสือที่ไม่ใช้แล้ว ก็จะมีการยกหนังสือเก่าให้คนรุ่นหลัง`,
    startDate: '2023-11-02',
    endDate: '2023-12-14',
    images: []
  },
  {
    id: 4,
    name: 'The Flowering Orchard',
    type: 'art',
    active: true,
    copyright: {
      name: 'เจียมพจน์ อุดมเอก',
      phone: '0882349494',
      email: 'jampoj@gmail.com'
    },
    detail: `Artist: Vincent van Gogh (1853-1890), Title: The Flowering Orchard, Date: 1888, Collection: Metropolitan Museum of Art, Information from/Photographed by: Metropolitan Museum of Art`,
    startDate: '2023-11-02',
    endDate: '2023-12-14',
    images: []
  },
  {
    id: 5,
    name: 'บึงหญ้าป่าใหญ่',
    type: 'literature',
    active: false,
    copyright: {
      name: 'ชยน รุ่งทิพย์',
      phone: '0933041204',
      email: 'chayon@gmail.com'
    },
    detail: `ใครๆ ก็รู้ว่า เทพศิริ สุขโสภา เขียนรูปได้พลิ้วไหวและปาดฝีแปรงได้รวดเร็วน่าประทับใจมากแค่ไหน วิธีระบัดระบายฝีแปรงนั้น เหมือนการระบัดระบายตัวอักษรในหนังสือ เล่ม ‘ร่างพระร่วง’ ที่เคยเข้ารอบสุดท้ายซีไรต์ยังติดตรึงในความงามของตัวหนังสือ แม้เขียนมาไม่มากเล่ม ทว่าแต่ละเล่มเป็นตำนาน โดยเฉพาะ ‘บึงหญ้าป่าใหญ่’ `,
    startDate: '2023-10-01',
    endDate: '2023-12-29',
    images: []
  },
  {
    id: 6,
    name: 'สร้อยสลับสี',
    type: 'literature',
    active: true,
    copyright: {
      name: 'ปองภพ แสงทอง',
      phone: '084859394',
      email: 'pongpup@gmail.com'
    },
    detail: ` หนังสือว่าด้วยวัยเยาว์อันแสนงามของนักเขียนในตำนานผู้ก่อตั้งนิตยสาร ‘ลลนา’ คือ ‘สวนสัตว์’ เล่มนั้นก็มีเนื้อหาว่าด้วย Coming of Age เช่นกัน แต่เพราะเป็นหนังสืออ่านนอกเวลา หลายคนคงเคยรู้จักแล้ว จึงอยากแนะนำอีกเล่มที่มีโทนใกล้เคียงกัน`,
    startDate: '2023-09-01',
    endDate: '2023-12-10',
    images: []
  },
  {
    id: 7,
    name: 'หลังอาน',
    type: 'literature',
    active: true,
    copyright: {
      name: 'ชนาภา เจริญกาณต์',
      phone: '0823941204',
      email: 'chanapa@gmail.com'
    },
    detail: ` เรื่องเล่าง่ายๆ ของชายคนหนึ่ง ที่ลุกขึ้นปั่นจักรยานคนเดียว จากเชียงใหม่มาสู่กรุงเทพฯ นี่ไม่ใช่เรื่องของการปั่นจักรยานในยุคที่คนเขาฮิตกัน แต่เกิดขึ้นเนิ่นนานก่อนหน้านั้นน่าจะเป็นสิบปี มันคือบันทึกการเดินทางไกลของผู้ชายคนหนึ่ง การันตีด้วยตัวหนังสือของบินหลา`,
    startDate: '2023-11-02',
    endDate: '2023-12-14',
    images: []
  }
]
