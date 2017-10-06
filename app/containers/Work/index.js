/**
 *
 * Work
 *
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 import { Helmet } from 'react-helmet';
 import { FormattedMessage } from 'react-intl';
 import { createStructuredSelector } from 'reselect';
 import { compose } from 'redux';

 import { makeSelectWork } from 'containers/Works/selectors'
 import { makeSelectUser } from 'containers/Login/selectors'
 import { loadWork, patchWork, workEdited, addFileToWork } from 'containers/Works/actions'
 import messages from './messages'
 import { fromJS, Map } from 'immutable'
 import { visibleProperties } from 'containers/Works/model';
 import registry from 'utils/registry/registry';
 import { baseKey } from 'components/Editing/model';
 import { workStatuses, articleProperties } from 'containers/Works/model';
 import { clone } from 'ramda';
 import File from 'containers/File/Loadable'
 import { methodTypes } from 'containers/File/model'
 import InfoList from 'components/InfoList'
 import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


 import './style.scss';

 const path = "http://matteoterrinoni.it/"

export class Work extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      editing: null
    }
    this.addFile = this.addFile.bind(this);
  }

  componentWillMount() {
    const {loadWork, match} = this.props;
    loadWork(match.params.id);
  }

  componentWillReceiveProps(np) {
    if(this.props.work !== np.work){
      let editing = np.work
      this.setState({editing})
    }
  }
  
  updateState(name, value) {
    const { work, workEdited } = this.props;
    workEdited({...work, [name]: value})
    //this.setState({editing: {...this.state.editing, [name]: value}});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.patchWork(this.state.editing);
  }

  isDirty(){
    return this.props.work.status == workStatuses.toBeUpdated;
  }

  addFile(file, prop) {
    this.props.addFileToWork({file:file, coordinates:[this.props.work.key, prop]})
  }

  render() {
    const { work, match, user } = this.props;
    const editing = work;
    return !work?null:(
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionEnterTimeout={1000}
        transitionAppearTimeout={1000}
        transitionLeaveTimeout={1000}>
        
        <div className="work-page">
        <Helmet>
        <title>{work.title}</title>
        <meta name="description" content="Description of Work" />
        </Helmet>
        <div className="work-head">
        <h1>{work.title}</h1>
        { work.link && <div className="link"><a href={work.link} target="_blank"><i className="material-icons">link</i> {work.link}</a></div> }
        </div>
        <InfoList list={
          Object.keys(articleProperties).map(key=>({
            label:articleProperties[key].label,
            value:work[articleProperties[key].id]
          }))
        }/>
        { work.html && <div className="html-content" dangerouslySetInnerHTML={{__html: work.html}}></div>}
        { work.images && (
          <div className="work-images">
          {
            work.images.map((i, k)=>{
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
                    addFile={file=>this.addFile(file, prop.id)}
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

Work.propTypes = {
  work: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
    ]),
  match: PropTypes.object
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  work: makeSelectWork(ownProps.match.params.id),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    loadWork: (id)=>dispatch(loadWork(id)),
    patchWork: (work)=>dispatch(patchWork(work)),
    workEdited: (work)=>dispatch(workEdited(work)),
    addFileToWork: (info)=>dispatch(addFileToWork(info))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  )(Work);

