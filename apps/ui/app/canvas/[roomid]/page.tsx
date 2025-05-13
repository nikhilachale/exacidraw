"use client";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Resize canvas to fill parent
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resizeCanvas(); // Initial size
    window.addEventListener("resize", resizeCanvas); // Resize on window change

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let clicked = false;
    let startX = 0;
    let startY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      clicked = true;
      startX = e.offsetX;
      startY = e.offsetY;
    };

    const handleMouseUp = () => {
      clicked = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (clicked) {
        const width = e.offsetX - startX;
        const height = e.offsetY - startY;
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill black background
        ctx.strokeRect(startX, startY, width, height); // Draw white rectangle
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />

      <div className="flex flex-col items-center justify-center mt-4 space-y-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Rectangle
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Circle
        </button>
      </div>
    </div>
  );
}