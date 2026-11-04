"""
Generate 6 tailored 1-page CVs for Ömer Başar Özgüven.
Run: python3 generate_cvs.py
"""

from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_ALIGN_VERTICAL
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import os

NAME     = "Ömer Başar Özgüven"
PHONE    = "+90 531 269 11 05"
EMAIL    = "omerbasarozguven@gmail.com"
WEBSITE  = "omerbasarozguven.com"
LINKEDIN = "linkedin.com/in/omerbasarozguven"
GITHUB   = "github.com/omer-basar-ozguven"
OUT_DIR  = os.path.dirname(os.path.abspath(__file__))
PHOTO    = os.path.join(OUT_DIR, "public", "icons", "obo.jpeg")

GREEN    = (0x2E, 0x7D, 0x32)

# Live / availability status shown next to each project name.
PROJECT_STATUS = {
    "YükAl":          "Live on iOS, Android & Web",
    "Walkable":       "Live on iOS",
    "Toxic Flamingo": "Live on iOS",
    "NextRoom":       "Live on iOS",
    "Next2Me":        "Live on iOS",
    "Banana Labs":    "Live on Web",
    "Mole":           "Live on Web",
    "Placemaking AI": "Live on Web",
    "SeriesStudio":   "Open Source",
}

RESEARCH = {
    "org":    "Bilkent University — Miniature Robotics Laboratory",
    "period": "2018 – 2021",
    "bullets": [
        "Researched miniature modular robotics: foldable mechanisms and flexible spine module design.",
        'Best Paper Award, TORK 2019, for "Flexible Spine Module Design for Foldable Modular Miniature Robots".',
    ],
}

# ── low-level helpers ────────────────────────────────────────────────────────

def sp(para, before=0, after=0):
    para.paragraph_format.space_before = Pt(before)
    para.paragraph_format.space_after  = Pt(after)

def run(para, text, size=9.5, bold=False, italic=False, color=None):
    r = para.add_run(text)
    r.font.name  = "Calibri"
    r.font.size  = Pt(size)
    r.font.bold  = bold
    r.font.italic = italic
    if color:
        r.font.color.rgb = RGBColor(*color)
    return r

def bottom_border(para, color="BBBBBB", sz="4"):
    pPr  = para._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    b    = OxmlElement("w:bottom")
    b.set(qn("w:val"),   "single")
    b.set(qn("w:sz"),    sz)
    b.set(qn("w:space"), "1")
    b.set(qn("w:color"), color)
    pBdr.append(b)
    pPr.append(pBdr)

def right_tab(para, pos=9360):
    pPr     = para._p.get_or_add_pPr()
    tabs_el = OxmlElement("w:tabs")
    tab     = OxmlElement("w:tab")
    tab.set(qn("w:val"), "right")
    tab.set(qn("w:pos"), str(pos))
    tabs_el.append(tab)
    pPr.append(tabs_el)

# ── section-level helpers ────────────────────────────────────────────────────

def section_header(doc, text):
    p = doc.add_paragraph()
    sp(p, before=4, after=1)
    run(p, text.upper(), size=9, bold=True, color=(0x22, 0x22, 0x22))
    bottom_border(p, color="BBBBBB", sz="4")

def job_header(doc, title, org, date_str):
    p = doc.add_paragraph()
    sp(p, before=3, after=1)
    right_tab(p)
    run(p, title,        size=10,   bold=True)
    run(p, "  ·  ",      size=10)
    run(p, org,          size=10,   italic=True)
    run(p, "\t" + date_str, size=9, color=(0x77, 0x77, 0x77))

def bullet(doc, text):
    p = doc.add_paragraph()
    sp(p, before=1, after=0)
    p.paragraph_format.left_indent       = Inches(0.22)
    p.paragraph_format.first_line_indent = Inches(-0.15)
    run(p, "•  " + text, size=9.5)

def project_line(doc, name, desc, tech=None, status=None):
    p = doc.add_paragraph()
    sp(p, before=2, after=1)
    run(p, name, size=9.5, bold=True)
    if status:
        run(p, "   " + status, size=8.5, bold=True, color=GREEN)
    run(p, "", size=9.5).add_break()
    run(p, desc, size=9.5)
    if tech:
        run(p, f"  —  {tech}", size=8.5, italic=True, color=(0x77, 0x77, 0x77))

