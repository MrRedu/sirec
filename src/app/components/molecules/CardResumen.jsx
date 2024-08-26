import propTypes from 'prop-types'
export const CardResumen = ({
  text = 'Total de usuarios',
  number = '1.6M',
  icon,
}) => {
  return (
    <div className="bg-blue-100 overflow-hidden shadow sm:rounded-lg dark:bg-gray-900 w-full">
      <div className="px-4 py-5 sm:p-6 flex gap-4">
        {icon}
        <div>
          <div className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
            {text}
          </div>
          <div className="mt-1 text-3xl leading-9 font-semibold text-gray-900 dark:text-indigo-400">
            {number}
          </div>
        </div>
      </div>
    </div>
  )
}

CardResumen.propTypes = {
  text: propTypes.string,
  number: propTypes.string,
  icon: propTypes.node.isRequired,
}
