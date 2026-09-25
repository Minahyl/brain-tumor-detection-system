import os


# Main dataset directory
DATASET_DIR = "dataset"


# Dataset splits
splits = ["Training", "Testing"]


for split in splits:

    split_path = os.path.join(DATASET_DIR, split)

    print(f"\n{split}")
    print("-" * 30)

    # Check whether the directory exists
    if not os.path.exists(split_path):
        print(f"{split} directory not found.")
        continue

    # Loop through each class
    for class_name in sorted(os.listdir(split_path)):

        class_path = os.path.join(split_path, class_name)

        # Only process directories
        if os.path.isdir(class_path):

            # Count files inside the class directory
            image_count = len(
                [
                    file
                    for file in os.listdir(class_path)
                    if file.lower().endswith(
                        (".jpg", ".jpeg", ".png")
                    )
                ]
            )

            print(f"{class_name}: {image_count} images")