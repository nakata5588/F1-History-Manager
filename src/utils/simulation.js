import { mulberry32 } from './rng.js'

export function drawWeather(probDry, rnd = Math.random) {
  return (typeof rnd === 'function' ? rnd() : Math.random()) < probDry ? 'dry' : 'rain'
}

export function simulateSession(drivers, teams, track, opts = {}) {
  const rnd = opts.seed !== undefined ? mulberry32(opts.seed) : Math.random
  const probDry = track?.weather_profile?.dry ?? 0.7
  const weather = drawWeather(probDry, rnd)
  const baseLapMs = Math.round((track.length_km * 60 * 1000) / 4.5) // heurística simples

  const results = drivers.map((d) => {
    const team = teams.find((t) => t.id === d.teamId)
    const perf = (d.pace * 0.6 + d.consistency * 0.2 + d.experience * 0.2) / 100
    const teamFactor = (team?.budget ?? 100) / 200
    const weatherPenalty = weather === 'rain' ? (1.05 + (1 - d.experience / 100) * 0.05) : 1.0

    const noise = ((typeof rnd === 'function' ? rnd() : Math.random()) - 0.5) * 0.03 // ±3%
    const lap = baseLapMs * (1.0 - perf * 0.25) * (1.0 - teamFactor * 0.1) * weatherPenalty * (1 + noise)
    return { driverId: d.id, bestLapMs: Math.max(30000, Math.round(lap)) }
  })

  results.sort((a, b) => a.bestLapMs - b.bestLapMs)
  return results
}

export function msToTime(ms) {
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  const mm = String(m).padStart(2, '0')
  const ss = String(s).padStart(2, '0')
  const ms3 = String(ms % 1000).padStart(3, '0')
  return `${mm}:${ss}.${ms3}`
}
