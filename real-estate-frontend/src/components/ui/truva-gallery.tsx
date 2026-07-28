import React, { useState } from "react";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TruvaGalleryProps {
  images: { id?: string; url: string; isCover?: boolean; type?: string }[];
  title?: string;
}

const MediaElement = ({ src, alt, className, autoPlay = false, isThumbnail = false }: { src: string, alt: string, className?: string, autoPlay?: boolean, isThumbnail?: boolean }) => {
  const isVideo = src.toLowerCase().match(/\.(mp4|webm|ogg|mov)$/);
  if (isVideo) {
    return (
      <div className={`relative ${className} bg-black flex items-center justify-center overflow-hidden`}>
        <video
          src={src}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay={autoPlay}
        />
        {isThumbnail && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <PlayCircle className="w-8 h-8 text-white opacity-80" />
          </div>
        )}
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} />;
};

export function TruvaGallery({ images, title = "Gallery" }: TruvaGalleryProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [mobileIdx, setMobileIdx] = useState(0);
  
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[400px] md:h-[500px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
        <ImageIcon className="w-12 h-12 opacity-30" />
      </div>
    );
  }

  const mainImage = images[mobileIdx] || images[0];
  const gridImages = images.slice(1, 5);
  const remainingCount = images.length - 5;

  return (
    <Dialog>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:h-[500px] rounded-xl overflow-hidden relative group">
        {/* Main Image */}
        <DialogTrigger render={<button type="button" className="md:col-span-2 h-[300px] md:h-full cursor-pointer relative overflow-hidden bg-gray-100 p-0 text-left w-full border-none" onClick={() => setCurrentIdx(mobileIdx)} />}>
            <MediaElement 
              src={mainImage.url} 
              alt={`${title} - Main`} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
              autoPlay={true}
            />
        </DialogTrigger>

        {/* Small Images */}
        {gridImages.length > 0 ? (
          <div className="hidden md:grid md:col-span-2 grid-cols-2 grid-rows-2 gap-2 h-full">
            {gridImages.map((img, idx) => {
              const isLast = idx === 3;
              return (
                <DialogTrigger key={idx} render={<button type="button" className="relative h-full cursor-pointer overflow-hidden bg-gray-100 group/item p-0 text-left w-full border-none block" onClick={() => setCurrentIdx(idx + 1)} />}>
                    <MediaElement 
                      src={img.url} 
                      alt={`${title} - ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105" 
                      isThumbnail={true}
                    />
                    {isLast && remainingCount >= 0 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity hover:bg-black/50">
                        <div className="pointer-events-none inline-flex items-center justify-center rounded-lg bg-secondary text-secondary-foreground px-4 py-2 text-sm gap-2 font-semibold">
                          <ImageIcon className="w-4 h-4" />
                          Show All Media
                        </div>
                      </div>
                    )}
                </DialogTrigger>
              );
            })}
          </div>
        ) : (
          <div className="hidden md:block col-span-2 bg-gray-50" />
        )}

        {/* Mobile Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMobileIdx(prev => prev === 0 ? images.length - 1 : prev - 1); }}
              className="md:hidden absolute left-4 top-[150px] -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white z-10 hover:bg-black/60 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMobileIdx(prev => prev === images.length - 1 ? 0 : prev + 1); }}
              className="md:hidden absolute right-4 top-[150px] -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white z-10 hover:bg-black/60 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Mobile Show All Button */}
        <div className="absolute bottom-4 right-4 md:hidden z-10">
           <DialogTrigger render={<Button variant="secondary" className="shadow-lg gap-2 text-xs font-semibold" onClick={() => setCurrentIdx(mobileIdx)} />}>
               <ImageIcon className="w-4 h-4" />
               {mobileIdx + 1} / {images.length}
           </DialogTrigger>
        </div>
      </div>

      {/* Wide Centered Gallery Dialog */}
      <DialogContent className="max-w-[90vw] md:max-w-5xl max-h-[85vh] w-[90vw] h-[80vh] p-0 bg-black/95 border-none flex flex-col overflow-hidden text-white rounded-2xl sm:max-w-[90vw] sm:rounded-2xl gap-0 shadow-2xl">
        <div className="p-4 flex justify-between items-center w-full z-10 bg-gradient-to-b from-black/80 to-transparent">
          <h2 className="text-lg font-medium">{title}</h2>
        </div>
        
        <div className="flex-1 relative flex items-center justify-center p-4 min-h-0">
           <MediaElement 
              src={images[currentIdx]?.url} 
              alt="Gallery Preview"
              className="max-w-full max-h-[48vh] md:max-h-[52vh] object-contain transition-opacity duration-300 rounded-lg shadow-lg"
              autoPlay={true}
           />
           
           {images.length > 1 && (
             <>
               <Button 
                 variant="ghost" 
                 size="icon" 
                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full h-12 w-12 border border-white/10"
                 onClick={(e) => { e.stopPropagation(); setCurrentIdx((prev) => (prev - 1 + images.length) % images.length); }}
               >
                 <ChevronLeft className="w-8 h-8" />
               </Button>
               <Button 
                 variant="ghost" 
                 size="icon" 
                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full h-12 w-12 border border-white/10"
                 onClick={(e) => { e.stopPropagation(); setCurrentIdx((prev) => (prev + 1) % images.length); }}
               >
                 <ChevronRight className="w-8 h-8" />
               </Button>
             </>
           )}
        </div>
        
        <div className="h-28 bg-black/80 p-4 flex gap-3 overflow-x-auto justify-center items-center border-t border-white/5">
           {images.map((img, idx) => (
             <div 
               key={idx} 
               onClick={() => setCurrentIdx(idx)}
               className={`h-16 w-24 shrink-0 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentIdx === idx ? 'border-white opacity-100 scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
             >
               <MediaElement src={img.url} alt="thumbnail" className="w-full h-full object-cover" isThumbnail={true} />
             </div>
           ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
