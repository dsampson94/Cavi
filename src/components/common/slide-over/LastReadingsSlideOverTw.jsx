import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function LastReadingsSlideOverTw({ showSlideOver, setShowSlideOver, tableData }) {

  return (
    <Transition.Root show={ showSlideOver } as={ Fragment }>
      <Dialog as="div" className="relative z-10" onClose={ () => {
      } }>
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <Transition.Child
            as={ Fragment }
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="pointer-events-auto w-screen max-w-md mt-24 pt-4">
              <div className="flex h-[50%] flex-col overflow-y-scroll bg-white py-2 shadow-2xl">
                <div className="flex mr-2 mt-2 flex-row-reverse">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={ () => setShowSlideOver(false) }
                  >
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex items-start justify-center">
                  <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                    Volts
                  </Dialog.Title>
                </div>
                <div className="relative flex-1 px-4 sm:px-6">
                  <div className="absolute inset-0 px-4 sm:px-6 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart width={ 730 } height={ 250 } data={ tableData }
                                 syncId="id"
                                 margin={ { top: 10, right: 0, left: -30, bottom: 0 } }>
                        <defs>
                          <linearGradient id="colorVolts" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f37c2e" stopOpacity={ 0.8 } />
                            <stop offset="95%" stopColor="#f37c2e" stopOpacity={ 0 } />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" interval="preserveEnd" tick={ { fontSize: 10 } } />
                        <YAxis tick={ { fontSize: 10 } } />
                        <Tooltip />
                        <Area type="monotone" dataKey="Volts" stroke="#f37c2e" fillOpacity={ 1 } fill="url(#colorVolts)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="flex h-[50%] flex-col overflow-y-scroll bg-white py-2 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-center ">
                    <Dialog.Title className="text-base  font-semibold leading-6 text-gray-900">
                      Signal %
                    </Dialog.Title>
                  </div>
                </div>
                <div className="relative flex-1 px-4 sm:px-6">
                  <div className="absolute inset-0 px-4 sm:px-6 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart width={ 730 } height={ 250 } data={ tableData }
                                 syncId="id"
                                 margin={ { top: 10, right: 0, left: -30, bottom: 0 } }>
                        <defs>
                          <linearGradient id="colorSignal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#54a4d9" stopOpacity={ 0.8 } />
                            <stop offset="95%" stopColor="#54a4d9" stopOpacity={ 0 } />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" interval="preserveEnd" tick={ { fontSize: 10 } } />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="Signal" stroke="#54a4d9" fillOpacity={ 1 } fill="url(#colorSignal)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
    ;
}
