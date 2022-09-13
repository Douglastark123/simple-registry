import db from "../../db";
import Modal from "../Modal";
import "./styles.css";

const ConfirmDeleteUserMsg = (props: { endAction: () => void, id: string }) => {
    const { endAction, id } = props;
    const cancel = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        endAction()
    }

    const deleteUser = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        const itemIndex = db.users.findIndex(item => item.id === id);
        db.users.splice(itemIndex, 1);

        endAction();
    }

    return (
        <Modal contentIdName="confirm-delete-user-msg">
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px"
            }}>
                <h3>Delete user</h3>
                <p>Are you sure; once deleted it cannot be recovered.</p>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px"
            }}>
                <button type="button" className="btn full-width" onClick={cancel}>Cancel</button>
                <button type="submit" className="btn full-width" onClick={deleteUser}>Yes, I'm sure</button>
            </div>
        </Modal>
    );
}

export default ConfirmDeleteUserMsg;