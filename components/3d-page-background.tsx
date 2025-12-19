"use client"

interface Background3DProps {
  type?: "car-wash" | "car-detail" | "car-shine"
}

export function Background3D({ type = "car-wash" }: Background3DProps) {
  const gradientMap = {
    "car-wash": "linear-gradient(135deg, rgb(254, 242, 242) 0%, rgb(254, 226, 226) 50%, rgb(254, 226, 226) 100%)",
    "car-detail": "linear-gradient(135deg, rgb(254, 242, 242) 0%, rgb(254, 226, 226) 50%, rgb(254, 226, 226) 100%)",
    "car-shine": "linear-gradient(135deg, rgb(254, 242, 242) 0%, rgb(254, 226, 226) 50%, rgb(254, 226, 226) 100%)",
  }

  const bgStyle = {
    background: gradientMap[type],
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={bgStyle}>
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-60"
        style={{
          background: "radial-gradient(circle, rgb(239, 68, 68) 0%, transparent 70%)",
          animation: "float 6s ease-in-out infinite",
        }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-50"
        style={{
          background: "radial-gradient(circle, rgb(220, 38, 38) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite 1s",
        }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full blur-3xl opacity-40"
        style={{
          background: "radial-gradient(circle, rgb(185, 28, 28) 0%, transparent 70%)",
          animation: "float 7s ease-in-out infinite 2s",
          transform: "translate(-50%, -50%)",
        }}
      ></div>

      <svg
        className="absolute inset-0 w-full h-full opacity-25"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          <style>{`
            @keyframes carRotate {
              0% { transform: rotateY(0deg); }
              100% { transform: rotateY(360deg); }
            }
            @keyframes carMove {
              0%, 100% { transform: translateX(0px); }
              50% { transform: translateX(50px); }
            }
          `}</style>
        </defs>
        {/* Main car body with enhanced details */}
        <g style={{ animation: "carMove 8s ease-in-out infinite" }}>
          {/* Car body */}
          <rect x="250" y="380" width="500" height="140" rx="30" fill="rgb(220, 38, 38)" opacity="0.8" />
          {/* Car roof */}
          <rect x="300" y="300" width="400" height="100" rx="20" fill="rgb(239, 68, 68)" opacity="0.9" />
          {/* Front windshield */}
          <polygon points="300,300 350,250 450,250 400,300" fill="rgb(191, 18, 18)" opacity="0.7" />
          {/* Rear windshield */}
          <polygon points="550,300 600,250 700,250 650,300" fill="rgb(191, 18, 18)" opacity="0.7" />
          {/* Left wheel */}
          <circle cx="350" cy="540" r="50" fill="rgb(31, 41, 55)" opacity="0.9" />
          <circle cx="350" cy="540" r="35" fill="rgb(55, 65, 81)" opacity="0.8" />
          {/* Right wheel */}
          <circle cx="650" cy="540" r="50" fill="rgb(31, 41, 55)" opacity="0.9" />
          <circle cx="650" cy="540" r="35" fill="rgb(55, 65, 81)" opacity="0.8" />
          {/* Headlights */}
          <circle cx="270" cy="420" r="15" fill="rgb(253, 224, 71)" opacity="0.9" />
          <circle cx="270" cy="460" r="15" fill="rgb(253, 224, 71)" opacity="0.9" />
          {/* Taillights */}
          <circle cx="730" cy="420" r="15" fill="rgb(239, 68, 68)" opacity="0.9" />
          <circle cx="730" cy="460" r="15" fill="rgb(239, 68, 68)" opacity="0.9" />
        </g>

        {/* Second car for depth */}
        <g style={{ animation: "carMove 10s ease-in-out infinite 2s", opacity: 0.6 }}>
          <rect x="200" y="600" width="400" height="100" rx="25" fill="rgb(185, 28, 28)" opacity="0.7" />
          <rect x="240" y="540" width="320" height="80" rx="15" fill="rgb(220, 38, 38)" opacity="0.8" />
          <circle cx="280" cy="710" r="40" fill="rgb(31, 41, 55)" opacity="0.8" />
          <circle cx="520" cy="710" r="40" fill="rgb(31, 41, 55)" opacity="0.8" />
        </g>
      </svg>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-40px);
          }
        }
      `}</style>
    </div>
  )
}
