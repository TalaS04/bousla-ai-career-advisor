import csv
import json
from pathlib import Path

# Locate the project root automatically
ROOT = Path(__file__).resolve().parents[3]

# Source and destination folders
SOURCE_DIR = ROOT / "src" / "data"
DEST_DIR = SOURCE_DIR / "json"
DEST_DIR.mkdir(exist_ok=True)

# Fields that should become numbers
NUMBER_FIELDS = {
    "weight",
    "value",
    "displayOrder",

    "realistic",
    "investigative",
    "artistic",
    "social",
    "enterprising",
    "conventional",
}

# Fields that should become booleans
BOOLEAN_FIELDS = {
    "isAdaptive",
    "isReverseScored",
}


def convert_value(field, value):
    value = value.strip()

    if value == "":
        return None

    if field in BOOLEAN_FIELDS:
        return value.lower() == "true"

    if field in NUMBER_FIELDS:
        try:
            return float(value)
        except ValueError:
            return value

    return value


for csv_file in SOURCE_DIR.glob("*.csv"):
    rows = []

    with open(csv_file, encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)

        for row in reader:
            clean = {
                key: convert_value(key, value)
                for key, value in row.items()
            }
            rows.append(clean)

    output_file = DEST_DIR / f"{csv_file.stem}.json"

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)

    print(f"✓ {csv_file.name} -> {output_file.name}")

print("\nDone!")