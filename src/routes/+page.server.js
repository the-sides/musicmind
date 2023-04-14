import authenticateWithCode from '../lib/authenticateWithCode';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url }) {
  let token = null;
  if (url.searchParams.get('code')) {
    token = await authenticateWithCode(fetch, url.searchParams.get('code'))
  }

  return {
    title: 'Foo bar!',
    content: 'This is server data',
    tokenObj: token
  };

}