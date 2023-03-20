import { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ComboBox({ list, activeItem, setActiveItem, shortened }) {
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredList = query === '' ? list : list.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <Combobox as="div" value={ activeItem } onChange={ setActiveItem }>
      <div>
        <Combobox.Input
          className="w-full h-[35px] rounded-md border-0 bg-white dark:bg-clouded-grey py-1.5 pl-3 pr-7 text-gray-900 shadow-sm ring-1 ring-inset ring-[#043b6e] focus:ring-1
          focus:ring-inset focus:ring-[#043b6e] sm:text-sm sm:leading-6"
          onChange={ (event) => setQuery(event.target.value) }
          displayValue={ (item) => item?.name }
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md pr-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        { filteredList?.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 min-w-full text-left overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            { filteredList?.map((item) => (
              <Combobox.Option
                key={ item.id }
                value={ item }
                className={ ({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-[#043b6e] text-white' : 'text-gray-900'
                  )
                }
              >
                { ({ active, selected }) => (
                  <>
                    <span className={ classNames('block truncate', selected && 'font-semibold') }>{ item.name }</span>

                    { selected && (
                      <span
                        className={ classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-[#043b6e]'
                        ) }
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) }
                  </>
                ) }
              </Combobox.Option>
            )) }
          </Combobox.Options>
        ) }
      </div>
    </Combobox>
  );
}
