"""
Generate the master CV for Ömer Başar Özgüven: one role-agnostic CV covering everything.
Outputs docx/CV_OmerBasarOzguven.docx and, when LibreOffice is available, pdf/CV_OmerBasarOzguven.pdf.
Run: python3 cvs/generate_master_cv.py
"""

import os
import shutil
import subprocess

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Mm, Pt, RGBColor

NAME     = "Ömer Başar Özgüven"
PHONE    = "+90 531 269 11 05"
EMAIL    = "omerbasarozguven@gmail.com"
WEBSITE  = "omerbasarozguven.com"
LINKEDIN = "linkedin.com/in/omerbasarozguven"
GITHUB   = "github.com/omer-basar-ozguven"
LOCATION = "Turkey  ·  Open to relocation and remote"

CVS_DIR  = os.path.dirname(os.path.abspath(__file__))
DOCX_DIR = os.path.join(CVS_DIR, "docx")
PDF_DIR  = os.path.join(CVS_DIR, "pdf")
FILENAME = "CV_OmerBasarOzguven.docx"

# Arial renders as metric-identical Liberation Sans in LibreOffice, so Word and the PDF match.
FONT  = "Arial"
NAVY  = (0x1F, 0x3A, 0x5F)
INK   = (0x22, 0x22, 0x22)
MUTED = (0x66, 0x66, 0x66)
GREEN = (0x2E, 0x7D, 0x32)

MARGIN_IN    = 0.7
TEXT_WIDTH   = Mm(210) - Inches(MARGIN_IN * 2)
RIGHT_TAB    = int(TEXT_WIDTH / 635)  # EMU to twips
SKILL_INDENT = Inches(1.2)

# ── content ──────────────────────────────────────────────────────────────────

SUMMARY = (
    "Software engineer with five years of building and shipping real products, from mobile apps to AI agent "
    "systems. As a consulting engineer I built TypeScript agent harnesses and microservices for Placemaking AI and "
    "web3 clients, and as one of the founders of Bronix I led engineering on more than ten of our own products. I "
    "care about owning outcomes and do my best work where engineering and product meet."
)

HIGHLIGHTS = [
    "Co-built Bronix into a software studio with 50+ completed software engineering projects, including 10+ of "
    "our own products on the App Store, Google Play, and the web.",
    "Built YükAl, a nationwide freight marketplace with 10,000+ registered carriers and 600,000+ listings.",
    "Architected microservices and data pipelines processing 106M+ points of interest for Placemaking AI.",
    "Built the inference backend for Mole, a deep learning platform locating buried utilities, used by "
    "government agencies such as MEDAS.",
    "Best Paper Award, TORK 2019, for research on foldable modular miniature robots.",
]

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
    "org": "Bronix Software Inc.  ·  50+ completed projects",
    "bullets": [
        "Built VoltAgent agent harnesses with tool calling, multi step loops, context management, and structured "
        "outputs.",
        "Shipped LLM features across 10+ apps via OpenRouter, Claude, and OpenAI, with retries, timeouts, model "
        "fallbacks, and graceful degradation when a provider fails.",
        "Led engineering on 10+ products from architecture to launch on the App Store, Google Play, and the web.",
    ],
}

PRODUCTS = [
    {
        "name": "YükAl",
        "url": "https://www.yukal.net/",
        "status": "Live on iOS, Android & Web",
        "desc": "Freight marketplace that matches cargo owners with truck drivers across all 81 provinces. Free "
                "listing for shippers, subscriptions for carriers, with instant matching and route filters.",
        "tech": ["Expo", "Express.js", "Next.js", "Supabase", "Railway", "OpenRouter"],
    },
    {
        "name": "Next2Me",
        "url": "https://apps.apple.com/app/next2me-couple-games-quiz/id6761013065",
        "status": "Live on iOS",
        "desc": "Relationship app for couples with daily streaks, a shared drawing board, 3,000+ conversation "
                "questions, swipe to match on movies, food, and activities, and private encrypted chat. One "
                "subscription unlocks premium for both partners, and a couple calendar keeps shared plans in one place.",
        "tech": ["Flutter", "Firebase", "Railway", "OpenRouter"],
    },
    {
        "name": "NextRoom",
        "url": "https://apps.apple.com/app/id6761188961",
        "status": "Live on iOS",
        "desc": "AI interior design that redesigns any room, exterior, or landscape from a single photo, using 12+ "
                "curated styles or a custom prompt.",
        "tech": ["Flutter", "Firebase", "Railway", "Fal.ai"],
    },
    {
        "name": "Walkable",
        "url": "https://walkable.bronixlabs.com/",
        "status": "Live on iOS",
        "desc": "Walking navigation that uses an agentic pipeline to color code streets by walkability and safety. "
                "No account needed, and location never leaves the device.",
        "tech": ["Flutter", "VoltAgent", "Firebase", "Supabase"],
    },
    {
        "name": "Toxic Flamingo",
        "url": "https://apps.apple.com/app/id6759795623",
        "status": "Live on iOS",
        "desc": "A task manager with attitude that uses AI to nag and roast you into finishing tasks, with Rage "
                "Mode, app blocking, and a Pomodoro timer.",
        "tech": ["Flutter", "Firebase"],
    },
    {
        "name": "Banana Labs",
        "url": "https://bananalabs.co",
        "status": "Live on Web",
        "desc": "AI creative studio for UGC videos, product shoots, and images that runs several models in parallel "
                "so results can be compared side by side.",
        "tech": ["Next.js", "Express.js", "Supabase", "Fal.ai", "OpenRouter"],
    },
    {
        "name": "SeriesStudio",
        "url": "https://github.com/omer-basar-ozguven/voltagent-series-studio",
        "status": "Open Source",
        "desc": "Agentic pipeline that turns a few paragraphs describing a series idea into scripts, character "
                "sheets, storyboards, and rendered MP4 episodes.",
        "tech": ["VoltAgent", "Docker"],
    },
]

