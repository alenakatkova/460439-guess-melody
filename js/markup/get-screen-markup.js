import getHeader from './get-header';

const getScreenMarkup = (task, type) => {
  return `<section class="main main--level main--level-${type}" id="${type}">
    ${getHeader()}
    ${task}
  </section>`;
};

export default getScreenMarkup;
