import React from 'react';
import { Link } from '@tanstack/react-router';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in-up">
            {/* 404 large text */}
            <div className="relative">
              <h1
                className="text-8xl md:text-9xl lg:text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 leading-none select-none"
                style={{
                  textShadow: '0 0 80px rgba(79, 70, 229, 0.2)',
                }}
              >
                404
              </h1>
              <div className="absolute inset-0 text-8xl md:text-9xl lg:text-[12rem] font-extrabold text-blue-600 opacity-10 blur-sm select-none">
                404
              </div>
            </div>

            {/* Error message */}
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                Oops! Trang không tìm thấy
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
                Có vẻ như trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                to="/"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <HomeOutlined className="text-lg" />
                <span>Về trang chủ</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-blue-300 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                <ArrowLeftOutlined className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Quay lại</span>
              </button>
            </div>

            {/* Additional help text */}
            <div className="pt-6 text-sm text-gray-500">
              <p>
                Nếu bạn cho rằng đây là lỗi, vui lòng{' '}
                <Link
                  to="/lien-he"
                  className="text-blue-600 hover:text-blue-700 underline font-medium"
                >
                  liên hệ với chúng tôi
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex-1 flex justify-center items-center animate-fade-in-right">
            <div className="relative w-full max-w-md">
              <img
                src="/404.png"
                alt="404 illustration"
                className="w-full h-auto drop-shadow-2xl animate-float"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Decorative elements around image */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-400 rounded-full opacity-20 blur-2xl animate-pulse"
                style={{ animationDelay: '1s' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations styles */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-right {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out 0.2s both;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
