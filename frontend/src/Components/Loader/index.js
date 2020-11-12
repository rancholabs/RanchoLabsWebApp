import React from 'react';
import {useSelector} from 'react-redux';
import './index.css';

export default function Loader() {
    const isLoading = false;
  return (
    <>
    { isLoading && (
        <div className="progress">
            <div className="indeterminate"></div>
        </div>
    )}
    </>
  );
}
