import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMainState } from './index';

const selectMainSelector = createFeatureSelector<IMainState>('main');

export const selectRegistered = createSelector(selectMainSelector, s => s.registered);
