"""
Generate the one-page CV tailored to Tether's AI Harness Engineer role.
Reuses the design helpers from generate_master_cv.py.
Run: python3 generate_tether_cv.py
"""

from generate_master_cv import (
    INK, MUTED, NAVY, RIGHT_TAB,
    add_header, add_summary, bullet, new_document, product, run,
    save, section_header, skill_row, spacing, tab_stop, to_pdf,
)

FILENAME = "CV_Tether_AIHarnessEngineer_OmerBasarOzguven.docx"

SUMMARY = (
    "Software engineer with five years of production experience, most recently on agent harnesses and AI "
    "tools. At Placemaking AI I built TypeScript agent harnesses with tool calling, agent loops, and structured "
    "outputs over 106M+ points of interest, plus the microservices behind them. I design for model errors, "
    "timeouts, and flaky networks, and I have built microservices and AI tools over EVM and Solana data for web3 "
    "clients using libp2p, IPFS, and WebRTC."
)

CONSULTING = {
    "title": "Consulting Engineer",
    "date": "2022 – 2026",
    "clients": [
        {
            "name": "Placemaking AI",
            "blurb": "Real estate intelligence, 106M+ points of interest",
            "bullets": [
                "Built TypeScript agent harnesses with tool calling, agent loops, and structured outputs over the "
                "POI data.",
                "Designed AI tools and modules that expose the platform's data to users and to other services.",
                "Built the microservices behind the AI layer, plus the big data pipelines and data science workflows "
                "feeding it (Python, FastAPI, LangChain, AWS).",
            ],
        },
        {
            "name": "Web3 clients",
            "blurb": "Numerous consulting projects",
            "bullets": [
                "Led the microservices and LLM based AI tools over EVM and Solana data, in TypeScript and Python.",
                "Worked with P2P protocols: libp2p, IPFS, and WebRTC.",
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

FOUNDER = {
    "title": "Co-Founder & Lead Software Engineer",
    "date": "2021 – 2026",
    "org": "Bronix  ·  50+ completed projects",
    "bullets": [
        "Built VoltAgent agent harnesses with tool calling, multi step loops, context management, and structured "
        "outputs.",
        "Shipped LLM features across 10+ apps via OpenRouter, Claude, and OpenAI, with retries, timeouts, model "
        "fallbacks, and graceful degradation when a provider fails.",
        "Led engineering on 10+ products from architecture to launch on the App Store, Google Play, and the web.",
    ],
}

PROJECTS = [
    {
        "name": "SeriesStudio",
        "url": "https://github.com/omer-basar-ozguven/voltagent-series-studio",
        "status": "Open Source",
        "desc": "Multi agent pipeline chaining script, storyboard, and render agents to turn a series idea into "
                "full video episodes.",
        "tech": ["TypeScript", "VoltAgent", "Docker"],
    },
    {
        "name": "Walkable",
        "url": "https://walkable.bronixlabs.com/",
        "status": "Live on iOS",
        "desc": "Agentic pipeline that scores streets by walkability and safety. No account, and location never "
                "leaves the device.",
        "tech": ["VoltAgent", "Flutter", "Firebase"],
    },
    {
        "name": "Banana Labs",
        "url": "https://bananalabs.co",
        "status": "Live on Web",
        "desc": "AI creative studio that runs several generative models in parallel and compares results side by side.",
        "tech": ["Next.js", "Express.js", "Fal.ai", "OpenRouter"],
    },
]

SKILLS = [
    ("AI & Agents",     ["Agent Harnesses", "Tool Calling", "Agent Loops", "Context Management",
                         "Structured Outputs", "VoltAgent", "LangChain", "OpenRouter", "Claude API", "OpenAI API"]),
    ("Languages",       ["TypeScript", "JavaScript", "Python", "Go", "Dart", "SQL"]),
    ("P2P & Web3",      ["libp2p", "IPFS", "WebRTC", "EVM", "Solana"]),
    ("Backend & Infra", ["Node.js", "Express", "Hono", "FastAPI", "PostgreSQL", "Redis", "Docker", "AWS",
                         "Supabase", "Firebase"]),
    ("AI Dev Tools",    ["Cursor", "Claude Code"]),
]

def client_header(doc, name, blurb, before=5):
    p = doc.add_paragraph()
    spacing(p, before=before, after=1)
    p.paragraph_format.keep_with_next = True
    run(p, name, size=10.5, bold=True, color=INK)
    if blurb:
        run(p, "   " + blurb, size=9.5, italic=True, color=NAVY)


def bullets(doc, items):
    for i, b in enumerate(items):
        bullet(doc, b, keep_next=(i == 0))


def build():
    doc = new_document()
    add_header(doc)
    add_summary(doc, SUMMARY)

    section_header(doc, CONSULTING["title"], CONSULTING["date"])
    for i, client in enumerate(CONSULTING["clients"]):
        client_header(doc, client["name"], client["blurb"], before=1 if i == 0 else 5)
        bullets(doc, client["bullets"])

    section_header(doc, FOUNDER["title"], FOUNDER["date"])
    client_header(doc, FOUNDER["org"], None, before=1)
    bullets(doc, FOUNDER["bullets"])

    section_header(doc, "Selected Projects")
    for proj in PROJECTS:
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
