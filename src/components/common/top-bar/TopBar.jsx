import React from 'react';
import { useHistory } from 'react-router';

import Button from '../button/Button';
import TextInput from '../input/text/TextInput';
import ThemeToggle from '../theme-toggle/ThemeToggle';

import './top-bar.scss';

const TopBar = ({ showSideBar, setShowSideBar }) => {

  const history = useHistory();

  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <div className="top-bar__text">
          <img src={ '/favicon-irricheck.ico' } alt={ 'icon' } height={ 30 } />
          IrriCheck Pulse
        </div>
        <div className="top-bar__lower-left">
          <Button icon={ 'Email Recommendations' } />
          <Button label={ 'Other Farm' } onClick={ () => setShowSideBar(!showSideBar) } />
          <Button icon={ 'Weather Station Data' } />
          <Button icon={ 'Probes on Google Maps' } />
          <Button icon={ 'Print' } />
          <Button label={ 'Field Setup' } />
        </div>
      </div>
      <div className="top-bar__right">
        <Button label={ 'Probes Monitor' } />
        <ThemeToggle />
        <TextInput placeholder={ 'Probes on Google Maps' } />
        <Button icon={ 'Report Problem' } />
        <Button icon={ 'Log out' } onClick={ () => history.push('/') } />
      </div>
    </div>
  );
};

TopBar.defaultProps = {};

TopBar.propTypes = {};

export default TopBar;
