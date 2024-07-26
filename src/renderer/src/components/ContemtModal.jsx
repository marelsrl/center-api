import { Button, Modal} from "react-bootstrap";
import React from "react";

function ContentModal({visible,content,closeModal}){
    return(
        <Modal centered show={visible} >
            <Modal.Body>
                {React.createElement(content,)}
            </Modal.Body>
            <Modal.Footer>
                <Button className="!bg-blue-500" onClick={closeModal}>
                    CHIUDI
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ContentModal;