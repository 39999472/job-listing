
let allJobs = [];

async function fetchJobListings() {
    try {
        const response = await fetch('data.json');
        const jobs = await response.json();
        allJobs = jobs;
        displayJobs(jobs);
    } catch (error) {
        console.error('Error fetching job listings:', error);
    }
}

function displayJobs(jobs) {
    const container = document.getElementById('job-listings');
    container.innerHTML = '';
    jobs.forEach(job => {
        const jobListing = document.createElement('div');
        jobListing.classList.add('job-listing');

        const jobInfo = document.createElement('div');
        jobInfo.classList.add('job-info');

        const company = document.createElement('h3');
        company.innerHTML = `${job.company} ${job.new ? '<span class="new">NEW!</span>' : ''} ${job.featured ? '<span class="featured">FEATURED</span>' : ''}`;
        jobInfo.appendChild(company);

        const position = document.createElement('h4');
        position.textContent = job.position;
        jobInfo.appendChild(position);

        const details = document.createElement('p');
        details.textContent = `${job.postedAt} • ${job.contract} • ${job.location}`;
        jobInfo.appendChild(details);

        const tags = document.createElement('div');
        tags.classList.add('tags');

        job.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.classList.add('tag');
            tagSpan.textContent = tag;
            tagSpan.addEventListener('click', () => filterByTag(tag));
            tags.appendChild(tagSpan);
        });

        jobListing.appendChild(jobInfo);
        jobListing.appendChild(tags);
        container.appendChild(jobListing);
    });
}

function filterJobs() {
    const jobType = document.getElementById('job-type-filter').value;
    const jobLevel = document.getElementById('job-level-filter').value;

    let filteredJobs = allJobs;

    if (jobType) {
        filteredJobs = filteredJobs.filter(job => job.tags.includes(jobType));
    }

    if (jobLevel) {
        filteredJobs = filteredJobs.filter(job => job.tags.includes(jobLevel));
    }

    displayJobs(filteredJobs);
}

function filterByTag(tag) {
    const filteredJobs = allJobs.filter(job => job.tags.includes(tag));
    displayJobs(filteredJobs);
}

document.getElementById('job-type-filter').addEventListener('change', filterJobs);
document.getElementById('job-level-filter').addEventListener('change', filterJobs);

fetchJobListings();