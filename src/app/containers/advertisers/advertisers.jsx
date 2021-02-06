import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, FileUpload, Table } from '@components/ui';
import { Loading } from '@components/loading/loading';
import { Grid } from '@material-ui/core';
import { AdvertiserModal } from './components/advertiser-modal';
import './advertisers.scss';

const columns = [
  { id: 'advertiserId', label: 'Advertiser ID', filter: true, },
  { id: 'advertiser', label: 'Advertiser', width: 300, filter: true },
  { id: 'squad', label: 'Squad', width: 100 },
  { id: 'tier', label: 'Tier' },
  { id: 'skipApproval', label: 'Skip Approval' },
];

const Advertisers = ({ rootStore: { advertisers, ui } }) => {
  useEffect(() => {
    if (!advertisers.list.length) {
      advertisers.fetch();
    }
  }, []);

  if (advertisers.loading) return <Loading />;

  const openModal = (data) => ui.showModal({
    data,
    title: 'Add new advertiser',
    component: AdvertiserModal,
  });

  const uploadCsv = (data) => advertisers.bulkUpdate(data);

  return (
    <div className='advertisers'>
      <Table
        data={advertisers.list}
        columns={columns}
        pagination
        filter
        editable
        order='asc'
        orderBy='advertiser'
        id='advertiserId'
        onEdit={openModal}
      />

      <div className='header'>
        <FileUpload onChange={uploadCsv} color='secondary'>Bulk update</FileUpload>
        <Button onClick={() => openModal()}>Add</Button>
      </div>
    </div>
  );
};

export default inject('rootStore')(observer(Advertisers));