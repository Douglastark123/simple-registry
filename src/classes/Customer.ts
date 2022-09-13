import { v4 as uuidv4 } from 'uuid';
import { date } from '../types';

export default class Customer {
    readonly #id: string = uuidv4();
    #name: string;
    #birth: date;

    constructor(name: string, birth: date) {
        this.#name = name;
        this.#birth = birth;
    }

    public get id() {
        return this.#id;
    }

    public get name() {
        return this.#name;
    }

    public set setName(name: string) {
        this.#name = name;
    }

    public get birth() {
        return this.#birth;
    }

    public set setBirth(birth: date) {
        this.#birth = birth;
    }
}