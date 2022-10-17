import * as data from './data.json' assert { type: 'json' };

let jobsData = data.default;

const jobsContainer = document.querySelector('.jobs-container');

console.log(jobsData);

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
        <li>${job.role}</li>
        <li>${job.level}</li>
        ${job.languages
          .map(language => {
            return `<li>${language}</li>`;
          })
          .join(' ')}
          ${job.tools
            .map(tool => {
              return `<li>${tool}</li>`;
            })
            .join(' ')}
      </ul>
    </div>
  </div>`;
    })
    .join(' ');
}

jobsContainer.innerHTML += renderJobs();
