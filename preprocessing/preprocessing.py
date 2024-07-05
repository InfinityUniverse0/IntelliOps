"""
Preprocessing Module
"""

import re
import csv
from tqdm import tqdm

# Log line regular expression pattern
log_pattern = re.compile(r'(\w{3})\s+(\d{1,2})\s+(\d{2}:\d{2}:\d{2})\s+(\S+)\s+(.+?)(?:\[(\d+)\])?:\s+(.*)')


def log2csv(log_file_path, csv_file_path):
    """
    Convert log file to CSV file (Structured data).
    """
    print('Converting log file `{}` to CSV file `{}`'.format(log_file_path, csv_file_path))

    with open(log_file_path, 'r') as log_file, open(csv_file_path, 'w', newline='') as csv_file:
        csv_writer = csv.writer(csv_file)

        # Write the header of the CSV file
        csv_writer.writerow(['Month', 'Date', 'Time', 'Hostname', 'Component', 'PID', 'Content'])

        for line in tqdm(log_file):  # tqdm is used to display a progress bar
            match = log_pattern.match(line)  # Match each line of the log file using regular expression
            if match:
                month, date, time, hostname, component, pid, content = match.groups()
                pid = pid if pid else None  # Set PID to None if it is empty
                csv_writer.writerow([month, date, time, hostname, component, pid, content])
            else:
                # Print error message
                print('Error: Log line does not match the pattern: `{}`'.format(line))

    print('Log file `{}` has been successfully converted to CSV file `{}`'.format(log_file_path, csv_file_path))


def get_event_templates(template_csv_path):
    """
    Get event templates from CSV file.

    :param template_csv_path: Event template CSV file path
    :return: List of event templates (Event ID, Event Template)
             NOTE: Event ID starts from 0 instead of 1 in the CSV file
    """
    event_templates = []
    with open(template_csv_path, 'r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            event_id = row['EventId']
            event_template = row['EventTemplate']
            event_id = int(event_id[1:]) - 1  # Convert Event ID to integer (Start from 0) [E.g., E1 -> 0]
            escaped_template = re.escape(event_template)  # Escape special characters in the event template
            regex_pattern = re.sub(r"<\\\*>", ".*?", escaped_template)  # Replace "<*>" with ".*?" in the template
            event_templates.append((event_id, re.compile(regex_pattern)))
    return event_templates


def log2eid(log, event_templates):
    """
    Match log content to event templates and return the corresponding Event ID.

    :param log: Log content
    :param event_templates: List of event templates (Event ID, Event Template)
    :return: Event ID (None if no match is found)
    """
    match = log_pattern.match(log)
    if not match:
        return None
    _, _, _, _, _, _, content = match.groups()
    for eid, template in event_templates:
        if template.match(content):
            return eid
    return None
