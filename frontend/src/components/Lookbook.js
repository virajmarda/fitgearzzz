import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// Athlete / lookbook strip — magazine-style 5-cell layout.
const SHOTS = [
  {
    img: 'https://images.unsplash.com/photo-1709979058427-4005f7c65154?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400',
    label: 'Andheri rooftop, 06:14',
    caption: 'Resistance band circuits',
  },
  {
    img: 'https://images.unsplash.com/photo-1656774950529-44a6153521ee?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400',
    label: 'Pune basement, 21:40',
    caption: 'Front squat, third set',
  },
  {
    img: 'https://images.unsplash.com/photo-1591558409284-4c3b398cdcc1?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400',
    label: 'Bangalore park, 05:55',
    caption: 'Calisthenics, public bar',
  },
  {
    img: 'https://images.unsplash.com/photo-1582550559636-e0d22d20de1b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400',
    label: 'Studio shoot, 11:02',
    caption: 'New chrome 20 kg barbell',
  },
  {
    img: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400',
    label: 'Warehouse floor, 18:25',
    caption: 'The dispatch table',
  },
];

const Lookbook = () => (
  <section className="bg-zinc-950 border-y border-zinc-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
        <div>
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.32em] mb-3">
            Lookbook · In the wild
          </p>
          <h2 className="font-oswald text-3xl sm:text-4xl font-bold uppercase leading-[0.98] tracking-tight text-white max-w-xl">
            The gear, on the floor it was built for.
          </h2>
        </div>
        <Link
          to="/stories"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400 hover:text-orange-400 transition-colors"
        >
          See the stories
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4">
        {/* Cell 1 — tall left */}
        <figure className="col-span-2 md:col-span-5 md:row-span-2 relative overflow-hidden rounded-sm aspect-[4/5] md:aspect-auto bg-zinc-900">
          <img
            src={SHOTS[0].img}
            alt={SHOTS[0].caption}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/30 to-transparent">
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/70">
              {SHOTS[0].label}
            </p>
            <p className="font-oswald text-lg sm:text-xl uppercase tracking-tight text-white mt-1">
              {SHOTS[0].caption}
            </p>
          </figcaption>
        </figure>

        {/* Cell 2 — top right */}
        <figure className="md:col-span-7 relative overflow-hidden rounded-sm aspect-[16/9] bg-zinc-900">
          <img
            src={SHOTS[1].img}
            alt={SHOTS[1].caption}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/30 to-transparent">
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/70">
              {SHOTS[1].label}
            </p>
            <p className="font-oswald text-lg sm:text-xl uppercase tracking-tight text-white mt-1">
              {SHOTS[1].caption}
            </p>
          </figcaption>
        </figure>

        {/* Cells 3, 4, 5 */}
        {SHOTS.slice(2).map((s, i) => (
          <figure
            key={i}
            className={`md:col-span-${i === 0 ? '3' : i === 1 ? '4' : '7'} relative overflow-hidden rounded-sm aspect-[4/3] bg-zinc-900`}
          >
            <img
              src={s.img}
              alt={s.caption}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/30 to-transparent">
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/70">
                {s.label}
              </p>
              <p className="font-oswald text-sm sm:text-base uppercase tracking-tight text-white mt-1">
                {s.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Lookbook;
