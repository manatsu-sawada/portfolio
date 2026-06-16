# Design Skill Selection

## Project Purpose

This portfolio is for IT career transition activities and skill appeal.
It should communicate the owner's strengths, projects, learning process, and practical value clearly, while still feeling creative enough to be memorable.

Primary priorities:

- Make information easy to scan for recruiters and hiring engineers.
- Present skills through concrete project stories, not only lists.
- Keep the visual style creative but accessible and trustworthy.
- Preserve responsive readability on mobile and desktop.

## Source

- Repository: https://github.com/bergside/awesome-design-skills
- Format: each design skill provides `SKILL.md` for AI-agent implementation guidance and `DESIGN.md` for human-readable design intent.

## Compared Skills

| Skill | Strength | Risk | Fit |
| --- | --- | --- | --- |
| `creative` | Strong personality, expressive typography, memorable visual energy. | Can become too playful for hiring contexts if not restrained. | Good for originality, weaker for professional clarity. |
| `professional` | Business-ready, structured, trustworthy, compact typography. | Can feel generic and less distinctive for a creative portfolio. | Good for credibility, weaker for memorability. |
| `storytelling` | Uses visuals, copy, and interaction to guide the reader through a coherent journey. | Needs disciplined layout so the narrative does not reduce scanability. | Best balance for career-change portfolio: clear information plus memorable presentation. |

## Selected Skill

Selected: `storytelling`

Reason: the project needs to explain a career transition, skills, and portfolio work as a convincing journey. `storytelling` supports a clear narrative arc while still allowing creative visual treatment. During implementation, use it with a restraint rule: clarity, accessibility, and recruiter scanability come before decorative novelty.

## Implementation Notes

- Reference `.codex/design-skills/storytelling/SKILL.md` before major UI or copy changes.
- Use `.codex/design-skills/storytelling/DESIGN.md` for tokens and design intent.
- Keep sections narrative but skimmable: hero, current target role, core skills, project case studies, learning evidence, contact.
- Use project evidence and outcomes as the main content driver.
- Apply WCAG 2.2 AA, visible focus states, and keyboard-friendly interactions.
