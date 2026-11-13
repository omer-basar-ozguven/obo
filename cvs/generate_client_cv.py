"""
Generate the one-page client-facing CV (Forward Deployed Engineer, Solutions Engineer, Technical Consultant).
Reuses the design helpers from generate_master_cv.py.
Run: python3 cvs/generate_client_cv.py
"""

from generate_master_cv import (
    MUTED, NAVY, PRODUCTS, RIGHT_TAB,
    add_header, add_summary, bullets, client_header, new_document, product, run,
    save, section_header, skill_row, spacing, tab_stop, to_pdf,
)

FILENAME = "CV_SolutionsEngineer_OmerBasarOzguven.docx"

SUMMARY = (
    "Software engineer who works directly with clients, most of them non-technical, turning what they need into "
    "technical requirements and then building it. At Bronix I worked with 30+ clients, from exchange office owners "
    "and truck drivers to NATO, and handled discovery, scoping, proposals, and delivery myself. I build across "
    "mobile, web, backend, and AI agents, and I work in English and Turkish."
)

FOUNDER = {
    "title": "Co-Founder & Lead Software Engineer",
    "date": "2021 – 2026",
    "org": "Bronix Software Inc.  ·  30+ clients, 50+ completed projects",
    "bullets": [
        "Ran discovery calls and workshops with non-technical clients and turned their needs into technical specs.",
        "Scoped projects, estimated timelines, wrote proposals, and led delivery through demos and handover.",
        "Built web and mobile apps for clients in education, online retail, currency exchange, and finance content "
        "creators.",
        "Built YükAl for truck drivers and cargo owners, reaching 10,000+ registered carriers and 600,000+ listings.",
        "Built a pipeline for NATO that let commanders simulate and analyze their communications (details "
        "confidential).",
    ],
}

CONSULTING = {
    "title": "Consulting Engineer",
    "date": "2022 – 2026",
    "clients": [
        {
            "name": "Placemaking AI",
            "blurb": "Real estate intelligence, 106M+ points of interest",
            "bullets": [
                "Worked with non-technical founders to turn their goals into agent harnesses, AI tools, and "
                "microservices.",
            ],
        },
        {
            "name": "Mole",
            "blurb": "AI utility detection used by government agencies",
            "bullets": [
                "Built FastAPI inference and Supabase infrastructure for a deep learning ensemble on GPR survey data.",
            ],
        },
    ],
}

SELECTED_PRODUCTS = {"YükAl", "Walkable"}

SKILLS = [
    ("Client Work",  ["Requirements Gathering", "Discovery Workshops", "Solution Design", "Scoping & Estimation",
                      "Technical Proposals", "Demos"]),
    ("Engineering",  ["TypeScript", "Python", "Go", "Dart", "Flutter", "Next.js", "Node.js", "FastAPI"]),
    ("AI & Agents",  ["VoltAgent", "LangChain", "OpenRouter", "Claude API", "OpenAI API"]),
    ("Data & Infra", ["PostgreSQL", "Supabase", "Firebase", "Docker", "AWS"]),
    ("P2P",          ["libp2p", "IPFS", "WebRTC"]),
    ("Languages",    ["English", "Turkish"]),
]


def add_experience(doc):
    section_header(doc, FOUNDER["title"], FOUNDER["date"])
    client_header(doc, FOUNDER["org"], None, before=1)
    bullets(doc, FOUNDER["bullets"])

    section_header(doc, CONSULTING["title"], CONSULTING["date"])
    for i, client in enumerate(CONSULTING["clients"]):
        client_header(doc, client["name"], client["blurb"], before=1 if i == 0 else 5)
        bullets(doc, client["bullets"])


def build():
    doc = new_document()
    add_header(doc)
    add_summary(doc, SUMMARY)
    add_experience(doc)

    section_header(doc, "Selected Products")
    for proj in PRODUCTS:
        if proj["name"] in SELECTED_PRODUCTS:
            product(doc, proj)

    section_header(doc, "Skills")
    for cat, items in SKILLS:
        skill_row(doc, cat, items)

    section_header(doc, "Education & Awards")
    p = doc.add_paragraph()
    spacing(p, before=3, after=0)
    tab_stop(p, RIGHT_TAB, "right")
    run(p, "B.Sc. Mechanical Engineering", size=10, bold=True)
    run(p, "   Bilkent University, Ankara", size=9.5, italic=True, color=NAVY)
    run(p, "\t2016 – 2021", size=9, color=MUTED)

    p = doc.add_paragraph()
    spacing(p, before=3, after=0)
    tab_stop(p, RIGHT_TAB, "right")
    run(p, "Best Paper Award, TORK 2019", size=10, bold=True)
    run(p, "   Foldable modular miniature robots research", size=9.5, italic=True, color=NAVY)
    run(p, "\t2019", size=9, color=MUTED)
    return save(doc, FILENAME)


if __name__ == "__main__":
    to_pdf(build())
