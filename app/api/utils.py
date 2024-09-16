# utils.py
def validate_string(key: str, data: dict, errors: dict):
    if key not in data or data[key] is None:
        errors[key] = key + " required"
    else:
        if not data[key].strip():
            errors[key] = key + " not valid"
