type ModalProps = {
    children?: React.ReactNode;
    outterStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    contentIdName?: string;
}

const Modal = (props: ModalProps) => (
    <div className="modal" style={props.outterStyle}>
        <div className="modal-content" id={props.contentIdName} style={props.contentStyle}>{props.children}</div>
    </div>
);

export default Modal;