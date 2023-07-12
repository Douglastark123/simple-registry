import { useEffect, useState } from "react";

import db from "../../db";

import { date } from "../../types";

import Customer from "../../classes/Customer";
import Modal from "../Modal";

import "./styles.css";

type FormProps = {
    id?: string;
    endAction: () => void;
}

const Form = (props: FormProps) => {
    const [form, setForm] = useState({
        userName: "",
        birth: "" as date,
        isFirstChange: true
    });

    const { id } = props || null;

    useEffect(() => {
        if (id) {
            const userToUpdate = db.users.find(user => user.id === id) as Customer;

            setForm({
                ...form,
                userName: userToUpdate.name,
                birth: userToUpdate.birth
            })
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

            user.setBirth = form.birth;
            user.setName = form.userName;
        } else {
            db.users.push(new Customer(form.userName, form.birth));
        }

        setForm({ ...form, userName: "", birth: "" as date })

        props.endAction();
    }


    const onChange = {
        userName: (e: React.FormEvent<HTMLInputElement>) => setForm({ ...form, userName: e.currentTarget.value }),
        userBirth: (e: any) => setForm({ ...form, birth: e.currentTarget.value })
    }

    return (
        <Modal onClose={props.endAction}>
            <form id="form" onSubmit={submitHandler} >
                <fieldset>
                    <div className="form-head-wrapper">
                        <legend>{!id ? "Add" : "Edit"} user</legend>
                    </div>
                    <div className="fieldset-inner-wrapper">
                        <div className="input-box">
                            <label>Name:</label>
                            <input type="text" className="input" value={form.userName} required onChange={onChange.userName} />
                        </div>
                        <div className="input-box">
                            <label>Birth:</label>
                            <input type="date" className="input" value={form.birth} required onChange={onChange.userBirth} />
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