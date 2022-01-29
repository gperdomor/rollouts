const axios = require('axios');
const { execSync } = require('child_process');
const { existsSync, readFileSync, writeFileSync } = require('fs');

const eventName = process.env.CI_MERGE_REQUEST_ID ? 'pull_request' : '';
const API_TOKEN = process.argv[2];
const mainBranchName = process.argv[3];
const projectId = process.argv[4];

const ENV_FILE = '.env';

let BASE_SHA;
(async () => {
  const HEAD_SHA = execSync(`git rev-parse HEAD`, { encoding: 'utf-8' }).trim();

  if (eventName === 'pull_request') {
    BASE_SHA = execSync(`git merge-base origin/${mainBranchName} HEAD`, { encoding: 'utf-8' }).trim();
  } else {
    try {
      BASE_SHA = await findSuccessfulCommit(projectId, mainBranchName);
    } catch (e) {
      process.stdout.write(e.message);
      return;
    }

    if (!BASE_SHA) {
      process.stdout.write('\n');
      process.stdout.write(`WARNING: Unable to find a successful workflow run on 'origin/${mainBranchName}'\n`);
      process.stdout.write(`We are therefore defaulting to use HEAD~1 on 'origin/${mainBranchName}'\n`);
      process.stdout.write('\n');

      BASE_SHA = execSync(`git rev-parse HEAD~1`, { encoding: 'utf-8' }).trim();
    } else {
      process.stdout.write('\n');
      process.stdout.write(`Found the last successful workflow run on 'origin/${mainBranchName}'\n`);
      process.stdout.write(`Commit: ${BASE_SHA}\n`);
    }
  }

  process.stdout.write(`NX_BASE: ${BASE_SHA}`);
  process.stdout.write('\n');
  process.stdout.write(`NX_HEAD: ${HEAD_SHA}`);
  process.stdout.write('\n');

  let lines = [];

  if (existsSync(ENV_FILE)) {
    const variables = readFileSync(ENV_FILE).toString('utf-8').split('\n');
    lines = variables.filter(
      (variable) => !(variable.startsWith('NX_BASE') || variable.startsWith('NX_HEAD') || variable === '')
    );
  }

  lines.push('', `NX_BASE=${BASE_SHA}`, `NX_HEAD=${HEAD_SHA}`, '');

  writeFileSync(ENV_FILE, lines.join('\n'), { encoding: 'utf-8' });

  process.stdout.write('\n');
  process.stdout.write('NX_BASE and NX_HEAD environment variables have been set for the current Job');
  process.stdout.write('\n');
})();

async function findSuccessfulCommit(projectId, branch) {
  const { data } = await axios.get(`https://gitlab.com/api/v4/projects/${projectId}/pipelines`, {
    params: {
      scope: 'finished',
      status: 'success',
      ref: branch,
      per_page: 50,
    },
    headers: {
      PRIVATE_TOKEN: API_TOKEN,
    },
  });

  const shas = data.map((pipeline) => pipeline.sha);
  return await findExistingCommit(shas);
}

/**
 * Get first existing commit
 * @param {string[]} commit_shas
 * @returns {string?}
 */
async function findExistingCommit(shas) {
  for (const commitSha of shas) {
    if (await commitExists(commitSha)) {
      return commitSha;
    }
  }
  return undefined;
}

/**
 * Check if given commit is valid
 * @param {string} commitSha
 * @returns {boolean}
 */
async function commitExists(commitSha) {
  try {
    execSync(`git cat-file -e ${commitSha} 2> /dev/null`);
    return true;
  } catch {
    return false;
  }
}
