/**
 *
 * File
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectFile, makeSelectFiles } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { methodTypes, nameToKey } from './model';
import { fileUpload, fileSync } from './actions';
import './style.scss';
import { merge } from 'ramda'

export class File extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);  
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.state = {
      fileUploading: false,
      imageLoaded:false
    }
  }

  componentWillMount() {
    const { method, file, fileSync} = this.props
    switch (method) {
      case methodTypes.view :
      case methodTypes.listView :
      default :
        file && fileSync(file)
        break;
    }
  }

  onClick(e) {
    e.preventDefault();
    this.input.click();
  }

  onChange(event) {
    const file = event.target.files[0];
    this.setState(merge(this.state, {fileUploading: file}), ()=>{
      this.props.fileUpload({file:file, coordinates:this.props.coordinates});
    })
  }

  onImageLoaded() {
    this.setState(merge(this.state, {imageLoaded: true}))
  }

  render() {
    const { fileState, method, file, filesState } = this.props;
    const { fileUploading, imageLoaded } = this.state;
    const fileUploadingKey = fileUploading && fileUploading.name && nameToKey(fileUploading.name);
    const uploading = filesState && filesState[fileUploadingKey] && filesState[fileUploadingKey].uploading;
    const loading = (fileState && fileState.loading) || !imageLoaded;

    const renderSwitch = () =>{
      switch (method || '') {
        case methodTypes.listView :
          return (
            <div className="image list-view">
              {
                fileState && fileState.path &&
                <img src={fileState.path} onLoad={this.onImageLoaded} className={`img-responsive rounded ${loading?'loading':'loaded'}`} />
              }
              {
                loading &&
                <span className="image-loading"></span>
              }
              <span className="text">{file}</span>
            </div>
          )
        case methodTypes.view :
          return (
            <div className="image view">
              {
                fileState && fileState.path &&
                <img src={fileState.path} onLoad={this.onImageLoaded} className={`img-responsive rounded ${loading?'loading':'loaded'}`}/>
              }
              {
                loading &&
                <span className="image-loading"></span>
              }
            </div>
          )
        case methodTypes.upload :
        default :
          return (
            <div className="file-button">
              <input
                type="file"
                onChange={this.onChange}
                ref={ref => this.input = ref}
              />
              <button className={`btn btn-primary ${uploading>=0 && (uploading < 100?'uploading':'uploaded')}`} onClick={this.onClick}>
                <span style={{transform: `translateX(${-100+uploading}%)`}} className="uploading-bar"></span>
                <span className="button-content">upload file</span>
              </button>
            </div>
          )
      }
    }

    return method ? renderSwitch() : null

  }
}

File.propTypes = {
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  fileState: makeSelectFile(ownProps.file),
  filesState: makeSelectFiles()
});

function mapDispatchToProps(dispatch) {
  return {
    fileUpload: (file)=>dispatch(fileUpload(file)),
    fileSync: (name)=>dispatch(fileSync(name))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'file', reducer });
//const withSaga = injectSaga({ key: 'file', saga });

export default compose(
  withReducer,
  //withSaga,
  withConnect,
)(File);