def skills_line(doc, category, items):
    p = doc.add_paragraph()
    sp(p, before=2, after=2)
    run(p, category + ":  ", size=9.5, bold=True)
    run(p, ", ".join(items),  size=9.5)

# ── document builder ─────────────────────────────────────────────────────────

def build_cv(filename, role_title, summary, experience, projects, skills, certs=None, research=None):
    doc = Document()

    for sec in doc.sections:
        sec.top_margin    = Inches(0.45)
        sec.bottom_margin = Inches(0.45)
        sec.left_margin   = Inches(0.70)
        sec.right_margin  = Inches(0.70)

    normal = doc.styles["Normal"]
    normal.font.name = "Calibri"
    normal.font.size = Pt(10)
    normal.paragraph_format.line_spacing = 1.0
    normal.paragraph_format.space_after  = Pt(0)

    # Header: name + role on the left, photo on the right
    table = doc.add_table(rows=1, cols=2)
    table.autofit = False
    table.allow_autofit = False
    left, right = table.cell(0, 0), table.cell(0, 1)
    left.width, right.width = Inches(5.75), Inches(1.25)

    pn = left.paragraphs[0]
    sp(pn, 0, 1)
    run(pn, NAME, size=22, bold=True, color=(0x1A, 0x1A, 0x1A))

    if os.path.exists(PHOTO):
        right.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
        pimg = right.paragraphs[0]
        pimg.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        sp(pimg, 0, 0)
        pimg.add_run().add_picture(PHOTO, width=Inches(1.1))

    # Contact line (full width, under the header)
    p = doc.add_paragraph()
    sp(p, 2, 4)
    bottom_border(p, color="333333", sz="8")
    run(p, f"{WEBSITE}  |  {PHONE}  |  {EMAIL}  |  {LINKEDIN}  |  {GITHUB}",
        size=8.5, color=(0x44, 0x44, 0x44))

    # Summary
    section_header(doc, "Summary")
    p = doc.add_paragraph()
    sp(p, 1, 1)
    run(p, summary, size=9.5)

    # Experience
    section_header(doc, "Experience")
    for exp in experience:
        job_header(doc, exp["title"], exp["org"], exp["date"])
        for b in exp["bullets"]:
            bullet(doc, b)

    # Projects
    section_header(doc, "Selected Projects")
    for proj in projects:
        project_line(doc, proj["name"], proj["desc"], proj.get("tech"),
                     PROJECT_STATUS.get(proj["name"]))

    # Skills
    section_header(doc, "Skills")
    for cat, items in skills:
        skills_line(doc, cat, items)

    # Education
    section_header(doc, "Education")
    p = doc.add_paragraph()
    sp(p, 1, 0)
    run(p, "B.Sc. Mechanical Engineering", size=9.5, bold=True)
    run(p, "  ·  Bilkent University, Ankara, Turkey  ·  2016 – 2021", size=9.5)

    p = doc.add_paragraph()
    sp(p, 1, 0)
    run(p, "High School Diploma (International Baccalaureate)", size=9.5, bold=True)
    run(p, "  ·  TED Ankara College, Ankara, Turkey  ·  2012 – 2016", size=9.5)

    if certs:
        p = doc.add_paragraph()
        sp(p, 2, 0)
        run(p, "Certifications:  ", size=9.5, bold=True)
        run(p, "  |  ".join(certs), size=9.5)

    # Research
    if research:
        section_header(doc, "Research")
        job_header(doc, "Undergraduate Researcher", research["org"], research["period"])
        for b in research["bullets"]:
            bullet(doc, b)

    path = os.path.join(OUT_DIR, filename)
    doc.save(path)
    print(f"✓  {filename}")


