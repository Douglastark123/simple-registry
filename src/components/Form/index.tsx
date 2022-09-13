import { useEffect, useState } from "react";
import Customer from "../../classes/Customer";
import db from "../../db";
import { date } from "../../types";
import Modal from "../Modal";
import "./styles.css";

type FormProps = {
    id?: string;
    endAction: () => void;
}

const Form = (props: FormProps) => {
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("" as date);

    const { id } = props || null;

    useEffect(() => {
        if (id) {
            const userToUpdate = db.users.find(user => user.id === id) as Customer;

            setName(userToUpdate.name);
            setBirth(userToUpdate.birth);
        }
    }, [id])

    const cancel = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        props.endAction();
    }

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (id) {
            const user = db.users.find(item => id === item.id) as Customer

            user.setBirth = birth;
            user.setName = name;
        } else {
            db.users.push(new Customer(name, birth));
        }


        setName("");
        setBirth("" as date);

        props.endAction();
    }

    return (
        <Modal>
            <form id="form" onSubmit={submitHandler} >
                <fieldset>
                    <div className="form-head-wrapper">
                        <legend>{!id ? "Add" : "Edit"} user</legend>
                    </div>
                    <div className="fieldset-inner-wrapper">
                        <div className="input-box">
                            <label>Name:</label>
                            <input type="text" className="input" value={name} required onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)} />
                        </div>
                        <div className="input-box">
                            <label>Birth:</label>
                            <input type="date" className="input" value={birth} required onChange={(e: any) => setBirth(e.currentTarget.value)} />
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px"
                        }}>
                            <button type="button" className="btn full-width btn-inverse" onClick={cancel}>Cancel</button>
                            <button type="submit" className="btn full-width btn-inverse">Save</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </Modal>
    );
};

export default Form;
export { Form };