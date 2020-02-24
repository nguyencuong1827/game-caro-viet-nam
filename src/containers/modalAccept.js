/* eslint-disable camelcase */
/* eslint-disable react/no-deprecated */

import { Button, Modal} from "react-bootstrap";
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
  }
  
  render(){
      const { isShow } = this.state;
      const { type, contentBody, contentButton_1, handleClick_1, contentButton_2, handleClick_2 } = this.props;
      return(
        <Modal show={isShow} onHide={this.closeModal} className="custom-modal-room"  aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
               <h4>{contentBody}</h4>
            </Modal.Body>
            <Modal.Footer>
                {type ==="accept" &&
                    <Button variant="outline-info" onClick={() => handleClick_1()}>
                       {contentButton_1}
                    </Button>
                }
                <Button variant="outline-info" onClick={() =>{ this.closeModal(); handleClick_2(); }}>
                   {contentButton_2}
                </Button>
            </Modal.Footer>
        </Modal>
       
      );
  }

}

export default ModalPage;
