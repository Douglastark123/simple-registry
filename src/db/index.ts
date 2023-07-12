import Customer from "../classes/Customer";

type DB_Props = {
    users: Customer[];
}

const db: DB_Props = {
    users: [
        new Customer("Michael", "1996-11-23"),
        new Customer("Astrus", "2000-04-20"),
        new Customer("Erin", "2000-04-20")
    ]
};

export default db;