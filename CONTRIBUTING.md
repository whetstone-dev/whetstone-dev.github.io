# Contributing to whetstone-dev

Thanks for wanting to build with us. Everything happens on GitHub, in the open.

## Talk to us

- **Questions, ideas or feedback:** [start a discussion](https://github.com/whetstone-dev/whetstone-dev.github.io/discussions).
- **Propose a project:** open an issue with the `project-idea` label: [propose a project](https://github.com/whetstone-dev/whetstone-dev.github.io/issues/new?labels=project-idea&title=Project%20idea%3A%20). Tell us the domain, three or four real tasks where agents fall short today, and what a great result would include.

## Our bar for every project

Use [network-engineering](https://github.com/whetstone-dev/network-engineering) as the reference.

- **Open by default.** Public repository, MIT license, SemVer releases and a CHANGELOG.
- **Tested before shared.** Generators, validators and scripts have tests that run in CI on every push.
- **Specific over generic.** Go deep on one domain. Never invent commands, flags or APIs; mark anything uncertain so people can verify it.
- **No runtime dependencies when possible.** Skills ship TypeScript that runs on plain Node (22.18 or newer) and work by copying the folder.
- **English first.** Docs, code and identifiers in English; skills tell the agent to answer in the user's language.

Open an issue first so we can agree on scope; the repository is then created under the organization.

## Improve this website

```bash
npm install
npm run dev
```

Before opening a pull request, run `npm run typecheck` and `npm run build`. Keep copy plain and factual, check both light and dark themes, and keep the layout working at 375px wide.
