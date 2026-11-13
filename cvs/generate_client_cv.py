"""
Generate the two-page client-facing CV (Forward Deployed Engineer, Solutions Engineer, Technical Consultant).
Reuses the design helpers and the shared content from generate_master_cv.py.
Run: python3 cvs/generate_client_cv.py
"""

import generate_master_cv as master
from generate_master_cv import (
    MUTED, NAVY, PRODUCTS, RIGHT_TAB, EDUCATION, RESEARCH,
    add_header, add_page_footer, add_summary, bullet, bullets, client_header, entry_header, new_document,
    product, run, save, section_header, skill_row, spacing, tab_stop, to_pdf,
)

FILENAME = "CV_SolutionsEngineer_OmerBasarOzguven.docx"

SUMMARY = (
    "Software engineer who works directly with clients, most of them non-technical, turning what they need into "
    "technical requirements and then building it. At Bronix I worked with 30+ clients, from exchange office owners "
    "and truck drivers to NATO, and handled discovery, scoping, proposals, and delivery myself. I build across "
    "mobile, web, backend, and AI agents, and I work in English and Turkish."
)

FOUNDER_CLIENT_BULLETS = [
    "Ran discovery calls and workshops with non-technical clients and turned their needs into technical specs.",
    "Scoped projects, estimated timelines, wrote proposals, and led delivery through demos and handover.",
    "Built web and mobile apps for clients in education, online retail, currency exchange, and finance content "
    "creators.",
    "Built YükAl with its non-technical co-founders for truck drivers and cargo owners, reaching 10,000+ "
    "registered carriers and 600,000+ listings.",
    "Built a pipeline for NATO that let commanders simulate and analyze their communications (details "
    "confidential).",
]

FOUNDER_ORG = "Bronix Software Inc.  ·  30+ clients, 50+ completed projects"

CLIENT_INTROS = {
    "Placemaking AI": "Worked with the non-technical founders to turn their product goals into technical requirements.",
    "Mole": "Worked with the non-technical founders to define what the platform needed and how to build it.",
}

EXCLUDED_PRODUCTS = {"SeriesStudio", "Walkable"}

SKILLS = [
    ("Client Work", ["Requirements Gathering", "Discovery Workshops", "Solution Design", "Scoping & Estimation",
                     "Technical Proposals", "Demos"]),
    *master.SKILLS,
    ("Spoken",      ["English", "Turkish"]),
]


def add_experience(doc):
    section_header(doc, master.FOUNDER["title"], master.FOUNDER["date"])
    client_header(doc, FOUNDER_ORG, None, before=1)
    bullets(doc, FOUNDER_CLIENT_BULLETS + master.FOUNDER["bullets"])

    consulting = master.CONSULTING
    section_header(doc, consulting["title"], consulting["date"])
    for i, client in enumerate(consulting["clients"]):
        client_header(doc, client["name"], client["blurb"], before=1 if i == 0 else 5)
        bullets(doc, [CLIENT_INTROS[client["name"]], *client["bullets"]])


def build():
    doc = new_document()
    add_header(doc)
    add_summary(doc, SUMMARY)
    add_experience(doc)

    section_header(doc, "Products")
    for proj in PRODUCTS:
        if proj["name"] not in EXCLUDED_PRODUCTS:
            product(doc, proj)

    section_header(doc, "Skills")
    for cat, items in SKILLS:
        skill_row(doc, cat, items)

    section_header(doc, "Education")
    for ed in EDUCATION:
        p = doc.add_paragraph()
        spacing(p, before=3, after=0)
        tab_stop(p, RIGHT_TAB, "right")
        run(p, ed["degree"], size=10, bold=True)
        run(p, "   " + ed["school"], size=9.5, italic=True, color=NAVY)
        run(p, "\t" + ed["date"], size=9, color=MUTED)

    section_header(doc, "Research & Awards")
    entry_header(doc, RESEARCH["title"], RESEARCH["org"], RESEARCH["date"])
    for i, b in enumerate(RESEARCH["bullets"]):
        bullet(doc, b, keep_next=(i == 0))

    add_page_footer(doc)
    return save(doc, FILENAME)


if __name__ == "__main__":
    to_pdf(build())
