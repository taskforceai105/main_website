#!/usr/bin/env python3

from pathlib import Path
import shutil


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"

FILES_TO_COPY = [
    ".nojekyll",
    "index.html",
    "styles.css",
]

DIRECTORIES_TO_COPY = [
    "ai-directory",
    "assets",
    "option-a",
    "option-b",
    "option-c",
    "option-d",
    "option-e",
    "scripts",
]


def copy_path(path_name: str) -> None:
    source = ROOT / path_name
    destination = DIST / path_name
    if source.is_dir():
        shutil.copytree(source, destination)
    else:
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)


def main() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)

    DIST.mkdir(parents=True, exist_ok=True)

    for file_name in FILES_TO_COPY:
        copy_path(file_name)

    for directory_name in DIRECTORIES_TO_COPY:
        copy_path(directory_name)

    build_script_output = DIST / "scripts" / "build_pages.py"
    if build_script_output.exists():
        build_script_output.unlink()

    (DIST / ".nojekyll").touch()


if __name__ == "__main__":
    main()
