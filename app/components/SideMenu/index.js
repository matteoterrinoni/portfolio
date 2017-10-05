/**
*
* SideMenu
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss';

class SideMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <aside>
      	<div className="content">
        	<h1>
        		<FormattedMessage {...messages.name} /> <FormattedMessage {...messages.surname} />
        	</h1>
        	<p><FormattedMessage {...messages.subtitle} /></p>
        </div>
      </aside>
    );
  }
}

SideMenu.propTypes = {

};

export default SideMenu;
