import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import fastorLogo from '../assets/fastor-logo.png';
import restaurantFallback from '../assets/restaurant-fallback.jpg';


  export default function Details() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const item = state?.item;
    const [pos, setPos] = useState({ x: 50, y: 50 });
    const [imageLoaded, setImageLoaded] = useState(false);
    const containerRef = useRef(null);
    const draggingRef = useRef(false);
    const logoRef = useRef(null);
    const imageRef = useRef(null);

    const handlePointerMove = (clientX, clientY) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      setPos({ x: Math.max(5, Math.min(x, 95)), y: Math.max(5, Math.min(y, 95)) });
    };

    const onContainerClick = (e) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onLogoPointerDown = (e) => {
      draggingRef.current = true;
      try {
        e.target.setPointerCapture?.(e.pointerId);
      } catch (err) {}
    };

    const onLogoPointerMove = (e) => {
      if (!draggingRef.current) return;
      handlePointerMove(e.clientX, e.clientY);
    };

    const onLogoPointerUp = (e) => {
      draggingRef.current = false;
      try {
        e.target.releasePointerCapture?.(e.pointerId);
      } catch (err) {}
    };

    const handleShare = async () => {
      try {
        const container = containerRef.current;
        const img = imageRef.current;
        const logoImg = logoRef.current?.querySelector('img');
        if (!container || !img || !logoImg) return alert('Unable to prepare image');

        const width = container.clientWidth;
        const height = container.clientHeight;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!img.complete) await img.decode();

        const naturalW = img.naturalWidth || width;
        const naturalH = img.naturalHeight || height;
        const imgRatio = naturalW / naturalH;
        const canvasRatio = width / height;
        let drawW = width;
        let drawH = height;
        let dx = 0,
          dy = 0;
        if (imgRatio > canvasRatio) {
          drawH = height;
          drawW = imgRatio * drawH;
          dx = -(drawW - width) / 2;
        } else {
          drawW = width;
          drawH = drawW / imgRatio;
          dy = -(drawH - height) / 2;
        }
        try {
          ctx.drawImage(img, dx, dy, drawW, drawH);
        } catch (err) {
          window.open(img.src, '_blank');
          return;
        }

        const logoRect = logoRef.current.getBoundingClientRect();
        const logoDisplayedW = logoRect.width;
        const logoDisplayedH = logoRect.height;
        const scale = canvas.width / container.clientWidth;
        const logoW = logoDisplayedW * scale;
        const logoH = logoDisplayedH * scale;
        const centerX = (pos.x / 100) * canvas.width;
        const centerY = (pos.y / 100) * canvas.height;

        ctx.drawImage(logoImg, centerX - logoW / 2, centerY - logoH / 2, logoW, logoH);

        canvas.toBlob(async (blob) => {
          if (!blob) return alert('Failed to generate image');

          const filesArray = [new File([blob], 'fastor-share.png', { type: 'image/png' })];

          if (navigator.canShare && navigator.canShare({ files: filesArray })) {
            try {
              await navigator.share({ files: filesArray, title: item?.restaurant_name || 'Fastor' });
              return;
            } catch (err) {}
          }

          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'fastor-share.png';
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        }, 'image/png');
      } catch (err) {
        alert('Unable to share image');
      }
    };

    return (
      <div className="bg-[#F3F5E4] relative h-screen w-full overflow-hidden">
        <div
          ref={containerRef}
          onClick={onContainerClick}
          className="h-[560px] w-1/2 relative cursor-move overflow-hidden"
        >
          <img
            ref={imageRef}
            crossOrigin="anonymous"
            onLoad={() => setImageLoaded(true)}
            src={item?.logo || restaurantFallback}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = restaurantFallback;
            }}
            className="w-full h-full object-cover pointer-events-none"
            alt=""
          />

          <button
            onClick={() => navigate(-1)}
            className="absolute bg-[#F2920C] text-white top-[48px] left-[24px] p-[12px] rounded-[16px] text-white font-bold shadow-md"

            aria-label="Back"
          >
            ←
          </button>

          {imageLoaded && (
            <div
              ref={logoRef}
              className="absolute w-[96px] h-[96px] touch-none z-30"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
              onPointerDown={onLogoPointerDown}
              onPointerMove={onLogoPointerMove}
              onPointerUp={onLogoPointerUp}
              onPointerCancel={onLogoPointerUp}
            >
              <img src={fastorLogo} className="w-full drop-shadow-2xl opacity-90" alt="" />
            </div>
          )}

          <div className="absolute bottom-[16px] right-[16px] z-10">
            <button onClick={(e) => { e.stopPropagation(); handleShare(); }} className="bg-[#F2920C] text-white px-[12px] py-[8px] rounded-[12px] font-bold">Share</button>
          </div>
        </div>

        <div className=" absolute bottom-0 w-full h-[320px] bg-white rounded-t-[48px] p-[24px] shadow-2xl">
          <div className="flex justify-between items-start mb-[16px]">
            <div>
              <h1 className="text-[44px] font-black">{item?.restaurant_name || "Lazy Bear"}</h1>
              <p className="text-[24px] text-[#9CA3AF]">Connaught Place, New Delhi</p>
            </div>
            <div className="flex items-center gap-[8px] font-bold text-[14px]">
              <span>★</span> 4.5
            </div>
          </div>

          <div className="flex items-center text-[#D97D6A] font-bold text-[24px] mb-[24px]">
            <span className="mr-[8px]">🏷️</span> 4 Offers Trending
          </div>

          <p className="text-[#6B7280] text-[24px] leading-[20px]">
            Our delicate vanilla cake swirled with chocolate and filled with mocha chocolate chip cream and a layer of dark chocolate ganache.
          </p>
        </div>
      </div>
    );
  }
