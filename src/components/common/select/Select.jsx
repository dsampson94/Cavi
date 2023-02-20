import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Select({ list, activeItem, setActiveItem }) {

  return (
    <Listbox value={ activeItem } onChange={ setActiveItem }>
      { ({ open }) => (
        <>
          <div className="relative m-1">
            <Listbox.Button
              className="relative w-64 cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 sm:text-sm">
              <span className="block truncate">{ activeItem?.name }</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={ open }
              as={ Fragment }
              leave="transition ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className="absolute z-20 mt-1 max-h-60 w-64 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                { list?.map((item) => (
                  <Listbox.Option
                    key={ item.id }
                    className={ ({ active }) =>
                      classNames(
                        active ? 'text-white bg-blue-700' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={ item }
                  >
                    { ({ active }) => (
                      <>
                        <span className={ classNames(active ? 'font-semibold' : 'font-normal', 'block truncate') }>
                          { item.name }
                        </span>

                        { activeItem?.id === item?.id ? (
                          <span
                            className={ classNames(
                              active ? 'text-white' : 'text-blue-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            ) }
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null }
                      </>
                    ) }
                  </Listbox.Option>
                )) }
              </Listbox.Options>
            </Transition>
          </div>
        </>
      ) }
    </Listbox>
  );
}
