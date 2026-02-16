import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AfricaOutlineProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  fillColor?: string;
  showFill?: boolean;
}

const AfricaOutline = ({
  className = "",
  strokeColor = "currentColor",
  strokeWidth = 2,
  duration = 3,
  delay = 0,
  fillColor = "none",
  showFill = false,
}: AfricaOutlineProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Simplified Africa continent outline path
  const africaPath =
    "M 195 5 C 185 8 175 12 168 20 C 162 28 158 38 150 45 C 142 52 130 55 122 62 C 114 69 110 78 105 88 C 100 98 95 108 88 118 C 81 128 72 135 65 145 C 58 155 52 165 48 178 C 44 191 42 205 40 220 C 38 235 38 250 40 265 C 42 280 46 295 52 308 C 58 321 66 332 72 345 C 78 358 82 372 88 385 C 94 398 102 408 108 420 C 114 432 118 445 125 455 C 132 465 142 472 150 480 C 158 488 165 495 172 498 C 179 501 185 500 192 496 C 199 492 208 485 215 475 C 222 465 228 452 232 438 C 236 424 238 408 238 392 C 238 376 236 358 235 342 C 234 326 234 312 236 298 C 238 284 242 272 248 260 C 254 248 262 238 268 228 C 274 218 278 208 280 198 C 282 188 282 178 278 168 C 274 158 266 148 260 138 C 254 128 250 118 248 108 C 246 98 246 88 248 78 C 250 68 254 58 255 48 C 256 38 254 28 248 20 C 242 12 232 8 222 6 C 212 4 202 4 195 5 Z";

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox="0 0 320 510"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Fill that fades in after drawing */}
        {showFill && (
          <motion.path
            d={africaPath}
            fill={fillColor}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.15 } : { opacity: 0 }}
            transition={{ duration: 1, delay: delay + duration }}
          />
        )}

        {/* Self-drawing outline */}
        <motion.path
          d={africaPath}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: { duration, delay, ease: "easeInOut" },
            opacity: { duration: 0.3, delay },
          }}
        />

        {/* Decorative dots for key cities */}
        {[
          { cx: 168, cy: 120, label: "Lagos" },
          { cx: 215, cy: 195, label: "Nairobi" },
          { cx: 135, cy: 60, label: "Accra" },
          { cx: 190, cy: 35, label: "Cairo" },
          { cx: 155, cy: 460, label: "Cape Town" },
        ].map((city, i) => (
          <motion.circle
            key={city.label}
            cx={city.cx}
            cy={city.cy}
            r={3}
            fill={strokeColor}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isInView
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              duration: 0.4,
              delay: delay + duration + 0.2 * i,
              ease: "backOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AfricaOutline;