# ════════════════════════════════════════════════════════════════════════════
# CV 1 — FULL-STACK ENGINEER
# ════════════════════════════════════════════════════════════════════════════
build_cv(
    filename="CV_FullStack_OmerBasarOzguven.docx",
    role_title="Full-Stack Software Engineer",
    summary=(
        "Full stack engineer and one of the founders of Bronix, where I spent five years shipping more than ten "
        "consumer products from first commit to launch. I work across the entire web stack, building React and "
        "Next.js frontends on top of Node.js, Go, and Python services with Firebase or Supabase behind them. I have "
        "taken enterprise scale platforms to production and built practical AI features into apps people use every "
        "day. I move quickly, own what I build, and would rather ship something real than polish something forever."
    ),
    experience=[
        {
            "title": "Co-Founder & Lead Software Engineer",
            "org": "Bronix  ·  50+ completed projects",
            "date": "2021 – 2026",
            "bullets": [
                "Architected and shipped 10+ consumer products, iterating on product analytics and user funnels.",
                "Built web platforms and admin dashboards with Next.js, React, and Tailwind CSS.",
                "Developed REST APIs and backend services in Node.js (Express/Hono) and Go (Fiber).",
                "Managed cloud infrastructure (Firebase, Supabase, AWS) and integrated AI via OpenRouter and Fal.ai.",
            ],
        },
        {
            "title": "Consulting Engineer",
            "org": "Mole  ·  Placemaking AI",
            "date": "2022 – 2026",
            "bullets": [
                "Mole: Built the FastAPI backend and Supabase infra for an AI GPR utility-detection platform (MEDAS).",
                "Placemaking AI: Built microservices processing 106M+ points of interest.",
            ],
        },
    ],
    projects=[
        {"name": "Placemaking AI", "desc": "Real estate intelligence platform built on 106M+ points of interest.", "tech": "Python, FastAPI, LangChain, AWS"},
        {"name": "Mole",         "desc": "AI platform detecting underground utilities from GPR data with a deep-learning ensemble (MEDAS).", "tech": "FastAPI, Supabase, Next.js"},
        {"name": "YükAl",       "desc": "Turkish freight marketplace matching cargo owners with truck drivers across all 81 provinces.", "tech": "Expo, Express.js, Next.js, Supabase"},
        {"name": "Banana Labs",  "desc": "AI creative studio for videos, product shoots, and images.",   "tech": "Next.js, Express, Supabase, Fal.ai"},
        {"name": "NextRoom",     "desc": "AI interior design that redesigns any space from one photo in 12+ styles or a custom prompt.",           "tech": "Flutter, Firebase, Railway, Fal.ai"},
        {"name": "SeriesStudio", "desc": "Open-source agentic pipeline turning a short series idea into full episodic video output.",         "tech": "VoltAgent, Docker"},
    ],
    skills=[
        ("Languages",   ["TypeScript", "JavaScript", "Go", "Python", "Dart", "SQL"]),
        ("Frontend",    ["React", "Next.js", "Tailwind CSS", "shadcn/ui"]),
        ("Backend",     ["Node.js", "Express", "Hono", "Go Fiber", "FastAPI", "Django"]),
        ("Data & Infra",["PostgreSQL", "Firebase", "Supabase", "Redis", "Docker", "AWS", "Railway", "Vercel"]),
        ("AI & Agents", ["OpenRouter", "Fal.ai", "VoltAgent", "LangChain", "Claude API", "OpenAI API"]),
    ],
    certs=["Claude Code 101", "Claude Platform 101", "AI Fluency: Framework & Foundations"],
    research=RESEARCH,
)

