import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './css/EmailExistsAlertModal.css'

const EmailExistsAlertModal = ({closeHandler}) => {

  const history = useHistory()

    return (
      <div>
        <div className="email-exists-background"></div>
        <div className="email-exists-alert-box">
          <FontAwesomeIcon className="exclamation" icon={faExclamation} />
          <svg onClick={closeHandler} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="svg-inline--fa fa-times fa-w-10 fa-3x alert-close"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" className=""></path></svg>
          <div className="alert-content">
            Seems like you <br />
            Already have an account with this ID? <br />
            <span className="login" onClick={() => history.replace('/login')}>Log in</span> <span className="instead">instead</span>
          </div>
      </div>
      </div>
    )
}

export default EmailExistsAlertModal