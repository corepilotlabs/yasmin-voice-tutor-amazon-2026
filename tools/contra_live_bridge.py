import json
import subprocess
import sys
from pathlib import Path

def run(cmd):
    p = subprocess.run(cmd, text=True, capture_output=True)
    return {
        "cmd": cmd,
        "returncode": p.returncode,
        "stdout": p.stdout[-12000:],
        "stderr": p.stderr[-12000:]
    }

result = {
    "purpose": "Yasmin Voice Tutor Amazon 2026 verification",
    "steps": []
}

install = run(["npm", "install", "--no-audit", "--no-fund"])
result["steps"].append(install)

if install["returncode"] == 0:
    tests = run(["npm", "test"])
    result["steps"].append(tests)
    result["status"] = "PASS" if tests["returncode"] == 0 else "FAIL"
else:
    result["status"] = "FAIL"

Path("contra-live-result.json").write_text(
    json.dumps(result, ensure_ascii=False, indent=2),
    encoding="utf-8"
)

print("YASMIN_VERIFICATION_STATUS=" + result["status"])
for step in result["steps"]:
    print("\n$ " + " ".join(step["cmd"]))
    print(step["stdout"])
    if step["stderr"]:
        print(step["stderr"], file=sys.stderr)

sys.exit(0 if result["status"] == "PASS" else 1)
