import React, { useState } from 'react';

const CheckActivites = () => {
  const [studentId, setStudentId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tra cứu mã sinh viên: ${studentId}`);
  };

  return (
    <div className="py-12 flex items-center justify-center bg-gradient-to-b ">
      <div className="w-[600px] bg-white shadow-2xl border-2 border-amber-50 rounded-2xl p-8">
        {/* Tiêu đề */}
        <h1 className="text-2xl font-bold text-center text-[#1E3A8A] mb-2">
          TRA CỨU HOẠT ĐỘNG ĐOÀN
        </h1>
        <div className="w-16 h-1 bg-[#1E3A8A] mx-auto mb-6 rounded"></div>

        {/* Form */}
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">Tra cứu hoạt động</h2>
        <p className="text-gray-500 text-center mb-6">Nhập mã sinh viên để xem lịch sử tham gia</p>

        <form
          // onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            //value={studentId}
            //onChange={(e) => setStudentId(e.target.value)}
            className="w-full px-4 py-3 border-2 border-[#1E3A8A]/30 rounded-xl 
             focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/60 
             shadow-sm focus:shadow-lg outline-none transition"
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#1E3A8A] text-white font-semibold rounded-xl shadow-md hover:bg-[#1E3A8A]/90 transition"
          >
            Tra cứu
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckActivites;
