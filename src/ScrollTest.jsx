import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollTest() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log("scrollY:", window.scrollY); // 👀 log kiểm tra
      setShowButton(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-[200vh] p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Test Scroll To Top</h1>
      <p>Cuộn xuống để thấy nút xuất hiện ở góc dưới bên phải 👇</p>

      {/* Văn bản dài để tạo scroll */}
      {Array.from({ length: 40 }).map((_, i) => (
        <p key={i} className="text-gray-700">
          {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec volutpat, nunc at ultricies sagittis, libero turpis pretium lorem,
          vel luctus dui ipsum ut odio. Cras bibendum luctus purus, nec varius
          est ultricies vitae. (Đoạn văn {i + 1})
        </p>
      ))}

      {/* Nút scroll to top */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-[99999] bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-800 cursor-pointer transition-all duration-300"
        >
          <FaArrowUp size={24} />
        </button>
      )}

    </div>
  );
}
