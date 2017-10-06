/**
*
* Octicon
*
*/

import React from 'react';
import * as octicons from 'octicons'


class Octicon extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
  	const {name} = this.props;
    return !name ? null : (
      <span className={`octicon-wrapper ${name}`} dangerouslySetInnerHTML={{__html: octicons[name].toSVG()}} />
    );
  }
}

Octicon.propTypes = {
	name:React.PropTypes.string
};

export default Octicon;
