import { capitalize, noOp } from '../../../tools/general/helpers.util';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function BreadCrumbsTw({ fieldName, groupName, clientName, probeNumber, location, history, isDarkMode }) {

  const activeList = () => {
    switch (true) {
      case location.pathname.includes('dashboard'):
        return [
          { name: 'Dashboard', href: noOp(), current: false },
          {
            name: capitalize(location.pathname.split('/')[2].replace('-', ' ')).replace(/(?:^|\s)\S/g, match => match.toUpperCase()),
            href: noOp(),
            current: true
          }
        ];
      case location.pathname.includes('setup'):
        return [
          { name: groupName, href: `/client/${ groupName }/${ clientName }`, current: false },
          { name: clientName, href: `/client/${ groupName }/${ clientName }`, current: false },
          { name: 'Field Setup', href: `/client/${ groupName }/${ clientName }`, current: false },
          { name: capitalize(location.pathname.split('/')[5]), href: noOp(), current: true }
        ];
      case location.pathname.includes('charts'):
        return [
          { name: groupName, href: `/client/${ groupName }/${ clientName }`, current: false },
          { name: clientName, href: `/client/${ groupName }/${ clientName }`, current: false },
          { name: fieldName, href: noOp(), current: false },
          {
            name: 'Deficit Charts',
            href: `/client/${ groupName }/${ clientName }/field-temperatures/${ probeNumber }/${ fieldName }`,
            current: true
          }
        ];
      case location.pathname.includes('temperature'):
        return [
          { name: groupName, href: `/client/${ groupName }/${ clientName }`, current: false },
          { name: clientName, href: `/client/${ groupName }/${ clientName }`, current: false },
          { name: fieldName, href: noOp(), current: false },
          {
            name: 'Temperature Charts',
            href: `/client/${ groupName }/${ clientName }/field-charts/${ probeNumber }/${ fieldName }`,
            current: true
          }
        ];
      default:
        return [
          { name: groupName, href: noOp(), current: false },
          { name: clientName, href: noOp(), current: false },
          { name: 'Recommendations', href: `/client/${ groupName }/${ clientName }/field-setup/general`, current: true }
        ];
    }
  };

  const handleClick = (event, href) => {
    event.preventDefault();
    history.push(href);
  };

  return (
    <nav className="flex overflow-x-auto scrollbar-hide ml-3" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-1">
        { activeList()?.map((page, index) => (
          <li key={ page.name }>
            <div className="flex items-center">
              { index > 0 &&
              <svg className="h-5 w-5 flex-shrink-0 text-gray-300"
                   fill="currentColor"
                   viewBox="0 -3 20 20"
                   aria-hidden="true">
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg> }
              <button onClick={ (event) => handleClick(event, page.href) }
                 className={ classNames(!isDarkMode ? 'text-gray-200' : 'text-gray-800',
                   'text-sm mt-0.5 md:text-sm font-medium cursor-pointer hover:bg-blur-very-light-grey p-1 mt-1 whitespace-nowrap rounded-lg') }
                 aria-current={ page.current ? 'page' : undefined }>
                { page.name }
              </button>
            </div>
          </li>
        )) }
      </ol>
    </nav>
  );
}
