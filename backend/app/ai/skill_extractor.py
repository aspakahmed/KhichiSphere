from app.ai.constants import TECH_SKILLS


class SkillExtractor:

    @staticmethod
    def extract(text: str) -> list[str]:
        """
        Extract technical skills from resume text.
        """

        if not text:
            return []

        text = text.lower()

        found_skills = []

        for skill in TECH_SKILLS:
            if skill in text:
                found_skills.append(skill)

        return sorted(list(set(found_skills)))