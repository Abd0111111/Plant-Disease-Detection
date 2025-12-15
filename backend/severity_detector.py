from PIL import Image
import numpy as np
import random

def measure_severity(img):
    # ===== Infection Level عشوائي =====
    severity_ratio = random.uniform(0.1, 0.9)

    # ===== تحديد النص بناءً على النسبة =====
    if severity_ratio < 0.30:
        severity = "Low"
    elif severity_ratio < 0.65:
        severity = "Mild"
    elif severity_ratio < 0.80:
        severity = "Moderate"
    else:
        severity = "Severe"

    # ===== مثال للأعراض والمناطق المصابة =====
    symptoms = ["dark spots", "leaf discoloration"]
    affected_areas = ["Upper surface of the leaf with dark lesions"]

    # ===== Confidence عشوائي =====
    confidence = random.uniform(0.6, 0.9)

    return severity, severity_ratio, symptoms, affected_areas, confidence