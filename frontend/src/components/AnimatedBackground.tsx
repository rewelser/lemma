import { useEffect, useRef } from "react";

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cell = 10;
    let snake = [{ x: 0, y: 0 }];
    let dir = { x: 1, y: 0 };

    function draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#4ade80";
      snake.forEach((s) =>
        ctx.fillRect(s.x * cell, s.y * cell, cell, cell)
      );
    }

    function update() {
      const head = {
        x: (snake[0].x + dir.x + Math.floor(canvas.width / cell)) %
           Math.floor(canvas.width / cell),
        y: (snake[0].y + dir.y + Math.floor(canvas.height / cell)) %
           Math.floor(canvas.height / cell),
      };
      snake.unshift(head);
      if (snake.length > 20) snake.pop();
    }

    let id: number;
    const loop = () => {
      update();
      draw();
      id = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
    />
  );
};

export default AnimatedBackground;
