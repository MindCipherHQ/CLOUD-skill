# Overwhelm and Prioritisation Stuck — Maintainer Reference

Evidence-informed coaching protocol for when users cannot prioritise because everything feels equally important, or conversations loop on focus selection. Runtime instructions live in `SKILL.md`; this file holds the fuller rationale.

## Why prioritising is hard (ADHD and beyond)

Executive function research (Barkley, Brown) and ADHD coaching literature describe impairments in planning, working memory, and prioritisation. The ADHD brain often prioritises by interest, novelty, and urgency — not abstract importance. "What's most important?" overloads executive function and induces looping.

This protocol applies to anyone overwhelmed by options (burnout, anxiety, decision fatigue), not only ADHD users. ADHD-specific adaptations remain in the `adhd-coaching` profile skill.

## Core principles

- **Externalise** — get thoughts out of the user's head into a visible list.
- **Reduce cognitive load** — small chunks, not whole-life ranking.
- **Structure, not pressure** — bucket-sort and forced choice instead of "pick one."
- **Limit active goals** — 3/month, 1–2 experiments/week; parking lot for the rest.
- **Concrete and time-bound** — 10–20 minute steps scheduled in the next 7 days.
- **Collaborate** — scaffold actively when looping; offer structure with permission.

## Eight-step process (session arc)

1. **Externalise** — brain dump; group into themes.
2. **Bucket-sort** — Must this month / Important not this month / Nice to have / Not now (or Eisenhower simplified).
3. **Forced choice** — pairwise, 7-day constraint, or pick three — never global rank.
4. **Values tiebreaker** — only if still stuck.
5. **Tiny experiment** — smallest meaningful step, scheduled.
6. **Capacity rule** — explicit limits and parking lot.
7. **Loop escape** — meta-comment; shift to process; offer recommendation with permission.
8. **Review** — evidence of progress; metacognitive learning for next time.

## Example rework of "what's most important?"

1. Capture everything visually.
2. Sort into "must this month" vs "can wait."
3. From "this month," which three would reduce daily stress most if they moved a little?
4. For this week only, which one small experiment?
5. What 15–20 minute step, and when exactly?

## Sources

- CHADD coaching guidance: https://chadd.org/about-adhd/coaching/
- ADHD Coaches Organization: https://www.adhdcoaches.org
- Rula ADHD prioritising: https://www.rula.com/blog/adhd-prioritizing/
- Tandem ADHD productivity coaching: https://tandemcoach.co/adhd-productivity-coaching-work-strategies/
- ADDitude coaching life cycle: https://www.additudemag.com/adhd-coaching-stages-of-life-cycle/

## Integration in an AI coach

- **Kind:** core (router-selected, not profile toggle).
- **Cross-ref:** `adhd-coaching` profile skill points here when prioritisation loops.
- **Deferral:** `grow-goal` must not use abstract global-rank questions when many goals and no choice.
- **Router:** prefer `priority-stuck` over `grow-goal` when stuck signals present.
