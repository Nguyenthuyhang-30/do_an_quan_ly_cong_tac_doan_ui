import React, { useState } from 'react';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  FacebookOutlined,
  SendOutlined,
  UserOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
  StarOutlined,
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';

type Topic = 'activity' | 'score' | 'account' | 'other';

interface TopicOption {
  value: Topic;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const TOPIC_OPTIONS: TopicOption[] = [
  {
    value: 'activity',
    label: 'Hoạt động Đoàn / tham gia',
    icon: <StarOutlined />,
    color: 'text-yellow-600',
  },
  {
    value: 'score',
    label: 'Điểm rèn luyện / đánh giá',
    icon: <SafetyCertificateOutlined />,
    color: 'text-blue-600',
  },
  {
    value: 'account',
    label: 'Tài khoản hệ thống',
    icon: <UserOutlined />,
    color: 'text-purple-600',
  },
  {
    value: 'other',
    label: 'Câu hỏi khác',
    icon: <QuestionCircleOutlined />,
    color: 'text-gray-600',
  },
];

const ContactPage: React.FC = () => {
  const [topic, setTopic] = useState<Topic>('activity');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Họ tên phải có ít nhất 2 ký tự';
    }

    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!content.trim()) {
      newErrors.content = 'Vui lòng nhập nội dung';
    } else if (content.trim().length < 10) {
      newErrors.content = 'Nội dung phải có ít nhất 10 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // TODO: call API gửi mail/góp ý
    setSent(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setContent('');
      setErrors({});
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-6 md:space-y-8">
        {/* Tiêu đề với banner */}
        <header className="relative bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-lg p-6 md:p-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <CustomerServiceOutlined style={{ fontSize: '120px' }} />
          </div>
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <MailOutlined className="text-yellow-300" style={{ fontSize: '28px' }} />
              <h1 className="text-2xl md:text-4xl font-bold">LIÊN HỆ VÀ HỖ TRỢ</h1>
            </div>
            <p className="text-blue-50 text-sm md:text-base max-w-2xl">
              Nếu bạn có thắc mắc về hoạt động Đoàn, điểm rèn luyện hoặc cần hỗ trợ, hãy gửi thông
              tin cho chúng tôi. Chúng tôi sẽ phản hồi trong vòng 24 giờ.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <ClockCircleOutlined />
                <span>Phản hồi trong 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <CustomerServiceOutlined />
                <span>Hỗ trợ tận tình</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-[1.5fr,1fr] gap-6 md:gap-8">
          {/* Form liên hệ */}
          <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <MessageOutlined className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Gửi góp ý / hỗ trợ</h2>
                <p className="text-xs text-gray-500">Vui lòng điền đầy đủ thông tin</p>
              </div>
            </div>

            {sent && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircleOutlined className="text-green-600 text-xl mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-800">Gửi thành công!</p>
                  <p className="text-xs text-green-600 mt-1">
                    Cảm ơn bạn đã liên hệ. BCH sẽ phản hồi qua email trong vòng 24 giờ.
                  </p>
                </div>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <UserOutlined className="text-blue-600" />
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full border-2 ${
                      errors.name
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                    } rounded-lg px-4 py-2.5 text-sm focus:ring-2 transition-all`}
                    placeholder="Nguyễn Văn A"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MailOutlined className="text-green-600" />
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full border-2 ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:border-green-500 focus:ring-green-200'
                    } rounded-lg px-4 py-2.5 text-sm focus:ring-2 transition-all`}
                    placeholder="email@dnu.edu.vn"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <QuestionCircleOutlined className="text-purple-600" />
                  Nội dung liên quan
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {TOPIC_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setTopic(opt.value)}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                        topic === opt.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <span
                        className={`text-lg ${topic === opt.value ? 'text-blue-600' : opt.color}`}
                      >
                        {opt.icon}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          topic === opt.value ? 'text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MessageOutlined className="text-orange-600" />
                  Nội dung chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    if (errors.content) setErrors({ ...errors, content: '' });
                  }}
                  rows={6}
                  className={`w-full border-2 ${
                    errors.content
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-200 focus:border-orange-500 focus:ring-orange-200'
                  } rounded-lg px-4 py-3 text-sm focus:ring-2 transition-all resize-none`}
                  placeholder="Mô tả chi tiết vấn đề bạn gặp phải hoặc góp ý cho công tác Đoàn... (ít nhất 10 ký tự)"
                />
                {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  {content.length} ký tự{' '}
                  {content.length < 10 && `(còn thiếu ${10 - content.length})`}
                </p>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                    isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <SendOutlined />
                      Gửi liên hệ
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* Thông tin liên hệ */}
          <section className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg border border-blue-100 p-6 md:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <PhoneOutlined className="text-white text-lg" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Thông tin liên hệ</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-base font-bold text-gray-900 mb-1">
                    Liên chi Đoàn Khoa Công nghệ thông tin
                  </p>
                  <p className="text-sm text-gray-600">Trường Đại học Đại Nam</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <EnvironmentOutlined className="text-red-600 text-lg mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1">Địa chỉ</p>
                      <p className="text-sm text-gray-700">Số xx, đường yy, quận zz, Hà Nội</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <PhoneOutlined className="text-green-600 text-lg mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1">Điện thoại</p>
                      <a
                        href="tel:0123456789"
                        className="text-sm font-medium text-green-600 hover:text-green-700"
                      >
                        0123 456 789
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <MailOutlined className="text-blue-600 text-lg mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1">Email</p>
                      <a
                        href="mailto:doan.cntt@dnu.edu.vn"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 break-all"
                      >
                        doan.cntt@dnu.edu.vn
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <ClockCircleOutlined className="text-orange-600 text-lg mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1">Giờ làm việc</p>
                      <p className="text-sm text-gray-700">Thứ 2 – Thứ 6</p>
                      <p className="text-sm text-gray-700">8h00 – 11h30 & 13h30 – 17h00</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-100">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    <FacebookOutlined />
                    Fanpage LCĐ Khoa CNTT
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl shadow-md border border-yellow-100 p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <QuestionCircleOutlined className="text-yellow-600" />
                Câu hỏi thường gặp
              </h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex gap-2">
                  <span className="text-yellow-600">•</span>
                  <span>Thắc mắc về điểm rèn luyện: Chọn "Điểm rèn luyện / đánh giá"</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-600">•</span>
                  <span>Vấn đề tài khoản: Chọn "Tài khoản hệ thống"</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-600">•</span>
                  <span>Thời gian phản hồi: Trong vòng 24 giờ làm việc</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
