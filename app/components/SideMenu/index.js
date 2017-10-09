/**
*
* SideMenu
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Octicon from 'components/Octicon'

import './style.scss';

class SideMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    e.preventDefault();
    this.props.onToggleSidemenu()
  }

  render() {
    return (
      <div className='side-menu'>
        <a className='side-menu-toggle' onClick={this.onClick}>
          <span className='name'>
          {messages.name.defaultMessage[0]}
          </span> <span className='surname'>{messages.surname.defaultMessage[0]}</span>
        </a>
        <aside>
        	<div className='content'>
          	<h1>
          		<FormattedMessage {...messages.name} /> <FormattedMessage {...messages.surname} />
          	</h1>
          	<p><FormattedMessage {...messages.subtitle} /></p>
            <div className='social'>
              <a href='https://github.com/matteoterrinoni' target='_blank'>
                <Octicon name='mark-github' />
              </a>
            </div>
          </div>
        </aside>
      </div>
    );
  }
}

SideMenu.propTypes = {

};

export default SideMenu