import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
  isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  className = '',
  ...rest
}) => {
  const base =
    'w-full h-[52px] rounded-sm font-sans text-[15px] font-semibold flex items-center justify-center px-4 gap-2 transition-colors disabled:opacity-60'

  const variantClasses: Record<Variant, string> = {
    primary:
      'bg-indigo text-white shadow-button-primary hover:shadow-lg hover:brightness-95',
    secondary:
      'bg-transparent border-[1.5px] border-border text-text-primary hover:bg-background',
    ghost:
      'bg-transparent text-text-secondary hover:bg-background hover:text-text-primary',
  }

  const classes = `${base} ${variantClasses[variant]} ${className}`

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={variant === 'primary' ? { scale: 0.98 } : undefined}
      className={classes}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
      ) : (
        children
      )}
    </motion.button>
  )
}

export default Button
