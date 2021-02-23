import React, { useRef } from 'react';
import { Grid } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
/* eslint-disable import/no-unresolved */
import PhoneFrame from '@public/img/iphone.svg';
import ImageRload from '@public/img/reload.svg';
import ImageRotate from '@public/img/rotate.svg';
import ImageClose from '@public/img/close.svg';
import TVNoise from '@public/img/tv-noise.gif';

import './phone.scss';

const Phone = ({ rootStore: { creatives } }) => {
  const { orientation, selectVersion, onChangeOrientation, userDevice, isOpen } = creatives;
  const { isFreeOrientation } = creatives.data;

  const iframeRef = useRef(null);

  const forceUpdateIframe = () => {
    iframeRef.current.src = selectVersion.url;
  };

  if (userDevice === 'phone' && !isOpen) return null;

  return (
    <Grid
      container
      direction='column'
      wrap='nowrap'
      alignItems='center'
      justify='center'
      alignContent='center'
      className={`phone_container ${userDevice === 'phone' ? 'device_is_phone' : ''}`}
    >
      <div id='phone' className={orientation}>
        { userDevice !== 'phone' && <PhoneFrame className='phone_frame' />}
        {
          selectVersion?.url
            ? <iframe ref={iframeRef} className='phone_content' src={selectVersion.url} frameBorder='0' />
            : <div className='phone_content' style={{ backgroundImage: `url(${TVNoise})` }} />
        }
      </div>
      <div className='phone_controle'>
        <button type='button' onClick={forceUpdateIframe}>
          <ImageRload />
        </button>
        {userDevice !== 'phone'
          ? <button type='button' disabled={!isFreeOrientation} onClick={onChangeOrientation}> <ImageRotate /> </button>
          : <button type='button' onClick={creatives.onChangeIsOpen}> <ImageClose /> </button>}
      </div>
    </Grid>
  );
};

export default inject('rootStore')(observer(Phone));
