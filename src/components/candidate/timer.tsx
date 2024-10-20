import React, { useState, useEffect } from "react";
import { Progress } from "@nextui-org/react";

export default function Timer({ duration, setIsTimeUp }: { duration: number; setIsTimeUp: Function }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => {
        const newValue = prevValue + 1;
        return newValue >= duration ? duration : newValue;
      });
    }, 1000); // Increment by 1 second (1000 ms)

    return () => clearInterval(interval);
  }, [duration]);

  useEffect(() => {
    if (value >= duration) {
      setIsTimeUp(true); // Set the time up flag when the timer is done
    }
  }, [value, duration, setIsTimeUp]);

  return (
    <Progress
      size="md"
      maxValue={duration}
      value={value}
      showValueLabel={true}
      label={`${duration} seconds`}
      className="max-w-md"
      formatOptions={{
        compactDisplay: "long",
        unit: "second",
        unitDisplay: "narrow",
        style: "unit",
        maximumFractionDigits: 0,
      }}
      classNames={{
        base: "max-w-md",
        track: "drop-shadow-md border border-default",
        indicator: "bg-gradient-to-r from-red-500 to-teal-500",
        label: "tracking-wider font-medium text-default-600",
        value: "text-foreground/60",
      }}
    />
    
  );
}
