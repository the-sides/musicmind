
/** @type {import('./$types').PageLoad} */
export async function load(params) {

  return {
    title: 'Foo bar!',
    content: 'This is server data'
  };

}