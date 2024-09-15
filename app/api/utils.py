# utils.py


def validate_string(field_name, value, errors):
    """Simple helper function to validate string fields."""
    if not isinstance(value, str) or not value.strip():
        errors[field_name] = f"{field_name.capitalize()} must be a alphanumeric text."
