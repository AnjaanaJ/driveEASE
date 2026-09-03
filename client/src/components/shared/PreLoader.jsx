import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";

export default function PreLoader() {
    const[progress,setProgress]=useState(0);

    useEffect(()=>{
     const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1120]">
      <style>{`
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes text-reveal {
          0% { opacity: 0; transform: translateY(4px); }
  15% { opacity: 1; transform: translateY(0); }
  85% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-4px); }
        }
      `}</style>
      <p
        className="mb-8 text-4xl font-bold tracking-wide text-gradient-brand whitespace-nowrap"
        style={{ animation: "text-reveal 2s ease in-out forwards" }}
      >
        Ready.. Set.. Drive...
      </p>

      <div className="relative w-64 h-64">
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#1E75FE] border-r-[#1E75FE] animate-spin" />
        <div
          className="absolute inset-[6px] rounded-full border-[3px] border-transparent border-b-[#A34BF1] border-l-[#A34BF1]"
          style={{ animation: "spin-reverse 1.4s linear infinite" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={logo}
            alt="driveEASE"
            className="w-60 h-60 object-contain"
          />
        </div>
      </div>

      
      <p className="mt-6 text-lg font-semibold text-white/60 tracking-widest uppercase text-center px-6">
        buckle up...Your journey to the road is about to begin !!!
      </p>
      <p className="mt-2 text-lg font-medium text-[#06B6B4] tracking-wider">
     {progress}%
     </p>
    </div>
  );
}
