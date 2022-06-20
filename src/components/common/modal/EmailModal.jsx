import React from 'react';
import { useDispatch } from 'react-redux';

import { func, shape, string } from 'prop-types';

import TextInput from '../input/text/TextInput';
import Button from '../button/Button';

import { requestClientPDF } from '../../../redux/actions/client.action';

import './email-modal.scss';

const EmailModal = ({ setShowEmailModal, emailAddress, setEmailAddress, clientRequestFields }) => {

  const dispatch = useDispatch();

  const submitEmailRequest = () => {
    if (!emailAddress) return;
    dispatch(requestClientPDF({ ...clientRequestFields, mail: emailAddress }));
    setShowEmailModal(false);
  };

  return (
    <>
      <div className={ 'email-modal' }>
        <div className={ 'email-modal__header-container' }>
          <div className={ 'email-modal__header' }> { 'Email Recommendations' } </div>
        </div>
        <div className={ 'email-modal__container' }>
          <div className={ 'email-modal__input' }>
            <TextInput label={ 'Email addresses (seperate by comma):' }
                       onChange={ ({ target }) => setEmailAddress(target.value) }
                       onKeyPress={ event => {
                         if (event.key === 'Enter') submitEmailRequest();
                       } } left />
          </div>

          <div className={ 'email-modal__button' }>
            <Button label={ 'Cancel' }
                    onClick={ () => setShowEmailModal(false) } />
            <Button label={ 'Ok' }
                    onClick={ submitEmailRequest }
            />
          </div>
        </div>
      </div>
    </>
  );
};

EmailModal.defaultProps = {};

EmailModal.propTypes = {
  emailAddress: string.isRequired,
  setShowEmailModal: func.isRequired,
  setEmailAddress: func.isRequired,
  clientRequestFields: shape({})
};

export default EmailModal;
