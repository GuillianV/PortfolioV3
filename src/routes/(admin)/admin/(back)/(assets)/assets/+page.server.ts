import { action_create, action_findall, action_delete } from './action';
import type { Actions } from './$types';
export const actions: Actions = {
	create: action_create,
	findall: action_findall,
	delete: action_delete
};
