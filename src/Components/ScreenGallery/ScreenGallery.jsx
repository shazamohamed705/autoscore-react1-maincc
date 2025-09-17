import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ScreenGallery({ images, onClose, currentIndex = 0 }) {
  const [current, setCurrent] = useState(currentIndex);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      {/* زر إغلاق */}
      <button
        className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2"
        onClick={onClose}
      >
        <X />
      </button>

      {/* صورة */}
      <img
        src={images[current].src}
        alt={images[current].title}
        className="max-h-[80vh] max-w-[90vw] object-contain"
      />

      {/* أزرار التنقل */}
      <button
        onClick={prevImage}
        className="absolute left-4 bg-gray-800 text-white rounded-full p-2"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 bg-gray-800 text-white rounded-full p-2"
      >
        <ChevronRight />
      </button>

      {/* الوصف */}
      <div className="absolute bottom-6 text-center text-white w-full">
        <h3 className="text-lg font-bold">{images[current].title}</h3>
        <p className="text-sm">{images[current].subtitle}</p>
        <p className="text-xs mt-1">
          {current + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}
