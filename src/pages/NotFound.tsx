import React from 'react';
import { Link } from '@tanstack/react-router';

const NotFound: React.FC = () => (
  <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
    <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
      <div className="relative">
        <div className="absolute">
          <div className="">
            <h1 className="my-2 text-gray-800 font-bold text-2xl">
              Có vẻ như bạn đã đi lạc vào khoảng không
            </h1>
            <p className="my-2 text-gray-800">
              Rất tiếc vì sự bất tiện này! Vui lòng quay lại trang chủ để tiếp tục.
            </p>
            <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
              <Link to="/" className="mt-4 px-4 py-2 bg-primary text-white rounded">
                Quay về trang chủ
              </Link>
            </button>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
        </div>
      </div>
    </div>
    <div>
      <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
    </div>
  </div>
);

export default NotFound;
