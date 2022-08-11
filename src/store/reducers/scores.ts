import { makeAutoObservable } from 'mobx';

interface IScore {
    name: string;
    score: number;
}
class ScoresStore {
    scores: IScore[] = []

    constuctor() {
        makeAutoObservable(this);
    }

    get getScores(): IScore[] {
        return this.scores
    }

    set setScores(scores: IScore[]) {
        this.scores = scores
    }
}

export {}