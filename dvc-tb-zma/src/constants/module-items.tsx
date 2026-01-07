import React from 'react'
import { createShortcut } from 'zmp-sdk'
import { Icon } from 'zmp-ui'

import applicationIcon from '@/assets/icons/application.png'
import audioIcon from '@/assets/icons/audio-visual.png'
import chatIcon from '@/assets/icons/chat.png'
import cultureIcon from '@/assets/icons/cultural.png'
import digitalIcon from '@/assets/icons/digital.png'
import searchTTIcon from '@/assets/icons/document.png'
import eduIcon from '@/assets/icons/edu.png'
import envirIcon from '@/assets/icons/environment.png'
import foodTravelIcon from '@/assets/icons/food-travel.png'
import foodIcon from '@/assets/icons/food.png'
import hiringIcon from '@/assets/icons/hiring.png'
import imageGalleryIcon from '@/assets/icons/image-gallery.png'
import industryIcon from '@/assets/icons/industry.png'
import myFeedbackIcon from '@/assets/icons/my-feedback.png'
import newsIcon from '@/assets/icons/news.png'
import paperWorkIcon from '@/assets/icons/paperwork.png'
// import myPostIcon from '@/assets/icons/personal-information.png'
import postingIcon from '@/assets/icons/posting.png'
import publicAnnouncementIcon from '@/assets/icons/public-announcement.png'
import dvcIcon from '@/assets/icons/quoc_huy.png'
import quocHuyIcon from '@/assets/icons/quoc_huy_vn.jpg'
import ratingIcon from '@/assets/icons/rating.png'
import searchProfileIcon from '@/assets/icons/search-profile.png'
import shortcutIcon from '@/assets/icons/shortcut.png'
import stdvIcon from '@/assets/icons/stdv.png'
import telephoneIcon from '@/assets/icons/telephone.png'
import travelIcon from '@/assets/icons/travel.png'
import myPostIcon from '@/assets/icons/vh1.jpg'
import VNeIDIcon from '@/assets/icons/VNeID_logo.webp'
import VssIDIcon from '@/assets/icons/vssid.png'
import { getAppUrl, openPageInWebview } from '@/constants'

export interface IMenuActionProps {
  id: string
  title: string
  icon: string
  action: ({ navigate, link }: { navigate: (to: string | { search: string }) => void; link?: string }) => void
}

export const menuItems: IMenuActionProps[] = [
  {
    id: 'thong_tin_dien_tu',
    title: 'Cổng TT điện tử xã Tân Lạc',
    icon: quocHuyIcon,
    action: () => openPageInWebview('https://tanlac.haiphong.gov.vn/'),
  },
  {
    id: 'so_tay_dang_vien',
    title: 'Sổ tay đảng viên',
    icon: stdvIcon,
    action: () => openPageInWebview('https://sotaydangvien.dcs.vn/page/Account/home'),
  },
  {
    id: 'tra_cuu_thu_tuc',
    title: 'Hồ sơ của tôi',
    icon: paperWorkIcon,
    action: ({ navigate }) => navigate({ search: '?isModalMyProfile=true' }),
  },
  {
    id: 'duong_day_nong',
    title: 'Đường dây nóng',
    icon: telephoneIcon,
    action: ({ navigate }) => navigate('/hotline'),
  },
]

export const gridItems: IMenuActionProps[] = [
  {
    id: 'tien_minh_cua_toi',
    title: 'Vĩnh Hòa của tôi',
    icon: myPostIcon,
    action: ({ navigate }) => navigate({ search: '?isModalMyPosting=true' }),
  },
  {
    id: 'tin_tuc',
    title: 'Tin tức',
    icon: newsIcon,
    action: () => openPageInWebview('https://tanlac.haiphong.gov.vn/tin-tuc-su-kien'),
  },
  {
    id: 'cong_dich_vu_cong_quoc_gia',
    title: 'Dịch vụ công Quốc gia',
    icon: dvcIcon,
    action: () => openPageInWebview('https://dichvucong.gov.vn/p/home/dvc-trang-chu.html'),
  },
  {
    id: 'thong_tin_cong_khai',
    title: 'Thông tin công khai',
    icon: publicAnnouncementIcon,
    action: ({ navigate }) => {
      navigate('/article-public')
    },
  },
  {
    id: 'chuyen_doi_so',
    title: 'Chuyển đổi số',
    icon: digitalIcon,
    action: () => openPageInWebview('https://chuyendoiso.haiphong.gov.vn'),
  },
  {
    id: 'binh_dan_hoc_vu',
    title: 'Bình dân học vụ số',
    icon: eduIcon,
    action: () => openPageInWebview('https://haiphonginfo.vn/binh-dan-hoc-vu-so'),
  },
  {
    id: 'quy_hoach_xay_dung_moi_truong',
    title: 'Quy hoạch - Xây dựng - Môi trường',
    icon: envirIcon,
    action: ({ navigate }) => {
      navigate('/article-building')
    },
  },
  {
    id: 'doanh_nghiep_dich_vu_viec_lam',
    title: 'Doanh nghiệp - Dịch vụ việc làm',
    icon: hiringIcon,
    action: ({ navigate }) => navigate({ search: '?isModalIndustryJob=true' }),
  },
  {
    id: 'am_thuc_du_lich',
    title: 'Văn hóa - Du lịch - Ẩm thực',
    icon: foodTravelIcon,
    action: ({ navigate }) => navigate({ search: '?isModalFoodTravel=true' }),
  },
  {
    id: 'phan_anh_kien_nghi',
    title: 'Ý kiến - Phản ánh',
    icon: chatIcon,
    action: ({ navigate }) => navigate('/phan-anh-kien-nghi'),
  },
  {
    id: 'danh_gia_su_hai_long',
    title: 'Tham vấn ý kiến nhân dân',
    icon: ratingIcon,
    action: ({ link }) => {
      openPageInWebview(link)
    },
  },
  // {
  //   id: 'tien_ich',
  //   title: 'Tiện ích hằng ngày',
  //   icon: utilIcon,
  //   action: ({ navigate }) => navigate({ search: '?isModalDailyUtilities=true' }),
  // },
  {
    id: 'tao_shortcut',
    title: 'Tạo phím tắt',
    icon: shortcutIcon,
    action: () => createShortcut(),
  },
]

