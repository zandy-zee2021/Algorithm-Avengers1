import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.applications.resnet50 import preprocess_input

# Load the pre-trained ResNet50 model
model = ResNet50(weights='imagenet', include_top=False, pooling='avg')

def extract(image):
    """
    Extract features from an image using ResNet50.
    :param image: PIL.Image object
    :return: List of features
    """
    # Resize image to (224, 224)
    image = image.resize((224, 224))
    
    # Convert image to numpy array
    image_array = np.array(image)
    
    # Expand dimensions to match model input
    image_array = np.expand_dims(image_array, axis=0)
    
    # Preprocess image
    image_array = preprocess_input(image_array)
    
    # Predict features
    features = model.predict(image_array)
    
    # Flatten features and convert to list
    return features.flatten().tolist()