# ════════════════════════════════════════════════════════════════════════════
# CV 2 — MOBILE ENGINEER
# ════════════════════════════════════════════════════════════════════════════
build_cv(
    filename="CV_Mobile_OmerBasarOzguven.docx",
    role_title="Mobile Engineer  ·  Flutter & Expo",
    summary=(
        "Mobile engineer and one of the founders of Bronix, where I shipped more than six Flutter and Expo apps to "
        "the App Store and Google Play. I know Flutter and Dart deeply, from Firebase integration and RevenueCat "
        "subscriptions to the full release cycle on both iOS and Android. When a product needs a backend or a web "
        "dashboard, I build that too, so nothing stalls waiting on someone else. Enough launches have taught me that "
        "the last ten percent is where the real work hides."
    ),
    experience=[
        {
            "title": "Co-Founder & Lead Software Engineer",
            "org": "Bronix  ·  50+ completed projects",
            "date": "2021 – 2026",
            "bullets": [
                "Shipped 6+ production Flutter and Expo apps across iOS and Android, from architecture to App Store launch.",
                "Integrated RevenueCat for subscription billing and in-app purchase management.",
                "Built Firebase-backed real-time features: Auth, Firestore, Cloud Messaging, and Storage.",
                "Embedded AI features including on-device Fal.ai image generation and agentic navigation via VoltAgent.",
                "Managed App Store and Google Play releases; analyzed user funnels and churn to prioritize iterations.",
            ],
        },
    ],
    projects=[
        {"name": "Walkable",       "desc": "Walking navigation that color-codes streets by how safe they are, with no account and location kept entirely on device.",        "tech": "Flutter, VoltAgent, Firebase, Supabase"},
        {"name": "Toxic Flamingo", "desc": "A to-do app with attitude that nags and roasts you into finishing tasks, with Rage Mode, app blocking, and a Pomodoro timer.",       "tech": "Flutter, Firebase"},
        {"name": "Next2Me",        "desc": "Couples app with daily streaks, a shared drawing board, 3,000+ conversation questions, swipe-to-match on movies and activities, and private encrypted chat. One subscription unlocks premium for both partners.", "tech": "Flutter, Firebase, Railway, OpenRouter"},
        {"name": "NextRoom",       "desc": "AI interior design that turns one photo into a photorealistic redesign across 12+ curated styles or a custom prompt.",     "tech": "Flutter, Firebase, Railway, Fal.ai"},
        {"name": "YükAl",          "desc": "Freight marketplace connecting cargo owners with truck drivers across all 81 provinces, with instant matching.",       "tech": "Expo, Express.js, Supabase"},
    ],
    skills=[
        ("Mobile",       ["Flutter", "Dart", "Expo", "React Native", "iOS", "Android"]),
        ("Mobile Tools", ["Firebase SDK", "RevenueCat", "App Store Connect", "Google Play Console", "FCM"]),
        ("Backend",      ["Node.js", "Express", "FastAPI", "Firebase Functions", "Supabase"]),
        ("Languages",    ["Dart", "TypeScript", "JavaScript", "Python"]),
        ("AI & Agents",  ["Fal.ai", "VoltAgent", "OpenRouter", "Claude API"]),
    ],
    research=RESEARCH,
)

# ════════════════════════════════════════════════════════════════════════════
# CV 3 — PRODUCT ENGINEER
# ════════════════════════════════════════════════════════════════════════════
build_cv(
    filename="CV_Product_OmerBasarOzguven.docx",
    role_title="Product Engineer",
    summary=(
        "Product engineer and one of the founders of Bronix, where I owned the full loop of defining, building, "
        "launching, and iterating on consumer software. I have shipped more than ten products across mobile and web, "
        "including subscription apps, AI tools, and enterprise platforms. I pair hands on engineering across the "
        "stack with a real sense of what to build next and why it matters. I watch how people actually use a "
        "product, and I let that decide what gets built and what gets cut."
    ),
    experience=[
        {
            "title": "Co-Founder & Lead Software Engineer",
            "org": "Bronix  ·  50+ completed projects",
            "date": "2021 – 2026",
            "bullets": [
                "Defined product vision and led full-stack engineering for 10+ consumer apps across mobile (Flutter/Expo) and web (Next.js).",
                "Shipped subscription products with RevenueCat billing; managed App Store and Google Play lifecycle.",
                "Built AI-powered tools integrating OpenRouter, Fal.ai, and VoltAgent for generative and agentic workflows.",
                "Owned roadmap and engineering from zero to launch, iterating on product analytics, funnels, and churn.",
            ],
        },
    ],
    projects=[
        {"name": "YükAl",        "desc": "Freight marketplace connecting cargo owners with truck drivers nationwide, with free listing and a carrier subscription model.", "tech": "Expo, Next.js, Supabase"},
        {"name": "Walkable",     "desc": "Privacy-first walking navigation that color-codes streets by safety, with no account and location that never leaves the device.",                "tech": "Flutter, VoltAgent, Firebase"},
        {"name": "Next2Me",      "desc": "Couples relationship app with daily streaks, conversation questions, swipe-to-match on movies and activities, and private chat. Unique shared-subscription model where one partner upgrading unlocks premium for both.", "tech": "Flutter, Firebase, OpenRouter"},
        {"name": "Banana Labs",  "desc": "AI creative studio for videos, product shoots, and images, generating across several models in parallel for comparison.",                          "tech": "Next.js, Fal.ai, Supabase"},
        {"name": "NextRoom",     "desc": "AI interior design that redesigns any space from a single photo using 12+ curated styles or a custom prompt.",                  "tech": "Flutter, Firebase, Fal.ai"},
    ],
    skills=[
        ("Product",     ["Product Definition", "Roadmapping", "User Research", "App Store Optimisation", "Subscription Monetisation"]),
        ("Engineering", ["Flutter", "Expo", "Next.js", "React", "Node.js", "Go", "Python", "FastAPI"]),
        ("AI & Agents", ["VoltAgent", "OpenRouter", "Fal.ai", "LangChain", "Claude API", "OpenAI API"]),
        ("Infra",       ["Firebase", "Supabase", "PostgreSQL", "Docker", "AWS", "Railway", "Vercel"]),
    ],
    research=RESEARCH,
)

