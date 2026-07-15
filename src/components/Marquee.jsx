// Reusable marquee ribbon. Pass an array of strings; they loop seamlessly.
export default function Marquee({
  items,
  className = '',
  itemClassName = '',
  reverse = false,
  separator = '✦',
}) {
  const track = [...items, ...items];
  return (
    <div className={`w-full overflow-hidden select-none ${className}`}>
      <div className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}>
        {track.map((item, i) => (
          <span
            key={i}
            className={`flex items-center gap-6 whitespace-nowrap px-6 ${itemClassName}`}
          >
            <span>{item}</span>
            <span aria-hidden="true" className="opacity-60 text-[0.7em]">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
