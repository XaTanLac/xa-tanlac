# DVC-TB ZMA

[![Phiên bản Node.js](https://img.shields.io/badge/node-%3E%3D20.x-brightgreen.svg)](https://nodejs.org/)
[![Phiên bản Yarn](https://img.shields.io/badge/yarn-%3E%3D1.x-blue.svg)](https://yarnpkg.com/)

Một Zalo Mini App được phát triển trong monorepo DVC-TB.

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Kiến trúc](#kiến-trúc)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Bắt đầu](#bắt-đầu)
  - [Cài đặt](#cài-đặt)
  - [Phát triển](#phát-triển)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Môi trường phát triển](#môi-trường-phát-triển)
- [Triển khai](#triển-khai)
- [Hỗ trợ](#hỗ-trợ)

## 🎯 Tổng quan

DVC-TB ZMA là một Zalo Mini App được phát triển theo cấu trúc monorepo, giúp chia sẻ mã nguồn và duy trì tính nhất quán giữa các module khác nhau.

## 🏗 Kiến trúc

Module **dvc-tb-zma** bao gồm:

- **Các triển khai đặc thù cho nền tảng**
- **Các tính năng dành riêng cho ZMA**
- **Các thành phần UI tùy chỉnh**

## 🔧 Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các công cụ sau:

- **Node.js**: `>= 20.x`
- **Yarn**: `>= 1.x`
- **VSCode** (Khuyến nghị sử dụng)
- **Zalo Mini App Extension** (Dành cho phát triển ZMA)

## 🚀 Bắt đầu

### Cài đặt

1. Clone repository:
```bash
git clone https://your-repository-url/dvc-tb.git
cd dvc-tb
```

2. Cài đặt dependencies cho module ZMA:
```bash
cd dvc-tb-zma
npm i
```

### Phát triển

#### DVC-TB ZMA

1. Sử dụng Zalo Mini App Extension:
   - Cài đặt [Zalo Mini App Extension](https://mini.zalo.me/docs/dev-tools)
   - Cấu hình App ID của bạn
   - Mở tab Run panel > Start

2. Hoặc sử dụng CLI:
```bash
npm start          # Chạy server phát triển
zmp login         # Đăng nhập vào ZMP
zmp deploy        # Triển khai lên môi trường
```

## 📂 Cấu trúc dự án

```
dvc-tb/
├── dvc-tb-zma/         # Zalo Mini App
│   ├── src/
│   │   ├── assets/         # Tài nguyên tĩnh
│   │   │   ├── icons/      # Biểu tượng
│   │   │   └── images/     # Hình ảnh
│   │   ├── components/     # Thành phần UI
│   │   ├── constants/      # Các hằng số
│   │   ├── css/            # Stylesheets
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Các trang ZMA
│   │   ├── services/       # API & logic xử lý
│   │   ├── utils/          # Hàm tiện ích
│   │   ├── router.ts       # Điều hướng ứng dụng
│   │   └── app.tsx         # Ứng dụng ZMA chính
│   └── package.json
└── package.json       # Root package.json
```

## 📝 Quy tắc phát triển

1. **Quy tắc mã nguồn**
   - Tuân theo cấu hình ESLint của dự án
   - Sử dụng TypeScript để đảm bảo an toàn kiểu dữ liệu
   - Viết commit message có ý nghĩa

2. **Chiến lược branch**
   - `main`: Mã nguồn sẵn sàng sản xuất
   - `develop`: Nhánh phát triển
   - `feature/*`: Tính năng mới
   - `hotfix/*`: Sửa lỗi khẩn cấp

3. **Kiểm thử**
   - Viết unit test cho các tính năng mới
   - Đảm bảo tất cả test đều chạy thành công trước khi gửi PR
   - Tuân theo quy định về độ phủ test

4. **Cài đặt thư viện mới**
    - Đối với module ZMA:
    ```bash
    cd dvc-tb-zma
    npm i <package-name>
    ```

5. **Lưu ý về useNavigate và AnimationRoutes: Sử dụng từ common router thay vì zmp-ui**

## 🌐 Môi trường phát triển

- **Development**: Môi trường phát triển
- **Staging**: Kiểm thử và QA
- **Production**: Môi trường thực tế

## 📫 Hỗ trợ

Nếu bạn cần hỗ trợ:
- Tạo issue trong repository
- Liên hệ đội phát triển
- Xem tài liệu hướng dẫn

## Tài liệu

### Xuất bản dự án
- [Zalo Mini App Extension](https://mini.zalo.me/documents/devtools/ext/deploy-project/)
- [Zalo Mini App CLI](https://mini.zalo.me/documents/devtools/cli/commands/deploy/)

> <br>
> Chỉ đảm bảo hoạt động ổn định với 10 phiên bản gần nhất. Hãy sử dụng môi trường developer để hạn chế số lượng phiên bản không cần thiết. Số lượng deploy có giới hạn:

> - **Development mode**: tối đa 300 phiên bản / tháng
> - **Testing mode**: tối đa 60 phiên bản / tháng <br>
> <br>

[Chính sách kiểm duyệt](https://mini.zalo.me/documents/zalo-mini-app-censorship-policy/)

[Cấp quyền](https://mini.zalo.me/documents/intro/request-permission/)

[Phát hành](https://mini.zalo.me/documents/intro/public-mini-app/)

