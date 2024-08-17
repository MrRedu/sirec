import propTypes from 'prop-types'
export const Section = ({ children, isDiv = false, className }) => {
  const myClassName = 'w-full h-auto py-4 px-8'
  if (isDiv) {
    return <div className={`${myClassName} ${className}`}>{children}</div>
  }
  return <section className={`${myClassName} ${className}`}>{children}</section>
}

Section.propTypes = {
  children: propTypes.node,
  isDiv: propTypes.bool,
  className: propTypes.string,
}
