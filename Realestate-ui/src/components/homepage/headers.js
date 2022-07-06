import * as React from 'react';
import {styled} from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import {buttonUnstyledClasses} from '@mui/base/ButtonUnstyled';
import TabUnstyled, {tabUnstyledClasses} from '@mui/base/TabUnstyled';

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #4f6576;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: '#fff';
    border-bottom: '2px solid';
  }

  &:focus {
    // border-bottom: 3px solid white;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    border-bottom: '3px solid white !important';
    color: #fff;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  background-color: transparent;
  border-radius: 8px;
//   margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

export default function UnstyledTabsCustomized() {
  return (
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab>CITIES</Tab>
        <Tab>NEW LAUNCH</Tab>
        <Tab>LUXURY HOMES</Tab>
        <Tab>READY TO MOVE</Tab>
        <Tab>APPARTMENTS</Tab>
      </TabsList>
    </TabsUnstyled>
  );
}