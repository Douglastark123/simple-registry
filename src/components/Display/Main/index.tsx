import Customer from "../../../classes/Customer";
import { date } from "../../../types";

const _calculateAge = (birthday: Date) => {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return ageDate.getUTCFullYear() - 1970;
}

interface actionType {
    name: null | "edit" | "delete",
    userId: null | string
}

interface TableLineProps {
    user: {
        id: string;
        name: string;
        birth: date;
    };
}

interface MainProps {
    users: Customer[];
    sendAction: ({ }: actionType) => void;
}

const Main = ({ users, sendAction }: MainProps) => {
    const TableLine = ({ user }: TableLineProps) => {
        return (
            <tr className="table-line" key={user.id}>
                <th>{user.id}</th>
                <th>{user.name}</th>
                <th>{_calculateAge(new Date(user.birth))}</th>
                <th className="actions">
                    <button className="btn" onClick={(e) => {
                        e.preventDefault();
                        sendAction({
                            name: "edit",
                            userId: user.id
                        })
                    }}>
                        <i className="fa-solid fa-pen-to-square i-green i-20"></i>
                    </button>

                    <button className="btn" onClick={(e) => {
                        e.preventDefault();
                        sendAction({
                            name: "delete",
                            userId: user.id
                        })
                    }}>
                        <i className="fa-regular fa-trash-can i-red i-20"></i>
                    </button>
                </th>
            </tr>
        );
    }

    return (
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
                        users.map(user => <TableLine user={user} key={user.id} />)
                    }
                </tbody>
            </table>
        </main>
    );
};

export default Main;