# ════════════════════════════════════════════════════════════════════════════
# CV 4 — BACKEND ENGINEER
# ════════════════════════════════════════════════════════════════════════════
build_cv(
    filename="CV_Backend_OmerBasarOzguven.docx",
    role_title="Backend Engineer  ·  Go · Python · Node.js",
    summary=(
        "Backend engineer and one of the founders of Bronix, with years of production experience building APIs, data "
        "pipelines, and microservices in Go, Python, and Node.js. I have delivered backend systems for more than ten "
        "consumer products as well as enterprise platforms, including a pipeline that processes over 106 million "
        "points of interest and an AI inference service used by government teams for underground utility detection. I "
        "design for scale and reliability, but I keep things simple enough that the next person can actually maintain "
        "them. Performance problems are the kind I genuinely enjoy chasing down."
    ),
    experience=[
        {
            "title": "Co-Founder & Lead Software Engineer",
            "org": "Bronix  ·  50+ completed projects",
            "date": "2021 – 2026",
            "bullets": [
                "Designed and built REST APIs for consumer mobile apps in Node.js (Express/Hono) and Go (Fiber).",
                "Managed PostgreSQL databases, Redis caching, and Docker deployments on Railway and AWS.",
                "Built serverless functions and event pipelines powering product analytics and behavioral data.",
            ],
        },
        {
            "title": "Consulting Engineer — Backend & Data",
            "org": "Mole  ·  Placemaking AI",
            "date": "2022 – 2026",
            "bullets": [
                "Placemaking AI: Architected microservices processing 106M+ POIs, with ETL and data science pipelines.",
                "Mole: Built a FastAPI inference pipeline for a deep-learning GPR utility-detection model (MEDAS).",
            ],
        },
    ],
    projects=[
        {"name": "Placemaking AI", "desc": "Microservices backend and ETL pipelines processing 106M+ points of interest for a real estate intelligence platform.", "tech": "Python, FastAPI, PostGIS, AWS"},
        {"name": "Mole",         "desc": "AI inference backend detecting underground utilities from GPR data with a deep-learning ensemble.", "tech": "FastAPI, Supabase, Docker"},
        {"name": "YükAl",        "desc": "Freight marketplace backend: Express.js REST API on Railway backed by Supabase and PostgreSQL, powering matching and subscriptions.",           "tech": "Node.js, Express, Supabase, PostgreSQL"},
        {"name": "Banana Labs",  "desc": "Backend orchestrating parallel AI model calls across providers, with job queuing, result caching, and side-by-side delivery.",              "tech": "Express.js, Supabase, Fal.ai, OpenRouter"},
        {"name": "SeriesStudio", "desc": "Agentic pipeline orchestrating multi-step video generation, chaining scripts, storyboards, and rendered MP4 scenes.", "tech": "VoltAgent, Docker"},
    ],
    skills=[
        ("Languages",    ["Go", "Python", "TypeScript", "JavaScript", "SQL"]),
        ("Frameworks",   ["Go Fiber", "FastAPI", "Django", "Express.js", "Hono", "Node.js"]),
        ("Databases",    ["PostgreSQL", "PostGIS", "Redis", "MongoDB", "Supabase", "Firebase"]),
        ("DevOps & Cloud", ["Docker", "AWS", "Railway", "Vercel", "Firebase Functions", "Supabase Edge Functions"]),
        ("AI & Data",    ["LangChain", "VoltAgent", "OpenRouter", "Fal.ai", "Apify", "ETL Pipelines"]),
    ],
    certs=["Claude Code 101", "Claude Platform 101", "AI Fluency: Framework & Foundations"],
    research=RESEARCH,
)

