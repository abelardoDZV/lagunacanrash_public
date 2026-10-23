#!/usr/bin/env python3
"""Prepara el video de TV con música andina usando los recursos locales."""

import argparse
from pathlib import Path
import subprocess


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ffmpeg", default="ffmpeg", help="Ejecutable de FFmpeg")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    video = root / "assets/images/video_drone_toda_laguna.mp4"
    music = root / "assets/audio/andean-riff.mp3"
    output = root / "assets/images/video_drone_toda_laguna_andina.mp4"

    # Cinco frases enlazadas suavemente; la imagen conserva su bitstream.
    filters = "".join(
        f"[{index + 1}:a]highpass=f=100,lowpass=f=6000,atempo=0.95[a{index}];"
        for index in range(5)
    ) + (
        "[a0][a1]acrossfade=d=0.8:c1=tri:c2=tri[b1];"
        "[b1][a2]acrossfade=d=0.8:c1=tri:c2=tri[b2];"
        "[b2][a3]acrossfade=d=0.8:c1=tri:c2=tri[b3];"
        "[b3][a4]acrossfade=d=0.8:c1=tri:c2=tri,"
        "loudnorm=I=-24:TP=-6:LRA=7,"
        "afade=t=in:st=0:d=1.5,afade=t=out:st=43.966667:d=3[audio]"
    )
    subprocess.run(
        [
            args.ffmpeg, "-hide_banner", "-nostdin", "-y",
            "-i", str(video),
            *[arg for _ in range(5) for arg in ("-i", str(music))],
            "-filter_complex", filters,
            "-map", "0:v:0", "-map", "[audio]", "-map_metadata", "-1",
            "-c:v", "copy", "-c:a", "aac", "-profile:a", "aac_low",
            "-b:a", "160k", "-ar", "48000", "-ac", "2",
            "-t", "46.966667", "-shortest", "-movflags", "+faststart",
            "-metadata", "title=Laguna Canrash · Música andina suave",
            "-metadata", "comment=Música: andean riff.wav, red3zzz, CC0 1.0; arreglo con fundidos y nivel suave.",
            str(output),
        ],
        check=True,
    )


if __name__ == "__main__":
    main()
