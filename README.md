# Employee Resources

A simple static site for sharing internal PDFs and documentation. No build step, no server — just files.

## How it's organized

```
employee-resources/
├── index.html        the page itself
├── styles.css         styling
├── script.js           loads and filters the document list
├── documents.json    the list of documents shown on the page (edit this)
└── docs/                    the actual PDF/doc files live here
```

## Adding a new document

1. Add the file to the `docs/` folder (e.g. `docs/new-policy.pdf`).
2. Open `documents.json` and add an entry:

```json
{
  "title": "New Policy",
  "category": "Policies",
  "description": "One sentence describing what this is.",
  "file": "docs/new-policy.pdf",
  "updated": "2026-09-14"
}
```

3. Commit and push. That's it — no code changes needed.

- `category` can be any short label (HR, IT, Benefits, Policies, etc.) — the filter tabs at the top of the page are generated automatically from whatever categories appear in the file.
- `updated` should be in `YYYY-MM-DD` format so it sorts and displays correctly.
- File types other than PDF work fine too (`.docx`, `.xlsx`, etc.) — just point `file` at the right path.

## Removing or updating a document

- To update a file, replace it in `docs/` (same filename is easiest) and update the `updated` date in `documents.json`.
- To remove one, delete its entry from `documents.json`. You can leave the file in `docs/` or delete it too — either is fine.

## Deploying with GitHub Pages

1. Push all these files to the root of your repository (or to a `docs/` branch folder — see note below if you do that).
2. In your repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch".
4. Choose the branch (usually `main`) and the folder (`/root`), then save.
5. GitHub will give you a URL like `https://your-org.github.io/employee-resources/` within a minute or two.

**Note on folder naming:** this project already uses a folder called `docs/` for the PDF files themselves. If you plan to use GitHub Pages' "docs folder" deployment option (which serves the site *from* a folder literally named `docs/`), rename the PDF folder in this project to something else (e.g. `files/`) and update the `file` paths in `documents.json` to match, so the two don't collide. Deploying from the branch root (as in the steps above) avoids this entirely and is the simpler option.

## Access control

GitHub Pages sites are public by default, even for private repos, unless you're on GitHub Enterprise Cloud with Pages access control enabled. If these documents shouldn't be visible to the public internet, either:
- enable Pages visibility restrictions in your organization's GitHub Enterprise settings, or
- host this internally instead (e.g. an internal server, SharePoint, or Notion) rather than GitHub Pages.
