export default function TabBar({ tabs }) {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md focus:border-blue-500 focus:ring-blue-500"
          defaultValue={ tabs?.find((tab) => tab?.current)?.name }
        >
          { tabs?.map((tab) => (
            <option key={ tab?.name }>{ tab?.name }</option>
          )) }
        </select>
      </div>
      <div className="hidden sm:block mt-0.5">
        <nav className="isolate cursor-pointer flex divide-x divide-gray-300 rounded-lg shadow" aria-label="Tabs">
          { tabs?.map((tab) => (
            <a
              key={ tab?.name }
              onClick={ tab?.href }
              className={ classNames(
                tab?.current ? '' : 'text-gray-500 dark:text-gray-400 hover:text-gray-500',
                'group relative min-w-0 flex-1 overflow-hidden py-3 px-3 text-xs font-medium text-center',
                'dark:border-b border-gray-300',
                'transition-colors ease-in-out duration-200'
              ) }
              aria-current={ tab?.current ? 'page' : undefined }
            >

              <span>{ tab?.name }</span>
              <span
                aria-hidden="true"
                className={ classNames(
                  tab?.current ? 'bg-blue-500 pb-0.5' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                ) }
              />
            </a>
          )) }
        </nav>
      </div>
    </div>
  );
}
