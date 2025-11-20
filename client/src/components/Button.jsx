import React from 'react';

const variantClass = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger',
};

const sizeClass = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

function Button({
  children,
  variant = 'primary',
  size,
  className = '',
  disabled = false,
  onClick,
  ...rest
}) {
  const classes = [
    variantClass[variant] || variantClass.primary,
    size ? (sizeClass[size] || '') : '',
    disabled ? 'btn-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
