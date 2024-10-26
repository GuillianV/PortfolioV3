import { Lucia } from 'lucia';
import { prisma } from '$lib/server/prisma';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';

const adapter = new PrismaAdapter(prisma.session, prisma.user);
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: true
		}
	},
	//@ts-expect-error: send username
	getUserAttributes: ({ username }) => {
		return {
			username
		};
	}
});