SKILLS = [
    ("Languages",      ["TypeScript", "JavaScript", "Python", "Go", "Dart", "SQL"]),
    ("Mobile",         ["Flutter", "Expo", "React Native", "Firebase SDK", "RevenueCat", "FCM",
                        "App Store Connect", "Google Play Console"]),
    ("Frontend",       ["React", "Next.js", "Tailwind CSS", "shadcn/ui"]),
    ("Backend",        ["Node.js", "Express", "Hono", "Go Fiber", "FastAPI", "Django", "Firebase Functions",
                        "Supabase Edge Functions"]),
    ("Data & Infra",   ["PostgreSQL", "PostGIS", "Redis", "MongoDB", "Firebase", "Supabase", "Docker", "AWS",
                        "Google Cloud", "Railway", "Vercel"]),
    ("P2P & Web3",     ["libp2p", "IPFS", "WebRTC", "EVM", "Solana"]),
    ("AI & Agents",    ["VoltAgent", "LangChain", "Claude API", "OpenAI API", "OpenRouter", "Fal.ai", "Apify",
                        "RAG", "Tool Use", "Structured Output", "Prompt Engineering"]),
    ("AI Dev Tools",   ["Cursor", "Claude Code"]),
    ("Product",        ["Product Definition", "Roadmapping", "Product Analytics", "Funnel & Churn Analysis",
                        "App Store Optimization", "Subscription Monetization"]),
]

EDUCATION = [
    {"degree": "B.Sc. Mechanical Engineering", "school": "Bilkent University, Ankara", "date": "2016 – 2021"},
    {"degree": "International Baccalaureate Diploma", "school": "TED Ankara College, Ankara", "date": "2012 – 2016"},
]

RESEARCH = {
    "title": "Undergraduate Researcher",
    "org": "Bilkent University, Miniature Robotics Laboratory",
    "date": "2018 – 2021",
    "bullets": [
        "Researched miniature modular robotics, focusing on foldable mechanisms and flexible spine module design.",
        'Best Paper Award, TORK 2019, for "Flexible Spine Module Design for Foldable Modular Miniature Robots".',
    ],
}

# ── low-level helpers ────────────────────────────────────────────────────────

def spacing(para, before=0, after=0):
    para.paragraph_format.space_before = Pt(before)
    para.paragraph_format.space_after  = Pt(after)

def run(para, text, size=9.5, bold=False, italic=False, color=INK, tracking=None):
    r = para.add_run(text)
    r.font.name   = FONT
    r.font.size   = Pt(size)
    r.font.bold   = bold
    r.font.italic = italic
    r.font.color.rgb = RGBColor(*color)
    r._r.get_or_add_rPr().get_or_add_rFonts().set(qn("w:eastAsia"), FONT)
    if tracking:
        sp_el = OxmlElement("w:spacing")
        sp_el.set(qn("w:val"), str(tracking))
        r._r.get_or_add_rPr().append(sp_el)
    return r

def link(para, url, text, **fmt):
    r = run(para, text, **fmt)
    h = OxmlElement("w:hyperlink")
    h.set(qn("r:id"), para.part.relate_to(url, RT.HYPERLINK, is_external=True))
    r._r.addprevious(h)
    h.append(r._r)
    return r

