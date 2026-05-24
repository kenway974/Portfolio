import './Volcano.css'

const RAYS = [
  { angle: -90, length: '48vw', width: 2, delay: 0.0,  duration: 5.0 },
  { angle: -45, length: '62vw', width: 3, delay: 0.15, duration: 5.5 },
  { angle:   0, length: '40vh', width: 4, delay: 0.3,  duration: 6.0 },
  { angle:  45, length: '40vw', width: 3, delay: 0.45, duration: 5.8 },
  { angle:  90, length: '16vw', width: 2, delay: 0.6,  duration: 5.2 },
]

const MAX_OPACITIES = [0.14, 0.19, 0.22, 0.17, 0.11]

export default function Volcano() {
  return (
    <div className="volcano" aria-hidden="true">
      {/* Triangle — forme volcanique */}
      <div className="volcano__mountain" />

      {/* Lueur au sommet */}
      <div className="volcano__apex-glow" />
      <div className="volcano__apex-dot" />

      {/* Rayons depuis le sommet */}
      {RAYS.map((ray, i) => (
        <div
          key={i}
          className="volcano__ray-wrap"
          style={{
            width: ray.width,
            height: ray.length,
            marginLeft: -ray.width / 2,
            transform: `rotate(${ray.angle}deg)`,
          }}
        >
          <div
            className="volcano__ray"
            style={{
              '--ray-delay':       `${ray.delay}s`,
              '--ray-duration':    `${ray.duration}s`,
              '--ray-max-opacity': MAX_OPACITIES[i],
            } as React.CSSProperties}
          />
        </div>
      ))}
    </div>
  )
}
