export function filenameToSlug(filename) {
  const chunks = filename.replace('.html.markdown', '').split('-');
  return `${chunks.shift()}/${chunks.shift()}/${chunks.shift()}/${chunks.join('-')}`;
}

export function filenameToParams(filename) {
  const chunks = filename.replace('.html.markdown', '').split('-');
  const params = {
    year: chunks.shift(),
    month: chunks.shift(),
    day: chunks.shift(),
    slug: chunks.join('-'),
  };


  return params;
}

export function slugToPath(year, month, day, slug) {
  return `${year}-${month}-${day}-${slug}`;
}
