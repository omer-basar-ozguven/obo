"""
Generate the one-page CV tailored to Tether's AI Harness Engineer role.
Reuses the design helpers from generate_master_cv.py.
Run: python3 cvs/generate_tether_cv.py
"""

from generate_master_cv import (
    MUTED, NAVY, RIGHT_TAB,
    add_experience, add_header, add_summary, new_document, product, run,
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


def build():
    doc = new_document()
    add_header(doc)
    add_summary(doc, SUMMARY)
    add_experience(doc)

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
