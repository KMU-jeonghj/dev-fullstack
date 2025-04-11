import React from "react";
import { Modal } from "react-bootstrap";

type Todo = {
    id : number;
    text : string;
    check : boolean;
};

type TodoModalProps = {
    show : boolean;
    todo : Todo | null;
    handleClose : ()=> void; 
}

const TodoModal : React.FC<TodoModalProps> = ({show, todo, handleClose}) => {
    return (
        <div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Todo 상세정보</Modal.Title>
                </Modal.Header>
                <Modal.Body>{todo?.text}</Modal.Body>
            </Modal>

        </div>
    )
}

export default TodoModal;
