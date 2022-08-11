import { makeAutoObservable } from 'mobx';

interface ICard {
    name: string;
    won: boolean;
}

class GameStore {
    field: ICard[] = [];
    
    constuctor() {
        makeAutoObservable(this);
    }
    get getField(): ICard[] {
        return this.field;
    }
    set setField(field: ICard[]) {
        this.field = field;
    }

}

export {}