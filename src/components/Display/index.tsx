import { useState } from "react";

import db from "../../db";

import ConfirmDeleteUserMsg from "../ConfirmDeleteUserMsg";
import Form from "../Form";
import Main from "./Main";

import "./styles.css";

interface actionType {
    name: null | "add" | "edit" | "delete",
    userId: null | string
}


const Display = () => {
    const [action, setAction] = useState({
        name: null,
        userId: null
    } as actionType);

    const sendAction = (action: actionType) => {
        setAction(action);
    }

    const endAction = () => {
        setAction({
            name: null,
            userId: null
        });
    }

    return (
        <>
            {
                action.name === "delete" && action.userId ? <ConfirmDeleteUserMsg id={action.userId} endAction={endAction} /> :
                    action.name === "add" ? <Form endAction={endAction} /> :
                        action.name === "edit" && action.userId ? <Form id={action.userId} endAction={endAction} /> :
                            false
            }
            <div id="wrapper">
                <header id="header">
                    <h1 id="header-title">Simple Registry</h1>

                    <button id="new-registry" className="btn" onClick={() => sendAction({ name: "add", userId: null })}>
                        <i className="fa-solid fa-circle-plus i-20 i-green"></i>New Registry
                    </button>
                </header>
                <Main users={db.users} sendAction={sendAction} />
            </div>
        </>

    )
};

export default Display;