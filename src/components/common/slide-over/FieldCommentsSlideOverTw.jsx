import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function FieldCommentsSlideOverTw({ showSlideOver, setShowSlideOver }) {

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
            <Dialog.Panel className="pointer-events-auto w-screen max-w-md mt-24">
              <div className="flex h-full flex-col border-l-2 border-t-2 rounded-t-md border-blue-400 bg-white dark:bg-dark-mode-grey py-2 shadow-2xl">
                <div className="flex mr-2 mt-2 flex-row-reverse">
                  <button
                    type="button"
                    className="rounded-md bg-white dark:bg-dark-mode-grey text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={ () => setShowSlideOver(false) }
                  >
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex items-start justify-center">
                  <Dialog.Title className="text-base leading-6 text-gray-900 dark:text-white">
                    Comments / Irrigations
                  </Dialog.Title>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
