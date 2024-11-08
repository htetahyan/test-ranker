// hooks/usePaddle.tsx
"use client";
import { initializePaddle, InitializePaddleOptions, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

export default function usePaddle() {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    const initPaddle = async () => {
      try {
        const paddleInstance = await initializePaddle({
          token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!
        } as InitializePaddleOptions);
        
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      } catch (error) {
        console.error("Error initializing Paddle:", error);
      }
    };

    initPaddle();
  }, []);
paddle?.Environment.set('sandbox')
  return paddle;
}
