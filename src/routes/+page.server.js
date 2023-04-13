import authenticateWithCode from '../lib/authenticateWithCode';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, request }) {
  let token = null;
  if (request.url.includes('code=')) {
    token = authenticateWithCode(fetch, request.url)
  }

  return {
    title: 'Foo bar!',
    content: 'This is server data',
    token
  };

}