import { Routes } from '../../../routes';
import { useHistory, useRouteMatch } from 'react-router';
import { setClientMonitorProbesList } from '../../../redux/actions/client.action';
import { useDispatch } from 'react-redux';

export default function TabBar() {

  const history = useHistory();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const tabs = [
    {
      name: 'Assistant',
      current: path.includes('assistant'),
      href: () => {
        history.push(Routes.ASSISTANT);
      }
    },
    {
      name: 'Overview',
      current: path.includes('overview'),
      href: () => {
        history.push(Routes.OVERVIEW);
      }
    },
    {
      name: 'Monitor Probes',
      current: path.includes('monitor-probes'),
      href: () => {
        dispatch(setClientMonitorProbesList([]));
        history.push(Routes.MONITOR);
      }
    },
    {
      name: 'Last Readings',
      current: path.includes('last-readings'),
      href: () => {
        history.push(Routes.LAST_READINGS);
      }
    },
    {
      name: 'Neglected Fields',
      current: path.includes('neglected-fields'),
      href: () => {
        dispatch(setClientMonitorProbesList([]));
        history.push(Routes.NEGLECTED_FIELDS);
      }
    },
    {
      name: 'Email Readings',
      current: path.includes('email-readings'),
      href: () => {
        history.push(Routes.EMAIL_READINGS);
      }
    },
    {
      name: 'Raw Readings',
      current: path.includes('raw-readings'),
      href: () => {
        history.push(Routes.RAW_READINGS);
      }
    },
    {
      name: 'Irricoms',
      current: path.includes('irricoms'),
      href: () => {
        history.push(Routes.CHECK_IRRICOMS);
      }
    }
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
