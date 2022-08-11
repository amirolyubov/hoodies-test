import { makeAutoObservable } from 'mobx';

class PlayerStore {
    name = '';
    score = 0;
    step = 0;

    constuctor() {
        makeAutoObservable(this);
    }

    get getName(): string {
        return this.name
    }
    get getScore(): number {
        return this.score
    }
    get getStep(): number {
        return this.step
    }

    set setName(name: string) {
        this.name = name
    }
    set setScore(name: string) {
        this.name = name
    }
    set setStep(name: string) {
        this.name = name
    }
}

export {}