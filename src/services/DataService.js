import { db } from '../config/db';
import { Actions } from 'react-native-router-flux';

export const addStudent =  (name, matricno, major, year, status) => {
    db.ref('/students').child(matricno).set({
        name: name,
        matricno: matricno,
        major: major,
        year: year,
        status: status
    }, () => Actions.ListScreen());
}

export const updateStudent =  (name, matricno, major, year, status) => {
    db.ref('/students').child(matricno).update({
        name: name,
        matricno: matricno,
        major: major,
        year: year,
        status: status
    }, () => Actions.ListScreen());
}

export const removeStudent =  (matricno) => {
    db.ref('/students').child(matricno).remove();
    Actions.ListScreen();
}