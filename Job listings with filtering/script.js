import * as data from './data.json' with { type: 'json' };

let jobsData = data.default;

let filterCategories = { role: '', level: '', tools: [], languages: [] };
const jobsContainer = document.querySelector('.jobs-container');
const filterBar = document.querySelector('.filter-bar');

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

function renderJobs() {
  return jobsData
    .map(job => {
      return ` <div class="job-container ${
        job.featured ? 'featured-job' : ''
      } ">
    <div class="job-info">
      <img
        class="company-logo"
        src="${job.logo}"
        alt="company-logo"
      />
      <div class="job-details">
        <div class="job-metadata-top">
          <h3 class="company-name">${job.company}</h3>
          ${job.new ? `<h5 class="new-badge">new!</h5>` : ''}  
          ${job.featured ? `<h5 class="featured-badge">featured</h5>` : ''}  
        </div>
        <h2 class="job-role">${job.position}</h2>
        <div class="job-metadata-bottom">
          <ul>
            <li class="job-posted-time">${job.postedAt}</li>
            <li class="job-contract">${job.contract}</li>
            <li class="job-location">${job.location}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="job-languages">
      <ul class="">
        <li data-role=${job.role}>${job.role}</li>
        <li data-level=${job.level}>${job.level}</li>
        ${job.languages
          .map(language => {
            return `<li data-language=${language}>${language}</li>`;
          })
          .join(' ')}
          ${job.tools
            .map(tool => {
              return `<li data-tool=${tool}>${tool}</li>`;
            })
            .join(' ')}
      </ul>
    </div>
  </div>`;
    })
    .join(' ');
}

jobsContainer.innerHTML = renderJobs();

document.addEventListener('click', addToFilterCategories);

function addToFilterCategories(event) {
  if (!event.target || event.target.localName !== 'li') return;
  filterBar.innerHTML = ' ';

  if (event.srcElement.attributes['data-role']?.value) {
    filterCategories.role = event.srcElement.attributes['data-role'].value;
  }

  if (event.srcElement.attributes['data-level']?.value) {
    filterCategories.level = event.srcElement.attributes['data-level'].value;
  }

  if (event.srcElement.attributes['data-tool']?.value) {
    // check first if it's already in the array
    if (
      filterCategories.tools.indexOf(
        event.srcElement.attributes['data-tool'].value
      ) === -1
    ) {
      filterCategories.tools.push(
        event.srcElement.attributes['data-tool'].value
      );
    }
  }

  if (event.srcElement.attributes['data-language']?.value) {
    // check first if it's already in the array
    if (
      filterCategories.languages.indexOf(
        event.srcElement.attributes['data-language'].value
      ) === -1
    ) {
      filterCategories.languages.push(
        event.srcElement.attributes['data-language'].value
      );
    }
  }

  filterJobsData();
  filterBar.innerHTML = renderFilterCategories();
  jobsContainer.innerHTML = renderJobs();
  scrollToTop();
}

function renderFilterCategories() {
  if (
    !filterCategories.role &&
    !filterCategories.level &&
    filterCategories.tools.length === 0 &&
    filterCategories.languages.length === 0
  ) {
    filterBar.classList.add('hidden');
  } else {
    filterBar.classList.remove('hidden');
  }

  return `<div class="job-languages">
        <ul class="">
       ${
         filterCategories.role &&
         `<li data-role=${filterCategories.role} >${filterCategories.role}
         <span class="icon-remove">
         <img src="./images/icon-remove.svg" alt="" />
       </span></li>`
       } 
       ${
         filterCategories.level &&
         `<li data-level=${filterCategories.level} >${filterCategories.level}
         <span class="icon-remove">
         <img src="./images/icon-remove.svg" alt="" />
       </span></li>`
       }
        ${filterCategories.languages
          .map(language => {
            return `<li data-language=${language} >
            ${language}
            <span class="icon-remove">
              <img src="./images/icon-remove.svg" alt="" />
            </span>
          </li>`;
          })
          .join('')}
          ${filterCategories.tools
            .map(tool => {
              return `<li data-tool=${tool} >
              ${tool}
              <span class="icon-remove">
                <img src="./images/icon-remove.svg" alt="" />
              </span>
            </li>`;
            })
            .join('')}
        </ul>
      </div>
      <h4 class='clear' >Clear</h4>`;
}

document.addEventListener('click', removeFromFilterCategories);

function removeFromFilterCategories(event) {
  const removeIcon = event.target.closest('.icon-remove');
  const removedCategory = event.target.closest('li');

  if (!removeIcon || removeIcon.className !== 'icon-remove' || !removedCategory)
    return;

  if (removedCategory.attributes['data-role']?.value) {
    filterCategories.role = '';
  }

  if (removedCategory.attributes['data-level']?.value) {
    filterCategories.level = '';
  }

  if (removedCategory.attributes['data-tool']?.value) {
    const toolIndex = filterCategories.tools.indexOf(
      removedCategory.attributes['data-tool'].value
    );
    filterCategories.tools.splice(toolIndex, 1);
  }

  if (removedCategory.attributes['data-language']?.value) {
    const languageIndex = filterCategories.languages.indexOf(
      removedCategory.attributes['data-language']?.value
    );
    filterCategories.languages.splice(languageIndex, 1);
  }

  filterJobsData();

  filterBar.innerHTML = renderFilterCategories();
  jobsContainer.innerHTML = renderJobs();
}

function filterJobsData() {
  jobsData = data.default;
  jobsData = jobsData
    .filter(job => {
      if (!filterCategories.level) {
        return jobsData;
      }
      return job.level === filterCategories.level;
    })
    .filter(job => {
      if (!filterCategories.role) return jobsData;
      return job.role === filterCategories.role;
    })
    .filter(job => {
      if (!filterCategories.tools) return jobsData;
      if (filterCategories.tools.every(tool => job.tools.includes(tool)))
        return job;
    })
    .filter(job => {
      if (!filterCategories.languages) return jobsData;
      if (
        filterCategories.languages.every(tool => job.languages.includes(tool))
      )
        return job;
    });
}

filterBar.addEventListener('click', clearFilterCategories);

function clearFilterCategories(event) {
  const clearElm = event.target.closest('.clear');
  if (!clearElm) return;
  filterCategories = { role: '', level: '', tools: [], languages: [] };

  filterJobsData();
  filterBar.innerHTML = renderFilterCategories();
  jobsContainer.innerHTML = renderJobs();
}
