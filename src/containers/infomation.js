/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Media
} from "reactstrap";
import { Button } from "react-bootstrap";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons';
import userAction from "../actions/user-action";
import profileImg from "../images/profile.png"
import storage from "../config/firebase-config";
import "../stylesheets/login-register.css";

class FormInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      nickName: '',
      username: '',
      rank: '',
      point: '',
      notify: false,
      selectdImage: null,
      reviewImage: null,
      urlAvatar: '',
      progress: 0,
      isUploading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
  }

  UNSAFE_componentWillMount(){
    const {res} = this.props;
    this.setState({
      fullName: res.user.fullName,
      nickName: res.user.nickName,
      username: res.user.username,
      rank: res.user.rank,
      point:  res.user.point,
      urlAvatar: res.user.urlAvatar
    });
  }
  
  UNSAFE_componentWillReceiveProps(newProp){
    const { res } = newProp;
    if(res){
      this.setState({
        fullName: res.user.fullName,
        nickName: res.user.nickName,
        username: res.user.username,
        rank: res.user.rank,
        point:  res.user.point,
      });
    }
  }

  notify = () => {
    this.toastId = toast("Định dạng file không hợp lệ", {
    transition: Bounce,
    closeButton: true,
    autoClose: 3000,
    position: 'top-center',
    type: 'error',
    newestOnTop: true   
  })};



  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if(value === ''){
      this.setState({ notify: true });
    }
    else {
      this.setState({ notify: false });
    }
  }

  handleSelectImage(e){
    const Img = e.target.files[0]
    if(Img !== undefined){
      if(Img.type.includes('image') !== true){
        this.setState({
          selectdImage: Img
        });
        this.notify();
        return;
      }
      this.setState({
        reviewImage: URL.createObjectURL(Img),
        selectdImage: Img
      });
    }
   
  }

  handleSubmit(e) {
      e.preventDefault(); 
      const { updateInfoProp } = this.props;
      const { fullName, nickName, username, selectdImage } = this.state;
      this.setState({ isUploading: true });

      if(selectdImage === null){
        updateInfoProp(fullName, nickName, '');
        this.setState({ isUploading: false });
      }
      else{
        if(selectdImage.type.includes('image') !== true){
          this.notify();
          updateInfoProp(fullName, nickName, '');
          this.setState({ isUploading: false });
          return;
        }
        const uploadTask = storage.ref(`avatars/${username}/${selectdImage.name}`).put(selectdImage);
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            // progress function ...
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({ progress });
          }.bind(this),
          function(error) {
            // Error function ...
            console.log(error);
          },
          function() {
            // complete function ...
            uploadTask.snapshot.ref.getDownloadURL()
            .then(function(url){
              updateInfoProp(fullName, nickName, url);
              this.setState({ urlAvatar: url,
                              isUploading: false});
            }.bind(this))
          }.bind(this)
        );
      }
      
  }   




  render() {
    const { fullName, nickName, username, rank, point, notify, reviewImage, isUploading} = this.state;
    let { urlAvatar } = this.state; 
    const span = <span style={{ color: "red" }}>(*)</span>;
    if(reviewImage !== null){
      urlAvatar = reviewImage;
    }
    return (
      <div className="margin-top-6em color-black">
        <Row>
          <Col md="3" />
          <Col className="text-align" md="6">
            <h2 className="custom-h2">Thông tin tài khoản</h2>
          </Col>
          <Col md="3" />
        </Row>
        <Row>
          <Col md="3" />
          <Col md="6">
            <Card className="main-card mb-3">
                <Row className="custom-image-info">
                  <Col xs={12} >
                    {reviewImage !== null &&
                      <Media object  width={100}
                      height={100}
                      src={reviewImage} className="rounded-circle"/>
                    }
                    {reviewImage === null && urlAvatar !== '' &&
                      <Media object  width={100}
                      height={100}
                      src={urlAvatar} className="rounded-circle"/>
                    }
                    {reviewImage === null && urlAvatar === '' &&
                      <Media object  width={100}
                      height={100}
                      src={profileImg} className="rounded-circle"/>
                    }
                  </Col>
                </Row>
                <Row className="custom-image-info">
                  <Col xs={12}>
                  <div className="custom-form-file-group">
                      <Button className="btn-upload">Cập nhật ảnh</Button>
                      <input type="file" id="fileup" accept="image/*" onChange={this.handleSelectImage} />
                  </div>
                  </Col>
                </Row>
              <CardBody className="margin-top--4em">
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="exampleEmail">Họ tên</Label>
                    <Input invalid={notify} name="fullName" value={fullName} type="text" onChange={this.handleChange}/>
                    <FormFeedback>Bạn đã bỏ trống tên!!!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Nick name</Label>
                    <Input invalid={notify} name="nickName" value={nickName} type="text" onChange={this.handleChange}/>
                    <FormFeedback>Bạn đã bỏ trống nick name!!!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Tài khoản {span}</Label>
                    <Input name="fullName" value={username} type="text" disabled />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Bậc {span}</Label>
                    <Input name="fullName" value={rank} type="text" disabled  />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Điểm {span}</Label>
                    <Input name="fullName" value={point} type="text" disabled  />
                  </FormGroup>
                  <Label>{span}: Chỉ xem</Label>
                  <Button className="float-right btn-update btn-upload" variant="primary" type="submit">Cập nhật
                  {isUploading &&
                    <FontAwesomeIcon className="ml-2 opacity-8" icon={faFan} spin/>
                  }
                  </Button>
                 
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="3" />
        </Row>
        <ToastContainer />  
      </div>
    );
  }
}
const mapStateToProp = state => {
  const { res } =  state.authentication;
  return { res }

};

const mapDisPatchToProps = dispatch => {
  return bindActionCreators({
      updateInfoProp: userAction.updateInfo
  }, dispatch);
}
export default connect(mapStateToProp, mapDisPatchToProps)(FormInfo);
