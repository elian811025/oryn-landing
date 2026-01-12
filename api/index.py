from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from io import BytesIO

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def set_font_complex(run, ascii_font='Times New Roman', east_asia_font='DFKai-SB'):
    """
    Sets the font for a run to handle both English (ASCII) and Chinese (East Asia) correctly.
    """
    run.font.name = ascii_font
    # Direct OXML manipulation for East Asian fonts
    r = run._element
    rPr = r.get_or_add_rPr()
    rFonts = rPr.get_or_add_rFonts()
    rFonts.set(qn('w:eastAsia'), east_asia_font)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Oryn Python Backend is Ready"}

@app.post("/api/fix-thesis")
async def fix_thesis(file: UploadFile = File(...)):
    # 1. Read file
    content = await file.read()
    source_stream = BytesIO(content)
    doc = Document(source_stream)
    
    # 2. Process Paragraphs
    for para in doc.paragraphs:
        # --- Smart Title Detection ---
        # Logic: Short text (< 40 chars) + No period at the end = Likely a Title
        clean_text = para.text.strip()
        is_title = (len(clean_text) > 0 and len(clean_text) < 40 and 
                    not clean_text.endswith("。") and not clean_text.endswith("."))

        if is_title:
            # Title Styling
            para.alignment = WD_ALIGN_PARAGRAPH.CENTER
            para.paragraph_format.first_line_indent = 0 # No indent
            para.paragraph_format.line_spacing = 1.5 
            para.paragraph_format.space_before = Pt(12)
            para.paragraph_format.space_after = Pt(12)
            
            for run in para.runs:
                run.bold = True
                run.font.size = Pt(16)
                set_font_complex(run) # Set fonts
                
        else:
            # Body Text Styling
            para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            # Indent: 2 characters (approx 24pt or 0.85cm)
            para.paragraph_format.first_line_indent = Pt(24) 
            para.paragraph_format.line_spacing = 1.5
            para.paragraph_format.space_after = Pt(0)
            
            for run in para.runs:
                run.bold = False # Remove bold from body
                run.font.size = Pt(12)
                set_font_complex(run)

    # 3. Save and Return
    target_stream = BytesIO()
    doc.save(target_stream)
    target_stream.seek(0)

    from urllib.parse import quote

    # Encode the filename to handle Chinese characters (RFC 5987 standard)
    encoded_filename = quote(f"Fixed_{file.filename}")

    return StreamingResponse(
        target_stream, 
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={
            "Content-Disposition": f"attachment; filename*=utf-8''{encoded_filename}"
        }
    )

