import { destroyUserSession } from '../data/auth.server';

export function action({ request }) {
  if (request.method !== 'POST') {
    return new Response('Invalid request method', { status: 405 });
  }
  return destroyUserSession(request);
}
