import json
import requests
import click

# READ API
URL = 'https://api.jsonbin.io/b/5b8e93e4db948c68635c80f4/latest'
READ = requests.get(URL)
DATA = json.loads(READ.content.decode())

# Count the Movies List
COUNTER = 0

print('\n')
print('=== Marvel Movie List for Avengers ===')
print('\n')

with click.progressbar(range(100000), show_eta=False, label='Fetching Data') as bar:
    for i in bar:
        pass

print('\n')

# Print the Movies List from API
for marvel in DATA['items']:
    COUNTER += 1
    print("Title:", marvel['title'], "\nMovie Release Date:", marvel['release_date'])
    print("----")

print('\n')
print("Number of Movies: ", COUNTER)
print('\n')
