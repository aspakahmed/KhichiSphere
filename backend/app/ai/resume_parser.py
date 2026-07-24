from pypdf import PdfReader


class ResumeParser:

    @staticmethod
    def extract_text(filepath: str) -> str:
        """
        Extract plain text from PDF resume.
        """

        reader = PdfReader(filepath)

        text = []

        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                text.append(page_text)

        return "\n".join(text)