export const navItems = [
  {
    key: '/profile',
    label: 'Cá nhân',
    icon: <Icon icon='zi-user-circle' />,
  },
  {
    key: '/',
    label: 'Trang chủ',
    icon: <Icon icon='zi-home' />,
  },
  {
    key: '/settings',
    label: 'Cài đặt',
    icon: <Icon icon='zi-setting' />,
  },
]

export const dailyUtilities: IMenuActionProps[] = [
  {
    id: 'vneid',
    title: 'VNeID',
    icon: VNeIDIcon,
    action: () => openPageInWebview(getAppUrl('vneid')),
  },
  {
    id: 'vssid',
    title: 'VssID',
    icon: VssIDIcon,
    action: () => openPageInWebview(getAppUrl('vssid')),
  },
]

export const myProfile: IMenuActionProps[] = [
  {
    id: 'tra_cuu_ho_so',
    title: 'Tra cứu hồ sơ',
    icon: searchProfileIcon,
    action: () => openPageInWebview('https://dichvucong.gov.vn/p/home/dvc-tra-cuu-ho-so.html'),
  },
  {
    id: 'tra_cuu_thu_tuc',
    title: 'Tra cứu thủ tục hành chính',
    icon: searchTTIcon,
    action: () => openPageInWebview('https://dichvucong.gov.vn/p/home/dvc-tthc-trang-chu.html'),
  },
  {
    id: 'phan_anh_kien_nghi_cua_toi',
    title: 'Ý kiến -Phản ánh của tôi',
    icon: myFeedbackIcon,
    action: ({ navigate }) => navigate('/phan-anh-kien-nghi/my-index'),
  },
]

export const myPosting: IMenuActionProps[] = [
  {
    id: 'bai_viet_tien_minh',
    title: 'Bài viết',
    icon: postingIcon,
    action: ({ navigate }) => navigate('/my-posting'),
  },
  {
    id: 'hinh_anh_tien_minh',
    title: 'Hình ảnh',
    icon: imageGalleryIcon,
    action: ({ navigate }) => navigate('/my-posting/images'),
  },
  {
    id: 'am_thanh_tien_minh',
    title: 'Âm thanh',
    icon: audioIcon,
    action: ({ navigate }) => navigate('/my-posting/audio'),
  },
]

export const cultureFoodTravel: IMenuActionProps[] = [
  {
    id: 'van_hoa',
    title: 'Văn hóa',
    icon: cultureIcon,
    action: ({ navigate }) => navigate('/article-culture'),
  },
  {
    id: 'du_lich',
    title: 'Du lịch',
    icon: travelIcon,
    action: ({ navigate }) => navigate('/article-travel'),
  },
  {
    id: 'am_thuc',
    title: 'Ẩm thực',
    icon: foodIcon,
    action: ({ navigate }) => navigate('/article-food'),
  },
]

export const industryJob: IMenuActionProps[] = [
  {
    id: 'thong_tin_doanh_nghiep',
    title: 'Thông tin doanh nghiệp',
    icon: industryIcon,
    action: ({ navigate }) => navigate('/industry-posting'),
  },
  {
    id: 'dich_vu_tuyen_dung',
    title: 'Dịch vụ tuyển dụng',
    icon: applicationIcon,
    action: ({ navigate }) => navigate('/job-posting'),
  },
]

export const modalMenuItems = [
  {
    title: 'Tiện ích hằng ngày',
    param: 'isModalDailyUtilities',
    item: dailyUtilities,
  },
  {
    title: 'Hồ sơ cá nhân',
    param: 'isModalMyProfile',
    item: myProfile,
  },
  {
    title: 'Vĩnh Hòa của tôi',
    param: 'isModalMyPosting',
    item: myPosting,
  },
  {
    title: 'Văn hóa - Du lịch - Ẩm thực',
    param: 'isModalFoodTravel',
    item: cultureFoodTravel,
  },
  {
    title: 'Doanh nghiệp - Dịch vụ việc làm',
    param: 'isModalIndustryJob',
    item: industryJob,
  },
]
