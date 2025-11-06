import { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.5 } // trigger when 50% visible
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const stepTime = 20;
    const totalSteps = duration / stepTime;

    const counter = setInterval(() => {
      start += end / totalSteps;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, stepTime);

    return () => clearInterval(counter);
  }, [visible, value]);

  return (
    <h2 ref={ref} className="text-4xl md:text-5xl font-extrabold text-amber-500 drop-shadow-md">
      {count}{suffix}
    </h2>
  );
};

export default AnimatedCounter;