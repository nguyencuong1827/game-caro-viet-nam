/* eslint-disable react/no-deprecated */

import { Button, Modal, Row, Col} from "react-bootstrap";
import { PacmanLoader } from "react-spinners";
import React from "react";
import '../stylesheets/room.css';



class ModalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isShow: false
     };
     this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(props){
      const { isShow } = props;
      this.setState({ isShow});
  }
  

  closeModal() {
    this.setState({ isShow: false });  
    const { handleClick } = this.props;
    handleClick();
  }
  
  render(){
      const { isShow } = this.state;
      const { contentBody, contentButton, handleClick } = this.props;
      return(
        <Modal show={isShow} onHide={this.closeModal} className="custom-modal-room"  aria-labelledby="contained-modal-title-vcenter" centered>
               <Modal.Body>
                 <Row>
                   <Col xs={8}>
                    <h4>{contentBody}</h4> 
                   </Col>
                   <Col>
                    <div className="custom-PacmanLoader-room">
                          <PacmanLoader
                              loading={isShow}
                              color="#00FFCB"
                              margin="5em 0 0 0"
                            />
                      </div>
                  
                   </Col>
                 </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-info" onClick={() => {this.closeModal();}}>
                   {contentButton}
                </Button>
            </Modal.Footer>
        </Modal>
       
      );
  }

}

export default ModalPage;
