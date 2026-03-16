
import os
import glob

static_dir = '/Users/apple/Documents/workspace-spring-tools-for-eclipse-5.0.1.RELEASE/swiggy/src/main/resources/static'
script_file = os.path.join(static_dir, 'script.js')

# 1. Identify and rename false PNGs
renamed_files = {}

for filepath in glob.glob(os.path.join(static_dir, '*.png')):
    filename = os.path.basename(filepath)
    if filename == 'hero-image.png':
        continue
        
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read(100) # Read first 100 chars
            
        if '<svg' in content or '<?xml' in content:
            new_filename = filename.replace('.png', '.svg')
            new_filepath = os.path.join(static_dir, new_filename)
            
            os.rename(filepath, new_filepath)
            renamed_files[filename] = new_filename
            print(f"Renamed {filename} to {new_filename}")
            
    except Exception as e:
        print(f"Skipping {filename}: {e}")

# 2. Update script.js
if renamed_files:
    try:
        with open(script_file, 'r', encoding='utf-8') as f:
            js_content = f.read()
            
        for old_name, new_name in renamed_files.items():
            js_content = js_content.replace(f"'{old_name}'", f"'{new_name}'")
            js_content = js_content.replace(f'"{old_name}"', f'"{new_name}"')
            
        with open(script_file, 'w', encoding='utf-8') as f:
            f.write(js_content)
            
        print(f"Updated script.js with {len(renamed_files)} changes.")
        
    except Exception as e:
        print(f"Error updating script.js: {e}")
