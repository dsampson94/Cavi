import { Routes } from '../../../routes';
import { useHistory, useRouteMatch } from 'react-router';

export default function TabBar() {

  const history = useHistory();
  const { path } = useRouteMatch();

  const tabs = [
    { name: 'Assistant', href: () => history.push(Routes.ASSISTANT), current: path.includes('assistant') },
    { name: 'Overview', href: () => history.push(Routes.OVERVIEW), current: path.includes('overview') },
    { name: 'Monitor Probes', href: () => history.push(Routes.MONITOR), current: path.includes('monitor-probes') },
    { name: 'Last Readings', href: () => history.push(Routes.LAST_READINGS), current: path.includes('last-readings') },
    { name: 'Neglected Fields', href: () => history.push(Routes.NEGLECTED_FIELDS), current: path.includes('neglected-fields') },
    { name: 'Email Readings', href: () => history.push(Routes.EMAIL_READINGS), current: path.includes('email-readings') },
    { name: 'Raw Readings', href: () => history.push(Routes.RAW_READINGS), current: path.includes('raw-readings') },
    { name: 'Irricoms', href: () => history.push(Routes.CHECK_IRRICOMS), current: path.includes('irricoms') }
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */ }
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={ tabs.find((tab) => tab.current).name }
        >
          { tabs.map((tab) => (
            <option key={ tab.name }>{ tab.name }</option>
          )) }
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="isolate cursor-pointer flex divide-x divide-gray-300 rounded-lg shadow" aria-label="Tabs">
          { tabs.map((tab, tabIdx) => (
            <a
              key={ tab.name }
              onClick={ tab.href }
              className={ classNames(
                tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
              ) }
              aria-current={ tab.current ? 'page' : undefined }
            >
              <span>{ tab.name }</span>
              <span
                aria-hidden="true"
                className={ classNames(
                  tab.current ? 'bg-blue-500' : 'bg-transparent',
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
