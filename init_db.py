"""
Database Initialization
"""

import os
import csv
import re
from tqdm import tqdm
from preprocessing.preprocessing import log2csv

# Set the Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = "IntelliOps.settings"

import django
django.setup()  # Initialize Django
from django.utils.dateparse import parse_time
from MainAPP.models import Log, Event


def insert_log_from_csv(structured_csv_path, template_csv_path):
    """
    Insert log data from CSV file to the database.

    :param structured_csv_path: Path to the structured CSV file
    :param template_csv_path: Path to the event template CSV file
    """
    print('Inserting log data from CSV file to the database')
    print('Structured CSV file: `{}`'.format(structured_csv_path))
    print('Event template CSV file: `{}`'.format(template_csv_path))

    # Insert event templates from CSV file
    templates = []
    with open(template_csv_path, 'r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            event_id = row['EventId']
            event_template = row['EventTemplate']
            escaped_template = re.escape(event_template)  # Escape special characters in the event template
            regex_pattern = re.sub(r"<\\\*>", ".*?", escaped_template)  # Replace "<*>" with ".*?" in the template
            templates.append((event_id, re.compile(regex_pattern)))
            Event.objects.update_or_create(
                event_id=event_id,
                defaults={'event_template': event_template}
            )

    # Insert log data from CSV file
    with open(structured_csv_path, 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        next(csv_reader)  # Skip the header row

        for row in tqdm(csv_reader):  # tqdm is used to display a progress bar
            month, date, time, hostname, component, pid, content = row
            pid = int(pid) if pid else None  # Convert PID to integer if it is not empty

            # Check if the log content matches any of the event templates
            for eid, template in templates:
                if template.match(content):
                    event = Event.objects.get(event_id=eid)
                    break
            else:
                event = None
                # Print error message
                print('Error: No event template found for log content: `{}`'.format(content))

            Log.objects.get_or_create(  # Insert log data if it does not exist (Prevent duplicate data)
                month=month,
                date=int(date),
                time=parse_time(time),
                hostname=hostname,
                component=component,
                pid=pid,
                content=content,
                event=event
            )

    print('Log data has been successfully inserted from CSV file to the database')


if __name__ == '__main__':
    log_path = os.path.join(os.path.dirname(__file__), 'data', 'Linux_2k.log')
    structured_path = os.path.join(os.path.dirname(__file__), 'data', 'Linux_2k.log_structured.csv')
    template_path = os.path.join(os.path.dirname(__file__), 'data', 'Linux_2k.log_templates.csv')

    log2csv(log_path, structured_path)
    insert_log_from_csv(structured_path, template_path)