# ════════════════════════════════════════════════════════════════════════════
# CV 5 — SOFTWARE ENGINEER (broad generalist)
# ════════════════════════════════════════════════════════════════════════════
build_cv(
    filename="CV_SoftwareEngineer_OmerBasarOzguven.docx",
    role_title="Software Engineer",
    summary=(
        "Software engineer and one of the founders of Bronix, where I shipped more than ten products end to end "
        "across mobile, web, and backend. I am comfortable everywhere in the stack, from Flutter and Next.js to Go, "
        "Python, and Node services running on cloud infrastructure. I like owning a feature from the first sketch all "
        "the way to production, AI integrations included. Five years of building products with small teams has taught "
        "me to be pragmatic about what actually needs building."
    ),
    experience=[
        {
            "title": "Co-Founder & Lead Software Engineer",
            "org": "Bronix  ·  50+ completed projects",
            "date": "2021 – 2026",
            "bullets": [
                "Shipped 10+ consumer products end-to-end across iOS, Android, and web, from architecture to release.",
                "Built mobile apps in Flutter and Expo, and web platforms and dashboards in Next.js and React.",
                "Developed backend APIs and services in Node.js, Go, and Python on PostgreSQL, Firebase, and Supabase.",
                "Integrated AI capabilities (OpenRouter, Fal.ai, VoltAgent) and iterated using product analytics and user funnels.",
            ],
        },
        {
            "title": "Consulting Engineer",
            "org": "Mole  ·  Placemaking AI",
            "date": "2022 – 2026",
            "bullets": [
                "Placemaking AI: Built microservices and data pipelines processing 106M+ points of interest.",
                "Mole: Built a FastAPI inference backend for a deep-learning GPR utility-detection platform (MEDAS).",
            ],
        },
    ],
    projects=[
        {"name": "YükAl",        "desc": "Turkish freight marketplace matching cargo owners with truck drivers across all 81 provinces.", "tech": "Expo, Express.js, Next.js, Supabase"},
        {"name": "Placemaking AI", "desc": "Real estate intelligence platform built on 106M+ points of interest.", "tech": "Python, FastAPI, LangChain, AWS"},
        {"name": "Mole",         "desc": "AI platform detecting underground utilities from GPR data with a deep-learning ensemble (MEDAS).", "tech": "FastAPI, Supabase, Next.js"},
        {"name": "SeriesStudio", "desc": "Open-source agentic pipeline turning a short series idea into full episodic video output.", "tech": "VoltAgent, Docker"},
        {"name": "Banana Labs",  "desc": "AI creative studio for videos, product shoots, and images.", "tech": "Next.js, Express, Supabase, Fal.ai"},
        {"name": "NextRoom",     "desc": "AI interior design that redesigns any space from one photo in 12+ styles or a custom prompt.", "tech": "Flutter, Firebase, Railway, Fal.ai"},
    ],
    skills=[
        ("Languages",     ["TypeScript", "JavaScript", "Python", "Go", "Dart", "SQL"]),
        ("Backend & APIs", ["Node.js", "Go Fiber", "FastAPI", "Django", "Express", "Hono"]),
        ("Web & Mobile",  ["React", "Next.js", "Flutter", "Expo", "React Native"]),
        ("Data & Infra",  ["PostgreSQL", "Firebase", "Supabase", "Redis", "Docker", "AWS", "Railway", "Vercel"]),
        ("AI & Agents",   ["VoltAgent", "LangChain", "OpenRouter", "Fal.ai", "Claude API", "OpenAI API"]),
    ],
    certs=["Claude Code 101", "Claude Platform 101", "AI Fluency: Framework & Foundations"],
    research=RESEARCH,
)

