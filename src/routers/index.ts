import { z } from 'zod';
import { publicProcedure, router } from '..';

let currentId = 2;

export interface User {
  id: number;
  name: {
    first: string;
    middle?: string | undefined;
    last: string;
  };
}

const USERS: User[] = [
  {
    id: 1,
    name: {
      first: 'John',
      last: 'Doe',
    },
  },
  {
    id: 2,
    name: {
      first: 'Robert',
      middle: 'Jacob',
      last: 'Smith',
    },
  },
];

export const appRouter = router({
  getUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      const { id } = input;
      return USERS.find(user => user.id === id);
    }),
  addUser: publicProcedure
    .input(
      z.object({
        name: z.object({
          first: z.string(),
          middle: z.optional(z.string()),
          last: z.string(),
        }),
      }),
    )
    .mutation(req => {
      const { name } = req.input;
      const newUser = {
        id: ++currentId,
        name,
      } as User; // HACK: we shouldn't need to coerce here.
      USERS.push(newUser);
      return newUser;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
