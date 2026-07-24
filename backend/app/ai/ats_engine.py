from app.ai.constants import TECH_SKILLS


class ATSEngine:

    @staticmethod
    def calculate(text: str, skills: list[str]) -> dict:
        """
        Basic ATS scoring engine.
        """

        score = 0
        recommendations = []

        # Skills Score (40 Marks)
        skills_score = min(len(skills) * 4, 40)
        score += skills_score

        # Experience
        if "experience" in text.lower():
            score += 15
        else:
            recommendations.append(
                "Add an Experience section."
            )

        # Education
        if (
            "education" in text.lower()
            or "b.tech" in text.lower()
            or "bachelor" in text.lower()
        ):
            score += 15
        else:
            recommendations.append(
                "Add your Education details."
            )

        # Projects
        if "project" in text.lower():
            score += 20
        else:
            recommendations.append(
                "Mention your Projects."
            )

        # Resume Length
        if len(text) > 1000:
            score += 10
        else:
            recommendations.append(
                "Resume is too short."
            )

        return {
            "ats_score": min(score, 100),
            "recommendations": recommendations,
        }