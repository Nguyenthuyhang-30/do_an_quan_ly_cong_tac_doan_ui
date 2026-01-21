# Hướng dẫn cài đặt tính năng QR Code điểm danh

## 1. Cài đặt thư viện

Chạy lệnh sau để cài đặt các thư viện cần thiết:

```bash
cd do_an_quan_ly_cong_tac_doan_ui
npm install qrcode.react html5-qrcode
# hoặc
yarn add qrcode.react html5-qrcode
```

## 2. Các component đã tạo

### 2.1. QRCodeGenerator (Admin)
- **Vị trí**: `src/components/common/QRCodeGenerator.tsx`
- **Chức năng**: Tạo và hiển thị QR code cho hoạt động
- **Tính năng**:
  - Hiển thị QR code trong modal
  - Tải xuống QR code dưới dạng PNG
  - In QR code
  - QR code chứa URL với activityId và token

### 2.2. QRCodeScanner (Đoàn viên)
- **Vị trí**: `src/components/common/QRCodeScanner.tsx`
- **Chức năng**: Quét QR code từ camera
- **Tính năng**:
  - Sử dụng camera để quét QR code
  - Tự động xử lý khi quét thành công
  - Hỗ trợ camera trước/sau

### 2.3. QRCheckInPage (Đoàn viên)
- **Vị trí**: `src/features/home/pages/QRCheckInPage.tsx`
- **Chức năng**: Trang quét QR code để điểm danh
- **Route**: `/check-in/qr`
- **Tính năng**:
  - Quét QR code từ camera
  - Tự động check-in khi quét thành công
  - Hỗ trợ check-in qua URL (nếu có activityId và token trong URL)

## 3. Tích hợp vào Admin

### 3.1. ActivityAttendancePage
- Đã thêm nút "Hiển thị QR Code" trong trang quản lý điểm danh
- Khi click, hiển thị modal với QR code
- Admin có thể tải xuống hoặc in QR code để đặt tại địa điểm hoạt động

## 4. Tích hợp vào Đoàn viên

### 4.1. ActivityLookupPage
- Đã thêm nút "Quét QR Code" trong trang tra cứu hoạt động
- Khi click, chuyển đến trang quét QR code

### 4.2. QRCheckInPage
- Trang riêng để quét QR code
- Tự động xử lý check-in khi quét thành công

## 5. API Endpoints cần implement ở Backend

### 5.1. Tạo QR Token
```
POST /activity/:activityId/qr-token
Response: { token: string, expiresAt: string }
```

### 5.2. Check-in qua QR Code
```
POST /activity/:activityId/qr-check-in
Body: { token: string }
```

## 6. Cách sử dụng

### 6.1. Admin
1. Vào trang quản lý điểm danh của hoạt động
2. Click nút "Hiển thị QR Code"
3. Tải xuống hoặc in QR code
4. Đặt QR code tại địa điểm hoạt động

### 6.2. Đoàn viên
1. Vào trang tra cứu hoạt động
2. Click nút "Quét QR Code"
3. Cho phép truy cập camera
4. Quét QR code từ màn hình hoặc in
5. Tự động check-in thành công

## 7. Lưu ý

- Cần cấp quyền truy cập camera cho trình duyệt
- QR code có thể chứa token có thời hạn (cần implement ở backend)
- Nên kiểm tra quyền truy cập camera trước khi quét
- Hỗ trợ cả camera trước và sau

## 8. Troubleshooting

### Lỗi: "Cannot find module 'qrcode.react'"
- Chạy lại: `npm install qrcode.react html5-qrcode`

### Lỗi: "Camera not accessible"
- Kiểm tra quyền truy cập camera trong trình duyệt
- Đảm bảo đang sử dụng HTTPS hoặc localhost

### QR code không quét được
- Kiểm tra format URL trong QR code
- Đảm bảo token còn hiệu lực
- Kiểm tra kết nối mạng
