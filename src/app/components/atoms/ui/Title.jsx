import propTypes from 'prop-types'
const defaultClassName =
  'text-2xl font-bold leading-none tracking-tight text-gray-800 dark:text-white'
export const Title = ({
  children,
  isH1 = false,
  isH3 = false,
  isH4 = false,
  className,
}) => {
  if (isH1)
    return <h1 className={`${defaultClassName} ${className}`}>{children}</h1>
  if (isH3)
    return <h3 className={`${defaultClassName} ${className}`}>{children}</h3>
  if (isH4)
    return <h4 className={`${defaultClassName} ${className}`}>{children}</h4>

  return <h2 className={`${defaultClassName} ${className}`}>{children}</h2>
}
Title.propTypes = {
  children: propTypes.node,
  isH1: propTypes.bool,
  isH3: propTypes.bool,
  isH4: propTypes.bool,
  className: propTypes.string,
}