def bottom_border(para, color, sz):
    pPr  = para._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    b    = OxmlElement("w:bottom")
    b.set(qn("w:val"),   "single")
    b.set(qn("w:sz"),    str(sz))
    b.set(qn("w:space"), "2")
    b.set(qn("w:color"), "%02X%02X%02X" % color)
    pBdr.append(b)
    pPr.append(pBdr)

def tab_stop(para, pos_twips, align="left"):
    pPr  = para._p.get_or_add_pPr()
    tabs = pPr.find(qn("w:tabs"))
    if tabs is None:
        tabs = OxmlElement("w:tabs")
        pPr.append(tabs)
    t = OxmlElement("w:tab")
    t.set(qn("w:val"), align)
    t.set(qn("w:pos"), str(pos_twips))
    tabs.append(t)

def field(para, instr, **fmt):
    for kind, text in (("begin", None), ("instr", instr), ("separate", None), ("text", "1"), ("end", None)):
        r = run(para, "", **fmt)
        if kind == "instr":
            el = OxmlElement("w:instrText")
            el.set(qn("xml:space"), "preserve")
            el.text = text
        elif kind == "text":
            el = OxmlElement("w:t")
            el.text = text
        else:
            el = OxmlElement("w:fldChar")
            el.set(qn("w:fldCharType"), kind)
        r._r.append(el)

# ── section-level helpers ────────────────────────────────────────────────────

def section_header(doc, text, date=None):
    p = doc.add_paragraph()
    spacing(p, before=10, after=4)
    p.paragraph_format.keep_with_next = True
    run(p, text.upper(), size=10, bold=True, color=NAVY, tracking=30)
    if date:
        tab_stop(p, RIGHT_TAB, "right")
        run(p, "\t" + date, size=9, color=MUTED)
    bottom_border(p, NAVY, 6)

def entry_header(doc, title, org, date):
    p = doc.add_paragraph()
    spacing(p, before=5, after=1)
    p.paragraph_format.keep_with_next = True
    tab_stop(p, RIGHT_TAB, "right")
    run(p, title, size=10.5, bold=True)
    run(p, "\t" + date, size=9, color=MUTED)
    p = doc.add_paragraph()
    spacing(p, before=0, after=2)
    p.paragraph_format.keep_with_next = True
    run(p, org, size=9.5, italic=True, color=NAVY)

def bullet(doc, text, keep_next=False, labels=("Placemaking AI", "Mole")):
    p = doc.add_paragraph()
    spacing(p, before=1.5, after=0)
    p.paragraph_format.left_indent       = Inches(0.2)
    p.paragraph_format.first_line_indent = Inches(-0.14)
    p.paragraph_format.line_spacing      = 1.08
    p.paragraph_format.keep_with_next    = keep_next
    tab_stop(p, int(Inches(0.2) / 635))
    label, sep, rest = text.partition(": ")
    run(p, "•\t", size=9.5, color=NAVY)
    if sep and label in labels:
        run(p, label + ": ", size=9.5, bold=True)
        run(p, rest, size=9.5)
    else:
        run(p, text, size=9.5)

def product(doc, proj):
    p = doc.add_paragraph()
    spacing(p, before=5, after=0)
    p.paragraph_format.keep_together = True
    p.paragraph_format.line_spacing  = 1.08
    link(p, proj["url"], proj["name"], size=10, bold=True)
    run(p, "   " + proj["status"].upper(), size=7.5, bold=True, color=GREEN, tracking=10)
    run(p, "").add_break()
    run(p, proj["desc"], size=9.5)
    run(p, "").add_break()
    run(p, "  ·  ".join(proj["tech"]), size=8.5, italic=True, color=MUTED)

def skill_row(doc, category, items):
    p = doc.add_paragraph()
    spacing(p, before=1.5, after=1.5)
    p.paragraph_format.left_indent       = SKILL_INDENT
    p.paragraph_format.first_line_indent = -SKILL_INDENT
    p.paragraph_format.line_spacing      = 1.08
    tab_stop(p, int(SKILL_INDENT / 635))
    run(p, category + "\t", size=9.5, bold=True, color=NAVY)
    run(p, ", ".join(i.replace(" ", "\u00a0") for i in items), size=9.5)

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

def add_consulting(doc):
    section_header(doc, CONSULTING["title"], CONSULTING["date"])
    for i, client in enumerate(CONSULTING["clients"]):
        client_header(doc, client["name"], client["blurb"], before=1 if i == 0 else 5)
        bullets(doc, client["bullets"])

