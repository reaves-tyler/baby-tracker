export interface Item {
    _id: string;
    __v: number;
    time: string;
    type: ItemTypes;
}

export const enum ItemTypes {
    Feed = 'Feed',
    Pump = 'Pump',
    Sleep = 'Sleep',
    Wake = 'Wake',
    Pee = 'Pee',
    Poo = 'Poo',
}

import type { NextFetchEvent } from 'next/server';
import type { NextRequest } from 'next/server';

export type Middleware = (
    request: NextRequest,
    event: NextFetchEvent
) => Promise<Response | undefined> | Response | undefined;
