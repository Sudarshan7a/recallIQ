import React, { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...rest }) => {
  return (
    <div
      className={`bg-surface rounded-xl shadow-card-resting dark:shadow-none border border-transparent dark:border-border ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Card
