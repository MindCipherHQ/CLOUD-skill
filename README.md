# CLOUD Wellbeing Coaching Skill

CLOUD is a portable, Markdown-first, evidence-informed wellbeing coaching skill for AI agents. It provides brief, practical coaching for reflection, goals, stress, boundaries, behaviour change, strengths, and realistic next steps.

It is not therapy, clinical care, diagnosis, treatment, crisis support, or a replacement for professional care.

## What CLOUD means

The **CLOUD** framework was created by Dr Lindsay Demers. The skill uses its five domains quietly and compassionately; it should not be imposed on or diagnosed onto a person.

- **Construct** — clarify what is within someone’s control, their boundaries, and more assertive ways to communicate.
- **Lessen** — soften shame, self-doubt, and harsh self-judgment through a compassionate, non-blaming stance.
- **Observe** — notice emotional regulation and self-soothing needs as learnable skills rather than personal failings.
- **Utilize** — work with real energy, sleep, health, disability, pain, caregiving, workload, and the true cost of tasks.
- **Determine** — distinguish first-hand evidence from inherited stories with humility, without judging cultural or religious beliefs.

## Install or use it

Use the path that fits the agent:

| Agent or use case | Use this |
| --- | --- |
| Skill-aware coding agents | Give the agent this repository and start with the root [`SKILL.md`](SKILL.md). It routes to the relevant canonical modules in `skills/`. |
| Claude plugin installations | Use the skill-only plugin at [`adapters/claude/cloud`](adapters/claude/cloud). It follows Claude’s plugin layout. |
| ChatGPT Projects or any chat with uploaded instructions | Upload or paste [`dist/cloud-starter.md`](dist/cloud-starter.md). It is the compact, safe fallback. |
| Agent host with dynamic retrieval | Read [`manifest.json`](manifest.json), always load system modules, route core modules using `use_when`, and load neurodiversity modules only with knowledge and consent. |

The repository URL is a portable distribution link, but different agents install skills differently. A host that cannot read repository files should use the compact starter file rather than the complete library.

## Repository layout

```text
SKILL.md                         universal entry point
skills/system/                   always-on coaching and safety contracts
skills/core/                     routed coaching methods
skills/optional/neurodiversity/  consent-based adaptations
adapters/claude/cloud/           Claude skill-only plugin
dist/cloud-starter.md            compact fallback for uploads or custom instructions
dist/cloud-complete.md           generated full library; not the default prompt
```

## Design boundaries

- Keep chats short by default: one useful shift, insight, or next step.
- The person owns their goals, choices, pace, and commitments.
- Do not turn wellbeing into productivity pressure; rest, recovery, support, and boundaries are valid outcomes.
- Do not infer diagnoses, trauma, neurotype, or crisis from weak signals.
- For immediate danger or intent to harm self or others, pause normal coaching and encourage local emergency help or a trusted person nearby. Do not invent crisis contacts.
- Do not imply confidentiality or memory beyond what the host agent genuinely provides.

## Build and validate

Requires Node.js 22 and a standard `tar` executable for release packaging.

```bash
npm run build
npm run check
npm run release
```

`npm run build` regenerates `manifest.json` and `dist/cloud-complete.md`. `npm run check` fails if generated files are stale or skill metadata is invalid. `npm run release` creates the versioned archive and `SHA256SUMS`.

The scripts are maintainer tooling only. The coaching skill itself is Markdown.

## Licence and attribution

Written skills and documentation use [CC BY 4.0](LICENSE-CONTENT); maintainer scripts use [Apache-2.0](LICENSE-CODE). CLOUD was created by Dr Lindsay Demers and is included with her permission. See [NOTICE.md](NOTICE.md), [ATTRIBUTION.md](ATTRIBUTION.md), [SOURCES.md](SOURCES.md), and [DISCLAIMER.md](DISCLAIMER.md) before redistributing or adapting the material.
