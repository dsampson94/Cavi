function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TabBarBottom({ tabs, activeTab, setActiveTab }) {

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
          { tabs?.map((tab, index) => (
            <a
              key={ tab?.name }
              onClick={ tab.href ? tab?.href : () => setActiveTab(index) }
              className={ classNames(
                index === activeTab ? 'text-blue-500' : '', 'text-gray-500 dark:text-gray-400 hover:text-gray-500',
                'group relative min-w-0 flex-1 overflow-hidden py-3 px-3 text-xs font-medium text-center',
                'border-t border-gray-300',
                'transition-colors ease-in-out duration-200'
              ) }
              aria-current={ index === activeTab ? 'page' : undefined }
            >

              <span>{ tab?.name }</span>
              <span
                aria-hidden="true"
                className={ classNames(
                  index === activeTab ? 'top-0' : tab.current ? 'bottom-0' : 'bg-transparent',
                  'absolute inset-x-0 h-0.5 bg-blue-500 pb-0.5'
                ) }
              />
            </a>
          )) }
        </nav>
      </div>
    </div>
  );
}