def add_founder(doc):
    section_header(doc, FOUNDER["title"], FOUNDER["date"])
    client_header(doc, FOUNDER["org"], None, before=1)
    bullets(doc, FOUNDER["bullets"])

def add_experience(doc, founder_first=False):
    sections = [add_founder, add_consulting] if founder_first else [add_consulting, add_founder]
    for add_section in sections:
        add_section(doc)

# ── document builder ─────────────────────────────────────────────────────────

def new_document():
    doc = Document()

    sec = doc.sections[0]
    sec.page_width, sec.page_height = Mm(210), Mm(297)
    sec.top_margin = sec.bottom_margin = Inches(0.6)
    sec.left_margin = sec.right_margin = Inches(MARGIN_IN)
    sec.footer_distance = Inches(0.3)

    normal = doc.styles["Normal"]
    normal.font.name = FONT
    normal.font.size = Pt(9.5)
    normal.element.rPr.rFonts.set(qn("w:eastAsia"), FONT)
    normal.paragraph_format.space_after  = Pt(0)
    normal.paragraph_format.line_spacing = 1.0
    return doc


def add_header(doc):
    p = doc.add_paragraph()
    spacing(p, 0, 3)
    run(p, NAME, size=26, bold=True, color=NAVY)

    p = doc.add_paragraph()
    spacing(p, 0, 2)
    link(p, f"mailto:{EMAIL}", EMAIL, size=9)
    run(p, "   ·   ", size=9, color=MUTED)
    link(p, "tel:" + PHONE.replace(" ", ""), PHONE, size=9)
    run(p, "   ·   " + LOCATION, size=9, color=MUTED)

    p = doc.add_paragraph()
    spacing(p, 0, 0)
    contacts = [
        (f"https://{WEBSITE}", WEBSITE),
        (f"https://www.{LINKEDIN}", LINKEDIN),
        (f"https://{GITHUB}", GITHUB),
    ]
    for i, (url, text) in enumerate(contacts):
        if i:
            run(p, "   ·   ", size=9, color=MUTED)
        link(p, url, text, size=9)


def add_summary(doc, text):
    section_header(doc, "Summary")
    p = doc.add_paragraph()
    p.paragraph_format.line_spacing = 1.12
    run(p, text, size=9.5)


def add_page_footer(doc):
    fp = doc.sections[0].footer.paragraphs[0]
    fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run(fp, f"{NAME}   ·   Page ", size=8, color=MUTED)
    field(fp, "PAGE", size=8, color=MUTED)
    run(fp, " of ", size=8, color=MUTED)
    field(fp, "NUMPAGES", size=8, color=MUTED)


def save(doc, filename):
    os.makedirs(DOCX_DIR, exist_ok=True)
    path = os.path.join(DOCX_DIR, filename)
    doc.save(path)
    print(f"✓  {filename}")
    return path


def build():
    doc = new_document()
    add_header(doc)
    add_summary(doc, SUMMARY)

    # Highlights
    section_header(doc, "Highlights")
    for h in HIGHLIGHTS:
        bullet(doc, h)

    add_experience(doc, founder_first=True)

    # Products
    section_header(doc, "Products")
    for proj in PRODUCTS:
        product(doc, proj)

    # Skills
    section_header(doc, "Skills")
    for cat, items in SKILLS:
        skill_row(doc, cat, items)

    # Education
    section_header(doc, "Education")
    for ed in EDUCATION:
        p = doc.add_paragraph()
        spacing(p, before=3, after=0)
        tab_stop(p, RIGHT_TAB, "right")
        run(p, ed["degree"], size=10, bold=True)
        run(p, "   " + ed["school"], size=9.5, italic=True, color=NAVY)
        run(p, "\t" + ed["date"], size=9, color=MUTED)

    # Research & Awards
    section_header(doc, "Research & Awards")
    entry_header(doc, RESEARCH["title"], RESEARCH["org"], RESEARCH["date"])
    for i, b in enumerate(RESEARCH["bullets"]):
        bullet(doc, b, keep_next=(i == 0))

    add_page_footer(doc)
    return save(doc, FILENAME)


def to_pdf(docx_path):
    soffice = shutil.which("soffice") or shutil.which("libreoffice")
    if not soffice:
        print("!  LibreOffice not found, skipping PDF export")
        return
    os.makedirs(PDF_DIR, exist_ok=True)
    subprocess.run(
        [soffice, "--headless", "--convert-to", "pdf", "--outdir", PDF_DIR, docx_path],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    print(f"✓  {os.path.splitext(os.path.basename(docx_path))[0]}.pdf")


if __name__ == "__main__":
    to_pdf(build())
