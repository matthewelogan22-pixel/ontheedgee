# Preview-site maintenance tools

Utilities for the ~60 hand-built preview sites in `public/preview/`. Each page
is a single self-contained HTML file with base64-embedded photos, which is what
makes these scripts necessary — you can't just run a linter over them.

Run with the full Python path on this machine:

```
/c/Users/Admin/AppData/Local/Programs/Python/Python313/python.exe tools/<script>.py
```

## The one rule that matters

**Never match a bare word against these files.** Base64 payloads use the
alphabet `A-Za-z0-9+/=`, so letter runs inside image data will match plain
words and a careless `re.sub` will silently corrupt photos.

Every script here either strips payloads before scanning
(`data:image/...;base64,[A-Za-z0-9+/=]+` → `IMG`) or anchors matches on `>`
and `<`. All of them assert the `base64,` count is unchanged before writing.
Keep that invariant in anything new.

---

## `audit-previews.py`

Read-only. Reports across every preview:

- **[A]** identical photos shared between different businesses — the signal
  that an agent reskinned a page instead of building fresh
- **[B]** the same photo used twice within one page
- **[C]** credential / years-in-trade claims in visible copy
- **[D]** page weight, flagging anything over 1.5 MB
- **[E]** the heaviest individual images

### Reading section [C] correctly

A hit is **not** automatically a problem. Three kinds are legitimate and
should be left alone:

- FAQ questions that *ask* about licensing — "Are you licensed and insured?"
- true statements about an industry — "Scaffolding in NSW is licensed work"
- placeholder copy inviting the business to supply real details

And a hit that *is* a claim about the business is **not** automatically false.
On 2026-09-25 these were checked against independent public listings and
turned out to be accurate: Cohoes Locksmiths (1954, 72 years), Katherine Sign
Management (25 years), Tasmanian Asphalt (45 years combined), The Upholsterer
(fully qualified, 25+ years).

**Verify before stripping.** Removing a true claim costs the business its best
selling point — Cohoes' seventy years in one shopfront is the whole pitch.
Search the business name plus the claim; Yellow Pages, Localsearch and tourism
listings usually settle it in one query.

Known blind spots: the regex only catches digits, so spelled-out numbers
("Thirty years") slip through, as do claims split across sibling elements
(`<strong>25+</strong><span>Years in the trade</span>`), which only become
visible once tags are stripped.

## `slim-images.py`

Recompresses embedded photos. Dry run by default; `--apply` writes.

Caps the largest image on a page at 1100px wide and the rest at 800px, then
re-encodes as progressive JPEG, stepping quality from 76 down to 58 until each
fits a 150 KB budget. Never replaces an image with a larger one, and preserves
aspect ratio.

First run took the collection from 81.1 MB to 28.2 MB — `tasmanian-asphalt-services`
alone went 5198 KB → 784 KB. Needs Pillow (`pip install Pillow`).

## `add-og-tags.py`

Adds OpenGraph and Twitter card tags so a pasted link renders a card instead of
a bare URL. Idempotent — skips any file that already has `og:title`. Takes file
paths as arguments.

Deliberately sets no `og:image`: the right image is a screenshot of the
business's own page, and On The Edge branding there would make the card look
like an agency ad rather than their site.

---

## Regenerating the reference template

`_reference-template.html` is a base64-stripped copy of a finished page, kept
so agents can study structure without loading ~150k tokens of image data:

```
perl -pe 's/data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+/data:image\/$1;base64,PLACEHOLDER/g' \
  public/preview/ace-electrical.html > _reference-template.html
```

Note its CSS predates the current standard — it has no transitions, easing
curves or focus states at all. Use it for structure, not for the quality bar.
