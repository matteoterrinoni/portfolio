/**
 *
 * Skill
 *
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 import { Helmet } from 'react-helmet';
 import { FormattedMessage } from 'react-intl';
 import { createStructuredSelector } from 'reselect';
 import { compose } from 'redux';

 import { makeSelectSkill } from 'containers/Skills/selectors'
 import { makeSelectUser } from 'containers/Login/selectors'
 import { loadSkill, patchSkill, skillEdited } from 'containers/Skills/actions'
 import messages from './messages'
 import { fromJS, Map } from 'immutable'
 import { visibleProperties } from 'containers/Skills/model';
 import registry from 'utils/registry/registry';
 import { baseKey } from 'components/Editing/model';
 import { skillStatuses, articleProperties } from 'containers/Skills/model';
 import { clone } from 'ramda';
 import File from 'containers/File/Loadable'
 import { methodTypes } from 'containers/File/model'
 import InfoList from 'components/InfoList'
 import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


 import './style.scss';

 const path = "http://matteoterrinoni.it/"

export class Skill extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      editing: null
    }
  }

  componentWillMount() {
    const {loadSkill, match} = this.props;
    loadSkill(match.params.id);
  }

  componentWillReceiveProps(np) {
    if(this.props.skill !== np.skill){
      let editing = np.skill
      this.setState({editing})
    }
  }
  
  updateState(name, value) {
    const { skill, skillEdited } = this.props;
    skillEdited({...skill, [name]: value})
    //this.setState({editing: {...this.state.editing, [name]: value}});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.patchSkill(this.state.editing);
  }

  isDirty(){
    return this.props.skill.status == skillStatuses.toBeUpdated;
  }

  render() {
    const { skill, match, user } = this.props;
    const editing = skill;
    return !skill?null:(
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionEnterTimeout={1000}
        transitionAppearTimeout={1000}
        transitionLeaveTimeout={1000}>
        
        <div className="skill-page">
        <Helmet>
        <title>{skill.title}</title>
        <meta name="description" content="Description of Skill" />
        </Helmet>
        <div className="skill-head">
        <h1>{skill.title}</h1>
        { skill.link && <div className="link"><a href={skill.link} target="_blank"><i className="material-icons">link</i> {skill.link}</a></div> }
        </div>
        <InfoList list={
          Object.keys(articleProperties).map(key=>({
            label:articleProperties[key].label,
            value:skill[articleProperties[key].id]
          }))
        }/>
        { skill.html && <div className="html-content" dangerouslySetInnerHTML={{__html: skill.html}}></div>}
        { skill.images && (
          <div className="skill-images">
          {
            skill.images.map((i, k)=>{
              return <File file={i} key={k} method={methodTypes.view}/>
            })}
          </div>
        )}
      
      {
        user && editing &&
        <form onSubmit={(e)=>this.handleSubmit(e)}>
        {
          Object.keys(visibleProperties).map(key=>{
            let prop = visibleProperties[key];
            const Editing = registry.load(baseKey+(prop.type || 'input'));
            return (
              <div key={key} className="form-group row">
                <label htmlFor={prop.label} className="col-sm-4 col-form-label">{prop.label}</label>
                <div className="col-sm-8">
                  <Editing
                    label={prop.label}
                    value={editing[prop.id]}
                    onChange={val=>this.updateState(prop.id, val)}
                    coordinates={[editing.key, prop.id]} />
                </div>
              </div>
              )
          })
        }
        <button disabled={!this.isDirty()} type="submit" className="btn btn-primary">Save</button>
        </form>
      }
      </div>
    </ReactCSSTransitionGroup>
    );
  }
}

Skill.propTypes = {
  skill: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
    ]),
  match: PropTypes.object
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  skill: makeSelectSkill(ownProps.match.params.id),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    loadSkill: (id)=>dispatch(loadSkill(id)),
    patchSkill: (skill)=>dispatch(patchSkill(skill)),
    skillEdited: (skill)=>dispatch(skillEdited(skill)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  )(Skill);

