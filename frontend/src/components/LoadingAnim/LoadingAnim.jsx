import { useSpring, animated } from '@react-spring/web';

 

export default function LoadingAnim() {

  const springs = useSpring({

    from: { background: '#ff6d6d', y: -40, x: 0 },

    to: [
      { x: 80, background: '#fff59a' },
      { y: 40, background: '#88DFAB' },
      { x: 0, background: '#569AFF' },
      { y: -40, background: '#ff6d6d' },
    ],

    loop: true,

  });
  return (
    <div className="flex justify-center items-center h-screen">
      <animated.div
        className="w-10 h-10 rounded-md shadow-lg"
        style={{
          ...springs,
        }}
      />
    </div>
  );
}