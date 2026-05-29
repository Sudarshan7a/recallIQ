import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | undefined
}

export const Input: React.FC<InputProps> = ({ error, className = '', ...rest }) => {
  const base =
    'w-full h-[52px] rounded-sm border-[1.5px] px-4 bg-surface font-sans text-[15px] text-text-primary placeholder:text-text-secondary transition-all outline-none'
  const focus = 'focus:border-indigo focus:ring-[3px] focus:ring-indigo/10'
  const errorCls = error ? 'border-red' : 'border-border'

  return (
    <div>
      <input
        className={`${base} ${errorCls} ${focus} ${className}`}
        {...rest}
      />
      {error ? (
        <p className="mt-1 text-[13px] text-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default Input
