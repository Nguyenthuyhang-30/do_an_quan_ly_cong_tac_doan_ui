# ReactJS Base Source Code

## Clean Structure

```
src/
├── components/           # Các component tái sử dụng
│   ├── ui/              # Component UI cơ bản
│   ├── layout/          # Component bố cục
│   ├── forms/           # Component form
│   └── common/          # Component dùng chung
├── pages/               # Các trang
├── hooks/               # Custom hooks
├── services/            # API services
├── utils/               # Các hàm tiện ích
├── constants/           # Các hằng số của ứng dụng
├── types/               # Kiểu dữ liệu TypeScript
├── stores/              # Quản lý trạng thái
├── assets/              # Tài nguyên tĩnh
└── styles/              # Styles toàn cục
```

---

## Cấu hình & Cài đặt

- **Prettier & ESLint:** Quy tắc code được định nghĩa trong `.prettierrc`, `.eslintrc.js`, `.editorconfig`
- **Path Aliases:** Được cấu hình trong `tsconfig.json` và `vite.config.ts`
- **TailwindCSS:** Hỗ trợ viết CSS nhanh với utility-first. Cấu hình trong `tailwind.config.js`
- **SCSS Support:** Sử dụng file `.scss` cho styles tùy chỉnh và biến
- **Redux Toolkit:** Quản lý state trong `src/stores/`
- **React Router:** Hệ thống định tuyến và lazy-loading cho các trang
- **Biến môi trường:** Tất cả biến môi trường phải bắt đầu bằng tiền tố `VITE_`

---

## Bắt đầu

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy ứng dụng ở môi trường phát triển

```bash
npm run dev
```

### 3. Build cho môi trường production

```bash
npm run build
```

---

## Biến môi trường

Thêm biến vào file `.env`, `.env.development`, `.env.production`, v.v.

Ví dụ:

```
VITE_API_URL=https://api.example.com
VITE_FEATURE_FLAG_EXPERIMENTAL=true
```

> **Tất cả biến môi trường sử dụng trong code phải bắt đầu với `VITE_`.**

---

## Xác thực biến môi trường

Dự án sử dụng [zod](https://zod.dev/) để xác thực các biến môi trường cần thiết khi khởi động.  
Schema được định nghĩa trong `src/constants/env.ts`.  
Nếu thiếu biến hoặc sai định dạng, ứng dụng sẽ báo lỗi và dừng chạy.

---

## Các Component & Tiện ích cơ bản

- **UI Components:** Button, Input, Modal, Toast, Spinner, Table, v.v.
- **Layout:** Header, Sidebar, Container, Grid, ...
- **Hooks:** `useApi`, `useLocalStorage`, `useDebounce`, `useForm`, ...
- **API Service Layer:** Axios instance với interceptors, xử lý lỗi, hủy request, v.v.
- **Auth:** Quản lý JWT, route bảo vệ, session, logout
- **Testing:** Đã cấu hình sẵn Jest + React Testing Library (sẽ có tài liệu sắp tới)

---

## Tài liệu

- **Tài liệu component:** _Sắp có cùng với Storybook_
- **API docs:** _Sắp có_
- **Đóng góp:** PRs được hoan nghênh! Vui lòng tuân theo quy tắc code và cấu trúc dự án.

---

## Mẹo

- Sử dụng import tuyệt đối với alias:  
  `import Button from '@components/ui/Button';`
- Styles toàn cục: `src/styles/global.scss`
- Hàm tiện ích: `src/utils/`
- Hằng số ứng dụng: `src/constants/`

---

## Người đóng góp

- [HuyHoangDevVN](https://github.com/HuyHoangDevVN)

---

## Giấy phép

MIT
