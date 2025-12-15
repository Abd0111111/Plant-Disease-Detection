import os
import json
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

# ==================== Paths ====================
TRAIN_DIR = os.path.join('..', 'dataset_splitted', 'train')
VAL_DIR = os.path.join('..', 'dataset_splitted', 'val')

MODEL_DIR = os.path.join('..', 'models')
MODEL_PATH = os.path.join(MODEL_DIR, "model.h5")
CLASS_INDICES_PATH = os.path.join(MODEL_DIR, "class_indices.json")

IMG_SIZE = (224, 224)
BATCH = 32
EPOCHS = 10

os.makedirs(MODEL_DIR, exist_ok=True)

# ==================== Data Generators ====================
train_datagen = ImageDataGenerator(rescale=1./255)
val_datagen = ImageDataGenerator(rescale=1./255)

train_gen = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH,
    class_mode='sparse'
)

val_gen = val_datagen.flow_from_directory(
    VAL_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH,
    class_mode='sparse'
)

# حفظ class indices
with open(CLASS_INDICES_PATH, "w") as f:
    json.dump(train_gen.class_indices, f)
print("✅ class_indices.json saved.")

# ==================== Build Model ====================
base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224,224,3))
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(128, activation='relu')(x)
x = Dropout(0.3)(x)
predictions = Dense(len(train_gen.class_indices), activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)
model.compile(optimizer=Adam(0.0001), loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# ==================== Training ====================
model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=EPOCHS
)

# ==================== Save Model ====================
model.save(MODEL_PATH)
print(f"✅ Model saved at {MODEL_PATH}")
