# RoomieMatch

Student roommate matching platform. **This repository is the tested development foundation, not the complete product.** All room listings are illustrative.

## What works
- React + TypeScript frontend with budget filtering and API connectivity feedback.
- FastAPI health endpoint, explicit CORS allowlist and response security headers.
- Frontend behavior tests, backend contract/security tests, container smoke test in CI.
- GitHub Actions checks on pushes and pull requests. Successful runs produce a frontend artifact.
- A manually triggered delivery workflow packages the frontend and backend image after rerunning the checks. It does not deploy to a hosting provider.

## Local setup
Requirements: Node.js 22.12+ (Node 24 recommended), Python 3.11, Git.
Open two terminals at the repository root.

Backend (PowerShell):
```powershell
python -m venv backend/.venv
backend/.venv/Scripts/python -m pip install -r backend/requirements-dev.txt
cd backend
.venv/Scripts/python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Frontend:
```powershell
cd frontend
npm ci
npm run dev
```
Open http://localhost:5173 and press **Comprobar backend**. Vite proxies /api to port 8000.

## Verify
```powershell
cd frontend
npm test
npm run build
```
In backend: ` .venv/Scripts/python -m pytest` and `.venv/Scripts/python -m ruff check .`.

## Delivery status
CI is automated; hosting is **pending clarification** of the instructor's term "GitHub Studios".
The workflow named **Delivery package** is manual, main-branch only, runs CI first, then generates downloadable artifacts. It is delivery preparation, not a live production deployment.
Docker locally: `docker build -t roomiematch-api backend`, then `docker run --rm -p 127.0.0.1:8000:8000 roomiematch-api`.
Docker Desktop must be running. Never expose this foundation as an authenticated production service.

## Planned product work
Authentication/authorization, database and migrations, consent, room listings, chat, voluntary Big Five questionnaire, and server-side AI are not implemented yet.
Scrapy will only collect authorized sources. Benford is an exploratory aggregate analysis, not identity verification or bot detection. Big Five must not be inferred as a clinical or reliable personality assessment from social posts.
Do not commit credentials, cookies, API keys, private exports or student data. Use server-side environment secrets for future providers.

## Project links
- [Figma prototype](https://www.figma.com/design/TivaCoMdGHaqFchWRUDKqu)
- [Presentation](https://www.figma.com/slides/vmFmrh0wG2aQCfFiv7MCQc)
- [Jira](https://uce-team-ixwj9gch.atlassian.net/browse/ROOMIE)
- [Confluence](https://uce-team-ixwj9gch.atlassian.net/wiki/spaces/ROOMIE)

## Pipeline references
- [GitHub workflow artifacts](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts)
- [Docker builds in GitHub Actions](https://docs.docker.com/build/ci/github-actions/)
