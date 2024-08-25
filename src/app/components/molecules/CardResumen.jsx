import propTypes from 'prop-types'
export const CardResumen = ({
  text = 'Total de usuarios',
  number = '1.6M',
  icon,
}) => {
  return (
    <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900 max-w-[320px]">
      <div className="px-4 py-5 sm:p-6 flex gap-4">
        {icon}
        <dl>
          <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
            {text}
          </dt>
          <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
            {number}
          </dd>
        </dl>
      </div>
    </div>
  )
}

CardResumen.propTypes = {
  text: propTypes.string,
  number: propTypes.string,
  icon: propTypes.node,
}
