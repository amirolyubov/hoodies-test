import React, { useState, useEffect } from "react";
import { generateId } from "../../utils";
import './style.css';

const cards = [
    '1a', '1b', '1c', '1d',
    '2a', '2b', '2c', '2d',
    '3a', '3b', '3c', '3d',
    '4a', '4b', '4c', '4d',
    '5a', '5b',
]

interface ICard {
    id: string;
    name: string;
    flipped: boolean;
    matched: boolean;
}

const field = cards.reduce((acc: ICard[], current: string) => [...acc, { name: current, id: generateId(), flipped: false, matched: false }, { name: current, id: generateId(), flipped: false, matched: false }], []).sort(() => Math.random() < 0.5 ? -1 : 1);

interface ICardProps {
    card: ICard;
    onClick: (card: ICard) => void;
}
const Card = ({ card, onClick }: ICardProps) => {
    return (
        <div className="card" onClick={() => onClick(card)}>
            {
                card.flipped 
                ? <div className="card-back">{card.name}</div>
                : <div className="card-front"></div>
            }
        </div>
    )
}
const CardEmpty = () => {
    return (
        <div className="card-empty"></div>
    )
}

const Game = () => {
    const [ cards, setCards ] = useState<ICard[]>(field);
    const [ playingPair, setPlayingPair ] = useState<(ICard)[]>([]);
    const [ isGameBlocked, setGameBlocked ] = useState<boolean>(false);
    const [ steps, updateSteps ] = useState<number>(0);
    const [ time, updateTime ] = useState<number>(0);

    function handleCardClick(card: ICard) {
        if (!isGameBlocked) {
            setCards(cards.map(c => {
                if (c.id === card.id) {
                    return { ...c, flipped: !c.flipped };
                }
                return c;
            }));
        }
    }

    useEffect(() => {
        const timeInterval = setInterval(() => updateTime(time => time + 1), 1000);

        return () => {
            clearInterval(timeInterval);
        }
    }, [])

    useEffect(() => {
        if (playingPair.length === 2) {
            setGameBlocked(true);
            
            if (playingPair[0].name === playingPair[1].name) {
                setCards(_cards =>_cards.map(c => {
                    if (c.id === playingPair[0].id || c.id === playingPair[1].id) {
                        return { ...c, matched: true };
                    }
                    return c;
                }));
            }
            setTimeout(() => {
                setPlayingPair([]);
                setCards(_cards => _cards.map(c => {
                    return { ...c, flipped: false };
                }))
                setGameBlocked(false);
            }, 1500);
            updateSteps(steps => steps + 1);
        }
    } , [playingPair]);

    useEffect(() => {
        setPlayingPair(cards.filter(c => c.flipped && !c.matched));
    } , [cards]);

    return (
        <div className='field-wrapper'>
            <div className="field">
                {
                    cards.map((card, index) => card.matched
                    ? <CardEmpty key={index} />
                    : <Card key={index} card={card} onClick={handleCardClick} />
                    )
                }
            </div>
            <div className="game-info">
                <p>steps</p>
                <p>{steps}</p>
                <p>time</p>
                <p>{time}</p>
            </div>
        </div>
    );
}

export default Game;  
