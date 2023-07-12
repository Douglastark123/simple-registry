import React, { useRef } from "react";
import "./styles.css";

type ModalProps = {
    children?: React.ReactNode;
    contentIdName?: string;
    onClose: () => void;
}

const Modal = ({ contentIdName, children, onClose }: ModalProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (e.target === divRef.current) onClose();
    }

    return (
        <div className="modal" ref={divRef} onClick={handleClick}>
            <div className="modal-content" id={contentIdName}>{children}</div>
        </div>
    );
};

export default Modal;