# ════════════════════════════════════════════════════════════════════════════
# CV 6 — AI ENGINEER (AI application / agent engineer)
# ════════════════════════════════════════════════════════════════════════════
build_cv(
    filename="CV_AIEngineer_OmerBasarOzguven.docx",
    role_title="AI Engineer  ·  LLMs & Agents",
    summary=(
        "AI engineer and one of the founders of Bronix, where I build AI powered products spanning agents, LLM "
        "integrations, and generative media. I have built agentic pipelines with VoltAgent and put Claude, OpenAI, "
        "and Fal.ai to work inside real consumer apps. I also ship fast using AI assisted development with Cursor and "
        "Claude, which keeps my output well above what the headcount suggests. I stay close to the models as they "
        "change, because half the advantage is knowing what just became possible."
    ),
    experience=[
        {
            "title": "Co-Founder & Lead Software Engineer",
            "org": "Bronix  ·  50+ completed projects",
            "date": "2021 – 2026",
            "bullets": [
                "Shipped AI-powered features across 10+ consumer products: generative image/video, chat, and agentic flows.",
                "Integrated LLM and generative APIs (Claude, OpenAI, OpenRouter, Fal.ai) into mobile and web apps.",
                "Built agentic systems with VoltAgent orchestrating multi-step, tool-using pipelines.",
                "Built the mobile apps and SeriesStudio pipeline using AI-assisted development with Cursor and Claude.",
            ],
        },
    ],
    projects=[
        {"name": "SeriesStudio",   "desc": "Open-source agentic pipeline turning a short series idea into full episodic video output. Built with Cursor.", "tech": "VoltAgent, Docker"},
        {"name": "Banana Labs",    "desc": "AI creative studio generating videos, product shoots, and images across several models in parallel. Built with Cursor.", "tech": "Fal.ai, OpenRouter, Next.js, Supabase"},
        {"name": "NextRoom",       "desc": "AI interior design that redesigns any space from one photo in 12+ styles or a custom prompt. Built with Claude Code.", "tech": "Fal.ai, Flutter, Firebase"},
        {"name": "Walkable",       "desc": "Navigation app using an agentic pipeline to color-code streets by walkability and safety. Built with Cursor & Claude Code.", "tech": "VoltAgent, Flutter, Firebase"},
        {"name": "Next2Me",        "desc": "Couples app with AI-powered conversation questions via OpenRouter, daily streaks, swipe-to-match on movies and activities, and private encrypted chat. Built with Cursor.", "tech": "Flutter, Firebase, Railway, OpenRouter"},
        {"name": "Toxic Flamingo", "desc": "A to-do app that uses AI to nag and roast you into finishing tasks, with Rage Mode, app blocking, and a Pomodoro timer. Built with Cursor.", "tech": "Flutter, Firebase"},
    ],
    skills=[
        ("AI & Agents",     ["VoltAgent", "LangChain", "Claude API", "OpenAI API", "OpenRouter", "Fal.ai", "Apify"]),
        ("AI Workflows",    ["Agents", "Tool Use", "RAG", "Prompt Engineering", "Structured Output", "Generative Media"]),
        ("AI-Assisted Dev", ["Cursor", "Claude Code"]),
        ("Languages",       ["Python", "TypeScript", "JavaScript", "Dart", "Go", "SQL"]),
        ("Backend & Infra", ["FastAPI", "Node.js", "PostgreSQL", "Supabase", "Firebase", "Docker", "AWS", "Railway"]),
    ],
    certs=["Claude Code 101", "Claude Platform 101", "AI Fluency: Framework & Foundations"],
    research=RESEARCH,
)
