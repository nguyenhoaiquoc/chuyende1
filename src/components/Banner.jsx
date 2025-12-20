import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

function Banner() {
  const mainImages = [
    "https://pos.nvncdn.com/be3294-43017/bn/20251215_pN4UgjXj.gif?v=1765795795",
    "https://pos.nvncdn.com/be3294-43017/bn/20250612_ghRHiAEz.gif?v=1749724167",
    "https://pos.nvncdn.com/be3294-43017/bn/20251118_XZL55Fgi.gif?v=1763437372",
    "https://pos.nvncdn.com/be3294-43017/bn/20251028_lN2wwpFZ.gif?v=1761649256",
    "https://pos.nvncdn.com/be3294-43017/bn/20251020_QcxqZLSL.gif?v=1760947376",
  ];

  const brandLogos = [
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_C8coM12p.gif?v=1759478116",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_BPx8HtBE.gif?v=1759478130",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_bNGLusH9.gif?v=1759478363",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_9PSbVmUv.gif?v=1759478563",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_j2DVhnoP.gif?v=1759478837",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_6gZf85mV.gif?v=1759478975",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_7F6ztX1O.gif?v=1759479202",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_Auie6bwa.gif?v=1759479525",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_3zVfu7ms.gif?v=1759479561",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_5Z3iZI3t.gif?v=1759479614",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_TqPbbia3.gif?v=1759479656",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_MokRgKh7.gif?v=1759479730",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_6qgvQ2Qk.gif?v=1759479823",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_9HW1QqdH.gif?v=1759479899",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_RsYqJ23Z.gif?v=1759479959",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_4kDkKEPe.gif?v=1759480066",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_ovjd7Pp3.gif?v=1759480212",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_E3AhU1I6.gif?v=1759480387",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_rekInssa.gif?v=1759480470",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_RhCyXJdd.gif?v=1759480633",
    "https://pos.nvncdn.com/be3294-43017/bn/20251003_8gcZMAIa.gif?v=1759480732",
  ];

  return (
    <div className="w-full space-y-6">
      {/* Banner chính */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {mainImages.map((src, index) => (
          <SwiperSlide key={index}>
            <a href="#" className="block cursor-pointer">
              <img
                src={src}
                alt={`Banner ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Banner nhãn hàng */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 6 },
          1024: { slidesPerView: 8 },
        }}
      >
        {brandLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <a href="#" className="flex items-center justify-center h-16 px-2 cursor-pointer">
              <img
                src={logo}
                alt={`Brand ${index + 1}`}
                className="h-12 max-w-[120px] object-contain"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}

export default Banner;
