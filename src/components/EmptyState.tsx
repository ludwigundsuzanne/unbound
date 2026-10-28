import type { ReactNode } from 'react'
import { Emblem } from '../brand/Emblem'
import './EmptyState.css'

type EmptyStateProps = { title: string; children: ReactNode; action?: ReactNode }

export function EmptyState({ title, children, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <Emblem size={40} className="empty-state-emblem" title="" />
      <h2>{title}</h2>
      <p>{children}</p>
      {action}
    </div>
  )
}
