import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

export default function ScrollTest() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log("scrollY:", window.scrollY); 
      setShowButton(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="">
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-[99999] bg-black text-white p-3  shadow-lg  cursor-pointer "
        >
          
          <IoIosArrowUp  size={26}/>

        </button>
      )}

    </div>
  );
}
