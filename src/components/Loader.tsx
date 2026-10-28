import { Emblem } from '../brand/Emblem'
import './Loader.css'

export function Loader({ label = 'Chargement…' }: { label?: string }) {
  return (
    <div className="loader" role="status">
      <Emblem size={28} variant="solid" title="" className="loader-emblem" />
      <span>{label}</span>
    </div>
  )
}
