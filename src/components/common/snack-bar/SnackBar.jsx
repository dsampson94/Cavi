import React, { Component } from 'react';
import { arrayOf, func, number, oneOfType, shape, string } from 'prop-types';

import { isUndefined, noOp } from '../../../tools/general/helpers.util';
import SnackAlert from './SnackAlert';

import './snack-bar.scss';

const NOTICE_REMOVAL_TIMEOUT = 5000;

class SnackBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notices: props.notices
    };

    this.timeouts = [];
  }

  componentDidUpdate() {
    this.addNewNotices();
    this.removeStaleNotices();
  }

  componentWillUnmount() {
    this.timeouts.map((timeout) => clearTimeout(timeout));
  }

  doesNoticeExistInProps(noticeId) {
    const { notices } = this.props;
    return this.doesNoticeExist(notices, noticeId);
  }

  doesNoticeExistInState(noticeId) {
    const { notices } = this.state;
    return this.doesNoticeExist(notices, noticeId);
  }

  doesNoticeExist(notices, noticeId) {
    return !isUndefined(notices.find(({ id }) => id === noticeId));
  }

  addNewNotices() {
    const { notices } = this.props;
    notices.forEach((notice) => {
      if (!this.doesNoticeExistInState(notice.id)) {
        this.setState(({ notices }) => ({
          notices: [...notices, notice]
        }), () => {
          const newTimeout = setTimeout(() => this.closeNotice(notice.id), NOTICE_REMOVAL_TIMEOUT);
          this.timeouts.push(newTimeout);
        });
      }
    });
  }

  removeStaleNotices() {
    const { notices } = this.state;
    notices.forEach((notice) => {
      if (!this.doesNoticeExistInProps(notice.id)) {
        this.setState(({ notices }) => ({
          notices: notices.filter((_notice) => _notice.id !== notice.id)
        }));
      }
    });
  }

  closeNotice(noticeId) {
    this.setState(({ notices }) => ({
      notices: notices.map((notice) => {
        if (notice.id !== noticeId) {
          return notice;
        }

        return {
          ...notice,
          closing: true
        };
      })
    }));

    const { onCloseNotice } = this.props;
    const newTimeout = setTimeout(() => onCloseNotice(noticeId), 500);
    this.timeouts.push(newTimeout);
  }

  renderNotices() {
    const { notices } = this.state;
    return notices.map((notice) => (
      <SnackAlert
        key={ notice.id }
        status={ notice.alertType }
        message={ notice.message }
        closing={ notice.closing }
      />
    ));
  }

  render() {
    return (
      <header className="snack-bar">
        { this.renderNotices() }
      </header>
    );
  }
}

SnackBar.defaultProps = {
  notices: [],
  onCloseNotice: noOp
};

SnackBar.propTypes = {
  notices: arrayOf(shape({
    id: oneOfType([number, string])
  })),
  onCloseNotice: func
};

export default SnackBar;
