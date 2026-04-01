from pypdf import PdfReader

reader = PdfReader("TDR Forum Juin.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

with open("tdr_text.txt", "w", encoding="utf-8") as f:
    f.write(text)

reader2 = PdfReader("gt Forum année passée.pdf")
text2 = ""
for page in reader2.pages:
    text2 += page.extract_text() + "\n"

with open("gt_text.txt", "w", encoding="utf-8") as f:
    f.write(text2)

print("Extraction complete.")
