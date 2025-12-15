import os
import shutil
from PIL import Image
from sklearn.model_selection import train_test_split

# ============================================================
#                   PATHS
# ============================================================
DATASET_DIR = os.path.join("..", "dataset", "plantvillage_dataset")
OUTPUT_DIR = os.path.join("..", "dataset_splitted")

print("DATASET DIR:", os.path.abspath(DATASET_DIR))
print("OUTPUT DIR:", os.path.abspath(OUTPUT_DIR))

TEST_RATIO = 0.15
VAL_RATIO = 0.15


# ============================================================
#                   LOAD DATASET + CLEANING
# ============================================================
def load_dataset(dataset_dir):
    image_paths = []
    labels = []
    skipped = 0

    for root, dirs, files in os.walk(dataset_dir):
        label = os.path.basename(root)

        if root == dataset_dir:
            continue

        for f in files:
            fpath = os.path.join(root, f)

            if not os.path.isfile(fpath):
                continue

            # ===== Data Cleaning =====
            try:
                img = Image.open(fpath)

                # تأكد إن الصورة RGB
                if img.mode != "RGB":
                    img = img.convert("RGB")

                # حاول resize للتأكد إن الصورة سليمة
                img.resize((224, 224))

            except Exception:
                skipped += 1
                continue

            image_paths.append(fpath)
            labels.append(label)

    classes = sorted(list(set(labels)))
    print(f"Found {len(classes)} classes")
    print(f"Skipped corrupted images: {skipped}")

    return image_paths, labels


# ============================================================
#               SPLIT + COPY
# ============================================================
def split_and_copy(image_paths, labels, out_dir, test_ratio=0.15, val_ratio=0.15):

    if len(image_paths) == 0:
        print("❌ No valid images found. Check dataset.")
        return

    os.makedirs(out_dir, exist_ok=True)

    train_frac = 1.0 - test_ratio - val_ratio
    if train_frac <= 0:
        raise ValueError("Invalid split ratios. test+val must be < 1.0")

    num_classes = len(set(labels))

    # ------------------ TEST SPLIT ------------------
    min_test = int(len(image_paths) * test_ratio)
    strat_test = labels if min_test >= num_classes else None

    if strat_test is None:
        print("⚠ Stratify disabled for TEST split")

    X_trainval, X_test, y_trainval, y_test = train_test_split(
        image_paths,
        labels,
        test_size=test_ratio,
        stratify=strat_test,
        random_state=42
    )

    # ------------------ VAL SPLIT ------------------
    min_val = int(len(X_trainval) * val_ratio)
    strat_val = y_trainval if min_val >= num_classes else None

    if strat_val is None:
        print("⚠ Stratify disabled for VAL split")

    val_ratio_adj = val_ratio / (train_frac + val_ratio)

    X_train, X_val, y_train, y_val = train_test_split(
        X_trainval,
        y_trainval,
        test_size=val_ratio_adj,
        stratify=strat_val,
        random_state=42
    )

    # ------------------ SAVE SPLITS ------------------
    splits = {
        "train": (X_train, y_train),
        "val": (X_val, y_val),
        "test": (X_test, y_test)
    }

    for split_name, (xs, ys) in splits.items():
        print(f"Copying {len(xs)} images to '{split_name}'...")
        for src, label in zip(xs, ys):
            dst_dir = os.path.join(out_dir, split_name, label)
            os.makedirs(dst_dir, exist_ok=True)

            dst_path = os.path.join(dst_dir, os.path.basename(src))

            if not os.path.exists(dst_path):
                shutil.copy2(src, dst_path)

    print("✅ Dataset split & cleaned successfully")


# ============================================================
#                   EXECUTE
# ============================================================
if __name__ == "__main__":
    imgs, labs = load_dataset(DATASET_DIR)
    print(f"Total valid images: {len(imgs)}")

    split_and_copy(imgs, labs, OUTPUT_DIR, TEST_RATIO, VAL_RATIO)

    print("\n🎯 Data pipeline finished successfully")
