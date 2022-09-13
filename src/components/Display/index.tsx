import { useState } from "react";
import db from "../../db";
import { date } from "../../types";
import ConfirmDeleteUserMsg from "../ConfirmDeleteUserMsg";
import Form from "../Form";
import "./styles.css";


const _calculateAge = (birthday: Date) => {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return ageDate.getUTCFullYear() - 1970;
}

type TableLineProps = {
    user: {
        id: string;
        name: string;
        birth: date;
    }
}

const Display = () => {
    const [action, setAction] = useState(null as null | "addUser" | "editUser" | "delete")
    const [userIdForAction, setUserIdForAction] = useState(null as null | string);

    const addUserHandler = () => {
        setAction("addUser");
    };

    const editUserHandler = (id: string) => {
        setAction("editUser");
        setUserIdForAction(id);
    };

    const deleteUserHandler = (e: React.MouseEvent<HTMLElement>, id: string) => {
        setAction("delete");
        setUserIdForAction(id)
    };

    const endAction = () => {
        setAction(null);
        setUserIdForAction(null)
    }


    const TableLine = (props: TableLineProps) => (
        <tr className="table-line" key={props.user.id}>
            <th>{props.user.id}</th>
            <th>{props.user.name}</th>
            <th>{_calculateAge(new Date(props.user.birth))}</th>
            <th className="actions">
                <button className="btn" onClick={(e) => {
                    e.preventDefault();
                    editUserHandler(props.user.id)
                }}>
                    <i className="fa-solid fa-pen-to-square i-green i-20"></i>
                </button>

                <button className="btn" onClick={(e) => {
                    e.preventDefault();
                    deleteUserHandler(e, props.user.id);
                }}>
                    <i className="fa-regular fa-trash-can i-red i-20"></i>
                </button>
            </th>
        </tr>
    );

    return (
        <>
            {
                action === "delete" && userIdForAction ? <ConfirmDeleteUserMsg id={userIdForAction} endAction={endAction} /> :
                    action === "addUser" ? <Form endAction={endAction} /> :
                        action === "editUser" && userIdForAction ? <Form id={userIdForAction} endAction={endAction} /> :
                            false
            }
            <div id="wrapper">
                <header id="header">
                    <h1 id="header-title">Simple Registry</h1>

                    <button id="new-registry" className="btn" onClick={(e) => {
                        e.preventDefault();
                        addUserHandler();
                    }} >
                        <i className="fa-solid fa-circle-plus i-20 i-green"></i>New Registry
                    </button>
                </header>
                <main id="main">
                    <table id="table">
                        <thead>
                            <tr className="table-line">
                                <th>Id</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th style={{ textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                db.users.map(user => <TableLine user={user} key={user.id} />)
                            }
                        </tbody>
                    </table>
                </main>
            </div>
        </>

    )
};

export default Display;

